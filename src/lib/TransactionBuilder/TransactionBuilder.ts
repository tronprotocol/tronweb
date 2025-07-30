import { TronWeb } from '../../tronweb.js';
import { AbiCoder, keccak256 } from '../../utils/ethersUtils.js';
import { ADDRESS_PREFIX_REGEX, toHex } from '../../utils/address.js';
import { encodeParamsV2ByABI } from '../../utils/abi.js';
import { CreateSmartContractTransaction, SignedTransaction, Transaction, TransactionWrapper } from '../../types/Transaction.js';
import { Validator } from '../../paramValidator/index.js';
import { GetSignWeightResponse } from '../../types/APIResponse.js';
import { isArray, isHex, isInteger, isNotNullOrUndefined, isObject, isString } from '../../utils/validations.js';
import {
    AccountCreateContract,
    AccountPermissionUpdateContract,
    AccountUpdateContract,
    AssetIssueContract,
    CancelFreezeBalanceV2Contract,
    ClearABIContract,
    ContractParamter,
    ContractType,
    CreateSmartContract,
    DelegateResourceContract,
    DeployConstantContract,
    ExchangeCreateContract,
    ExchangeInjectContract,
    ExchangeTransactionContract,
    ExchangeWithdrawContract,
    FreezeBalanceContract,
    FreezeBalanceV2Contract,
    ParticipateAssetIssueContract,
    Permission,
    ProposalCreateContract,
    ProposalDeleteContract,
    SetAccountIdContract,
    TransferAssetContract,
    TransferContract,
    TriggerSmartContract,
    UnDelegateResourceContract,
    UnfreezeBalanceContract,
    UnfreezeBalanceV2Contract,
    UpdateAssetContract,
    UpdateBrokerageContract,
    UpdateEnergyLimitContract,
    UpdateSettingContract,
    VoteProposalContract,
    VoteWitnessContract,
    WithdrawBalanceContract,
    WithdrawExpireUnfreezeContract,
    WitnessCreateContract,
} from '../../types/Contract.js';
import {
    createTransaction,
    deepCopyJson,
    fromUtf8,
    genContractAddress,
    resultManager,
    resultManagerTriggerSmartContract,
    getTransactionOptions,
} from './helper.js';
import {
    AlterTransactionOptions,
    CreateSmartContractOptions,
    CreateTokenOptions,
    DeployConstantContractOptions,
    TriggerConstantContractOptions,
    TransactionCommonOptions,
    Resource,
    ContractFunctionParameter,
    TriggerSmartContractOptions,
    TxLocal,
    UpdateTokenOptions,
    VoteInfo,
} from '../../types/TransactionBuilder.js';
import { Address } from '../../types/Trx.js';
import { ConstructorFragment, ContractAbiInterface, FunctionFragment } from '../../types/ABI.js';

interface IArgs extends TriggerSmartContract {
    function_selector?: string;
    parameter?: string;
    fee_limit?: number;
    Permission_id?: number;
}
export class TransactionBuilder {
    private tronWeb: TronWeb;
    private validator: Validator;
    constructor(tronWeb?: TronWeb) {
        if (!tronWeb || !(tronWeb instanceof TronWeb)) {
            throw new Error('Expected instance of TronWeb');
        }
        this.tronWeb = tronWeb;
        this.validator = new Validator();
    }

    async sendTrx(
        to: string,
        amount = 0,
        from: string = this.tronWeb.defaultAddress.hex as string,
        options: TransactionCommonOptions = {}
    ): Promise<Transaction<TransferContract>> {
        // accept amounts passed as strings
        amount = parseInt(amount);

        this.validator.notValid([
            {
                name: 'recipient',
                type: 'address',
                value: to,
            },
            {
                name: 'origin',
                type: 'address',
                value: from as string,
            },
            {
                names: ['recipient', 'origin'],
                type: 'notEqual',
                msg: 'Cannot transfer TRX to the same account',
            },
            {
                name: 'amount',
                type: 'integer',
                gt: 0,
                value: amount,
            },
        ]);

        const data: TransferContract = {
            to_address: toHex(to),
            owner_address: toHex(from as string),
            amount: amount,
        };

        const transactionOptions = getTransactionOptions(options);
        return createTransaction<TransferContract>(this.tronWeb, ContractType.TransferContract, data, options?.permissionId, transactionOptions);
    }

    async sendToken(
        to: string,
        amount = 0,
        tokenId: string,
        from: string = this.tronWeb.defaultAddress.hex as string,
        options: TransactionCommonOptions = {}
    ): Promise<Transaction<TransferAssetContract>> {
        amount = parseInt(amount);
        this.validator.notValid([
            {
                name: 'recipient',
                type: 'address',
                value: to,
            },
            {
                name: 'origin',
                type: 'address',
                value: from as string,
            },
            {
                names: ['recipient', 'origin'],
                type: 'notEqual',
                msg: 'Cannot transfer tokens to the same account',
            },
            {
                name: 'amount',
                type: 'integer',
                gt: 0,
                value: amount,
            },
            {
                name: 'token ID',
                type: 'tokenId',
                value: tokenId,
            },
        ]);

        const data: TransferAssetContract = {
            to_address: toHex(to),
            owner_address: toHex(from as string),
            asset_name: fromUtf8(tokenId as string),
            amount,
        };

        const transactionOptions = getTransactionOptions(options);
        return createTransaction<TransferAssetContract>(this.tronWeb, ContractType.TransferAssetContract, data, options?.permissionId, transactionOptions);
    }

    async purchaseToken(
        issuerAddress: string,
        tokenId: string,
        amount = 0,
        buyer: string = this.tronWeb.defaultAddress.hex as string,
        options: TransactionCommonOptions = {}
    ): Promise<Transaction<ParticipateAssetIssueContract>> {
        this.validator.notValid([
            {
                name: 'buyer',
                type: 'address',
                value: buyer as string,
            },
            {
                name: 'issuer',
                type: 'address',
                value: issuerAddress,
            },
            {
                names: ['buyer', 'issuer'],
                type: 'notEqual',
                msg: 'Cannot purchase tokens from same account',
            },
            {
                name: 'amount',
                type: 'integer',
                gt: 0,
                value: amount,
            },
            {
                name: 'token ID',
                type: 'tokenId',
                value: tokenId,
            },
        ]);

        const data: ParticipateAssetIssueContract = {
            to_address: toHex(issuerAddress),
            owner_address: toHex(buyer as string),
            asset_name: fromUtf8(tokenId as string),
            amount: parseInt(amount),
        };

        const transactionOptions = getTransactionOptions(options);
        return createTransaction<ParticipateAssetIssueContract>(this.tronWeb, ContractType.ParticipateAssetIssueContract, data, options?.permissionId, transactionOptions);
    }

    async freezeBalance(
        amount = 0,
        duration = 3,
        resource: Resource = 'BANDWIDTH',
        ownerAddress: string = this.tronWeb.defaultAddress.hex as string,
        receiverAddress?: string,
        options: TransactionCommonOptions = {}
    ): Promise<Transaction<FreezeBalanceContract>> {
        this.validator.notValid([
            {
                name: 'origin',
                type: 'address',
                value: ownerAddress as string,
            },
            {
                name: 'receiver',
                type: 'address',
                value: receiverAddress as string,
                optional: true,
            },
            {
                name: 'amount',
                type: 'integer',
                gt: 0,
                value: amount,
            },
            {
                name: 'duration',
                type: 'integer',
                gte: 3,
                value: duration,
            },
            {
                name: 'resource',
                type: 'resource',
                value: resource,
                msg: 'Invalid resource provided: Expected "BANDWIDTH" or "ENERGY"',
            },
        ]);
        const data: FreezeBalanceContract = {
            owner_address: toHex(ownerAddress as string),
            frozen_balance: parseInt(amount),
            frozen_duration: parseInt(String(duration)),
        };
        if (resource !== 'BANDWIDTH') {
            data.resource = resource as Resource;
        }

        if (isNotNullOrUndefined(receiverAddress) && toHex(receiverAddress as string) !== toHex(ownerAddress as string)) {
            data.receiver_address = toHex(receiverAddress as string);
        }

        const transactionOptions = getTransactionOptions(options);
        return createTransaction<FreezeBalanceContract>(this.tronWeb, ContractType.FreezeBalanceContract, data, options?.permissionId, transactionOptions);
    }

