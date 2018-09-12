import Ethers from 'ethers';
import utils from 'utils';

const abiCoder = new Ethers.utils.AbiCoder();

const getFunctionSelector = abi => {
    return abi.name + '(' + getParamTypes(abi.inputs || []).join(',') + ')';
}

const getParamTypes = params => {
    return params.map(({ type }) => type);
}

const decodeOutput = (abi, output) => {
    if(abi.some(output => utils.hasProperty(output, 'name'))) {
        return abiCoder.decode(
            abi.map(({ name }) => name),
            abi.map(({ type }) => type),
            output
        )
    }

    return abiCoder.decode(
        abi.map(({ type }) => type),
        output
    );
};

const STATE_MUTABILITY = {
    PURE: 'pure',
    VIEW: 'view'
};

export default class Method {
    constructor(contract, abi) {
        this.tronWeb = contract.tronWeb;
        this.contract = contract;

        this.abi = abi;        
        this.name = abi.name;

        this.inputs = abi.inputs || [];
        this.outputs = abi.outputs || [];

        this.signature = this.tronWeb.sha3(abi.name).slice(0, 8);
        this.functionSelector = getFunctionSelector(abi);
    }

    onMethod(...args) {        
        const types = getParamTypes(this.inputs);

        if(types.length !== args.length)
            throw new Error('Invalid argument count provided');

        args.forEach((arg, index) => {
            if(types[index] == 'address')
                args[index] = this.tronWeb.address.toHex(arg).replace(/^(41)/, '0x')
        });

        const parameters = abiCoder.encode(types, args).replace(/^(0x)/, '');
        const self = this;

        const defaultOptions = {
            feeLimit: 1000000000,
            callValue: 0,
            from: this.tronWeb.defaultAddress.hex, // Only used for send()
            shouldPollResponse: false // Only used for sign()
        };

        return {
            call(options = defaultOptions, callback = false) {                
                if(utils.isFunction(options)) {
                    callback = options;
                    options = defaultOptions;
                }
                    
                if(!callback)
                    return utils.injectPromise(this.call.bind(this), options);

                if(!self.contract.address)
                    throw new Error('Smart contract is missing address');

                if(!self.contract.deployed)
                    throw new Error('Calling smart contracts requires you to load the contract first');

                const { stateMutability } = self.abi;

                if(![ STATE_MUTABILITY.PURE, STATE_MUTABILITY.VIEW ].includes(stateMutability.toLowerCase()))
                    return callback(`Methods with state mutability "${stateMutability}" must use send()`);

                const parameters = args.map((value, index) => ({
                    type: types[index],
                    value
                }));

                self.tronWeb.transactionBuilder.triggerSmartContract(
                    self.contract.address,
                    self.functionSelector,
                    options.feeLimit,
                    options.callValue,
                    parameters,
                    self.tronWeb.address.toHex(options.from),
                (err, transaction) => {
                    if(err) 
                        return callback(err);

                    if(!utils.hasProperty(transaction, 'constant_result'))
                        return callback('Failed to execute');

                    try {
                        const output = decodeOutput(self.outputs, '0x' + transaction.constant_result[0]);
                        return callback(null, output);
                    } catch(ex) {
                        return callback(ex);
                    }
                });
            },
            async send(options = {}, privateKey = self.tronWeb.defaultPrivateKey, callback = false) {
                if(utils.isFunction(privateKey)) {
                    callback = privateKey;
                    privateKey = self.tronWeb.defaultPrivateKey;
                }

                if(utils.isFunction(options)) {
                    callback = options;
                    options = defaultOptions;
                    privateKey = self.tronWeb.defaultPrivateKey;
                }
                    
                if(!callback)
                    return utils.injectPromise(this.send.bind(this), options, privateKey);

                if(!self.contract.address)
                    throw new Error('Smart contract is missing address');

                if(!self.contract.deployed)
                    throw new Error('Calling smart contracts requires you to load the contract first');

                const { stateMutability } = self.abi;

                if([ STATE_MUTABILITY.PURE, STATE_MUTABILITY.VIEW ].includes(stateMutability.toLowerCase()))
                        return callback(`Methods with state mutability "${stateMutability}" must use call()`);

                const parameters = args.map((value, index) => ({
                    type: types[index],
                    value
                }));

                try {
                    const address = self.tronWeb.address.fromPrivateKey(privateKey);
                    const transaction = await self.tronWeb.transactionBuilder.triggerSmartContract(
                        self.contract.address,
                        self.functionSelector,
                        options.feeLimit,
                        options.callValue,
                        parameters,
                        self.tronWeb.address.toHex(address)
                    );

                    if(!transaction.result || !transaction.result.result)
                        return callback('Unknown error: ' + JSON.stringify(transaction, null, 2));

                    const signedTransaction = await self.tronWeb.trx.sign(transaction.transaction, privateKey);
                    const broadcast = await self.tronWeb.trx.sendRawTransaction(signedTransaction);

                    if(!broadcast.result)
                        return callback('Unknown error: ' + JSON.stringify(broadcast, null, 2));

                    if(!options.shouldPollResponse)
                        return callback(null, signedTransaction.txID);

                    const checkResult = async (index = 0) => {
                        if(index == 20)
                            return callback(null, signedTransaction.txID);
                        
                        const output = await self.tronWeb.trx.getTransactionInfo(signedTransaction.txID);

                        if(!Object.keys(output).length) {
                            return setTimeout(() => {
                                checkResult(index + 1);
                            }, 3000);
                        }

                        if(!utils.hasProperty(output, 'contractResult'))
                            return callback('Failed to execute: ' + JSON.stringify(output, null, 2));

                        const decoded = decodeOutput(self.outputs, '0x' + output.contractResult[0]);
                        return callback(null, decoded);
                    }

                    checkResult();                    
                } catch(ex) {
                    return callback(ex);
                }
            }
        }
    }
}