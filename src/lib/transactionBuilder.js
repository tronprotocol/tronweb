import TronWeb from '../index';
import utils from '../utils';
import { AbiCoder } from '@ethersproject/abi';
import Validator from '../paramValidator';
import {ADDRESS_PREFIX_REGEX} from '../utils/address';
import injectpromise from 'injectpromise';
import {encodeParamsV2ByABI} from '../utils/abi';
import {txCheckWithArgs, txJsonToPb, txPbToTxID, txPbToRawDataHex} from '../utils/transaction';
import { keccak256 } from '../utils/ethersUtils';

let self;

//helpers

function toHex(value) {
    return TronWeb.address.toHex(value);
}

function fromUtf8(value) {
    return self.tronWeb.fromUtf8(value).replace(/^0x/, '');
}

function deepCopyJson(json) {
    return JSON.parse(JSON.stringify(json));
}

function resultManager(transaction, data, options, callback) {
    if (typeof options === 'function') {
        callback = options;
    }

    if (typeof data === 'function') {
        callback = data;
        data = null;
    }

    if (transaction.Error)
        return callback(transaction.Error);

    if (transaction.result && transaction.result.message) {
        return callback(
            self.tronWeb.toUtf8(transaction.result.message)
        );
    }
    const authResult = txCheckWithArgs(transaction, data, options);
    if(authResult) {
        return callback(null, transaction);
    }
    return callback('Invalid transaction');
}

function resultManagerTriggerSmartContract(transaction, data, options, callback) {
    if (transaction.Error)
        return callback(transaction.Error);

    if (transaction.result && transaction.result.message) {
        return callback(
            self.tronWeb.toUtf8(transaction.result.message)
        );
    }

    if(!(options._isConstant || options.estimateEnergy)) {
        const authResult = txCheckWithArgs(transaction.transaction, data, options);
        if(authResult) {
            return callback(null, transaction);
        }
        return callback('Invalid transaction');
    }
    return callback(null, transaction);
}

function genContractAddress(ownerAddress, txID) {
    return '41' + keccak256(Buffer.from(txID + ownerAddress, 'hex')).toString().substring(2).slice(24);
}

function getHeaderInfo(node) {
    return node.request('wallet/getblock', { detail: false }, 'post')
        .then((data) => {
            return {
                ref_block_bytes: data.block_header.raw_data.number.toString(16).slice(-4).padStart(4, '0'),
                ref_block_hash: data.blockID.slice(16, 32),
                expiration: data.block_header.raw_data.timestamp + 60 * 1000,
                timestamp: data.block_header.raw_data.timestamp,
            };
        });
}