    async unfreezeBalance(
        resource: Resource = 'BANDWIDTH',
        address: string = this.tronWeb.defaultAddress.hex as string,
        receiverAddress?: string,
        options: TransactionCommonOptions = {}
    ): Promise<Transaction<UnfreezeBalanceContract>> {
        this.validator.notValid([
            {
                name: 'origin',
                type: 'address',
                value: address as string,
            },
            {
                name: 'receiver',
                type: 'address',
                value: receiverAddress as string,
                optional: true,
            },
            {
                name: 'resource',
                type: 'resource',
                value: resource,
                msg: 'Invalid resource provided: Expected "BANDWIDTH" or "ENERGY"',
            },
        ]);
        const data: Partial<UnfreezeBalanceContract> = {
            owner_address: toHex(address as string),
        };
        if (resource !== 'BANDWIDTH') {
            data.resource = resource as Resource;
        }

        if (isNotNullOrUndefined(receiverAddress) && toHex(receiverAddress as string) !== toHex(address as string)) {
            data.receiver_address = toHex(receiverAddress as string);
        }

        const transactionOptions = getTransactionOptions(options);
        return createTransaction<UnfreezeBalanceContract>(this.tronWeb, ContractType.UnfreezeBalanceContract, data as UnfreezeBalanceContract, options?.permissionId, transactionOptions);
    }

    async freezeBalanceV2(
        amount = 0,
        resource: Resource = 'BANDWIDTH',
        address: string = this.tronWeb.defaultAddress.hex as string,
        options: TransactionCommonOptions = {}
    ): Promise<Transaction<FreezeBalanceV2Contract>> {
        this.validator.notValid([
            {
                name: 'origin',
                type: 'address',
                value: address as string,
            },
            {
                name: 'amount',
                type: 'integer',
                gt: 0,
                value: amount,
            },
            {
                name: 'resource',
                type: 'resource',
                value: resource as string,
                msg: 'Invalid resource provided: Expected "BANDWIDTH" or "ENERGY"',
            },
        ]);
        const data: FreezeBalanceV2Contract = {
            owner_address: toHex(address as string),
            frozen_balance: parseInt(amount),
        };
        if (resource !== 'BANDWIDTH') {
            data.resource = resource as Resource;
        }

        const transactionOptions = getTransactionOptions(options);
        return createTransaction<FreezeBalanceV2Contract>(this.tronWeb, ContractType.FreezeBalanceV2Contract, data, options?.permissionId, transactionOptions);
    }

    async unfreezeBalanceV2(
        amount = 0,
        resource: Resource = 'BANDWIDTH',
        address: string = this.tronWeb.defaultAddress.hex as string,
        options: TransactionCommonOptions = {}
    ): Promise<Transaction<UnfreezeBalanceV2Contract>> {
        this.validator.notValid([
            {
                name: 'origin',
                type: 'address',
                value: address as string,
            },
            {
                name: 'amount',
                type: 'integer',
                gt: 0,
                value: amount,
            },
            {
                name: 'resource',
                type: 'resource',
                value: resource as string,
                msg: 'Invalid resource provided: Expected "BANDWIDTH" or "ENERGY"',
            },
        ]);
        const data: UnfreezeBalanceV2Contract = {
            owner_address: toHex(address as string),
            unfreeze_balance: parseInt(amount),
        };
        if (resource !== 'BANDWIDTH') {
            data.resource = resource as Resource;
        }

        const transactionOptions = getTransactionOptions(options);
        return createTransaction<UnfreezeBalanceV2Contract>(this.tronWeb, ContractType.UnfreezeBalanceV2Contract, data, options?.permissionId, transactionOptions);
    }

    async cancelUnfreezeBalanceV2(
        address: string = this.tronWeb.defaultAddress.hex as string,
        options: TransactionCommonOptions = {}
    ): Promise<Transaction<CancelFreezeBalanceV2Contract>> {
        this.validator.notValid([
            {
                name: 'origin',
                type: 'address',
                value: address as string,
            },
        ]);
        const data: CancelFreezeBalanceV2Contract = {
            owner_address: toHex(address as string),
        };

        const transactionOptions = getTransactionOptions(options);
        return createTransaction<CancelFreezeBalanceV2Contract>(this.tronWeb, ContractType.CancelAllUnfreezeV2Contract, data, options?.permissionId, transactionOptions);
    }

    async delegateResource(
        amount = 0,
        receiverAddress: string,
        resource: Resource = 'BANDWIDTH',
        address: string = this.tronWeb.defaultAddress.hex as string,
        lock = false,
        lockPeriod?: number,
        options: TransactionCommonOptions = {}
    ): Promise<Transaction<DelegateResourceContract>> {
        this.validator.notValid([
            {
                name: 'amount',
                type: 'integer',
                gt: 0,
                value: amount,
            },
            {
                name: 'resource',
                type: 'resource',
                value: resource as string,
                msg: 'Invalid resource provided: Expected "BANDWIDTH" or "ENERGY"',
            },
            {
                name: 'receiver',
                type: 'address',
                value: receiverAddress,
            },
            {
                name: 'origin',
                type: 'address',
                value: address as string,
            },
            {
                name: 'lock',
                type: 'boolean',
                value: lock as boolean,
            },
            {
                name: 'lock period',
                type: 'integer',
                gte: 0,
                value: lockPeriod as number,
                optional: true,
            },
        ]);
        if (toHex(receiverAddress) === toHex(address as string)) {
            throw new Error('Receiver address must not be the same as owner address');
        }

        const data: DelegateResourceContract = {
            owner_address: toHex(address as string),
            receiver_address: toHex(receiverAddress),
            balance: parseInt(amount),
        };
        if (resource !== 'BANDWIDTH') {
            data.resource = resource as Resource;
        }
        if (lock) {
            data.lock = lock as boolean;
            if (isNotNullOrUndefined(lockPeriod)) {
                data.lock_period = lockPeriod as number;
            }
        }

        const transactionOptions = getTransactionOptions(options);
        return createTransaction<DelegateResourceContract>(this.tronWeb, ContractType.DelegateResourceContract, data, options?.permissionId, transactionOptions);
    }

    async undelegateResource(
        amount = 0,
        receiverAddress: string,
        resource: Resource = 'BANDWIDTH',
        address: string = this.tronWeb.defaultAddress.hex as string,
        options: TransactionCommonOptions = {}
    ): Promise<Transaction<UnDelegateResourceContract>> {
        this.validator.notValid([
            {
                name: 'origin',
                type: 'address',
                value: address as string,
            },
            {
                name: 'receiver',
                type: 'address',
                value: receiverAddress,
            },
            {
                name: 'amount',
                type: 'integer',
                gt: 0,
                value: amount,
            },
            {
                name: 'resource',
                type: 'resource',
                value: resource as string,
                msg: 'Invalid resource provided: Expected "BANDWIDTH" or "ENERGY"',
            },
        ]);

        if (toHex(receiverAddress) === toHex(address as string)) {
            throw new Error('Receiver address must not be the same as owner address');
        }

        const data: UnDelegateResourceContract = {
            owner_address: toHex(address as string),
            receiver_address: toHex(receiverAddress),
            balance: parseInt(amount),
        };
        if (resource !== 'BANDWIDTH') {
            data.resource = resource as Resource;
        }

        const transactionOptions = getTransactionOptions(options);
        return createTransaction<UnDelegateResourceContract>(this.tronWeb, ContractType.UnDelegateResourceContract, data, options?.permissionId, transactionOptions);
    }

    async withdrawExpireUnfreeze(
        address: string = this.tronWeb.defaultAddress.hex as string,
        options: TransactionCommonOptions = {}
    ): Promise<Transaction<WithdrawExpireUnfreezeContract>> {
        this.validator.notValid([
            {
                name: 'origin',
                type: 'address',
                value: address,
            },
        ]);

        const data: WithdrawExpireUnfreezeContract = {
            owner_address: toHex(address),
        };

        const transactionOptions = getTransactionOptions(options);
        return createTransaction<WithdrawExpireUnfreezeContract>(this.tronWeb, ContractType.WithdrawExpireUnfreezeContract, data, options?.permissionId, transactionOptions);
    }

    async withdrawBlockRewards(
        address: string = this.tronWeb.defaultAddress.hex as string,
        options: TransactionCommonOptions = {}
    ): Promise<Transaction<WithdrawBalanceContract>> {
        this.validator.notValid([
            {
                name: 'origin',
                type: 'address',
                value: address as string,
            },
        ]);

        const data: WithdrawBalanceContract = {
            owner_address: toHex(address as string),
        };

        const transactionOptions = getTransactionOptions(options);
        return createTransaction<WithdrawBalanceContract>(this.tronWeb, ContractType.WithdrawBalanceContract, data, options?.permissionId, transactionOptions);
    }

