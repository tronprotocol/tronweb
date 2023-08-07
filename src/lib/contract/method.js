import utils from '../../utils';
import {encodeParamsV2ByABI, decodeParamsV2ByABI} from '../../utils/abi';
import injectpromise from 'injectpromise';

const getFunctionSelector = abi => {
    abi.stateMutability = abi.stateMutability ? abi.stateMutability.toLowerCase() : 'nonpayable';
    abi.type = abi.type ? abi.type.toLowerCase() : '';
    if(abi.type === 'fallback' || abi.type === 'receive') return '0x';
    let iface = new utils.ethersUtils.Interface([abi]);
    if(abi.type === 'event') {
      return iface.getEvent(abi.name).format(utils.ethersUtils.FormatTypes.sighash);
    }
    return iface.getFunction(abi.name).format(utils.ethersUtils.FormatTypes.sighash);
}

const decodeOutput = (abi, output) => {
    return decodeParamsV2ByABI(abi, output)
};

export default class Method {
    constructor(contract, abi) {
        this.tronWeb = contract.tronWeb;
        this.contract = contract;

        this.abi = abi;
        this.name = abi.name || (abi.name = abi.type);

        this.inputs = abi.inputs || [];
        this.outputs = abi.outputs || [];

        this.functionSelector = getFunctionSelector(abi);
        this.signature = this.tronWeb.sha3(this.functionSelector, false).slice(0, 8);
        this.injectPromise = injectpromise(this);

        this.defaultOptions = {
            feeLimit: this.tronWeb.feeLimit,
            callValue: 0,
            userFeePercentage: 100,
            shouldPollResponse: false, // Only used for sign()
        };
    }

    decodeInput(data) {
        return decodeOutput(this.inputs, '0x' + data);
    }

    onMethod(...args) {
      let rawParameter = '';
      if(this.abi && !/event/i.test(this.abi.type)) {
          rawParameter = encodeParamsV2ByABI(this.abi, args);
      }
      return {
          call: (options = {}, callback = false) => {
              if (utils.isFunction(options)) {
                  callback = options;
                  options = {};
              }
              options = {
                ...options,
                rawParameter
              };

              return this._call([], [], options, callback);
          },
          send: (options = {}, privateKey = this.tronWeb.defaultPrivateKey, callback = false) => {
              if (utils.isFunction(privateKey)) {
                  callback = privateKey;
                  privateKey = this.tronWeb.defaultPrivateKey;
              }
              if (utils.isFunction(options)) {
                callback = options;
                options = {};
              }
              options = {
                ...options,
                rawParameter
              };

              return this._send([], [], options, privateKey, callback);
          },
          watch: (...methodArgs) => this._watch(...methodArgs)
      }
    }

    async _call(types, args, options = {}, callback = false) {
        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (!callback)
            return this.injectPromise(this._call, types, args, options);

        if (types.length !== args.length)
            return callback('Invalid argument count provided');

        if (!this.contract.address)
            return callback('Smart contract is missing address');

        if (!this.contract.deployed)
            return callback('Calling smart contracts requires you to load the contract first');

        const {stateMutability} = this.abi;

        if (!['pure', 'view'].includes(stateMutability.toLowerCase()))
            return callback(`Methods with state mutability "${stateMutability}" must use send()`);

        options = {
            ...this.defaultOptions,
            from: this.tronWeb.defaultAddress.hex,
            ...options,
            _isConstant: true
        };

        const parameters = args.map((value, index) => ({
            type: types[index],
            value
        }));

        this.tronWeb.transactionBuilder.triggerSmartContract(
            this.contract.address,
            this.functionSelector,
            options,
            parameters,
            options.from ? this.tronWeb.address.toHex(options.from) : false,
            (err, transaction) => {
                if (err)
                    return callback(err);

                if (!utils.hasProperty(transaction, 'constant_result'))
                    return callback('Failed to execute');

                try {

                    const len = transaction.constant_result[0].length
                    if (len === 0 || len % 64 === 8) {
                        let msg = 'The call has been reverted or has thrown an error.'
                        if (len !== 0) {
                            msg += ' Error message: '
                            let msg2 = ''
                            let chunk = transaction.constant_result[0].substring(8)
                            for (let i = 0; i < len - 8; i += 64) {
                                msg2 += this.tronWeb.toUtf8(chunk.substring(i, i + 64))
                            }
                            msg += msg2.replace(/(\u0000|\u000b|\f)+/g, ' ').replace(/ +/g, ' ').replace(/\s+$/g, '');
                        }
                        return callback(msg)
                    }

                    let output = decodeOutput(this.abi, '0x' + transaction.constant_result[0]);

                    if (output.length === 1 && Object.keys(output).length === 1) {
                        output = output[0];
                    }

                    return callback(null, output);
                } catch (ex) {
                    return callback(ex);
                }
            });
    }

