/* eslint-disable no-control-regex */
import utils from '../../utils/index.js';
import { encodeParamsV2ByABI, decodeParamsV2ByABI } from '../../utils/abi.js';
import { TronWeb } from '../../tronweb.js';
import { Contract } from './index.js';
import { sha3 } from '../../utils/crypto.js';

export interface CallOptions {
    feeLimit?: number;
    callValue?: number;
    tokenValue?: number;
    tokenId?: string;
    from?: string | false;
}

interface _CallOptions extends CallOptions {
    rawParameter?: string;
    _isConstant?: boolean;
}

export interface SendOptions {
    from?: string | false;
    feeLimit?: number;
    callValue?: number;
    tokenValue?: number;
    tokenId?: string;
    shouldPollResponse?: boolean;
    pollTimes?: number;
    rawResponse?: boolean;
    keepTxID?: boolean;
}

interface _SendOptions extends SendOptions {
    rawParameter?: string;
}

import type {
    FragmentTypes,
    StateMutabilityTypes,
    FunctionFragment,
    FallbackFragment,
    ReceiveFragment,
    EventFragment,
    AbiInputsType,
    AbiOutputsType,
    GetParamsType,
    GetOutputsType,
    AbiParamsCommon,
} from '../../types/ABI.js';
import { TransactionInfo } from '../../types/Trx.js';

export type AbiFragmentNoErrConstructor = FunctionFragment | EventFragment | FallbackFragment | ReceiveFragment;

type OutputType<T extends Readonly<AbiFragmentNoErrConstructor>> = T extends FunctionFragment ? GetOutputsType<T['outputs']> : any;

type _CallAndSendReturn<AbiFrag> = AbiFrag extends FunctionFragment
    ? AbiFrag['outputs'] extends ReadonlyArray<AbiParamsCommon>
        ? AbiFrag['outputs']['length'] extends 1
            ? AbiFrag['outputs'][0]['name'] extends ''
                ? OutputType<AbiFrag>[0]
                : AbiFrag['outputs'][0]['name'] extends 'length'
                    ? OutputType<AbiFrag>[0]
                    : OutputType<AbiFrag>
            : OutputType<AbiFrag>
        : []
    : any;

const getFunctionSelector = (abi: Readonly<AbiFragmentNoErrConstructor>) => {
    if ('stateMutability' in abi) {
        (abi.stateMutability as StateMutabilityTypes) = abi.stateMutability ? abi.stateMutability.toLowerCase() : 'nonpayable';
    }
    (abi.type as FragmentTypes) = abi.type ? abi.type.toLowerCase() : '';
    if (abi.type === 'fallback' || abi.type === 'receive') return '0x';
    const iface = new utils.ethersUtils.Interface([abi]);
    let obj;
    if (abi.type === 'event') {
        obj = iface.getEvent(abi.name);
    } else {
        obj = iface.getFunction(abi.name);
    }
    if (obj) {
        return obj.format('sighash');
    }
    throw new Error('unknown function');
};

const decodeOutput = <T extends Readonly<AbiFragmentNoErrConstructor>>(abi: T, output: string) => {
    return decodeParamsV2ByABI(abi, output) as OutputType<T>;
};

export class Method<AbiFrag extends Readonly<AbiFragmentNoErrConstructor>> {
    tronWeb: TronWeb;
    contract: Contract;
    abi: AbiFrag;
    name: string;
    inputs: AbiInputsType;
    outputs: AbiOutputsType;
    functionSelector: string | null;
    signature: string;
    defaultOptions: {
        feeLimit: number;
        callValue: number;
        shouldPollResponse: boolean;
    };