    async applyForSR(
        address: string = this.tronWeb.defaultAddress.hex as string,
        url = '',
        options: TransactionCommonOptions = {}
    ): Promise<Transaction<WitnessCreateContract>> {
        this.validator.notValid([
            {
                name: 'origin',
                type: 'address',
                value: address,
            },
            {
                name: 'url',
                type: 'url',
                value: url as string,
                msg: 'Invalid url provided',
            },
            {
                name: 'url',
                type: 'string',
                value: url as string,
                lte: 256,
                msg: 'Invalid url provided',
            },
        ]);

        const data: WitnessCreateContract = {
            owner_address: toHex(address as string),
            url: fromUtf8(url as string),
        };

        const transactionOptions = getTransactionOptions(options);
        return createTransaction<WitnessCreateContract>(this.tronWeb, ContractType.WitnessCreateContract, data, options?.permissionId, transactionOptions);
    }

    async vote(
        votes: VoteInfo = {},
        voterAddress: string = this.tronWeb.defaultAddress.hex as string,
        options: TransactionCommonOptions = {}
    ): Promise<Transaction<VoteWitnessContract>> {
        this.validator.notValid([
            {
                name: 'voter',
                type: 'address',
                value: voterAddress as string,
            },
            {
                name: 'votes',
                type: 'notEmptyObject',
                value: votes as VoteInfo,
            },
        ]);

        const entries = Object.entries(votes);
        for (const [srAddress, voteCount] of entries) {
            this.validator.notValid([
                {
                    name: 'SR',
                    type: 'address',
                    value: srAddress,
                },
                {
                    name: 'vote count',
                    type: 'integer',
                    gt: 0,
                    value: voteCount,
                    msg: 'Invalid vote count provided for SR: ' + srAddress,
                },
            ]);
        }
        const voteList = entries.map(([srAddress, voteCount]) => {
            return {
                vote_address: toHex(srAddress),
                vote_count: parseInt(voteCount),
            };
        });

        const data: VoteWitnessContract = {
            owner_address: toHex(voterAddress as string),
            votes: voteList,
        };

        const transactionOptions = getTransactionOptions(options);
        return createTransaction<VoteWitnessContract>(this.tronWeb, ContractType.VoteWitnessContract, data, options?.permissionId, transactionOptions);
    }

    async createSmartContract(
        options: CreateSmartContractOptions = {} as CreateSmartContractOptions,
        issuerAddress: string = this.tronWeb.defaultAddress.hex as string
    ): Promise<CreateSmartContractTransaction> {
        const feeLimit = options.feeLimit || this.tronWeb.feeLimit;
        let userFeePercentage = options.userFeePercentage;
        if (typeof userFeePercentage !== 'number' && !userFeePercentage) {
            userFeePercentage = 100;
        }
        const originEnergyLimit = options.originEnergyLimit || 10_000_000;
        const callValue = options.callValue || 0;
        const tokenValue = options.tokenValue;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const tokenId = options.tokenId || options.token_id;

        let { abi } = options;
        const { parameters = [] } = options;
        let parameter = '';
        const { bytecode = false, name = '' } = options;
        if (abi && isString(abi)) {
            try {
                abi = JSON.parse(abi);
            } catch {
                throw new Error('Invalid options.abi provided');
            }
        }

        const newAbi = abi as { entrys: ContractAbiInterface } | ContractAbiInterface;
        let entries: ContractAbiInterface | null = newAbi as ContractAbiInterface;
        if ((newAbi as { entrys: ContractAbiInterface }).entrys) {
            entries = (newAbi as { entrys: ContractAbiInterface }).entrys;
        }

        if (!isArray(entries)) throw new Error('Invalid options.abi provided');

        const payable = entries.some((func) => {
            return func.type === 'constructor' && 'payable' === (func as ConstructorFragment).stateMutability.toLowerCase();
        });

        this.validator.notValid([
            {
                name: 'bytecode',
                type: 'hex',
                value: bytecode,
            },
            {
                name: 'feeLimit',
                type: 'integer',
                value: feeLimit,
                gt: 0,
            },
            {
                name: 'callValue',
                type: 'integer',
                value: callValue,
                gte: 0,
            },
            {
                name: 'userFeePercentage',
                type: 'integer',
                value: userFeePercentage,
                gte: 0,
                lte: 100,
            },
            {
                name: 'originEnergyLimit',
                type: 'integer',
                value: originEnergyLimit,
                gte: 0,
                lte: 10_000_000,
            },
            {
                name: 'parameters',
                type: 'array',
                value: parameters,
            },
            {
                name: 'issuer',
                type: 'address',
                value: issuerAddress,
            },
            {
                name: 'tokenValue',
                type: 'integer',
                value: tokenValue,
                gte: 0,
                optional: true,
            },
            {
                name: 'tokenId',
                type: 'integer',
                value: tokenId,
                gte: 0,
                optional: true,
            },
        ]);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (!payable && (callValue > 0 || tokenValue > 0))
            throw new Error('When contract is not payable, options.callValue and options.tokenValue must be 0');

        const { rawParameter, funcABIV2, parametersV2 } = options as any;
        if (rawParameter && isString(rawParameter)) {
            parameter = rawParameter.replace(/^(0x)/, '');
        } else if (funcABIV2) {
            parameter = encodeParamsV2ByABI(funcABIV2, parametersV2).replace(/^(0x)/, '');
        } else {
            let constructorParams: any = entries.find((it: any) => {
                return it.type === 'constructor';
            });

            if (typeof constructorParams !== 'undefined' && constructorParams) {
                const abiCoder = new AbiCoder();
                const types = [];
                const values = [];
                constructorParams = constructorParams.inputs;

                if (parameters.length != constructorParams.length)
                    throw new Error(`constructor needs ${constructorParams.length} but ${parameters.length} provided`);

                for (let i = 0; i < parameters.length; i++) {
                    let type = constructorParams[i].type;
                    let value: any = parameters[i];

                    if (!type || !isString(type) || !type.length) throw new Error('Invalid parameter type provided: ' + type);

                    const replaceAddressPrefix = (value: unknown): any => {
                        if (isArray(value)) {
                            return value.map((v) => replaceAddressPrefix(v));
                        }
                        return toHex(value as string).replace(ADDRESS_PREFIX_REGEX, '0x');
                    };
                    if (type === 'address') value = replaceAddressPrefix(value);
                    else if (type.match(/^([^\x5b]*)(\x5b|$)/)?.[0] === 'address[') value = replaceAddressPrefix(value);
                    else if (/trcToken/.test(type)) {
                        type = type.replace(/trcToken/, 'uint256');
                    }

                    types.push(type);
                    values.push(value);
                }

                try {
                    parameter = abiCoder.encode(types, values).replace(/^(0x)/, '');
                } catch (ex) {
                    throw new Error(ex as string);
                }
            } else {
                parameter = '';
            }
        }

        const args: any = {
            owner_address: toHex(issuerAddress),
            fee_limit: parseInt(feeLimit),
            call_value: parseInt(callValue),
            consume_user_resource_percent: userFeePercentage,
            origin_energy_limit: originEnergyLimit,
            abi: JSON.stringify(entries),
            bytecode,
            parameter,
            name,
        };

        // tokenValue and tokenId can cause errors if provided when the trx10 proposal has not been approved yet. So we set them only if they are passed to the method.
        if (isNotNullOrUndefined(tokenValue)) {
            args.call_token_value = parseInt(tokenValue as number);
        }
        if (isNotNullOrUndefined(tokenId)) {
            args.token_id = parseInt(tokenId);
        }

        const contract: CreateSmartContract = {} as CreateSmartContract;
        contract.owner_address = args.owner_address;
        if (isNotNullOrUndefined(args.call_token_value)) {
            contract.call_token_value = args.call_token_value;
        }
        if (isNotNullOrUndefined(args.token_id)) {
            contract.token_id = args.token_id;
        }
        const new_contract = (contract.new_contract = {} as CreateSmartContract['new_contract']);

        if (args.abi) {
            new_contract.abi = {
                entrys: JSON.parse(args.abi),
            };
        } else {
            new_contract.abi = {};
        }
        if (args.call_value) {
            new_contract.call_value = args.call_value;
        }
        new_contract.consume_user_resource_percent = args.consume_user_resource_percent;
        new_contract.origin_energy_limit = args.origin_energy_limit;
        new_contract.origin_address = args.origin_address ?? args.owner_address;
        if (args.bytecode + args.parameter) {
            new_contract.bytecode = (args.bytecode + args.parameter).replace(/^0x/, '');
        }
        if (isNotNullOrUndefined(args.name)) {
            new_contract.name = args.name;
        }
        const transactionOptions = getTransactionOptions(options);
        const tx = (await createTransaction(this.tronWeb, ContractType.CreateSmartContract, contract, options?.permissionId, {
            ...transactionOptions,
            fee_limit: args.fee_limit,
        })) as CreateSmartContractTransaction;
        tx.contract_address = genContractAddress(args.owner_address, tx.txID);
        return tx;
    }

