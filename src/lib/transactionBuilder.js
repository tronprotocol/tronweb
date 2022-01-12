import TronWeb from 'index';
import utils from 'utils';
import {AbiCoder} from 'utils/ethersUtils';
import Validator from 'paramValidator';
import {ADDRESS_PREFIX_REGEX} from 'utils/address';
import injectpromise from 'injectpromise';
import {encodeParamsV2ByABI} from 'utils/abi';

let self;

//helpers

function toHex(value) {
    return TronWeb.address.toHex(value);
}

function fromUtf8(value) {
    return self.tronWeb.fromUtf8(value);
}

function resultManager(transaction, callback) {
    if (transaction.Error)
        return callback(transaction.Error);

    if (transaction.result && transaction.result.message) {
        return callback(
            self.tronWeb.toUtf8(transaction.result.message)
        );
    }

    return callback(null, transaction);
}


export default class TransactionBuilder {
    constructor(tronWeb = false) {
        if (!tronWeb || !tronWeb instanceof TronWeb)
            throw new Error('Expected instance of TronWeb');
        self = this;
        this.tronWeb = tronWeb;
        this.injectPromise = injectpromise(this);
        this.validator = new Validator(tronWeb);
    }

    sendTrx(to = false, amount = 0, from = this.tronWeb.defaultAddress.hex, options, callback = false) {
        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (utils.isFunction(from)) {
            callback = from;
            from = this.tronWeb.defaultAddress.hex;
        } else if (utils.isObject(from)) {
            options = from;
            from = this.tronWeb.defaultAddress.hex;
        }

        if (!callback)
            return this.injectPromise(this.sendTrx, to, amount, from, options);

        // accept amounts passed as strings
        amount = parseInt(amount)

        if (this.validator.notValid([
            {
                name: 'recipient',
                type: 'address',
                value: to
            },
            {
                name: 'origin',
                type: 'address',
                value: from
            },
            {
                names: ['recipient', 'origin'],
                type: 'notEqual',
                msg: 'Cannot transfer TRX to the same account'
            },
            {
                name: 'amount',
                type: 'integer',
                gt: 0,
                value: amount
            }
        ], callback))
            return;

        const data = {
            to_address: toHex(to),
            owner_address: toHex(from),
            amount: amount,
        };

        if (options && options.permissionId) {
            data.Permission_id = options.permissionId;
        }

        this.tronWeb.fullNode.request('wallet/createtransaction', data, 'post').then(transaction => resultManager(transaction, callback)).catch(err => callback(err));
    }

    sendToken(to = false, amount = 0, tokenID = false, from = this.tronWeb.defaultAddress.hex, options, callback = false) {
        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (utils.isFunction(from)) {
            callback = from;
            from = this.tronWeb.defaultAddress.hex;
        } else if (utils.isObject(from)) {
            options = from;
            from = this.tronWeb.defaultAddress.hex;
        }

        if (!callback)
            return this.injectPromise(this.sendToken, to, amount, tokenID, from, options);

        amount = parseInt(amount)
        if (this.validator.notValid([
            {
                name: 'recipient',
                type: 'address',
                value: to
            },
            {
                name: 'origin',
                type: 'address',
                value: from,
            },
            {
                names: ['recipient', 'origin'],
                type: 'notEqual',
                msg: 'Cannot transfer tokens to the same account'
            },
            {
                name: 'amount',
                type: 'integer',
                gt: 0,
                value: amount
            },
            {
                name: 'token ID',
                type: 'tokenId',
                value: tokenID
            }
        ], callback))
            return;

        const data = {
            to_address: toHex(to),
            owner_address: toHex(from),
            asset_name: fromUtf8(tokenID),
            amount: parseInt(amount)
        };

        if (options && options.permissionId) {
            data.Permission_id = options.permissionId;
        }

        this.tronWeb.fullNode.request('wallet/transferasset', data, 'post').then(transaction => resultManager(transaction, callback)).catch(err => callback(err));
    }

    purchaseToken(issuerAddress = false, tokenID = false, amount = 0, buyer = this.tronWeb.defaultAddress.hex, options, callback = false) {
        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (utils.isFunction(buyer)) {
            callback = buyer;
            buyer = this.tronWeb.defaultAddress.hex;
        } else if (utils.isObject(buyer)) {
            options = buyer;
            buyer = this.tronWeb.defaultAddress.hex;
        }

        if (!callback)
            return this.injectPromise(this.purchaseToken, issuerAddress, tokenID, amount, buyer, options);

        if (this.validator.notValid([
            {
                name: 'buyer',
                type: 'address',
                value: buyer
            },
            {
                name: 'issuer',
                type: 'address',
                value: issuerAddress
            },
            {
                names: ['buyer', 'issuer'],
                type: 'notEqual',
                msg: 'Cannot purchase tokens from same account'
            },
            {
                name: 'amount',
                type: 'integer',
                gt: 0,
                value: amount
            },
            {
                name: 'token ID',
                type: 'tokenId',
                value: tokenID
            }
        ], callback))
            return;

        const data = {
            to_address: toHex(issuerAddress),
            owner_address: toHex(buyer),
            asset_name: fromUtf8(tokenID),
            amount: parseInt(amount)
        };

        if (options && options.permissionId) {
            data.Permission_id = options.permissionId;
        }

        this.tronWeb.fullNode.request('wallet/participateassetissue', data, 'post').then(transaction => resultManager(transaction, callback)).catch(err => callback(err));
    }

    freezeBalance(amount = 0, duration = 3, resource = "BANDWIDTH", address = this.tronWeb.defaultAddress.hex, receiverAddress = undefined, options, callback = false) {
        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (utils.isFunction(receiverAddress)) {
            callback = receiverAddress;
            receiverAddress = undefined;
        } else if (utils.isObject(receiverAddress)) {
            options = receiverAddress;
            receiverAddress = undefined;
        }

        if (utils.isFunction(address)) {
            callback = address;
            address = this.tronWeb.defaultAddress.hex;
        } else if (utils.isObject(address)) {
            options = address;
            address = this.tronWeb.defaultAddress.hex;
        }

        if (utils.isFunction(duration)) {
            callback = duration;
            duration = 3;
        }

        if (utils.isFunction(resource)) {
            callback = resource;
            resource = "BANDWIDTH";
        }

        if (!callback)
            return this.injectPromise(this.freezeBalance, amount, duration, resource, address, receiverAddress, options);

        if (this.validator.notValid([
            {
                name: 'origin',
                type: 'address',
                value: address
            },
            {
                name: 'receiver',
                type: 'address',
                value: receiverAddress,
                optional: true
            },
            {
                name: 'amount',
                type: 'integer',
                gt: 0,
                value: amount
            },
            {
                name: 'duration',
                type: 'integer',
                gte: 3,
                value: duration
            },
            {
                name: 'resource',
                type: 'resource',
                value: resource,
                msg: 'Invalid resource provided: Expected "BANDWIDTH" or "ENERGY'
            }
        ], callback))
            return;

        const data = {
            owner_address: toHex(address),
            frozen_balance: parseInt(amount),
            frozen_duration: parseInt(duration),
            resource: resource
        }

        if (utils.isNotNullOrUndefined(receiverAddress) && toHex(receiverAddress) !== toHex(address)) {
            data.receiver_address = toHex(receiverAddress)
        }

        if (options && options.permissionId) {
            data.Permission_id = options.permissionId;
        }

        this.tronWeb.fullNode.request('wallet/freezebalance', data, 'post').then(transaction => resultManager(transaction, callback)).catch(err => callback(err));
    }