    constructor(contract: Contract, abi: AbiFrag) {
        this.tronWeb = contract.tronWeb;
        this.contract = contract;

        this.abi = abi;
        this.name = abi.name || abi.type;

        this.inputs = abi.inputs || [];

        this.outputs = [];
        if ('outputs' in abi && abi.outputs) {
            this.outputs = abi.outputs;
        }

        this.functionSelector = getFunctionSelector(abi);
        this.signature = sha3(this.functionSelector, false).slice(0, 8);

        this.defaultOptions = {
            feeLimit: this.tronWeb.feeLimit,
            callValue: 0,
            shouldPollResponse: false, // Only used for sign()
        };
    }

    decodeInput(data: string) {
        const abi = JSON.parse(JSON.stringify(this.abi));
        abi.outputs = abi.inputs;
        return decodeOutput(abi, '0x' + data);
    }

    onMethod(...args: GetParamsType<AbiFrag['inputs']>) {
        let rawParameter = '';
        if (this.abi && !/event/i.test(this.abi.type)) {
            rawParameter = encodeParamsV2ByABI(this.abi, args);
        }
        return {
            call: async (options: CallOptions = {}): Promise<_CallAndSendReturn<AbiFrag>> => {
                options = {
                    ...options,
                    rawParameter,
                } as _CallOptions;

                return await this._call([], [], options) as any;
            },
            send: async <__SendOptions extends Readonly<SendOptions>>(options: __SendOptions = {} as __SendOptions, privateKey = this.tronWeb.defaultPrivateKey): Promise<
                __SendOptions['shouldPollResponse'] extends true 
                    ? __SendOptions['rawResponse'] extends true
                        ? TransactionInfo
                        : __SendOptions['keepTxID'] extends true
                            ? [string, _CallAndSendReturn<AbiFrag>]
                            : _CallAndSendReturn<AbiFrag>
                    : string
            > => {
                options = {
                    ...options,
                    rawParameter,
                };

                return await this._send([], [], options, privateKey);
            },
        };
    }

    async _call(types: [], args: [], options: _CallOptions = {}) {
        if (types.length !== args.length) {
            throw new Error('Invalid argument count provided');
        }

        if (!this.contract.address) {
            throw new Error('Smart contract is missing address');
        }

        if (!this.contract.deployed) {
            throw new Error('Calling smart contracts requires you to load the contract first');
        }
        if ('stateMutability' in this.abi) {
            const { stateMutability } = this.abi;

            if (stateMutability && !['pure', 'view'].includes(stateMutability.toLowerCase())) {
                throw new Error(`Methods with state mutability "${stateMutability}" must use send()`);
            }
        }

        options = {
            ...this.defaultOptions,
            from: this.tronWeb.defaultAddress.hex,
            ...options,
            _isConstant: true,
        };

        const parameters = args.map((value, index) => ({
            type: types[index],
            value,
        }));

        const transaction = await this.tronWeb.transactionBuilder.triggerSmartContract(
            this.contract.address,
            this.functionSelector!,
            options,
            parameters,
            options.from ? this.tronWeb.address.toHex(options.from) : undefined
        );

        if (!utils.hasProperty(transaction, 'constant_result')) {
            throw new Error('Failed to execute');
        }

        const len = transaction.constant_result![0].length;
        if (len === 0 || len % 64 === 8) {
            let msg = 'The call has been reverted or has thrown an error.';
            if (len !== 0) {
                msg += ' Error message: ';
                let msg2 = '';
                const chunk = transaction.constant_result![0].substring(8);
                for (let i = 0; i < len - 8; i += 64) {
                    msg2 += this.tronWeb.toUtf8(chunk.substring(i, i + 64));
                }
                msg += msg2
                    .replace(/(\u0000|\u000b|\f)+/g, ' ')
                    .replace(/ +/g, ' ')
                    .replace(/\s+$/g, '');
            }
            throw new Error(msg);
        }

        const output = decodeOutput(this.abi, '0x' + transaction.constant_result![0]);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (output.length === 1 && Object.keys(output).length === 1) {
            return output[0];
        }

        return output;
    }