    async triggerSmartContract(
        contractAddress: string,
        functionSelector: string,
        options?: TriggerSmartContractOptions,
        parameters?: ContractFunctionParameter[],
        issuerAddress?: string
    ): Promise<TransactionWrapper> {
        const params: Parameters<typeof this._triggerSmartContractLocal> = [
            contractAddress,
            functionSelector,
            options,
            parameters,
            issuerAddress,
        ];
        if (typeof params[2] !== 'object') {
            params[2] = {
                feeLimit: params[2],
                callValue: params[3] as unknown as number,
            };
            params.splice(3, 1);
        }
        if (params[2]?.txLocal) {
            return this._triggerSmartContractLocal(...params);
        }
        return this._triggerSmartContract(...params);
    }

    async triggerConstantContract(
        contractAddress: string,
        functionSelector: string,
        options: TriggerConstantContractOptions = {},
        parameters: ContractFunctionParameter[] = [],
        issuerAddress: string = this.tronWeb.defaultAddress.hex as string
    ): Promise<TransactionWrapper> {
        options._isConstant = true;
        return this._triggerSmartContract(contractAddress, functionSelector, options, parameters, issuerAddress);
    }

    async triggerConfirmedConstantContract(
        contractAddress: string,
        functionSelector: string,
        options: TriggerConstantContractOptions = {},
        parameters: ContractFunctionParameter[] = [],
        issuerAddress: string = this.tronWeb.defaultAddress.hex as string
    ): Promise<TransactionWrapper> {
        options._isConstant = true;
        options.confirmed = true;
        return this._triggerSmartContract(contractAddress, functionSelector, options, parameters, issuerAddress);
    }

    async estimateEnergy(
        contractAddress: string,
        functionSelector: string,
        options: TriggerConstantContractOptions = {},
        parameters: ContractFunctionParameter[] = [],
        issuerAddress: string = this.tronWeb.defaultAddress.hex as string
    ): Promise<{ result: { result: boolean }; energy_required: number }> {
        options.estimateEnergy = true;
        const result = await this._triggerSmartContract(contractAddress, functionSelector, options, parameters, issuerAddress);
        return result as { result: { result: boolean }; energy_required: number };
    }

    async deployConstantContract(options: DeployConstantContractOptions = { input: '', ownerAddress: '' }) {
        const { input, ownerAddress, tokenId, tokenValue, callValue = 0 } = options;

        this.validator.notValid([
            {
                name: 'input',
                type: 'not-empty-string',
                value: input,
            },
            {
                name: 'callValue',
                type: 'integer',
                value: callValue,
                gte: 0,
            },
            {
                name: 'owner',
                type: 'address',
                value: ownerAddress,
            },
            {
                name: 'tokenValue',
                type: 'integer',
                value: tokenValue,
                gte: 0,
                optional: true,
            },
            {
                name: 'tokenId',
                type: 'integer',
                value: tokenId,
                gte: 0,
                optional: true,
            },
        ]);

        const args: DeployConstantContract = {
            data: input,
            owner_address: toHex(ownerAddress),
            call_value: callValue,
        };

        if (tokenId) {
            args.token_id = tokenId;
        }
        if (tokenValue) {
            args.call_token_value = tokenValue;
        }

        const pathInfo = `wallet${options.confirmed ? 'solidity' : ''}/estimateenergy`;
        const transaction: TransactionWrapper = await this.tronWeb[options.confirmed ? 'solidityNode' : 'fullNode'].request(
            pathInfo,
            args,
            'post'
        );
        if (transaction.Error) throw new Error(transaction.Error);

        if (transaction.result && transaction.result.message) {
            throw new Error(this.tronWeb.toUtf8(transaction.result.message));
        }
        return transaction as { result: { result: boolean }; energy_required: number };
    }

    _getTriggerSmartContractArgs(
        contractAddress: string,
        functionSelector: string,
        options: TriggerConstantContractOptions,
        parameters: ContractFunctionParameter[],
        issuerAddress: string,
        tokenValue?: number,
        tokenId?: string,
        callValue?: number,
        feeLimit?: number
    ) {
        const args: IArgs = {
            contract_address: toHex(contractAddress),
            owner_address: toHex(issuerAddress),
        };

        if (functionSelector && isString(functionSelector)) {
            functionSelector = functionSelector.replace(/\s*/g, '');
            let parameterStr;
            if (parameters.length) {
                const abiCoder = new AbiCoder();
                let types = [];
                const values = [];

                for (let i = 0; i < parameters.length; i++) {
                    let { value } = parameters[i];
                    const { type } = parameters[i];

                    if (!type || !isString(type) || !type.length) throw new Error('Invalid parameter type provided: ' + type);

                    const replaceAddressPrefix = (value: unknown): any => {
                        if (isArray(value)) {
                            return value.map((v) => replaceAddressPrefix(v));
                        }
                        return toHex(value as string).replace(ADDRESS_PREFIX_REGEX, '0x');
                    };
                    if (type === 'address') value = replaceAddressPrefix(value);
                    else if (type.match(/^([^\x5b]*)(\x5b|$)/)?.[0] === 'address[') value = replaceAddressPrefix(value);

                    types.push(type);
                    values.push(value);
                }

                try {
                    // workaround for unsupported trcToken type
                    types = types.map((type) => {
                        if (/trcToken/.test(type)) {
                            type = type.replace(/trcToken/, 'uint256');
                        }
                        return type;
                    });

                    parameterStr = abiCoder.encode(types, values).replace(/^(0x)/, '');
                } catch (ex) {
                    throw new Error(ex as string);
                }
            } else parameterStr = '';

            // work for abiv2 if passed the function abi in options
            if (options.funcABIV2) {
                parameterStr = encodeParamsV2ByABI(
                    options.funcABIV2 as FunctionFragment,
                    options.parametersV2 as unknown[]
                ).replace(/^(0x)/, '');
            }

            if (options.shieldedParameter && isString(options.shieldedParameter)) {
                parameterStr = options.shieldedParameter.replace(/^(0x)/, '');
            }

            if (options.rawParameter && isString(options.rawParameter)) {
                parameterStr = options.rawParameter.replace(/^(0x)/, '');
            }

            args.function_selector = functionSelector;
            args.parameter = parameterStr;
        } else if (options.input) {
            args.data = options.input;
        }

        args.call_value = parseInt(callValue as number);
        if (isNotNullOrUndefined(tokenValue)) args.call_token_value = parseInt(tokenValue as number);
        if (isNotNullOrUndefined(tokenId)) args.token_id = parseInt(tokenId as string);

        if (!(options._isConstant || options.estimateEnergy)) {
            args.fee_limit = parseInt(feeLimit as number);
        }

        if (options.permissionId) {
            args.Permission_id = options.permissionId;
        }

        return args;
    }

