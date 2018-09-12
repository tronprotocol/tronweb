import TronWeb from 'index';
import utils from 'utils';
import Method from './method';

export default class Contract {
    constructor(tronWeb = false, abi = [], address = false) {
        if(!tronWeb || !tronWeb instanceof TronWeb)
            throw new Error('Expected instance of TronWeb');

        this.tronWeb = tronWeb;
        this.injectPromise = utils.promiseInjector(this);

        this.address = address;
        this.abi = abi;

        this.bytecode = false;        
        this.deployed = false;     

        this.methods = {};

        if(this.tronWeb.isAddress(address))
            this.deployed = true;
        else this.address = false;

        this.loadAbi(abi);
    }

    loadAbi(abi) {
        this.abi = abi;
        this.methods = {};

        abi.forEach(func => {
            const method = new Method(this, func);
            const methodCall = method.onMethod.bind(method);

            this.methods[method.name] = methodCall;
            this.methods[method.functionSelector] = methodCall;
            this.methods[method.signature] = methodCall;
        });
    }

    async new(options, privateKey = this.tronWeb.defaultPrivateKey, callback = false) {
        if(utils.isFunction(privateKey)) {
            callback = privateKey;
            privateKey = this.tronWeb.defaultPrivateKey;
        }

        if(!callback)
            return this.injectPromise(this.new, options, privateKey);

        try {
            const address = this.tronWeb.address.fromPrivateKey(privateKey);
            const transaction = await this.tronWeb.transactionBuilder.createSmartContract(options, address);
            const signedTransaction = await this.tronWeb.trx.sign(transaction, privateKey);
            const contract = await this.tronWeb.trx.sendRawTransaction(signedTransaction);

            if(!contract.result)
                return callback('Unknown error: ' + JSON.stringify(contract, null, 2));

            return this.at(signedTransaction.contract_address, callback);
        } catch(ex) {
            return callback(ex);
        }        
    }

    async at(contractAddress, callback = false) {
        if(!callback)
            return this.injectPromise(this.at, contractAddress);

        try {
            const contract = await this.tronWeb.trx.getContract(contractAddress);

            if(!contract.contract_address)
                callback('Unknown error: ' + JSON.stringify(contract, null, 2));

            this.address = contract.contract_address;
            this.bytecode = contract.bytecode;
            this.deployed = true;

            this.loadAbi(contract.abi.entrys);

            callback(null, this);
        } catch(ex) {
            if(ex.toString().includes('does not exist'))
                return callback('Failed to deploy contract');

            return callback(ex);
        }        
    }
}