async function createTransaction(tronWeb, type, value, Permission_id, options = {}) {
    const metaData = await getHeaderInfo(tronWeb.fullNode);
    const tx = {
        visible: false,
        txID: '',
        raw_data_hex: '',
        raw_data: {
            contract: [{
                parameter: {
                    value,
                    type_url: `type.googleapis.com/protocol.${type}`,
                },
                type,
            }],
            ...metaData,
            ...options,
        },
    };
    if (Permission_id) {
        tx.raw_data.contract[0].Permission_id = Permission_id;
    }
    const pb = txJsonToPb(tx);
    tx.txID = txPbToTxID(pb).replace(/^0x/, '');
    tx.raw_data_hex = txPbToRawDataHex(pb).toLowerCase();
    return tx;
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

        createTransaction(this.tronWeb, 'TransferContract', data, options?.permissionId)
            .then(transaction => callback(null, transaction))
            .catch(err => callback(err));
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

        createTransaction(this.tronWeb, 'TransferAssetContract', data, options?.permissionId)
            .then(transaction => callback(null, transaction))
            .catch(err => callback(err));
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

        createTransaction(this.tronWeb, 'ParticipateAssetIssueContract', data, options?.permissionId)
            .then(transaction => callback(null, transaction))
            .catch(err => callback(err));
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
                msg: 'Invalid resource provided: Expected "BANDWIDTH" or "ENERGY"'
            }
        ], callback))
            return;

        const data = {
            owner_address: toHex(address),
            frozen_balance: parseInt(amount),
            frozen_duration: parseInt(duration),
        };
        if (resource !== 'BANDWIDTH') {
            data.resource = resource;
        }

        if (utils.isNotNullOrUndefined(receiverAddress) && toHex(receiverAddress) !== toHex(address)) {
            data.receiver_address = toHex(receiverAddress)
        }

        createTransaction(this.tronWeb, 'FreezeBalanceContract', data, options?.permissionId)
            .then(transaction => callback(null, transaction))
            .catch(err => callback(err));
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
                msg: 'Invalid resource provided: Expected "BANDWIDTH" or "ENERGY"'
            }
        ], callback))
            return;

        const data = {
            owner_address: toHex(address),
        };
        if (resource !== 'BANDWIDTH') {
            data.resource = resource;
        }

        if (utils.isNotNullOrUndefined(receiverAddress) && toHex(receiverAddress) !== toHex(address)) {
            data.receiver_address = toHex(receiverAddress)
        }

        createTransaction(this.tronWeb, 'UnfreezeBalanceContract', data, options?.permissionId)
            .then(transaction => callback(null, transaction))
            .catch(err => callback(err));
    }

    freezeBalanceV2(amount = 0, resource = "BANDWIDTH", address = this.tronWeb.defaultAddress.hex, options, callback = false) {
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

        if (utils.isFunction(resource)) {
            callback = resource;
            resource = "BANDWIDTH";
        } else if (utils.isObject(resource)) {
            options = resource;
            resource = "BANDWIDTH";
        }

        if (!callback)
            return this.injectPromise(this.freezeBalanceV2, amount, resource, address, options);

        if (this.validator.notValid([
            {
                name: 'origin',
                type: 'address',
                value: address
            },
            {
                name: 'amount',
                type: 'integer',
                gt: 0,
                value: amount
            },
            {
                name: 'resource',
                type: 'resource',
                value: resource,
                msg: 'Invalid resource provided: Expected "BANDWIDTH" or "ENERGY"'
            }
        ], callback))
            return;

        const data = {
            owner_address: toHex(address),
            frozen_balance: parseInt(amount),
        };
        if (resource !== 'BANDWIDTH') {
            data.resource = resource;
        }

        createTransaction(this.tronWeb, 'FreezeBalanceV2Contract', data, options?.permissionId)
            .then(transaction => callback(null, transaction))
            .catch(err => callback(err));
    }

    unfreezeBalanceV2(amount = 0, resource = "BANDWIDTH", address = this.tronWeb.defaultAddress.hex, options, callback = false) {
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

        if (utils.isFunction(resource)) {
            callback = resource;
            resource = "BANDWIDTH";
        } else if (utils.isObject(resource)) {
            options = resource;
            resource = "BANDWIDTH";
        }

        if (!callback)
            return this.injectPromise(this.unfreezeBalanceV2, amount, resource, address, options);

        if (this.validator.notValid([
            {
                name: 'origin',
                type: 'address',
                value: address
            },
            {
                name: 'amount',
                type: 'integer',
                gt: 0,
                value: amount
            },
            {
                name: 'resource',
                type: 'resource',
                value: resource,
                msg: 'Invalid resource provided: Expected "BANDWIDTH" or "ENERGY"'
            }
        ], callback))
            return;

        const data = {
            owner_address: toHex(address),
            unfreeze_balance: parseInt(amount),
        };
        if (resource !== 'BANDWIDTH') {
            data.resource = resource;
        }

        createTransaction(this.tronWeb, 'UnfreezeBalanceV2Contract', data, options?.permissionId)
            .then(transaction => callback(null, transaction))
            .catch(err => callback(err));
    }

    cancelUnfreezeBalanceV2(address = this.tronWeb.defaultAddress.hex, options, callback = false) {
        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (utils.isFunction(address)) {
            callback = address;
            options = {};
            address = this.tronWeb.defaultAddress.hex;
        } else if (utils.isObject(address)) {
            options = address;
            address = this.tronWeb.defaultAddress.hex;
        }

        if (!callback)
            return this.injectPromise(this.cancelUnfreezeBalanceV2, address, options);

        if (this.validator.notValid([
            {
                name: 'origin',
                type: 'address',
                value: address,
            }
        ], callback))
            return;

        const data = {
            owner_address: toHex(address),
        };

        createTransaction(this.tronWeb, 'CancelAllUnfreezeV2Contract', data, options?.permissionId)
            .then(transaction => callback(null, transaction))
            .catch(err => callback(err));
    }

    delegateResource(
        amount = 0,
        receiverAddress,
        resource = "BANDWIDTH",
        address = this.tronWeb.defaultAddress.hex,
        lock = false,
        lockPeriod,
        options,
        callback = false
    ) {
        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (utils.isFunction(lockPeriod)) {
            callback = lockPeriod;
            lockPeriod = undefined;
        } else if (utils.isObject(lockPeriod)) {
            options = lockPeriod;
            lockPeriod = undefined;
        }

        if (utils.isFunction(lock)) {
            callback = lock;
            lock = false;
        } else if (utils.isObject(lock)) {
            options = lock;
            lock = false;
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
        } else if (utils.isObject(resource)) {
            options = resource;
            resource = "BANDWIDTH";
        }

        if (!callback)
            return this.injectPromise(this.delegateResource, amount, receiverAddress, resource, address, lock, lockPeriod, options);

        if (this.validator.notValid([
            {
                name: 'amount',
                type: 'integer',
                gt: 0,
                value: amount
            },
            {
                name: 'resource',
                type: 'resource',
                value: resource,
                msg: 'Invalid resource provided: Expected "BANDWIDTH" or "ENERGY"'
            },
            {
                name: 'receiver',
                type: 'address',
                value: receiverAddress
            },
            {
                name: 'origin',
                type: 'address',
                value: address
            },
            {
                name: 'lock',
                type: 'boolean',
                value: lock
            },
            {
                name: 'lock period',
                type: 'integer',
                gte: 0,
                value: lockPeriod,
                optional: true,
            }
        ], callback))
            return;

        if(toHex(receiverAddress) === toHex(address)) {
            return callback('Receiver address must not be the same as owner address');
        }

        const data = {
            owner_address: toHex(address),
            receiver_address: toHex(receiverAddress),
            balance: parseInt(amount),
        };
        if (resource !== 'BANDWIDTH') {
            data.resource = resource;
        }
        if (lock) {
            data.lock = lock;
            if (utils.isNotNullOrUndefined(lockPeriod)) {
                data.lock_period = lockPeriod;
            }
        }

        createTransaction(this.tronWeb, 'DelegateResourceContract', data, options?.permissionId)
            .then(transaction => callback(null, transaction))
            .catch(err => callback(err));
    }

    undelegateResource(amount = 0, receiverAddress, resource = "BANDWIDTH", address = this.tronWeb.defaultAddress.hex, options, callback = false) {
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

        if (utils.isFunction(resource)) {
            callback = resource;
            resource = "BANDWIDTH";
        } else if (utils.isObject(resource)) {
            options = resource;
            resource = "BANDWIDTH";
        }

        if (!callback)
            return this.injectPromise(this.undelegateResource, amount, receiverAddress, resource, address, options);

        if (this.validator.notValid([
            {
                name: 'origin',
                type: 'address',
                value: address
            },
            {
                name: 'receiver',
                type: 'address',
                value: receiverAddress
            },
            {
                name: 'amount',
                type: 'integer',
                gt: 0,
                value: amount
            },
            {
                name: 'resource',
                type: 'resource',
                value: resource,
                msg: 'Invalid resource provided: Expected "BANDWIDTH" or "ENERGY"'
            }
        ], callback))
            return;

        if(toHex(receiverAddress) === toHex(address)) {
            return callback('Receiver address must not be the same as owner address');
        }

        const data = {
            owner_address: toHex(address),
            receiver_address: toHex(receiverAddress),
            balance: parseInt(amount),
        };
        if (resource !== 'BANDWIDTH') {
            data.resource = resource;
        }

        createTransaction(this.tronWeb, 'UnDelegateResourceContract', data, options?.permissionId)
            .then(transaction => callback(null, transaction))
            .catch(err => callback(err));
    }

    withdrawExpireUnfreeze(address = this.tronWeb.defaultAddress.hex, options, callback = false) {
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
            return this.injectPromise(this.withdrawExpireUnfreeze, address, options);

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
        }

        createTransaction(this.tronWeb, 'WithdrawExpireUnfreezeContract', data, options?.permissionId)
            .then(transaction => callback(null, transaction))
            .catch(err => callback(err));
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

        createTransaction(this.tronWeb, 'WithdrawBalanceContract', data, options?.permissionId)
            .then(transaction => callback(null, transaction))
            .catch(err => callback(err));
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
            },
            {
                name: 'url',
                type: 'string',
                value: url,
                lte: 256,
                msg: 'Invalid url provided'
            },
        ], callback))
            return;


        const data = {
            owner_address: toHex(address),
            url: fromUtf8(url),
        };

        createTransaction(this.tronWeb, 'WitnessCreateContract', data, options?.permissionId)
            .then(transaction => callback(null, transaction))
            .catch(err => callback(err));
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

        createTransaction(this.tronWeb, 'VoteWitnessContract', data, options?.permissionId)
            .then(transaction => callback(null, transaction))
            .catch(err => callback(err));
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

        new Promise((resolve) => {
                const contract = {};
                contract.owner_address = args.owner_address;
                if (utils.isNotNullOrUndefined(args.call_token_value)) {
                    contract.call_token_value = args.call_token_value;
                }
                if (utils.isNotNullOrUndefined(args.token_id)) {
                    contract.token_id = args.token_id;
                }
                const new_contract = contract.new_contract = {};

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
                if (utils.isNotNullOrUndefined(args.name)) {
                    new_contract.name = args.name;
                }

                resolve(contract);
            })
            .then(async contract => {
                const tx = await createTransaction(this.tronWeb, 'CreateSmartContract', contract, options?.permissionId, { fee_limit: args.fee_limit })
                tx.contract_address = genContractAddress(args.owner_address, tx.txID);
                return tx;
            })
            .then(transaction => callback(null, transaction))
            .catch(err => callback(err));
    }

    triggerSmartContract(...params) {
        if (typeof params[2] !== 'object') {
            params[2] = {
                feeLimit: params[2],
                callValue: params[3]
            }
            params.splice(3, 1)
        }
        if (params[2]?.txLocal) {
            return this._triggerSmartContractLocal(...params);
        }
        return this._triggerSmartContract(...params);
    }

    triggerConstantContract(...params) {
        params[2]._isConstant = true
        return this._triggerSmartContract(...params);
    }

    triggerConfirmedConstantContract(...params) {
        params[2]._isConstant = true
        params[2].confirmed = true
        return this._triggerSmartContract(...params);
    }

    estimateEnergy(...params) {
        params[2].estimateEnergy = true;
        return this._triggerSmartContract(...params);
    }

    async deployConstantContract(options = {}) {
        const {
            input,
            ownerAddress,
            tokenId,
            tokenValue,
            callValue = 0,
        } = options;

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
                gte: 0
            },
            {
                name: 'owner',
                type: 'address',
                value: ownerAddress
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
        ], (str) => {
            throw new Error(str);
        });

        const args = {
            data: input,
            owner_address: toHex(ownerAddress),
            call_value: callValue,
        }

        if (tokenId) {
            args.token_id = tokenId;
        }
        if (tokenValue) {
            args.call_token_value = tokenValue;
        }

        const pathInfo = `wallet${options.confirmed ? 'solidity' : ''}/estimateenergy`;
        return this.tronWeb[options.confirmed ? 'solidityNode' : 'fullNode']
            .request(pathInfo, args, 'post')
            .then(transaction => {
                if (transaction.Error)
                    throw new Error(transaction.Error);

                if (transaction.result && transaction.result.message) {
                    throw new Error(
                        this.tronWeb.toUtf8(transaction.result.message)
                    );
                }
                return transaction;
            });
    }

    _getTriggerSmartContractArgs(
        contractAddress,
        functionSelector,
        options,
        parameters,
        issuerAddress,
        tokenValue,
        tokenId,
        callValue,
        feeLimit,
    ) {
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
        } else if (options.input) {
            args.data = options.input;
        }

        args.call_value = parseInt(callValue)
        if (utils.isNotNullOrUndefined(tokenValue))
            args.call_token_value = parseInt(tokenValue)
        if (utils.isNotNullOrUndefined(tokenId))
            args.token_id = parseInt(tokenId)

        if (!(options._isConstant || options.estimateEnergy)) {
            args.fee_limit = parseInt(feeLimit)
        }

        if (options.permissionId) {
            args.Permission_id = options.permissionId;
        }

        return args;
    }

    _triggerSmartContractLocal(
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
                this._triggerSmartContractLocal,
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
        const value = {
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
        createTransaction(
            this.tronWeb,
            'TriggerSmartContract',
            value,
            options.permissionId,
            {
                fee_limit: args.fee_limit,
            }
        ).then(transaction => {
            callback(null, {
                result: {
                    result: true,
                },
                transaction,
            });
        }).catch(err => callback(err));
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
        if(options._isConstant) {
            pathInfo = 'triggerconstantcontract';
        } else if (options.estimateEnergy) {
            pathInfo = 'estimateenergy';
        }

        pathInfo = `wallet${options.confirmed ? 'solidity' : ''}/${pathInfo}`;
        this.tronWeb[options.confirmed ? 'solidityNode' : 'fullNode'].request(pathInfo, args, 'post').then(transaction => resultManagerTriggerSmartContract(transaction, args, options, callback)).catch(err => callback(err));
    }

    clearABI(contractAddress, ownerAddress = this.tronWeb.defaultAddress.hex, options, callback = false) {
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
            return this.injectPromise(this.clearABI, contractAddress, ownerAddress, options);

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

        createTransaction(this.tronWeb, 'ClearABIContract', data, options?.permissionId)
            .then(transaction => callback(null, transaction))
            .catch(err => callback(err));

    }

    updateBrokerage(brokerage, ownerAddress = this.tronWeb.defaultAddress.hex, options, callback = false) {
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
            return this.injectPromise(this.updateBrokerage, brokerage, ownerAddress, options);

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

        createTransaction(this.tronWeb, 'UpdateBrokerageContract', data, options?.permissionId)
            .then(transaction => callback(null, transaction))
            .catch(err => callback(err));
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
            description = '',
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
                type: 'string',
                value: abbreviation,
                lte: 32,
                gt: 0
            },
            {
                name: 'token name',
                type: 'not-empty-string',
                value: name
            },
            {
                name: 'token description',
                type: 'string',
                value: description,
                lte: 200
            },
            {
                name: 'token url',
                type: 'url',
                value: url
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
            frozen_supply: [{
                frozen_amount: parseInt(frozenAmount),
                frozen_days: parseInt(frozenDuration)
            }]
        };
        ['name', 'abbr', 'description', 'url'].forEach((key) => {
            if (!data[key]) {
                delete data[key];
            }
        });
        if (!(parseInt(frozenAmount) > 0)) {
            delete data.frozen_supply
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
            data.vote_score = parseInt(voteScore)
        }

        createTransaction(this.tronWeb, 'AssetIssueContract', data, options?.permissionId)
            .then(transaction => callback(null, transaction))
            .catch(err => callback(err));
    }

    createAccount(accountAddress, address = this.tronWeb.defaultAddress.hex, options, callback = false) {
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
            return this.injectPromise(this.createAccount, accountAddress, address, options);
        }

        if (this.validator.notValid([
            {
                name: 'account',
                type: 'address',
                value: accountAddress
            },
            {
                name: 'origin',
                type: 'address',
                value: address
            }
        ], callback))
            return;

        const data = {
            owner_address: toHex(address),
            account_address: toHex(accountAddress),
        };

        createTransaction(this.tronWeb, 'AccountCreateContract', data, options?.permissionId)
            .then(transaction => callback(null, transaction))
            .catch(err => callback(err));
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
                type: 'string',
                lte: 200,
                gt: 0,
                value: accountName,
                msg: 'Invalid accountName'
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

        createTransaction(this.tronWeb, 'AccountUpdateContract', data, options?.permissionId)
            .then(transaction => callback(null, transaction))
            .catch(err => callback(err));
    }

    setAccountId(accountId, address = this.tronWeb.defaultAddress.hex, options, callback = false) {
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
            return this.injectPromise(this.setAccountId, accountId, address, options);
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

        const data = {
            account_id: accountId,
            owner_address: toHex(address),
        }

        createTransaction(this.tronWeb, 'SetAccountIdContract', data, options?.permissionId)
            .then(transaction => callback(null, transaction))
            .catch(err => callback(err));
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
            description = '',
            url = false,
            freeBandwidth = 0, // The creator's "donated" bandwidth for use by token holders
            freeBandwidthLimit = 0 // Out of `totalFreeBandwidth`, the amount each token holder get
        } = options;


        if (this.validator.notValid([
            {
                name: 'token description',
                type: 'string',
                value: description,
                lte: 200
            },
            {
                name: 'token url',
                type: 'url',
                value: url
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
                value: issuerAddress
            },
        ], callback))
            return;

        const data = {
            owner_address: toHex(issuerAddress),
            description: fromUtf8(description),
            url: fromUtf8(url),
        };

        if (freeBandwidth && !isNaN(parseInt(freeBandwidth)) && parseInt(freeBandwidth) >= 0) {
            data.new_limit = parseInt(freeBandwidth);
        }
        if (freeBandwidthLimit && !isNaN(parseInt(freeBandwidthLimit)) && parseInt(freeBandwidthLimit) >= 0) {
            data.new_public_limit = parseInt(freeBandwidthLimit);
        }

        createTransaction(this.tronWeb, 'UpdateAssetContract', data, options?.permissionId)
            .then(transaction => callback(null, transaction))
            .catch(err => callback(err));
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

        createTransaction(this.tronWeb, 'ProposalCreateContract', data, options?.permissionId)
            .then(transaction => callback(null, transaction))
            .catch(err => callback(err));
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

        createTransaction(this.tronWeb, 'ProposalDeleteContract', data, options?.permissionId)
            .then(transaction => callback(null, transaction))
            .catch(err => callback(err));
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

        createTransaction(this.tronWeb, 'ProposalApproveContract', data, options?.permissionId)
            .then(transaction => callback(null, transaction))
            .catch(err => callback(err));
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

        createTransaction(this.tronWeb, 'ExchangeCreateContract', data, options?.permissionId)
            .then(transaction => callback(null, transaction))
            .catch(err => callback(err));
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

        createTransaction(this.tronWeb, 'ExchangeCreateContract', data, options?.permissionId)
            .then(transaction => callback(null, transaction))
            .catch(err => callback(err));
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

        createTransaction(this.tronWeb, 'ExchangeInjectContract', data, options?.permissionId)
            .then(transaction => callback(null, transaction))
            .catch(err => callback(err));
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

        createTransaction(this.tronWeb, 'ExchangeWithdrawContract', data, options?.permissionId)
            .then(transaction => callback(null, transaction))
            .catch(err => callback(err));
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
            token_id: this.tronWeb.fromAscii(tokenName).replace(/^0x/, ''),
            quant: parseInt(tokenAmountSold),
            expected: parseInt(tokenAmountExpected)
        };

        createTransaction(this.tronWeb, 'ExchangeTransactionContract', data, options?.permissionId)
            .then(transaction => callback(null, transaction))
            .catch(err => callback(err));
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

        createTransaction(this.tronWeb, 'UpdateSettingContract', data, options?.permissionId)
            .then(transaction => callback(null, transaction))
            .catch(err => callback(err));
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

        createTransaction(this.tronWeb, 'UpdateEnergyLimitContract', data, options?.permissionId)
            .then(transaction => callback(null, transaction))
            .catch(err => callback(err));
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

    updateAccountPermissions(
        ownerAddress = this.tronWeb.defaultAddress.hex,
        ownerPermissions = false,
        witnessPermissions = false,
        activesPermissions = false,
        options,
        callback = false
    ) {
        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

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
            return this.injectPromise(this.updateAccountPermissions, ownerAddress, ownerPermissions, witnessPermissions, activesPermissions, options);

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
            owner_address: toHex(ownerAddress)
        }
        if (ownerPermissions) {
            const _ownerPermissions = deepCopyJson(ownerPermissions);
            // for compatible with old way of building transaction from chain which type prop is omitted
            if ('type' in _ownerPermissions) {
                delete _ownerPermissions.type;
            }
            data.owner = _ownerPermissions;
        }
        if (witnessPermissions) {
            const _witnessPermissions = deepCopyJson(witnessPermissions);
            // for compatible with old way of building transaction from chain which type prop is Witness
            _witnessPermissions.type = 'Witness';
            data.witness = _witnessPermissions;
        }
        if (activesPermissions) {
            const _activesPermissions = deepCopyJson(activesPermissions);
            // for compatible with old way of building transaction from chain which type prop is Active
            _activesPermissions.forEach((activePermissions) => {
                activePermissions.type = 'Active';
            });
            data.actives = _activesPermissions;
        }

        createTransaction(this.tronWeb, 'AccountPermissionUpdateContract', data, options?.permissionId)
            .then(transaction => callback(null, transaction))
            .catch(err => callback(err));
    }

    async newTxID(transaction, options, callback) {
        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (!callback)
            return this.injectPromise(this.newTxID, transaction, options);

        if (options?.txLocal) {
            const contract = transaction.raw_data.contract[0];
            createTransaction(this.tronWeb, contract.type, contract.parameter.value, contract.Permission_id, {
                fee_limit: transaction.raw_data.fee_limit,
                data: transaction.raw_data.data,
                ref_block_bytes: transaction.raw_data.ref_block_bytes,
                ref_block_hash: transaction.raw_data.ref_block_hash,
                expiration: transaction.raw_data.expiration,
                timestamp: transaction.raw_data.timestamp,
            }).then((tx) => {
                tx.signature = transaction.signature;
                tx.visible = transaction.visible;
                callback(null, tx);
            }).catch((err) => callback('Error generating a new transaction id.'));
            return;
        }

        this.tronWeb.fullNode
            .request(
                'wallet/getsignweight',
                transaction,
                'post'
            )
            .then(newTransaction => {
                if (typeof transaction.visible === 'boolean') {
                    newTransaction.transaction.transaction.visible = transaction.visible
                }
                return resultManager(
                    newTransaction.transaction.transaction,
                    {
                        ...transaction.raw_data.contract[0].parameter.value,
                        Permission_id: transaction.raw_data.contract[0].Permission_id,
                    },
                    { data: transaction.raw_data.data, fee_limit: transaction.raw_data.fee_limit },
                    callback
                );
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

        this.newTxID(transaction, { txLocal: options.txLocal }, callback)
    }

    async extendExpiration(transaction, extension, options, callback = false) {
        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (!callback)
            return this.injectPromise(this.extendExpiration, transaction, extension, options);

        this.alterTransaction(transaction, {extension, txLocal: options?.txLocal}, callback);
    }

    async addUpdateData(transaction, data, dataFormat = 'utf8', options, callback = false) {
        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (utils.isFunction(dataFormat)) {
            callback = dataFormat;
            dataFormat = 'utf8';
        } else if (utils.isObject(dataFormat)) {
            options = dataFormat;
            dataFormat = 'utf8';
        }

        if (!callback)
            return this.injectPromise(this.addUpdateData, transaction, data, dataFormat, options);

        this.alterTransaction(transaction, {data, dataFormat, txLocal: options?.txLocal}, callback);
    }

}