    async _triggerSmartContractLocal(
        contractAddress: string,
        functionSelector: string,
        options: TriggerConstantContractOptions = {},
        parameters: ContractFunctionParameter[] = [],
        issuerAddress = this.tronWeb.defaultAddress.hex as string
    ) {
        const { tokenValue, tokenId, callValue, feeLimit } = Object.assign(
            {
                callValue: 0,
                feeLimit: this.tronWeb.feeLimit,
            },
            options
        );

        this.validator.notValid([
            {
                name: 'feeLimit',
                type: 'integer',
                value: feeLimit,
                gt: 0,
            },
            {
                name: 'callValue',
                type: 'integer',
                value: callValue,
                gte: 0,
            },
            {
                name: 'parameters',
                type: 'array',
                value: parameters,
            },
            {
                name: 'contract',
                type: 'address',
                value: contractAddress,
            },
            {
                name: 'issuer',
                type: 'address',
                value: issuerAddress,
                optional: true,
            },
            {
                name: 'tokenValue',
                type: 'integer',
                value: tokenValue,
                gte: 0,
                optional: true,
            },
            {
                name: 'tokenId',
                type: 'integer',
                value: tokenId,
                gte: 0,
                optional: true,
            },
        ]);

        const args = this._getTriggerSmartContractArgs(
            contractAddress,
            functionSelector,
            options,
            parameters,
            issuerAddress,
            tokenValue,
            tokenId,
            callValue,
            feeLimit
        );

        if (args.function_selector) {
            args.data = keccak256(Buffer.from(args.function_selector, 'utf-8')).toString().substring(2, 10) + args.parameter;
        }
        const value: TriggerSmartContract = {
            data: args.data,
            owner_address: args.owner_address,
            contract_address: args.contract_address,
        };
        if (args.call_value) {
            value.call_value = args.call_value;
        }
        if (args.call_token_value) {
            value.call_token_value = args.call_token_value;
        }
        if (args.token_id) {
            value.token_id = args.token_id;
        }
        const transactionOptions = getTransactionOptions(options);
        const transaction = await createTransaction<TriggerSmartContract>(
            this.tronWeb,
            ContractType.TriggerSmartContract,
            value,
            options.permissionId,
            {
                ...transactionOptions,
                fee_limit: args.fee_limit,
            }
        );
        return {
            result: {
                result: true,
            },
            transaction,
        };
    }

    async _triggerSmartContract(
        contractAddress: string,
        functionSelector: string,
        options: TriggerConstantContractOptions = {},
        parameters: ContractFunctionParameter[] = [],
        issuerAddress: string = this.tronWeb.defaultAddress.hex as string
    ) {
        const { tokenValue, tokenId, callValue, feeLimit } = Object.assign(
            {
                callValue: 0,
                feeLimit: this.tronWeb.feeLimit,
            },
            options
        );
        this.validator.notValid([
            {
                name: 'feeLimit',
                type: 'integer',
                value: feeLimit,
                gt: 0,
            },
            {
                name: 'callValue',
                type: 'integer',
                value: callValue,
                gte: 0,
            },
            {
                name: 'parameters',
                type: 'array',
                value: parameters,
            },
            {
                name: 'contract',
                type: 'address',
                value: contractAddress,
            },
            {
                name: 'issuer',
                type: 'address',
                value: issuerAddress,
                optional: true,
            },
            {
                name: 'tokenValue',
                type: 'integer',
                value: tokenValue,
                gte: 0,
                optional: true,
            },
            {
                name: 'tokenId',
                type: 'integer',
                value: tokenId,
                gte: 0,
                optional: true,
            },
        ]);
        const args = this._getTriggerSmartContractArgs(
            contractAddress,
            functionSelector,
            options,
            parameters,
            issuerAddress,
            tokenValue,
            tokenId,
            callValue,
            feeLimit
        );

        let pathInfo = 'triggersmartcontract';
        if (options._isConstant) {
            pathInfo = 'triggerconstantcontract';
        } else if (options.estimateEnergy) {
            pathInfo = 'estimateenergy';
        }

        pathInfo = `wallet${options.confirmed ? 'solidity' : ''}/${pathInfo}`;
        const transaction: TransactionWrapper = await this.tronWeb[options.confirmed ? 'solidityNode' : 'fullNode'].request(
            pathInfo,
            args,
            'post'
        );
        return resultManagerTriggerSmartContract(transaction, args, options);
    }

    async clearABI(
        contractAddress: string,
        ownerAddress: string = this.tronWeb.defaultAddress.hex as string,
        options: TransactionCommonOptions = {}
    ): Promise<Transaction<ClearABIContract>> {
        if (!TronWeb.isAddress(contractAddress)) throw new Error('Invalid contract address provided');
        if (!TronWeb.isAddress(ownerAddress)) throw new Error('Invalid owner address provided');
        const data: ClearABIContract = {
            contract_address: toHex(contractAddress),
            owner_address: toHex(ownerAddress as string),
        };

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (this.tronWeb.trx.cache.contracts[contractAddress]) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            delete this.tronWeb.trx.cache.contracts[contractAddress];
        }

