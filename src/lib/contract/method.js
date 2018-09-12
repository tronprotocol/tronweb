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

        args.forEach((arg, index) => {
            if(types[index] == 'address')
                args[index] = this.tronWeb.address.toHex(arg).replace(/^(41)/, '0x')
        });

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

                if(types.length !== args.length)
                    return callback('Invalid argument count provided');

                if(!self.contract.address)
                    return callback('Smart contract is missing address');

                if(!self.contract.deployed)
                    return callback('Calling smart contracts requires you to load the contract first');

                const { stateMutability } = self.abi;

                if(![ STATE_MUTABILITY.PURE, STATE_MUTABILITY.VIEW ].includes(stateMutability.toLowerCase()))
                    return callback(`Methods with state mutability "${stateMutability}" must use send()`);

                options = { ...defaultOptions, ...options };

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
                        let output = decodeOutput(self.outputs, '0x' + transaction.constant_result[0]);
                        
                        if(output.length === 1)
                            output = output[0];

                        return callback(null, output);
                    } catch(ex) {
                        return callback(ex);
                    }
                });
            },
            async send(options = defaultOptions, privateKey = self.tronWeb.defaultPrivateKey, callback = false) {
                if(utils.isFunction(privateKey)) {
                    callback = privateKey;
                    privateKey = self.tronWeb.defaultPrivateKey;
                }

                if(utils.isFunction(options)) {
                    callback = options;
                    options = defaultOptions;
                }
                    
                if(!callback)
                    return utils.injectPromise(this.send.bind(this), options, privateKey);

                if(types.length !== args.length)
                    throw new Error('Invalid argument count provided');

                if(!self.contract.address)
                    return callback('Smart contract is missing address');

                if(!self.contract.deployed)
                    return callback('Calling smart contracts requires you to load the contract first');

                if(!privateKey || !utils.isString(privateKey))
                    return callback('Invalid private key provided');

                const { stateMutability } = self.abi;

                if([ STATE_MUTABILITY.PURE, STATE_MUTABILITY.VIEW ].includes(stateMutability.toLowerCase()))
                        return callback(`Methods with state mutability "${stateMutability}" must use call()`);

                options = { ...defaultOptions, ...options };

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

                        let decoded = decodeOutput(self.outputs, '0x' + output.contractResult[0]);

                        if(decoded.length === 1)
                            decoded = decoded[0];

                        return callback(null, decoded);
                    }

                    checkResult();                    
                } catch(ex) {
                    return callback(ex);
                }
            },
            async watch(callback = false) {
                if(!utils.isFunction(callback))
                    throw new Error('Expected callback to be provided');
                
                if(!self.contract.address)
                    return callback('Smart contract is missing address');

                if(self.abi.type.toLowerCase() !== 'event')
                    return callback('Invalid method type for event watching');

                if(!self.tronWeb.eventServer)
                    return callback('No event server configured');

                let listener = false;
                let lastBlock = false;

                const getEvents = async () => {
                    try {
                        const events = await self.tronWeb.getEventResult(self.contract.address, self.name);
                        const [ latestEvent ] = events.sort((a, b) => b.block - a.block);
                        const newEvents = events.filter((event, index) => {
                            const duplicate = events.slice(0, index).some(priorEvent => (
                                JSON.stringify(priorEvent) == JSON.stringify(event)
                            ));

                            if(duplicate)
                                return false;

                            if(!lastBlock)
                                return true;            

                            return event.block > lastBlock;
                        });

                        if(latestEvent)
                            lastBlock = latestEvent.block;

                        return newEvents;
                    } catch(ex) {
                        return Promise.reject(ex);
                    }
                };

                const bindListener = () => {
                    if(listener)
                        clearInterval(listener);

                    listener = setInterval(() => {
                        getEvents().then(events => {
                            events.forEach(event => callback(null, event));
                        }).catch(err => callback(err));
                    }, 3000);
                };

                await getEvents();
                bindListener();

                return {
                    start: bindListener(),
                    stop: () => {
                        if(!listener)
                            return;

                        clearInterval(listener);
                        listener = false;
                    }
                }
            }
        }
    }
}