    async _send(types, args, options = {}, privateKey = this.tronWeb.defaultPrivateKey, callback = false) {
        if (utils.isFunction(privateKey)) {
            callback = privateKey;
            privateKey = this.tronWeb.defaultPrivateKey;
        }

        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (!callback)
            return this.injectPromise(this._send, types, args, options, privateKey);

        if (types.length !== args.length)
            throw new Error('Invalid argument count provided');

        if (!this.contract.address)
            return callback('Smart contract is missing address');

        if (!this.contract.deployed)
            return callback('Calling smart contracts requires you to load the contract first');

        const {stateMutability} = this.abi;

        if (['pure', 'view'].includes(stateMutability.toLowerCase()))
            return callback(`Methods with state mutability "${stateMutability}" must use call()`);

        // If a function isn't payable, dont provide a callValue.
        if (!['payable'].includes(stateMutability.toLowerCase()))
            options.callValue = 0;

        options = {
            ...this.defaultOptions,
            from: this.tronWeb.defaultAddress.hex,
            ...options,
        };

        const parameters = args.map((value, index) => ({
            type: types[index],
            value
        }));

        try {
            const address = privateKey ? this.tronWeb.address.fromPrivateKey(privateKey) : this.tronWeb.defaultAddress.base58;
            const transaction = await this.tronWeb.transactionBuilder.triggerSmartContract(
                this.contract.address,
                this.functionSelector,
                options,
                parameters,
                this.tronWeb.address.toHex(address)
            );

            if (!transaction.result || !transaction.result.result)
                return callback('Unknown error: ' + JSON.stringify(transaction, null, 2));

            // If privateKey is false, this won't be signed here. We assume sign functionality will be replaced.
            const signedTransaction = await this.tronWeb.trx.sign(transaction.transaction, privateKey);

            if (!signedTransaction.signature) {
                if (!privateKey)
                    return callback('Transaction was not signed properly');

                return callback('Invalid private key provided');
            }

            const broadcast = await this.tronWeb.trx.sendRawTransaction(signedTransaction);

            if (broadcast.code) {
                const err = {
                    error: broadcast.code,
                    message: broadcast.code
                };
                if (broadcast.message)
                    err.message = this.tronWeb.toUtf8(broadcast.message);
                return callback(err)
            }

            if (!options.shouldPollResponse)
                return callback(null, signedTransaction.txID);

            const checkResult = async (index = 0) => {
                if (index === (options.pollTimes || 20)) {
                    return callback({
                        error: 'Cannot find result in solidity node',
                        transaction: signedTransaction
                    });
                }

                const output = await this.tronWeb.trx.getTransactionInfo(signedTransaction.txID);

                if (!Object.keys(output).length) {
                    return setTimeout(() => {
                        checkResult(index + 1);
                    }, 3000);
                }

                if (output.result && output.result === 'FAILED') {
                    return callback({
                        error: this.tronWeb.toUtf8(output.resMessage),
                        transaction: signedTransaction,
                        output
                    });
                }

                if (!utils.hasProperty(output, 'contractResult')) {
                    return callback({
                        error: 'Failed to execute: ' + JSON.stringify(output, null, 2),
                        transaction: signedTransaction,
                        output
                    });
                }

                if (options.rawResponse)
                    return callback(null, output);

                let decoded = decodeOutput(this.abi, '0x' + output.contractResult[0]);

                if (decoded.length === 1 && Object.keys(decoded).length === 1) {
                    decoded = decoded[0];
                }

                if (options.keepTxID) {
                    return callback(null, [signedTransaction.txID, decoded]);
                }

                return callback(null, decoded);
            }

            checkResult();
        } catch (ex) {
            return callback(ex);
        }
    }

    async _watch(options = {}, callback = false) {
        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (!utils.isFunction(callback))
            throw new Error('Expected callback to be provided');

        if (!this.contract.address)
            return callback('Smart contract is missing address');

        if (!this.abi.type || !/event/i.test(this.abi.type))
            return callback('Invalid method type for event watching');

        if (!this.tronWeb.eventServer)
            return callback('No event server configured');

        let listener = false;
        let lastBlock = false;
        let since = Date.now() - 1000;

        const getEvents = async () => {
            try {

                const params = {
                    since,
                    eventName: this.name,
                    sort: 'block_timestamp',
                    blockNumber: 'latest',
                    filters: options.filters
                }

                if(options.size) {
                    params.size = options.size;
                }

                if (options.resourceNode) {
                    if (/full/i.test(options.resourceNode))
                        params.onlyUnconfirmed = true
                    else
                        params.onlyConfirmed = true
                }

                const events = await this.tronWeb.event.getEventsByContractAddress(this.contract.address, params);
                const [latestEvent] = events.sort((a, b) => b.block - a.block);
                const newEvents = events.filter((event, index) => {

                    if (options.resourceNode && event.resourceNode &&
                        options.resourceNode.toLowerCase() !== event.resourceNode.toLowerCase()) {
                        return false
                    }

                    const duplicate = events.slice(0, index).some(priorEvent => (
                        JSON.stringify(priorEvent) == JSON.stringify(event)
                    ));

                    if (duplicate)
                        return false;

                    if (!lastBlock)
                        return true;

                    return event.block > lastBlock;
                });

                if (latestEvent)
                    lastBlock = latestEvent.block;

                return newEvents;
            } catch (ex) {
                return Promise.reject(ex);
            }

        };

        const bindListener = () => {
            if (listener)
                clearInterval(listener);

            listener = setInterval(() => {
                getEvents().then(events => events.forEach(event => {
                    callback(null, utils.parseEvent(event, this.abi))
                })).catch(err => callback(err));
            }, 3000);
        };

        await getEvents();
        bindListener();

        return {
            start: bindListener,
            stop: () => {
                if (!listener)
                    return;

                clearInterval(listener);
                listener = false;
            }
        }
    }
}