        const transactionOptions = getTransactionOptions(options);
        return createTransaction<ClearABIContract>(this.tronWeb, ContractType.ClearABIContract, data, options?.permissionId, transactionOptions);
    }
    async updateBrokerage(
        brokerage: number,
        ownerAddress: string = this.tronWeb.defaultAddress.hex as string,
        options: TransactionCommonOptions = {}
    ): Promise<Transaction<UpdateBrokerageContract>> {
        if (!isNotNullOrUndefined(brokerage)) throw new Error('Invalid brokerage provided');

        if (!isInteger(brokerage) || brokerage < 0 || brokerage > 100)
            throw new Error('Brokerage must be an integer between 0 and 100');

        if (!TronWeb.isAddress(ownerAddress)) throw new Error('Invalid owner address provided');

        const data: UpdateBrokerageContract = {
            brokerage: parseInt(brokerage),
            owner_address: toHex(ownerAddress as string),
        };

        const transactionOptions = getTransactionOptions(options);
        return createTransaction<UpdateBrokerageContract>(this.tronWeb, ContractType.UpdateBrokerageContract, data, options?.permissionId, transactionOptions);
    }

    async createToken(
        options: CreateTokenOptions = {} as CreateTokenOptions,
        issuerAddress: string = this.tronWeb.defaultAddress.hex as string
    ): Promise<Transaction<AssetIssueContract>> {
        const {
            name = false,
            abbreviation = false,
            description = '',
            url = false,
            totalSupply = 0,
            trxRatio = 1, // How much TRX will `tokenRatio` cost
            tokenRatio = 1, // How many tokens will `trxRatio` afford
            saleStart = Date.now(),
            saleEnd = false,
            freeBandwidth = 0, // The creator's "donated" bandwidth for use by token holders
            freeBandwidthLimit = 0, // Out of `totalFreeBandwidth`, the amount each token holder get
            frozenAmount = 0,
            frozenDuration = 0,
            // for now there is no default for the following values
            voteScore,
            precision,
        } = options;

        this.validator.notValid([
            {
                name: 'Supply amount',
                type: 'positive-integer',
                value: totalSupply,
            },
            {
                name: 'TRX ratio',
                type: 'positive-integer',
                value: trxRatio,
            },
            {
                name: 'Token ratio',
                type: 'positive-integer',
                value: tokenRatio,
            },
            {
                name: 'token abbreviation',
                type: 'string',
                value: abbreviation,
                lte: 32,
                gt: 0,
            },
            {
                name: 'token name',
                type: 'not-empty-string',
                value: name,
            },
            {
                name: 'token description',
                type: 'string',
                value: description,
                lte: 200,
            },
            {
                name: 'token url',
                type: 'url',
                value: url,
            },
            {
                name: 'token url',
                type: 'string',
                value: url,
                lte: 256,
            },
            {
                name: 'issuer',
                type: 'address',
                value: issuerAddress,
            },
            {
                name: 'sale start timestamp',
                type: 'integer',
                value: saleStart,
                gte: Date.now(),
            },
            {
                name: 'sale end timestamp',
                type: 'integer',
                value: saleEnd,
                gt: saleStart,
            },
            {
                name: 'Frozen supply',
                type: 'integer',
                value: frozenAmount,
                gte: 0,
            },
            {
                name: 'Frozen duration',
                type: 'integer',
                value: frozenDuration,
                gte: 0,
            },
        ]);

        if (isNotNullOrUndefined(voteScore) && (!isInteger(voteScore) || voteScore <= 0))
            throw new Error('voteScore must be a positive integer greater than 0');

        if (isNotNullOrUndefined(precision) && (!isInteger(precision) || precision < 0 || precision > 6))
            throw new Error('precision must be a positive integer >= 0 and <= 6');

        const data: Partial<AssetIssueContract> = {
            owner_address: toHex(issuerAddress),
            name: fromUtf8(name as string),
            abbr: fromUtf8(abbreviation as string),
            description: fromUtf8(description),
            url: fromUtf8(url as string),
            total_supply: parseInt(totalSupply),
            trx_num: parseInt(trxRatio),
            num: parseInt(tokenRatio),
            start_time: parseInt(saleStart),
            end_time: parseInt(saleEnd as number),
            frozen_supply: [
                {
                    frozen_amount: parseInt(frozenAmount),
                    frozen_days: parseInt(frozenDuration),
                },
            ],
        };
        (['name', 'abbr', 'description', 'url'] as (keyof typeof data)[]).forEach((key) => {
            if (!data[key]) {
                delete data[key];
            }
        });
        if (!(parseInt(frozenAmount) > 0)) {
            delete data.frozen_supply;
        }
        if (freeBandwidth && !isNaN(parseInt(freeBandwidth)) && parseInt(freeBandwidth) >= 0) {
            data.free_asset_net_limit = parseInt(freeBandwidth);
        }
        if (freeBandwidthLimit && !isNaN(parseInt(freeBandwidthLimit)) && parseInt(freeBandwidthLimit) >= 0) {
            data.public_free_asset_net_limit = parseInt(freeBandwidthLimit);
        }
        if (precision && !isNaN(parseInt(precision))) {
            data.precision = parseInt(precision);
        }
        if (voteScore && !isNaN(parseInt(voteScore))) {
            data.vote_score = parseInt(voteScore);
        }
        const transactionOptions = getTransactionOptions(options);
        return createTransaction<AssetIssueContract>(
            this.tronWeb,
            ContractType.AssetIssueContract,
            data as AssetIssueContract,
            options?.permissionId,
            transactionOptions,
        );
    }

    async createAccount(
        accountAddress: string,
        address: string = this.tronWeb.defaultAddress.hex as string,
        options: TransactionCommonOptions = {}
    ): Promise<Transaction<AccountCreateContract>> {
        this.validator.notValid([
            {
                name: 'account',
                type: 'address',
                value: accountAddress,
            },
            {
                name: 'origin',
                type: 'address',
                value: address as string,
            },
        ]);
        const data: AccountCreateContract = {
            owner_address: toHex(address as string),
            account_address: toHex(accountAddress),
        };

        const transactionOptions = getTransactionOptions(options);
        return createTransaction<AccountCreateContract>(this.tronWeb, ContractType.AccountCreateContract, data, options?.permissionId, transactionOptions);
    }

    async updateAccount(
        accountName: string,
        address: string = this.tronWeb.defaultAddress.hex as string,
        options: TransactionCommonOptions = {}
    ): Promise<Transaction<AccountUpdateContract>> {
        this.validator.notValid([
            {
                name: 'Name',
                type: 'string',
                lte: 200,
                gt: 0,
                value: accountName,
                msg: 'Invalid accountName',
            },
            {
                name: 'origin',
                type: 'address',
                value: address as string,
            },
        ]);

        const data: AccountUpdateContract = {
            account_name: fromUtf8(accountName as string),
            owner_address: toHex(address as string),
        };

        const transactionOptions = getTransactionOptions(options);
        return createTransaction<AccountUpdateContract>(this.tronWeb, ContractType.AccountUpdateContract, data, options?.permissionId, transactionOptions);
    }

    async setAccountId(
        accountId: string,
        address: string = this.tronWeb.defaultAddress.hex as string,
        options: TransactionCommonOptions = {}
    ): Promise<Transaction<SetAccountIdContract>> {
        if (accountId && isString(accountId) && accountId.startsWith('0x')) {
            accountId = accountId.slice(2);
        }

        this.validator.notValid([
            {
                name: 'accountId',
                type: 'hex',
                value: accountId,
            },
            {
                name: 'accountId',
                type: 'string',
                lte: 32,
                gte: 8,
                value: accountId,
            },
            {
                name: 'origin',
                type: 'address',
                value: address as string,
            },
        ]);

        const data: SetAccountIdContract = {
            account_id: accountId,
            owner_address: toHex(address as string),
        };

        const transactionOptions = getTransactionOptions(options);
        return createTransaction<SetAccountIdContract>(this.tronWeb, ContractType.SetAccountIdContract, data, options?.permissionId, transactionOptions);
    }

    async updateToken(
        options: UpdateTokenOptions = {} as UpdateTokenOptions,
        issuerAddress: string = this.tronWeb.defaultAddress.hex as string
    ): Promise<Transaction<UpdateAssetContract>> {
        const {
            description = '',
            url = false,
            freeBandwidth = 0, // The creator's "donated" bandwidth for use by token holders
            freeBandwidthLimit = 0, // Out of `totalFreeBandwidth`, the amount each token holder get
        } = options;

        this.validator.notValid([
            {
                name: 'token description',
                type: 'string',
                value: description,
                lte: 200,
            },
            {
                name: 'token url',
                type: 'url',
                value: url,
            },
            {
                name: 'token url',
                type: 'string',
                value: url,
                lte: 256,
            },
            {
                name: 'issuer',
                type: 'address',
                value: issuerAddress as string,
            },
        ]);

        const data: UpdateAssetContract = {
            owner_address: toHex(issuerAddress as string),
            description: fromUtf8(description),
            url: fromUtf8(url as string),
        };

        if (freeBandwidth && !isNaN(parseInt(freeBandwidth)) && parseInt(freeBandwidth) >= 0) {
            data.new_limit = parseInt(freeBandwidth);
        }
        if (freeBandwidthLimit && !isNaN(parseInt(freeBandwidthLimit)) && parseInt(freeBandwidthLimit) >= 0) {
            data.new_public_limit = parseInt(freeBandwidthLimit);
        }

        const transactionOptions = getTransactionOptions(options);
        return createTransaction<UpdateAssetContract>(this.tronWeb, ContractType.UpdateAssetContract, data, options?.permissionId, transactionOptions);
    }

    async sendAsset(
        to: string,
        amount = 0,
        tokenId: string,
        from: string = this.tronWeb.defaultAddress.hex as string,
        options: TransactionCommonOptions = {}
    ) {
        return this.sendToken(to, amount, tokenId, from as string, options);
    }

    async purchaseAsset(
        issuerAddress: string,
        tokenId: string,
        amount = 0,
        buyer: string = this.tronWeb.defaultAddress.hex as string,
        options: TransactionCommonOptions = {}
    ) {
        return this.purchaseToken(issuerAddress, tokenId, amount, buyer as string, options);
    }

    async createAsset(options: CreateTokenOptions, issuerAddress: string) {
        return this.createToken(options, issuerAddress);
    }

    async updateAsset(
        options: UpdateTokenOptions = {} as UpdateTokenOptions,
        issuerAddress: string = this.tronWeb.defaultAddress.hex as string
    ) {
        return this.updateToken(options, issuerAddress);
    }

    /**
     * Creates a proposal to modify the network.
     * Can only be created by a current Super Representative.
     */
    async createProposal(
        parameters: Record<string, string | number> | Record<string, string | number>[],
        issuerAddress: string = this.tronWeb.defaultAddress.hex as string,
        options: TransactionCommonOptions = {}
    ): Promise<Transaction<ProposalCreateContract>> {
        this.validator.notValid([
            {
                name: 'issuer',
                type: 'address',
                value: issuerAddress as string,
            },
        ]);

        const invalid = 'Invalid proposal parameters provided';
        if (!parameters) throw new Error(invalid);

        const newParams = isArray(parameters) ? parameters : [parameters];
        for (const parameter of newParams) {
            if (!isObject(parameter)) throw new Error(invalid);
        }

        const data: ProposalCreateContract = {
            owner_address: toHex(issuerAddress as string),
            parameters: newParams,
        };

        const transactionOptions = getTransactionOptions(options);
        return createTransaction<ProposalCreateContract>(this.tronWeb, ContractType.ProposalCreateContract, data, options?.permissionId, transactionOptions);
    }

    /**
     * Deletes a network modification proposal that the owner issued.
     * Only current Super Representative can vote on a proposal.
     */
    async deleteProposal(
        proposalID: number,
        issuerAddress: string = this.tronWeb.defaultAddress.hex as string,
        options: TransactionCommonOptions = {}
    ): Promise<Transaction<ProposalDeleteContract>> {
        this.validator.notValid([
            {
                name: 'issuer',
                type: 'address',
                value: issuerAddress as string,
            },
            {
                name: 'proposalID',
                type: 'integer',
                value: proposalID,
                gte: 0,
            },
        ]);

        const data: ProposalDeleteContract = {
            owner_address: toHex(issuerAddress as string),
            proposal_id: parseInt(proposalID as number),
        };

        const transactionOptions = getTransactionOptions(options);
        return createTransaction<ProposalDeleteContract>(this.tronWeb, ContractType.ProposalDeleteContract, data, options?.permissionId, transactionOptions);
    }

    /**
     * Adds a vote to an issued network modification proposal.
     * Only current Super Representative can vote on a proposal.
     */
    async voteProposal(
        proposalID: number,
        isApproval = false,
        voterAddress: string = this.tronWeb.defaultAddress.hex as string,
        options: TransactionCommonOptions = {}
    ): Promise<Transaction<VoteProposalContract>> {
        this.validator.notValid([
            {
                name: 'voter',
                type: 'address',
                value: voterAddress as string,
            },
            {
                name: 'proposalID',
                type: 'integer',
                value: proposalID,
                gte: 0,
            },
            {
                name: 'has approval',
                type: 'boolean',
                value: isApproval,
            },
        ]);

        const data: VoteProposalContract = {
            owner_address: toHex(voterAddress as string),
            proposal_id: parseInt(proposalID),
            is_add_approval: isApproval,
        };

        const transactionOptions = getTransactionOptions(options);
        return createTransaction(this.tronWeb, ContractType.ProposalApproveContract, data, options?.permissionId, transactionOptions);
    }

    /**
     * Create an exchange between a token and TRX.
     * Token Name should be a CASE SENSITIVE string.
     * PLEASE VERIFY THIS ON TRONSCAN.
     */
    async createTRXExchange(
        tokenName: string,
        tokenBalance: number,
        trxBalance: number,
        ownerAddress: string = this.tronWeb.defaultAddress.hex as string,
        options: TransactionCommonOptions = {}
    ): Promise<Transaction<ExchangeCreateContract>> {
        this.validator.notValid([
            {
                name: 'owner',
                type: 'address',
                value: ownerAddress as string,
            },
            {
                name: 'token name',
                type: 'not-empty-string',
                value: tokenName,
            },
            {
                name: 'token balance',
                type: 'positive-integer',
                value: tokenBalance,
            },
            {
                name: 'trx balance',
                type: 'positive-integer',
                value: trxBalance,
            },
        ]);

        const data: ExchangeCreateContract = {
            owner_address: toHex(ownerAddress as string),
            first_token_id: fromUtf8(tokenName),
            first_token_balance: tokenBalance,
            second_token_id: '5f', // Constant for TRX.
            second_token_balance: trxBalance,
        };

        const transactionOptions = getTransactionOptions(options);
        return createTransaction(this.tronWeb, ContractType.ExchangeCreateContract, data, options?.permissionId, transactionOptions);
    }

    /**
     * Create an exchange between a token and another token.
     * DO NOT USE THIS FOR TRX.
     * Token Names should be a CASE SENSITIVE string.
     * PLEASE VERIFY THIS ON TRONSCAN.
     */
    async createTokenExchange(
        firstTokenName: string,
        firstTokenBalance: number,
        secondTokenName: string,
        secondTokenBalance: number,
        ownerAddress: string = this.tronWeb.defaultAddress.hex as string,
        options: TransactionCommonOptions = {}
    ): Promise<Transaction<ExchangeCreateContract>> {
        this.validator.notValid([
            {
                name: 'owner',
                type: 'address',
                value: ownerAddress as string,
            },
            {
                name: 'first token name',
                type: 'not-empty-string',
                value: firstTokenName,
            },
            {
                name: 'second token name',
                type: 'not-empty-string',
                value: secondTokenName,
            },
            {
                name: 'first token balance',
                type: 'positive-integer',
                value: firstTokenBalance,
            },
            {
                name: 'second token balance',
                type: 'positive-integer',
                value: secondTokenBalance,
            },
        ]);

        const data: ExchangeCreateContract = {
            owner_address: toHex(ownerAddress as string),
            first_token_id: fromUtf8(firstTokenName),
            first_token_balance: firstTokenBalance,
            second_token_id: fromUtf8(secondTokenName),
            second_token_balance: secondTokenBalance,
        };

        const transactionOptions = getTransactionOptions(options);
        return createTransaction<ExchangeCreateContract>(this.tronWeb, ContractType.ExchangeCreateContract, data, options?.permissionId, transactionOptions);
    }

    /**
     * Adds tokens into a bancor style exchange.
     * Will add both tokens at market rate.
     * Use "_" for the constant value for TRX.
     */
    async injectExchangeTokens(
        exchangeID: number,
        tokenName: string,
        tokenAmount: number,
        ownerAddress: string = this.tronWeb.defaultAddress.hex as string,
        options: TransactionCommonOptions = {}
    ): Promise<Transaction<ExchangeInjectContract>> {
        this.validator.notValid([
            {
                name: 'owner',
                type: 'address',
                value: ownerAddress as string,
            },
            {
                name: 'token name',
                type: 'not-empty-string',
                value: tokenName,
            },
            {
                name: 'token amount',
                type: 'integer',
                value: tokenAmount,
                gte: 1,
            },
            {
                name: 'exchangeID',
                type: 'integer',
                value: exchangeID,
                gte: 0,
            },
        ]);

        const data: ExchangeInjectContract = {
            owner_address: toHex(ownerAddress as string),
            exchange_id: parseInt(exchangeID),
            token_id: fromUtf8(tokenName),
            quant: parseInt(tokenAmount),
        };

        const transactionOptions = getTransactionOptions(options);
        return createTransaction(this.tronWeb, ContractType.ExchangeInjectContract, data, options?.permissionId, transactionOptions);
    }

    /**
     * Withdraws tokens from a bancor style exchange.
     * Will withdraw at market rate both tokens.
     * Use "_" for the constant value for TRX.
     */
    async withdrawExchangeTokens(
        exchangeID: number,
        tokenName: string,
        tokenAmount: number,
        ownerAddress: string = this.tronWeb.defaultAddress.hex as string,
        options: TransactionCommonOptions = {}
    ): Promise<Transaction<ExchangeWithdrawContract>> {
        this.validator.notValid([
            {
                name: 'owner',
                type: 'address',
                value: ownerAddress as string,
            },
            {
                name: 'token name',
                type: 'not-empty-string',
                value: tokenName,
            },
            {
                name: 'token amount',
                type: 'integer',
                value: tokenAmount,
                gte: 1,
            },
            {
                name: 'exchangeID',
                type: 'integer',
                value: exchangeID,
                gte: 0,
            },
        ]);

        const data: ExchangeWithdrawContract = {
            owner_address: toHex(ownerAddress as string),
            exchange_id: parseInt(exchangeID),
            token_id: fromUtf8(tokenName),
            quant: parseInt(tokenAmount),
        };

        const transactionOptions = getTransactionOptions(options);
        return createTransaction<ExchangeWithdrawContract>(this.tronWeb, ContractType.ExchangeWithdrawContract, data, options?.permissionId, transactionOptions);
    }

    /**
     * Trade tokens on a bancor style exchange.
     * Expected value is a validation and used to cap the total amt of token 2 spent.
     * Use "_" for the constant value for TRX.
     */
    async tradeExchangeTokens(
        exchangeID: number,
        tokenName: string,
        tokenAmountSold: number,
        tokenAmountExpected: number,
        ownerAddress: string = this.tronWeb.defaultAddress.hex as string,
        options: TransactionCommonOptions = {}
    ): Promise<Transaction<ExchangeTransactionContract>> {
        this.validator.notValid([
            {
                name: 'owner',
                type: 'address',
                value: ownerAddress as string,
            },
            {
                name: 'token name',
                type: 'not-empty-string',
                value: tokenName,
            },
            {
                name: 'tokenAmountSold',
                type: 'integer',
                value: tokenAmountSold,
                gte: 1,
            },
            {
                name: 'tokenAmountExpected',
                type: 'integer',
                value: tokenAmountExpected,
                gte: 1,
            },
            {
                name: 'exchangeID',
                type: 'integer',
                value: exchangeID,
                gte: 0,
            },
        ]);

        const data: ExchangeTransactionContract = {
            owner_address: toHex(ownerAddress as string),
            exchange_id: parseInt(exchangeID),
            token_id: TronWeb.fromAscii(tokenName).replace(/^0x/, ''),
            quant: parseInt(tokenAmountSold),
            expected: parseInt(tokenAmountExpected),
        };

        const transactionOptions = getTransactionOptions(options);
        return createTransaction<ExchangeTransactionContract>(this.tronWeb, ContractType.ExchangeTransactionContract, data, options?.permissionId, transactionOptions);
    }

    /**
     * Update userFeePercentage.
     */
    async updateSetting(
        contractAddress: string,
        userFeePercentage: number,
        ownerAddress: string = this.tronWeb.defaultAddress.hex as string,
        options: TransactionCommonOptions = {}
    ): Promise<Transaction<UpdateSettingContract>> {
        this.validator.notValid([
            {
                name: 'owner',
                type: 'address',
                value: ownerAddress as string,
            },
            {
                name: 'contract',
                type: 'address',
                value: contractAddress,
            },
            {
                name: 'userFeePercentage',
                type: 'integer',
                value: userFeePercentage,
                gte: 0,
                lte: 100,
            },
        ]);

        const data: UpdateSettingContract = {
            owner_address: toHex(ownerAddress as string),
            contract_address: toHex(contractAddress),
            consume_user_resource_percent: userFeePercentage,
        };

        const transactionOptions = getTransactionOptions(options);
        return createTransaction<UpdateSettingContract>(this.tronWeb, ContractType.UpdateSettingContract, data, options?.permissionId, transactionOptions);
    }

    /**
     * Update energy limit.
     */
    async updateEnergyLimit(
        contractAddress: string,
        originEnergyLimit = 0,
        ownerAddress: string = this.tronWeb.defaultAddress.hex as string,
        options: TransactionCommonOptions = {}
    ): Promise<Transaction<UpdateEnergyLimitContract>> {
        this.validator.notValid([
            {
                name: 'owner',
                type: 'address',
                value: ownerAddress as string,
            },
            {
                name: 'contract',
                type: 'address',
                value: contractAddress,
            },
            {
                name: 'originEnergyLimit',
                type: 'integer',
                value: originEnergyLimit,
                gte: 0,
                lte: 10_000_000,
            },
        ]);

        const data: UpdateEnergyLimitContract = {
            owner_address: toHex(ownerAddress as string),
            contract_address: toHex(contractAddress),
            origin_energy_limit: originEnergyLimit,
        };

        const transactionOptions = getTransactionOptions(options);
        return createTransaction<UpdateEnergyLimitContract>(this.tronWeb, ContractType.UpdateEnergyLimitContract, data, options?.permissionId, transactionOptions);
    }

    private checkPermissions(permissions: Permission, type: number) {
        if (permissions) {
            if (
                permissions.type !== type ||
                !permissions.permission_name ||
                !isString(permissions.permission_name) ||
                !isInteger(permissions.threshold) ||
                permissions.threshold < 1 ||
                !permissions.keys
            ) {
                return false;
            }
            for (const key of permissions.keys) {
                if (
                    !TronWeb.isAddress(key.address) ||
                    !isInteger(key.weight) ||
                    key.weight > permissions.threshold ||
                    key.weight < 1 ||
                    (type === 2 && !permissions.operations)
                ) {
                    return false;
                }
            }
        }
        return true;
    }

    async updateAccountPermissions(
        ownerAddress: string = this.tronWeb.defaultAddress.hex as string,
        ownerPermission: Permission,
        witnessPermission?: Permission,
        activesPermissions?: Permission | Permission[],
        options: TransactionCommonOptions = {}
    ): Promise<Transaction<AccountPermissionUpdateContract>> {
        if (!TronWeb.isAddress(ownerAddress as Address)) throw new Error('Invalid ownerAddress provided');

        if (!this.checkPermissions(ownerPermission, 0)) {
            throw new Error('Invalid ownerPermissions provided');
        }

        if (!this.checkPermissions(witnessPermission!, 1)) {
            throw new Error('Invalid witnessPermissions provided');
        }

        if (!Array.isArray(activesPermissions)) {
            activesPermissions = [activesPermissions!];
        }

        for (const activesPermission of activesPermissions) {
            if (!this.checkPermissions(activesPermission, 2)) {
                throw new Error('Invalid activesPermissions provided');
            }
        }

        const data: AccountPermissionUpdateContract = {
            owner_address: toHex(ownerAddress as string),
        };
        if (ownerPermission) {
            const _ownerPermissions = deepCopyJson<Partial<Permission>>(ownerPermission);
            // for compatible with old way of building transaction from chain which type prop is omitted
            if ('type' in _ownerPermissions) {
                delete _ownerPermissions.type;
            }
            _ownerPermissions.keys = _ownerPermissions.keys?.map(({ address, weight }) => ({
                address: toHex(address),
                weight,
            }));
            data.owner = _ownerPermissions as Permission;
        }
        if (witnessPermission) {
            const _witnessPermissions = deepCopyJson<Permission>(witnessPermission);
            // for compatible with old way of building transaction from chain which type prop is Witness
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            _witnessPermissions.type = 'Witness';
            _witnessPermissions.keys = _witnessPermissions.keys.map(({ address, weight }) => ({
                address: toHex(address),
                weight,
            }));
            data.witness = _witnessPermissions;
        }
        if (activesPermissions) {
            const _activesPermissions = deepCopyJson<Permission[]>(activesPermissions);
            // for compatible with old way of building transaction from chain which type prop is Active
            _activesPermissions.forEach((activePermissions: Permission) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                activePermissions.type = 'Active';
            });
            _activesPermissions.forEach((_activesPermission) => {
                _activesPermission.keys = _activesPermission.keys.map(({ address, weight }) => ({
                    address: toHex(address),
                    weight,
                }));
            });
            data.actives = _activesPermissions as Permission[];
        }

        const transactionOptions = getTransactionOptions(options);
        return createTransaction<AccountPermissionUpdateContract>(this.tronWeb, ContractType.AccountPermissionUpdateContract, data, options?.permissionId, transactionOptions);
    }

    async newTxID<T extends ContractParamter, U extends (SignedTransaction<T> | Transaction<T>)>(transaction: U, options: { txLocal?: boolean } = {}): Promise<U> {
        if (options?.txLocal) {
            const contract = transaction.raw_data.contract[0];
            try {
                const tx = await createTransaction<T>(
                    this.tronWeb,
                    contract.type,
                    contract.parameter.value,
                    contract.Permission_id,
                    {
                        fee_limit: transaction.raw_data.fee_limit,
                        data: transaction.raw_data.data,
                        ref_block_bytes: transaction.raw_data.ref_block_bytes,
                        ref_block_hash: transaction.raw_data.ref_block_hash,
                        expiration: transaction.raw_data.expiration,
                        timestamp: transaction.raw_data.timestamp,
                    }
                );
                (tx as SignedTransaction<T>).signature = (transaction as SignedTransaction<T>).signature;
                tx.visible = transaction.visible;
                return tx as U;
            } catch (e) {
                throw new Error('Error generating a new transaction id.');
            }
        }
        try {
            const res: GetSignWeightResponse = await this.tronWeb.fullNode.request('wallet/getsignweight', transaction, 'post');
            if (typeof transaction.visible === 'boolean') {
                res.transaction.transaction.visible = transaction.visible;
            }
            return resultManager(
                res.transaction.transaction as unknown as TransactionWrapper,
                {
                    ...transaction.raw_data.contract[0].parameter.value,
                    Permission_id: transaction.raw_data.contract[0].Permission_id,
                },
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                /* @ts-ignore */
                { data: transaction.raw_data.data, fee_limit: transaction.raw_data.fee_limit }
            ) as unknown as U;
        } catch (e) {
            throw new Error('Error generating a new transaction id.');
        }
    }

    async alterTransaction(transaction: Transaction, options: AlterTransactionOptions = {}) {
        if (Reflect.has(transaction, 'signature')) throw new Error('You can not extend the expiration of a signed transaction.');

        if (options.data) {
            if (options.dataFormat !== 'hex' && !/^0x/.test(options.data)) options.data = TronWeb.fromUtf8(options.data);
            if (!isHex(options.data)) throw new Error('Invalid data provided');
            options.data = options.data.replace(/^0x/, '');
            options.data = options.data.padStart(Math.ceil(options.data.length/2)*2, '0');
            if (options.data.length === 0) throw new Error('Invalid data provided');
            transaction.raw_data.data = options.data;
        }

        if (options.extension) {
            options.extension = parseInt(options.extension * 1000);
            if (isNaN(options.extension) || transaction.raw_data.expiration + options.extension <= Date.now() + 3000)
                throw new Error('Invalid extension provided');
            transaction.raw_data.expiration += options.extension;
        }

        return await this.newTxID(transaction, { txLocal: options.txLocal });
    }

    async extendExpiration(transaction: Transaction, extension: number, options: TxLocal = {}) {
        return await this.alterTransaction(transaction, { extension, txLocal: options?.txLocal });
    }

    async addUpdateData(transaction: Transaction, data: string, dataFormat: 'utf8' | 'hex' = 'utf8', options: TxLocal = {}) {
        return this.alterTransaction(transaction, { data, dataFormat: dataFormat as string, txLocal: options?.txLocal });
    }
}