    unfreezeBalance(resource = "BANDWIDTH", address = this.tronWeb.defaultAddress.hex, receiverAddress = undefined, options, callback = false) {
        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (utils.isFunction(receiverAddress)) {
            callback = receiverAddress;
            receiverAddress = undefined;
        } else if (utils.isObject(receiverAddress)) {
            options = receiverAddress;
            receiverAddress = undefined;
        }

        if (utils.isFunction(address)) {
            callback = address;
            address = this.tronWeb.defaultAddress.hex;
        } else if (utils.isObject(address)) {
            options = address;
            address = this.tronWeb.defaultAddress.hex;
        }

        if (utils.isFunction(resource)) {
            callback = resource;
            resource = "BANDWIDTH";
        }

        if (!callback)
            return this.injectPromise(this.unfreezeBalance, resource, address, receiverAddress, options);

        if (this.validator.notValid([
            {
                name: 'origin',
                type: 'address',
                value: address
            },
            {
                name: 'receiver',
                type: 'address',
                value: receiverAddress,
                optional: true
            },
            {
                name: 'resource',
                type: 'resource',
                value: resource,
                msg: 'Invalid resource provided: Expected "BANDWIDTH" or "ENERGY'
            }
        ], callback))
            return;

        const data = {
            owner_address: toHex(address),
            resource: resource
        }

        if (utils.isNotNullOrUndefined(receiverAddress) && toHex(receiverAddress) !== toHex(address)) {
            data.receiver_address = toHex(receiverAddress)
        }

        if (options && options.permissionId) {
            data.Permission_id = options.permissionId;
        }

        this.tronWeb.fullNode.request('wallet/unfreezebalance', data, 'post').then(transaction => resultManager(transaction, callback)).catch(err => callback(err));
    }

    withdrawBlockRewards(address = this.tronWeb.defaultAddress.hex, options, callback = false) {
        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (utils.isFunction(address)) {
            callback = address;
            address = this.tronWeb.defaultAddress.hex;
        } else if (utils.isObject(address)) {
            options = address;
            address = this.tronWeb.defaultAddress.hex;
        }

        if (!callback)
            return this.injectPromise(this.withdrawBlockRewards, address, options);

        if (this.validator.notValid([
            {
                name: 'origin',
                type: 'address',
                value: address
            }
        ], callback))
            return;

        const data = {
            owner_address: toHex(address)
        };

        if (options && options.permissionId) {
            data.Permission_id = options.permissionId;
        }

        this.tronWeb.fullNode.request('wallet/withdrawbalance', data, 'post').then(transaction => resultManager(transaction, callback)).catch(err => callback(err));
    }

    applyForSR(
        address = this.tronWeb.defaultAddress.hex,
        url = false,
        options,
        callback = false
    ) {
        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }
        if (utils.isObject(url) && utils.isValidURL(address)) {
            options = url;
            url = address;
            address = this.tronWeb.defaultAddress.hex;
        }

        if (!callback)
            return this.injectPromise(this.applyForSR, address, url, options);

        if (this.validator.notValid([
            {
                name: 'origin',
                type: 'address',
                value: address
            },
            {
                name: 'url',
                type: 'url',
                value: url,
                msg: 'Invalid url provided'
            }
        ], callback))
            return;


        const data = {
            owner_address: toHex(address),
            url: fromUtf8(url)
        };

        if (options && options.permissionId) {
            data.Permission_id = options.permissionId;
        }

