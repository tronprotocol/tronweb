import { TronWeb } from '../../tronweb.js';
import utils from '../../utils/index.js';
import { Method, AbiFragmentNoErrConstructor } from './method.js';
import type { ContractAbiInterface, GetMethodsTypeFromAbi, GetOnMethodTypeFromAbi, AnyOnMethodType } from '../../types/ABI.js';
import type { Address } from '../../types/Trx.js';
import type { CreateSmartContractOptions } from '../../types/TransactionBuilder.js';

export class Contract<Abi extends ContractAbiInterface = ContractAbiInterface> {
    tronWeb: TronWeb;
    abi: Abi;
    address: false | string;
    eventListener: any;
    bytecode?: false | string;
    deployed?: boolean;
    lastBlock?: false | number;
    methods: GetOnMethodTypeFromAbi<Abi> & AnyOnMethodType;
    methodInstances: GetMethodsTypeFromAbi<Abi>;
    props: any[];
    [key: string | number | symbol]: any;

    constructor(tronWeb: TronWeb, abi: Abi = [] as any, address: Address) {
        if (!tronWeb || !(tronWeb instanceof TronWeb)) throw new Error('Expected instance of TronWeb');

        this.tronWeb = tronWeb;

        this.address = address;
        this.abi = abi;

        this.eventListener = false;
        this.bytecode = false;
        this.deployed = false;
        this.lastBlock = false;

        this.methods = {} as GetOnMethodTypeFromAbi<Abi> & AnyOnMethodType;
        this.methodInstances = {} as GetMethodsTypeFromAbi<Abi>;
        this.props = [];

        if (utils.address.isAddress(address)) {
            this.deployed = true;
        } else {
            this.address = false;
        }

        this.loadAbi(abi);
    }

    hasProperty(property: number | string | symbol) {
        // eslint-disable-next-line no-prototype-builtins
        return this.hasOwnProperty(property) || (this as any).__proto__.hasOwnProperty(property);
    }

    loadAbi(abi: Abi) {
        this.abi = abi;
        this.methods = {} as GetOnMethodTypeFromAbi<Abi> & AnyOnMethodType;

        this.props.forEach((prop: string) => delete (this as any)[prop]);

        abi.forEach((func) => {
            // Don't build a method for constructor function. That's handled through contract create.
            // Don't build a method for error function.
            if (!func.type || ['constructor', 'error'].includes(func.type.toLowerCase())) return;
            const method = new Method<any>(this, func as AbiFragmentNoErrConstructor) as GetMethodsTypeFromAbi<Abi>[keyof GetMethodsTypeFromAbi<Abi>];
            const methodCall = method.onMethod.bind(method);

            const { name, functionSelector, signature } = method;
            const internalName = name as keyof GetMethodsTypeFromAbi<Abi>;
            const internalFunctionSelector = functionSelector as keyof GetMethodsTypeFromAbi<Abi>;
            const internalSignature = signature as keyof GetMethodsTypeFromAbi<Abi>;

            (this.methods as AnyOnMethodType)[name] = methodCall;
            (this.methods as AnyOnMethodType)[functionSelector!] = methodCall;
            (this.methods as AnyOnMethodType)[signature] = methodCall;

            this.methodInstances[internalName] = method;
            this.methodInstances[internalFunctionSelector!] = method;
            this.methodInstances[internalSignature] = method;

            if (!this.hasProperty(name)) {
                (this as any)[name] = methodCall;
                this.props.push(name);
            }

            if (!this.hasProperty(functionSelector!)) {
                (this as any)[functionSelector!] = methodCall;
                this.props.push(functionSelector);
            }

            if (!this.hasProperty(signature)) {
                (this as any)[signature] = methodCall;
                this.props.push(signature);
            }
        });
    }

    decodeInput(data: string) {
        const methodName = data.substring(0, 8);
        const inputData = data.substring(8);

        if (!this.methodInstances[methodName]) throw new Error('Contract method ' + methodName + ' not found');

        const methodInstance = this.methodInstances[methodName];

        return {
            name: methodInstance.name,
            params: this.methodInstances[methodName].decodeInput(inputData),
        };
    }

    async new(options: CreateSmartContractOptions, privateKey = this.tronWeb.defaultPrivateKey) {
        const address = this.tronWeb.address.fromPrivateKey(privateKey as string);
        const transaction = await this.tronWeb.transactionBuilder.createSmartContract(options, address as Address);
        const signedTransaction = await this.tronWeb.trx.sign(transaction, privateKey);
        const contract = await this.tronWeb.trx.sendRawTransaction(signedTransaction);

        if (contract.code) {
            throw {
                error: contract.code,
                message: this.tronWeb.toUtf8(contract.message),
            };
        }

        await utils.sleep(3000);
        const abi = signedTransaction.raw_data.contract[0].parameter.value.new_contract.abi.entrys || [];
        return this.tronWeb.contract(abi, signedTransaction.contract_address);
    }

    async at(contractAddress: Address) {
        try {
            const contract = await this.tronWeb.trx.getContract(contractAddress);

            if (!contract.contract_address) {
                throw new Error('Unknown error: ' + JSON.stringify(contract, null, 2));
            }

            this.address = contract.contract_address;
            this.bytecode = contract.bytecode;
            this.deployed = true;

            this.loadAbi(contract.abi ? (contract.abi.entrys ? contract.abi.entrys : []) : []);

            return this;
        } catch (ex: any) {
            if (ex.toString().includes('does not exist')) {
                throw new Error('Contract has not been deployed on the network');
            }

            throw new Error(ex);
        }
    }
}

export type { CallOptions, SendOptions, AbiFragmentNoErrConstructor } from './method.js';
export { Method } from './method.js';