    async _send(types: [], args: [], options: _SendOptions = {}, privateKey = this.tronWeb.defaultPrivateKey) {
        if (types.length !== args.length) {
            throw new Error('Invalid argument count provided');
        }

        if (!this.contract.address) {
            throw new Error('Smart contract is missing address');
        }

        if (!this.contract.deployed) {
            throw new Error('Calling smart contracts requires you to load the contract first');
        }

        const { stateMutability } = this.abi as { stateMutability: StateMutabilityTypes };

        if (['pure', 'view'].includes(stateMutability.toLowerCase())) {
            throw new Error(`Methods with state mutability "${stateMutability}" must use call()`);
        }

        // If a function isn't payable, dont provide a callValue.
        if (!['payable'].includes(stateMutability.toLowerCase())) {
            options.callValue = 0;
        }

        options = {
            ...this.defaultOptions,
            from: this.tronWeb.defaultAddress.hex,
            ...options,
        };

        const parameters = args.map((value, index) => ({
            type: types[index],
            value,
        }));

        const address = privateKey ? this.tronWeb.address.fromPrivateKey(privateKey) : this.tronWeb.defaultAddress.base58;
        const transaction = await this.tronWeb.transactionBuilder.triggerSmartContract(
            this.contract.address,
            this.functionSelector!,
            options,
            parameters,
            this.tronWeb.address.toHex(address as string)
        );

        if (!transaction.result || !transaction.result.result) {
            throw new Error('Unknown error: ' + JSON.stringify(transaction, null, 2));
        }

        // If privateKey is false, this won't be signed here. We assume sign functionality will be replaced.
        const signedTransaction = await this.tronWeb.trx.sign(transaction.transaction, privateKey);

        if (!signedTransaction.signature) {
            if (!privateKey) {
                throw new Error('Transaction was not signed properly');
            }

            throw new Error('Invalid private key provided');
        }

        const broadcast = await this.tronWeb.trx.sendRawTransaction(signedTransaction);

        if (broadcast.code) {
            const err = {
                error: broadcast.code,
                message: broadcast.code as unknown as string,
            };
            if (broadcast.message) err.message = this.tronWeb.toUtf8(broadcast.message);
            const error = new Error(err.message);
            (error as any).error = broadcast.code;
            throw error;
        }

        if (!options.shouldPollResponse) {
            return signedTransaction.txID;
        }

        const checkResult: (index: number) => any = async (index) => {
            if (index === (options.pollTimes || 20)) {
                const error: any = new Error('Cannot find result in solidity node');
                error.error = 'Cannot find result in solidity node';
                error.transaction = signedTransaction;
                throw error;
            }

            const output = await this.tronWeb.trx.getTransactionInfo(signedTransaction.txID);

            if (!Object.keys(output).length) {
                await new Promise((r) => setTimeout(r, 3000));
                return checkResult(index + 1);
            }

            if (output.result && output.result === 'FAILED') {
                const error: any = new Error(this.tronWeb.toUtf8(output.resMessage));
                error.error = this.tronWeb.toUtf8(output.resMessage);
                error.transaction = signedTransaction;
                error.output = output;
                throw error;
            }

            if (!utils.hasProperty(output, 'contractResult')) {
                const error: any = new Error('Failed to execute: ' + JSON.stringify(output, null, 2));
                error.error = 'Failed to execute: ' + JSON.stringify(output, null, 2);
                error.transaction = signedTransaction;
                error.output = output;
                throw error;
            }

            if (options.rawResponse) {
                return output;
            }

            let decoded = decodeOutput(this.abi, '0x' + output.contractResult[0]);

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (decoded.length === 1 && Object.keys(decoded).length === 1) {
                decoded = decoded[0];

                if (options.keepTxID) {
                    return [signedTransaction.txID, decoded] as [string, OutputType<AbiFrag>[0]];
                }

                return decoded as OutputType<AbiFrag>[0];
            }


            if (options.keepTxID) {
                return [signedTransaction.txID, decoded] as [string, OutputType<AbiFrag>];
            }

            return decoded as OutputType<AbiFrag>;
        };

        return checkResult(0);
    }
}