        this.tronWeb.fullNode.request('wallet/createwitness', data, 'post').then(transaction => resultManager(transaction, callback)).catch(err => callback(err));
    }

    vote(votes = {}, voterAddress = this.tronWeb.defaultAddress.hex, options, callback = false) {
        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (utils.isFunction(voterAddress)) {
            callback = voterAddress;
            voterAddress = this.tronWeb.defaultAddress.hex;
        } else if (utils.isObject(voterAddress)) {
            options = voterAddress;
            voterAddress = this.tronWeb.defaultAddress.hex;
        }

        if (!callback)
            return this.injectPromise(this.vote, votes, voterAddress, options);

        if (this.validator.notValid([
            {
                name: 'voter',
                type: 'address',
                value: voterAddress
            },
            {
                name: 'votes',
                type: 'notEmptyObject',
                value: votes
            }
        ], callback))
            return;

        let invalid = false;

        votes = Object.entries(votes).map(([srAddress, voteCount]) => {
            if (invalid)
                return;

            if (this.validator.notValid([
                {
                    name: 'SR',
                    type: 'address',
                    value: srAddress
                },
                {
                    name: 'vote count',
                    type: 'integer',
                    gt: 0,
                    value: voteCount,
                    msg: 'Invalid vote count provided for SR: ' + srAddress
                }
            ]))
                return invalid = true;

            return {
                vote_address: toHex(srAddress),
                vote_count: parseInt(voteCount)
            };
        });

        if (invalid)
            return;

        const data = {
            owner_address: toHex(voterAddress),
            votes,
        };

        if (options && options.permissionId) {
            data.Permission_id = options.permissionId;
        }

        this.tronWeb.fullNode.request('wallet/votewitnessaccount', data, 'post').then(transaction => resultManager(transaction, callback)).catch(err => callback(err));
    }

    createSmartContract(options = {}, issuerAddress = this.tronWeb.defaultAddress.hex, callback = false) {
        if (utils.isFunction(issuerAddress)) {
            callback = issuerAddress;
            issuerAddress = this.tronWeb.defaultAddress.hex;
        }

        if (!callback)
            return this.injectPromise(this.createSmartContract, options, issuerAddress);

        const feeLimit = options.feeLimit || this.tronWeb.feeLimit;
        let userFeePercentage = options.userFeePercentage;
        if (typeof userFeePercentage !== 'number' && !userFeePercentage) {
            userFeePercentage = 100;
        }
        const originEnergyLimit = options.originEnergyLimit || 10_000_000;
        const callValue = options.callValue || 0;
        const tokenValue = options.tokenValue;
        const tokenId = options.tokenId || options.token_id;

        let {
            abi = false,
            bytecode = false,
            parameters = [],
            name = ""
        } = options;

        if (abi && utils.isString(abi)) {
            try {
                abi = JSON.parse(abi);
            } catch {
                return callback('Invalid options.abi provided');
            }
        }

        if (abi.entrys)
            abi = abi.entrys;

        if (!utils.isArray(abi))
            return callback('Invalid options.abi provided');


        const payable = abi.some(func => {
            return func.type === 'constructor' && 'payable' === func.stateMutability.toLowerCase();
        });

        if (this.validator.notValid([
            {
                name: 'bytecode',
                type: 'hex',
                value: bytecode
            },
            {
                name: 'feeLimit',
                type: 'integer',
                value: feeLimit,
                gt: 0
            },
            {
                name: 'callValue',
                type: 'integer',
                value: callValue,
                gte: 0
            },
            {
                name: 'userFeePercentage',
                type: 'integer',
                value: userFeePercentage,
                gte: 0,
                lte: 100
            },
            {
                name: 'originEnergyLimit',
                type: 'integer',
                value: originEnergyLimit,
                gte: 0,
                lte: 10_000_000
            },
            {
                name: 'parameters',
                type: 'array',
                value: parameters
            },
            {
                name: 'issuer',
                type: 'address',
                value: issuerAddress
            },
            {
                name: 'tokenValue',
                type: 'integer',
                value: tokenValue,
                gte: 0,
                optional: true
            },
            {
                name: 'tokenId',
                type: 'integer',
                value: tokenId,
                gte: 0,
                optional: true
            }
        ], callback))
            return;

        if (payable && callValue == 0 && tokenValue == 0)
            return callback('When contract is payable, options.callValue or options.tokenValue must be a positive integer');

        if (!payable && (callValue > 0 || tokenValue > 0))
            return callback('When contract is not payable, options.callValue and options.tokenValue must be 0');


        if (options.rawParameter && utils.isString(options.rawParameter)) {
            parameters = options.rawParameter.replace(/^(0x)/, '');
        } else if (options.funcABIV2) {
            parameters = encodeParamsV2ByABI(options.funcABIV2, options.parametersV2).replace(/^(0x)/, '');
        } else {
            var constructorParams = abi.find(
                (it) => {
                    return it.type === 'constructor';
                }
            );

            if (typeof constructorParams !== 'undefined' && constructorParams) {
                const abiCoder = new AbiCoder();
                const types = [];
                const values = [];
                constructorParams = constructorParams.inputs;

                if (parameters.length != constructorParams.length)
                    return callback(`constructor needs ${constructorParams.length} but ${parameters.length} provided`);

                for (let i = 0; i < parameters.length; i++) {
                    let type = constructorParams[i].type;
                    let value = parameters[i];

                    if (!type || !utils.isString(type) || !type.length)
                        return callback('Invalid parameter type provided: ' + type);

                    if (type === 'address')
                        value = toHex(value).replace(ADDRESS_PREFIX_REGEX, '0x');
                    else if (type.match(/^([^\x5b]*)(\x5b|$)/)[0] === 'address[')
                        value = value.map(v => toHex(v).replace(ADDRESS_PREFIX_REGEX, '0x'));
                    else if (/trcToken/.test(type)) {
                        type = type.replace(/trcToken/, 'uint256')
                    }

                    types.push(type);
                    values.push(value);
                }

                try {
                    parameters = abiCoder.encode(types, values).replace(/^(0x)/, '');
                } catch (ex) {
                    return callback(ex);
                }
            } else parameters = '';
        }

        const args = {
            owner_address: toHex(issuerAddress),
            fee_limit: parseInt(feeLimit),
            call_value: parseInt(callValue),
            consume_user_resource_percent: userFeePercentage,
            origin_energy_limit: originEnergyLimit,
            abi: JSON.stringify(abi),
            bytecode,
            parameter: parameters,
            name
        };

        // tokenValue and tokenId can cause errors if provided when the trx10 proposal has not been approved yet. So we set them only if they are passed to the method.
        if (utils.isNotNullOrUndefined(tokenValue))
            args.call_token_value = parseInt(tokenValue)
        if (utils.isNotNullOrUndefined(tokenId))
            args.token_id = parseInt(tokenId)
        if (options && options.permissionId)
            args.Permission_id = options.permissionId;

        this.tronWeb.fullNode.request('wallet/deploycontract', args, 'post').then(transaction => resultManager(transaction, callback)).catch(err => callback(err));
    }

    triggerSmartContract(...params) {
        if (typeof params[2] !== 'object') {
            params[2] = {
                feeLimit: params[2],
                callValue: params[3]
            }
            params.splice(3, 1)
        }
        return this._triggerSmartContract(...params);
    }

    triggerConstantContract(...params) {
        params[2]._isConstant = true
        return this.triggerSmartContract(...params);
    }

    triggerConfirmedConstantContract(...params) {
        params[2]._isConstant = true
        params[2].confirmed = true
        return this.triggerSmartContract(...params);
    }

    _triggerSmartContract(
        contractAddress,
        functionSelector,
        options = {},
        parameters = [],
        issuerAddress = this.tronWeb.defaultAddress.hex,
        callback = false
    ) {

        if (utils.isFunction(issuerAddress)) {
            callback = issuerAddress;
            issuerAddress = this.tronWeb.defaultAddress.hex;
        }

        if (utils.isFunction(parameters)) {
            callback = parameters;
            parameters = [];
        }

        if (!callback) {
            return this.injectPromise(
                this._triggerSmartContract,
                contractAddress,
                functionSelector,
                options,
                parameters,
                issuerAddress
            );
        }

        let {
            tokenValue,
            tokenId,
            callValue,
            feeLimit,
        } = Object.assign({
            callValue: 0,
            feeLimit: this.tronWeb.feeLimit
        }, options)

        if (this.validator.notValid([
            {
                name: 'feeLimit',
                type: 'integer',
                value: feeLimit,
                gt: 0
            },
            {
                name: 'callValue',
                type: 'integer',
                value: callValue,
                gte: 0
            },
            {
                name: 'parameters',
                type: 'array',
                value: parameters
            },
            {
                name: 'contract',
                type: 'address',
                value: contractAddress
            },
            {
                name: 'issuer',
                type: 'address',
                value: issuerAddress,
                optional: true
            },
            {
                name: 'tokenValue',
                type: 'integer',
                value: tokenValue,
                gte: 0,
                optional: true
            },
            {
                name: 'tokenId',
                type: 'integer',
                value: tokenId,
                gte: 0,
                optional: true
            }
        ], callback))
            return;

        const args = {
            contract_address: toHex(contractAddress),
            owner_address: toHex(issuerAddress)
        };


        if (functionSelector && utils.isString(functionSelector)) {
            functionSelector = functionSelector.replace('/\s*/g', '');
            if (parameters.length) {
                const abiCoder = new AbiCoder();
                let types = [];
                const values = [];

                for (let i = 0; i < parameters.length; i++) {
                    let {type, value} = parameters[i];

                    if (!type || !utils.isString(type) || !type.length)
                        return callback('Invalid parameter type provided: ' + type);

                    if (type === 'address')
                        value = toHex(value).replace(ADDRESS_PREFIX_REGEX, '0x');
                    else if (type.match(/^([^\x5b]*)(\x5b|$)/)[0] === 'address[')
                        value = value.map(v => toHex(v).replace(ADDRESS_PREFIX_REGEX, '0x'));

                    types.push(type);
                    values.push(value);
                }

                try {
                    // workaround for unsupported trcToken type
                    types = types.map(type => {
                        if (/trcToken/.test(type)) {
                            type = type.replace(/trcToken/, 'uint256')
                        }
                        return type
                    })

                    parameters = abiCoder.encode(types, values).replace(/^(0x)/, '');

                } catch (ex) {
                    return callback(ex);
                }
            } else parameters = '';

            // work for abiv2 if passed the function abi in options
            if (options.funcABIV2) {
                parameters = encodeParamsV2ByABI(options.funcABIV2, options.parametersV2).replace(/^(0x)/, '');
            }

            if (options.shieldedParameter && utils.isString(options.shieldedParameter)) {
                parameters = options.shieldedParameter.replace(/^(0x)/, '');
            }

            if (options.rawParameter && utils.isString(options.rawParameter)) {
                parameters = options.rawParameter.replace(/^(0x)/, '');
            }

            args.function_selector = functionSelector;
            args.parameter = parameters;
        }


        if (!options._isConstant) {
            args.call_value = parseInt(callValue)
            args.fee_limit = parseInt(feeLimit)
            if (utils.isNotNullOrUndefined(tokenValue))
                args.call_token_value = parseInt(tokenValue)
            if (utils.isNotNullOrUndefined(tokenId))
                args.token_id = parseInt(tokenId)
        }

        if (options.permissionId) {
            args.Permission_id = options.permissionId;
        }

        this.tronWeb[options.confirmed ? 'solidityNode' : 'fullNode'].request(`wallet${options.confirmed ? 'solidity' : ''}/trigger${options._isConstant ? 'constant' : 'smart'}contract`, args, 'post').then(transaction => resultManager(transaction, callback)).catch(err => callback(err));
    }

    clearABI(contractAddress, ownerAddress = this.tronWeb.defaultAddress.hex, callback = false) {
        if (!callback)
            return this.injectPromise(this.clearABI, contractAddress, ownerAddress);

        if (!this.tronWeb.isAddress(contractAddress))
            return callback('Invalid contract address provided');

        if (!this.tronWeb.isAddress(ownerAddress))
            return callback('Invalid owner address provided');

        const data = {
            contract_address: toHex(contractAddress),
            owner_address: toHex(ownerAddress)
        };

        if (this.tronWeb.trx.cache.contracts[contractAddress]) {
            delete this.tronWeb.trx.cache.contracts[contractAddress]
        }
        this.tronWeb.fullNode.request('wallet/clearabi', data, 'post').then(transaction => resultManager(transaction, callback)).catch(err => callback(err));

    }

    updateBrokerage(brokerage, ownerAddress = this.tronWeb.defaultAddress.hex, callback = false) {
        if (!callback)
            return this.injectPromise(this.updateBrokerage, brokerage, ownerAddress);

        if (!utils.isNotNullOrUndefined(brokerage))
            return callback('Invalid brokerage provided');

        if (!utils.isInteger(brokerage) || brokerage < 0 || brokerage > 100)
            return callback('Brokerage must be an integer between 0 and 100');

        if (!this.tronWeb.isAddress(ownerAddress))
            return callback('Invalid owner address provided');

        const data = {
            brokerage: parseInt(brokerage),
            owner_address: toHex(ownerAddress)
        };

        this.tronWeb.fullNode.request('wallet/updateBrokerage', data, 'post').then(transaction => resultManager(transaction, callback)).catch(err => callback(err));

    }

    createToken(options = {}, issuerAddress = this.tronWeb.defaultAddress.hex, callback = false) {
        if (utils.isFunction(issuerAddress)) {
            callback = issuerAddress;
            issuerAddress = this.tronWeb.defaultAddress.hex;
        }

        if (!callback)
            return this.injectPromise(this.createToken, options, issuerAddress);

        const {
            name = false,
            abbreviation = false,
            description = false,
            url = false,
            totalSupply = 0,
            trxRatio = 1, // How much TRX will `tokenRatio` cost?
            tokenRatio = 1, // How many tokens will `trxRatio` afford?
            saleStart = Date.now(),
            saleEnd = false,
            freeBandwidth = 0, // The creator's "donated" bandwidth for use by token holders
            freeBandwidthLimit = 0, // Out of `totalFreeBandwidth`, the amount each token holder get
            frozenAmount = 0,
            frozenDuration = 0,
            // for now there is no default for the following values
            voteScore,
            precision
        } = options;

        if (this.validator.notValid([
            {
                name: 'Supply amount',
                type: 'positive-integer',
                value: totalSupply
            },
            {
                name: 'TRX ratio',
                type: 'positive-integer',
                value: trxRatio
            },
            {
                name: 'Token ratio',
                type: 'positive-integer',
                value: tokenRatio
            },
            {
                name: 'token abbreviation',
                type: 'not-empty-string',
                value: abbreviation
            },
            {
                name: 'token name',
                type: 'not-empty-string',
                value: name
            },
            {
                name: 'token description',
                type: 'not-empty-string',
                value: description
            },
            {
                name: 'token url',
                type: 'url',
                value: url
            },
            {
                name: 'issuer',
                type: 'address',
                value: issuerAddress
            },
            {
                name: 'sale start timestamp',
                type: 'integer',
                value: saleStart,
                gte: Date.now()
            },
            {
                name: 'sale end timestamp',
                type: 'integer',
                value: saleEnd,
                gt: saleStart
            },
            {
                name: 'Free bandwidth amount',
                type: 'integer',
                value: freeBandwidth,
                gte: 0
            },
            {
                name: 'Free bandwidth limit',
                type: 'integer',
                value: freeBandwidthLimit,
                gte: 0
            },
            {
                name: 'Frozen supply',
                type: 'integer',
                value: frozenAmount,
                gte: 0
            },
            {
                name: 'Frozen duration',
                type: 'integer',
                value: frozenDuration,
                gte: 0
            }
        ], callback))
            return;

        if (utils.isNotNullOrUndefined(voteScore) && (!utils.isInteger(voteScore) || voteScore <= 0))
            return callback('voteScore must be a positive integer greater than 0');

        if (utils.isNotNullOrUndefined(precision) && (!utils.isInteger(precision) || precision < 0 || precision > 6))
            return callback('precision must be a positive integer >= 0 and <= 6');

        const data = {
            owner_address: toHex(issuerAddress),
            name: fromUtf8(name),
            abbr: fromUtf8(abbreviation),
            description: fromUtf8(description),
            url: fromUtf8(url),
            total_supply: parseInt(totalSupply),
            trx_num: parseInt(trxRatio),
            num: parseInt(tokenRatio),
            start_time: parseInt(saleStart),
            end_time: parseInt(saleEnd),
            free_asset_net_limit: parseInt(freeBandwidth),
            public_free_asset_net_limit: parseInt(freeBandwidthLimit),
            frozen_supply: {
                frozen_amount: parseInt(frozenAmount),
                frozen_days: parseInt(frozenDuration)
            }
        }
        if (!(parseInt(frozenAmount) > 0)) {
            delete data.frozen_supply
        }
        if (precision && !isNaN(parseInt(precision))) {
            data.precision = parseInt(precision);
        }
        if (voteScore && !isNaN(parseInt(voteScore))) {
            data.vote_score = parseInt(voteScore)
        }
        if (options && options.permissionId) {
            data.Permission_id = options.permissionId;
        }

        this.tronWeb.fullNode.request('wallet/createassetissue', data, 'post').then(transaction => resultManager(transaction, callback)).catch(err => callback(err));
    }

    updateAccount(accountName = false, address = this.tronWeb.defaultAddress.hex, options, callback = false) {
        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (utils.isFunction(address)) {
            callback = address;
            address = this.tronWeb.defaultAddress.hex;
        } else if (utils.isObject(address)) {
            options = address;
            address = this.tronWeb.defaultAddress.hex;
        }

        if (!callback) {
            return this.injectPromise(this.updateAccount, accountName, address, options);
        }

        if (this.validator.notValid([
            {
                name: 'Name',
                type: 'not-empty-string',
                value: accountName
            },
            {
                name: 'origin',
                type: 'address',
                value: address
            }
        ], callback))
            return;

        const data = {
            account_name: fromUtf8(accountName),
            owner_address: toHex(address),
        };

        if (options && options.permissionId) {
            data.Permission_id = options.permissionId;
        }

        this.tronWeb.fullNode.request('wallet/updateaccount', data, 'post').then(transaction => resultManager(transaction, callback)).catch(err => callback(err));
    }

    setAccountId(accountId, address = this.tronWeb.defaultAddress.hex, callback = false) {
        if (utils.isFunction(address)) {
            callback = address;
            address = this.tronWeb.defaultAddress.hex;
        }

        if (!callback) {
            return this.injectPromise(this.setAccountId, accountId, address);
        }

        if (accountId && utils.isString(accountId) && accountId.startsWith('0x')) {
            accountId = accountId.slice(2);
        }

        if (this.validator.notValid([
            {
                name: 'accountId',
                type: 'hex',
                value: accountId
            },
            {
                name: 'accountId',
                type: 'string',
                lte: 32,
                gte: 8,
                value: accountId
            },
            {
                name: 'origin',
                type: 'address',
                value: address
            }
        ], callback))
            return;


        this.tronWeb.fullNode.request('wallet/setaccountid', {
            account_id: accountId,
            owner_address: toHex(address),
        }, 'post').then(transaction => resultManager(transaction, callback)).catch(err => callback(err));
    }

    updateToken(options = {}, issuerAddress = this.tronWeb.defaultAddress.hex, callback = false) {
        if (utils.isFunction(issuerAddress)) {
            callback = issuerAddress;
            issuerAddress = this.tronWeb.defaultAddress.hex;
        } else if (utils.isObject(issuerAddress)) {
            options = issuerAddress;
            issuerAddress = this.tronWeb.defaultAddress.hex;
        }

        if (!callback)
            return this.injectPromise(this.updateToken, options, issuerAddress);

        const {
            description = false,
            url = false,
            freeBandwidth = 0, // The creator's "donated" bandwidth for use by token holders
            freeBandwidthLimit = 0 // Out of `totalFreeBandwidth`, the amount each token holder get
        } = options;


        if (this.validator.notValid([
            {
                name: 'token description',
                type: 'not-empty-string',
                value: description
            },
            {
                name: 'token url',
                type: 'url',
                value: url
            },
            {
                name: 'issuer',
                type: 'address',
                value: issuerAddress
            },
            {
                name: 'Free bandwidth amount',
                type: 'positive-integer',
                value: freeBandwidth
            },
            {
                name: 'Free bandwidth limit',
                type: 'positive-integer',
                value: freeBandwidthLimit
            }
        ], callback))
            return;

        const data = {
            owner_address: toHex(issuerAddress),
            description: fromUtf8(description),
            url: fromUtf8(url),
            new_limit: parseInt(freeBandwidth),
            new_public_limit: parseInt(freeBandwidthLimit)
        };

        if (options && options.permissionId) {
            data.Permission_id = options.permissionId;
        }

        this.tronWeb.fullNode.request('wallet/updateasset', data, 'post').then(transaction => resultManager(transaction, callback)).catch(err => callback(err));
    }

    sendAsset(...args) {
        return this.sendToken(...args);
    }

    purchaseAsset(...args) {
        return this.purchaseToken(...args);
    }

    createAsset(...args) {
        return this.createToken(...args);
    }

    updateAsset(...args) {
        return this.updateToken(...args);
    }

    /**
     * Creates a proposal to modify the network.
     * Can only be created by a current Super Representative.
     */
    createProposal(parameters = false, issuerAddress = this.tronWeb.defaultAddress.hex, options, callback = false) {
        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (utils.isFunction(issuerAddress)) {
            callback = issuerAddress;
            issuerAddress = this.tronWeb.defaultAddress.hex;
        } else if (utils.isObject(issuerAddress)) {
            options = issuerAddress;
            issuerAddress = this.tronWeb.defaultAddress.hex;
        }

        if (!callback)
            return this.injectPromise(this.createProposal, parameters, issuerAddress, options);

        if (this.validator.notValid([
            {
                name: 'issuer',
                type: 'address',
                value: issuerAddress
            }
        ], callback))
            return;

        const invalid = 'Invalid proposal parameters provided';

        if (!parameters)
            return callback(invalid);

        if (!utils.isArray(parameters))
            parameters = [parameters];

        for (let parameter of parameters) {
            if (!utils.isObject(parameter))
                return callback(invalid);
        }

        const data = {
            owner_address: toHex(issuerAddress),
            parameters: parameters
        };

        if (options && options.permissionId) {
            data.Permission_id = options.permissionId;
        }

        this.tronWeb.fullNode.request('wallet/proposalcreate', data, 'post').then(transaction => resultManager(transaction, callback)).catch(err => callback(err));
    }

    /**
     * Deletes a network modification proposal that the owner issued.
     * Only current Super Representative can vote on a proposal.
     */
    deleteProposal(proposalID = false, issuerAddress = this.tronWeb.defaultAddress.hex, options, callback = false) {
        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (utils.isFunction(issuerAddress)) {
            callback = issuerAddress;
            issuerAddress = this.tronWeb.defaultAddress.hex;
        } else if (utils.isObject(issuerAddress)) {
            options = issuerAddress;
            issuerAddress = this.tronWeb.defaultAddress.hex;
        }

        if (!callback)
            return this.injectPromise(this.deleteProposal, proposalID, issuerAddress, options);

        if (this.validator.notValid([
            {
                name: 'issuer',
                type: 'address',
                value: issuerAddress
            },
            {
                name: 'proposalID',
                type: 'integer',
                value: proposalID,
                gte: 0
            }
        ], callback))
            return;

        const data = {
            owner_address: toHex(issuerAddress),
            proposal_id: parseInt(proposalID)
        };

        if (options && options.permissionId) {
            data.Permission_id = options.permissionId;
        }

        this.tronWeb.fullNode.request('wallet/proposaldelete', data, 'post').then(transaction => resultManager(transaction, callback)).catch(err => callback(err));
    }

    /**
     * Adds a vote to an issued network modification proposal.
     * Only current Super Representative can vote on a proposal.
     */
    voteProposal(proposalID = false, isApproval = false, voterAddress = this.tronWeb.defaultAddress.hex, options, callback = false) {
        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (utils.isFunction(voterAddress)) {
            callback = voterAddress;
            voterAddress = this.tronWeb.defaultAddress.hex;
        } else if (utils.isObject(voterAddress)) {
            options = voterAddress;
            voterAddress = this.tronWeb.defaultAddress.hex;
        }

        if (!callback)
            return this.injectPromise(this.voteProposal, proposalID, isApproval, voterAddress, options);

        if (this.validator.notValid([
            {
                name: 'voter',
                type: 'address',
                value: voterAddress
            },
            {
                name: 'proposalID',
                type: 'integer',
                value: proposalID,
                gte: 0
            },
            {
                name: 'has approval',
                type: 'boolean',
                value: isApproval
            }
        ], callback))
            return;

        const data = {
            owner_address: toHex(voterAddress),
            proposal_id: parseInt(proposalID),
            is_add_approval: isApproval
        };

        if (options && options.permissionId) {
            data.Permission_id = options.permissionId;
        }

        this.tronWeb.fullNode.request('wallet/proposalapprove', data, 'post').then(transaction => resultManager(transaction, callback)).catch(err => callback(err));
    }

    /**
     * Create an exchange between a token and TRX.
     * Token Name should be a CASE SENSITIVE string.
     * PLEASE VERIFY THIS ON TRONSCAN.
     */
    createTRXExchange(tokenName, tokenBalance, trxBalance, ownerAddress = this.tronWeb.defaultAddress.hex, options, callback = false) {
        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (utils.isFunction(ownerAddress)) {
            callback = ownerAddress;
            ownerAddress = this.tronWeb.defaultAddress.hex;
        } else if (utils.isObject(ownerAddress)) {
            options = ownerAddress;
            ownerAddress = this.tronWeb.defaultAddress.hex;
        }

        if (!callback)
            return this.injectPromise(this.createTRXExchange, tokenName, tokenBalance, trxBalance, ownerAddress, options);

        if (this.validator.notValid([
            {
                name: 'owner',
                type: 'address',
                value: ownerAddress
            },
            {
                name: 'token name',
                type: 'not-empty-string',
                value: tokenName
            },
            {
                name: 'token balance',
                type: 'positive-integer',
                value: tokenBalance
            },
            {
                name: 'trx balance',
                type: 'positive-integer',
                value: trxBalance
            }
        ], callback))
            return;

        const data = {
            owner_address: toHex(ownerAddress),
            first_token_id: fromUtf8(tokenName),
            first_token_balance: tokenBalance,
            second_token_id: '5f', // Constant for TRX.
            second_token_balance: trxBalance
        };

        if (options && options.permissionId) {
            data.Permission_id = options.permissionId;
        }

        this.tronWeb.fullNode.request('wallet/exchangecreate', data, 'post').then(resources => {
            callback(null, resources);
        }).catch(err => callback(err));
    }

    /**
     * Create an exchange between a token and another token.
     * DO NOT USE THIS FOR TRX.
     * Token Names should be a CASE SENSITIVE string.
     * PLEASE VERIFY THIS ON TRONSCAN.
     */
    createTokenExchange(firstTokenName, firstTokenBalance, secondTokenName, secondTokenBalance, ownerAddress = this.tronWeb.defaultAddress.hex, options, callback = false) {
        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (utils.isFunction(ownerAddress)) {
            callback = ownerAddress;
            ownerAddress = this.tronWeb.defaultAddress.hex;
        } else if (utils.isObject(ownerAddress)) {
            options = ownerAddress;
            ownerAddress = this.tronWeb.defaultAddress.hex;
        }

        if (!callback)
            return this.injectPromise(this.createTokenExchange, firstTokenName, firstTokenBalance, secondTokenName, secondTokenBalance, ownerAddress, options);

        if (this.validator.notValid([
            {
                name: 'owner',
                type: 'address',
                value: ownerAddress
            },
            {
                name: 'first token name',
                type: 'not-empty-string',
                value: firstTokenName
            },
            {
                name: 'second token name',
                type: 'not-empty-string',
                value: secondTokenName
            },
            {
                name: 'first token balance',
                type: 'positive-integer',
                value: firstTokenBalance
            },
            {
                name: 'second token balance',
                type: 'positive-integer',
                value: secondTokenBalance
            }
        ], callback))
            return;

        const data = {
            owner_address: toHex(ownerAddress),
            first_token_id: fromUtf8(firstTokenName),
            first_token_balance: firstTokenBalance,
            second_token_id: fromUtf8(secondTokenName),
            second_token_balance: secondTokenBalance
        };

        if (options && options.permissionId) {
            data.Permission_id = options.permissionId;
        }

        this.tronWeb.fullNode.request('wallet/exchangecreate', data, 'post').then(resources => {
            callback(null, resources);
        }).catch(err => callback(err));
    }

    /**
     * Adds tokens into a bancor style exchange.
     * Will add both tokens at market rate.
     * Use "_" for the constant value for TRX.
     */
    injectExchangeTokens(exchangeID = false, tokenName = false, tokenAmount = 0, ownerAddress = this.tronWeb.defaultAddress.hex, options, callback = false) {
        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (utils.isFunction(ownerAddress)) {
            callback = ownerAddress;
            ownerAddress = this.tronWeb.defaultAddress.hex;
        } else if (utils.isObject(ownerAddress)) {
            options = ownerAddress;
            ownerAddress = this.tronWeb.defaultAddress.hex;
        }

        if (!callback)
            return this.injectPromise(this.injectExchangeTokens, exchangeID, tokenName, tokenAmount, ownerAddress, options);

        if (this.validator.notValid([
            {
                name: 'owner',
                type: 'address',
                value: ownerAddress
            },
            {
                name: 'token name',
                type: 'not-empty-string',
                value: tokenName
            },
            {
                name: 'token amount',
                type: 'integer',
                value: tokenAmount,
                gte: 1
            },
            {
                name: 'exchangeID',
                type: 'integer',
                value: exchangeID,
                gte: 0
            }
        ], callback))
            return;

        const data = {
            owner_address: toHex(ownerAddress),
            exchange_id: parseInt(exchangeID),
            token_id: fromUtf8(tokenName),
            quant: parseInt(tokenAmount)
        };

        if (options && options.permissionId) {
            data.Permission_id = options.permissionId;
        }

        this.tronWeb.fullNode.request('wallet/exchangeinject', data, 'post').then(transaction => resultManager(transaction, callback)).catch(err => callback(err));
    }

    /**
     * Withdraws tokens from a bancor style exchange.
     * Will withdraw at market rate both tokens.
     * Use "_" for the constant value for TRX.
     */
    withdrawExchangeTokens(exchangeID = false, tokenName = false, tokenAmount = 0, ownerAddress = this.tronWeb.defaultAddress.hex, options, callback = false) {
        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (utils.isFunction(ownerAddress)) {
            callback = ownerAddress;
            ownerAddress = this.tronWeb.defaultAddress.hex;
        } else if (utils.isObject(ownerAddress)) {
            options = ownerAddress;
            ownerAddress = this.tronWeb.defaultAddress.hex;
        }

        if (!callback)
            return this.injectPromise(this.withdrawExchangeTokens, exchangeID, tokenName, tokenAmount, ownerAddress, options);

        if (this.validator.notValid([
            {
                name: 'owner',
                type: 'address',
                value: ownerAddress
            },
            {
                name: 'token name',
                type: 'not-empty-string',
                value: tokenName
            },
            {
                name: 'token amount',
                type: 'integer',
                value: tokenAmount,
                gte: 1
            },
            {
                name: 'exchangeID',
                type: 'integer',
                value: exchangeID,
                gte: 0
            }
        ], callback))
            return;

        const data = {
            owner_address: toHex(ownerAddress),
            exchange_id: parseInt(exchangeID),
            token_id: fromUtf8(tokenName),
            quant: parseInt(tokenAmount)
        };

        if (options && options.permissionId) {
            data.Permission_id = options.permissionId;
        }

        this.tronWeb.fullNode.request('wallet/exchangewithdraw', data, 'post').then(transaction => resultManager(transaction, callback)).catch(err => callback(err));
    }

    /**
     * Trade tokens on a bancor style exchange.
     * Expected value is a validation and used to cap the total amt of token 2 spent.
     * Use "_" for the constant value for TRX.
     */
    tradeExchangeTokens(exchangeID = false,
                        tokenName = false,
                        tokenAmountSold = 0,
                        tokenAmountExpected = 0,
                        ownerAddress = this.tronWeb.defaultAddress.hex,
                        options,
                        callback = false) {
        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (utils.isFunction(ownerAddress)) {
            callback = ownerAddress;
            ownerAddress = this.tronWeb.defaultAddress.hex;
        } else if (utils.isObject(ownerAddress)) {
            options = ownerAddress;
            ownerAddress = this.tronWeb.defaultAddress.hex;
        }

        if (!callback)
            return this.injectPromise(this.tradeExchangeTokens, exchangeID, tokenName, tokenAmountSold, tokenAmountExpected, ownerAddress, options);

        if (this.validator.notValid([
            {
                name: 'owner',
                type: 'address',
                value: ownerAddress
            },
            {
                name: 'token name',
                type: 'not-empty-string',
                value: tokenName
            },
            {
                name: 'tokenAmountSold',
                type: 'integer',
                value: tokenAmountSold,
                gte: 1
            },
            {
                name: 'tokenAmountExpected',
                type: 'integer',
                value: tokenAmountExpected,
                gte: 1
            },
            {
                name: 'exchangeID',
                type: 'integer',
                value: exchangeID,
                gte: 0
            }
        ], callback))
            return;

        const data = {
            owner_address: toHex(ownerAddress),
            exchange_id: parseInt(exchangeID),
            token_id: this.tronWeb.fromAscii(tokenName),
            quant: parseInt(tokenAmountSold),
            expected: parseInt(tokenAmountExpected)
        };

        if (options && options.permissionId) {
            data.Permission_id = options.permissionId;
        }

        this.tronWeb.fullNode.request('wallet/exchangetransaction', data, 'post').then(transaction => resultManager(transaction, callback)).catch(err => callback(err));
    }

    /**
     * Update userFeePercentage.
     */
    updateSetting(contractAddress = false,
                  userFeePercentage = false,
                  ownerAddress = this.tronWeb.defaultAddress.hex,
                  options,
                  callback = false) {
        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (utils.isFunction(ownerAddress)) {
            callback = ownerAddress;
            ownerAddress = this.tronWeb.defaultAddress.hex;
        } else if (utils.isObject(ownerAddress)) {
            options = ownerAddress;
            ownerAddress = this.tronWeb.defaultAddress.hex;
        }

        if (!callback)
            return this.injectPromise(this.updateSetting, contractAddress, userFeePercentage, ownerAddress, options);

        if (this.validator.notValid([
            {
                name: 'owner',
                type: 'address',
                value: ownerAddress
            },
            {
                name: 'contract',
                type: 'address',
                value: contractAddress
            },
            {
                name: 'userFeePercentage',
                type: 'integer',
                value: userFeePercentage,
                gte: 0,
                lte: 100
            }
        ], callback))
            return;

        const data = {
            owner_address: toHex(ownerAddress),
            contract_address: toHex(contractAddress),
            consume_user_resource_percent: userFeePercentage
        };

        if (options && options.permissionId) {
            data.Permission_id = options.permissionId;
        }

        this.tronWeb.fullNode.request('wallet/updatesetting', data, 'post').then(transaction => resultManager(transaction, callback)).catch(err => callback(err));
    }

    /**
     * Update energy limit.
     */
    updateEnergyLimit(contractAddress = false,
                      originEnergyLimit = false,
                      ownerAddress = this.tronWeb.defaultAddress.hex,
                      options,
                      callback = false) {

        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (utils.isFunction(ownerAddress)) {
            callback = ownerAddress;
            ownerAddress = this.tronWeb.defaultAddress.hex;
        } else if (utils.isObject(ownerAddress)) {
            options = ownerAddress;
            ownerAddress = this.tronWeb.defaultAddress.hex;
        }

        if (!callback)
            return this.injectPromise(this.updateEnergyLimit, contractAddress, originEnergyLimit, ownerAddress, options);

        if (this.validator.notValid([
            {
                name: 'owner',
                type: 'address',
                value: ownerAddress
            },
            {
                name: 'contract',
                type: 'address',
                value: contractAddress
            },
            {
                name: 'originEnergyLimit',
                type: 'integer',
                value: originEnergyLimit,
                gte: 0,
                lte: 10_000_000
            }
        ], callback))
            return;

        const data = {
            owner_address: toHex(ownerAddress),
            contract_address: toHex(contractAddress),
            origin_energy_limit: originEnergyLimit
        };

        if (options && options.permissionId) {
            data.Permission_id = options.permissionId;
        }

        this.tronWeb.fullNode.request('wallet/updateenergylimit', data, 'post').then(transaction => resultManager(transaction, callback)).catch(err => callback(err));
    }

    checkPermissions(permissions, type) {
        if (permissions) {
            if (permissions.type !== type
                || !permissions.permission_name
                || !utils.isString(permissions.permission_name)
                || !utils.isInteger(permissions.threshold)
                || permissions.threshold < 1
                || !permissions.keys
            ) {
                return false
            }
            for (let key of permissions.keys) {
                if (!this.tronWeb.isAddress(key.address)
                    || !utils.isInteger(key.weight)
                    || key.weight > permissions.threshold
                    || key.weight < 1
                    || (type === 2 && !permissions.operations)
                ) {
                    return false
                }
            }
        }
        return true
    }

    updateAccountPermissions(ownerAddress = this.tronWeb.defaultAddress.hex,
                             ownerPermissions = false,
                             witnessPermissions = false,
                             activesPermissions = false,
                             callback = false) {

        if (utils.isFunction(activesPermissions)) {
            callback = activesPermissions;
            activesPermissions = false;
        }

        if (utils.isFunction(witnessPermissions)) {
            callback = witnessPermissions;
            witnessPermissions = activesPermissions = false;
        }

        if (utils.isFunction(ownerPermissions)) {
            callback = ownerPermissions;
            ownerPermissions = witnessPermissions = activesPermissions = false;
        }

        if (!callback)
            return this.injectPromise(this.updateAccountPermissions, ownerAddress, ownerPermissions, witnessPermissions, activesPermissions);

        if (!this.tronWeb.isAddress(ownerAddress))
            return callback('Invalid ownerAddress provided');

        if (!this.checkPermissions(ownerPermissions, 0)) {
            return callback('Invalid ownerPermissions provided');
        }

        if (!this.checkPermissions(witnessPermissions, 1)) {
            return callback('Invalid witnessPermissions provided');
        }

        if (!Array.isArray(activesPermissions)) {
            activesPermissions = [activesPermissions]
        }

        for (let activesPermission of activesPermissions) {
            if (!this.checkPermissions(activesPermission, 2)) {
                return callback('Invalid activesPermissions provided');
            }
        }

        const data = {
            owner_address: ownerAddress
        }
        if (ownerPermissions) {
            data.owner = ownerPermissions
        }
        if (witnessPermissions) {
            data.witness = witnessPermissions
        }
        if (activesPermissions) {
            data.actives = activesPermissions.length === 1 ? activesPermissions[0] : activesPermissions
        }

        this.tronWeb.fullNode.request('wallet/accountpermissionupdate', data, 'post').then(transaction => resultManager(transaction, callback)).catch(err => callback(err));
    }

    async newTxID(transaction, callback) {

        if (!callback)
            return this.injectPromise(this.newTxID, transaction);

        this.tronWeb.fullNode
            .request(
                'wallet/getsignweight',
                transaction,
                'post'
            )
            .then(newTransaction => {
                newTransaction = newTransaction.transaction.transaction
                if (typeof transaction.visible === 'boolean') {
                    newTransaction.visible = transaction.visible
                }
                callback(null, newTransaction)
            })
            .catch(err => callback('Error generating a new transaction id.'));
    }

    async alterTransaction(transaction, options = {}, callback = false) {
        if (!callback)
            return this.injectPromise(this.alterTransaction, transaction, options);

        if (transaction.signature)
            return callback('You can not extend the expiration of a signed transaction.')

        if (options.data) {
            if (options.dataFormat !== 'hex')
                options.data = this.tronWeb.toHex(options.data);
            options.data = options.data.replace(/^0x/, '')
            if (options.data.length === 0)
                return callback('Invalid data provided');
            transaction.raw_data.data = options.data;
        }

        if (options.extension) {
            options.extension = parseInt(options.extension * 1000);
            if (isNaN(options.extension) || transaction.raw_data.expiration + options.extension <= Date.now() + 3000)
                return callback('Invalid extension provided');
            transaction.raw_data.expiration += options.extension;
        }

        this.newTxID(transaction, callback)
    }

    async extendExpiration(transaction, extension, callback = false) {
        if (!callback)
            return this.injectPromise(this.extendExpiration, transaction, extension);

        this.alterTransaction(transaction, {extension}, callback);
    }

    async addUpdateData(transaction, data, dataFormat = 'utf8', callback = false) {

        if (utils.isFunction(dataFormat)) {
            callback = dataFormat;
            dataFormat = 'utf8';
        }

        if (!callback)
            return this.injectPromise(this.addUpdateData, transaction, data, dataFormat);

        this.alterTransaction(transaction, {data, dataFormat}, callback);
    }

}
