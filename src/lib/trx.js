import TronWeb from '../index';
import utils from '../utils';
import { keccak256, toUtf8Bytes, recoverAddress, SigningKey } from '../utils/ethersUtils';
import { ADDRESS_PREFIX } from '../utils/address';
import Validator from "../paramValidator";
import injectpromise from 'injectpromise';
import { txCheck } from '../utils/transaction';

const TRX_MESSAGE_HEADER = '\x19TRON Signed Message:\n32';
// it should be: '\x15TRON Signed Message:\n32';
const ETH_MESSAGE_HEADER = '\x19Ethereum Signed Message:\n32';

function toHex(value) {
    return TronWeb.address.toHex(value);
}

export default class Trx {
    constructor(tronWeb = false) {
        if (!tronWeb || !tronWeb instanceof TronWeb)
            throw new Error('Expected instance of TronWeb');

        this.tronWeb = tronWeb;
        this.injectPromise = injectpromise(this);
        this.cache = {
            contracts: {}
        }
        this.validator = new Validator(tronWeb);
    }

    _parseToken(token) {
        return {
            ...token,
            name: this.tronWeb.toUtf8(token.name),
            abbr: token.abbr && this.tronWeb.toUtf8(token.abbr),
            description: token.description && this.tronWeb.toUtf8(token.description),
            url: token.url && this.tronWeb.toUtf8(token.url)
        };
    }

    getCurrentBlock(callback = false) {
        if (!callback)
            return this.injectPromise(this.getCurrentBlock);
        this.tronWeb.fullNode.request('wallet/getnowblock').then(block => {
            callback(null, block);
        }).catch(err => callback(err));
    }

    getConfirmedCurrentBlock(callback = false) {
        if (!callback)
            return this.injectPromise(this.getConfirmedCurrentBlock);

        this.tronWeb.solidityNode.request('walletsolidity/getnowblock').then(block => {
            callback(null, block);
        }).catch(err => callback(err));
    }

    getBlock(block = this.tronWeb.defaultBlock, callback = false) {
        if (utils.isFunction(block)) {
            callback = block;
            block = this.tronWeb.defaultBlock;
        }

        if (!callback)
            return this.injectPromise(this.getBlock, block);

        if (block === false)
            return callback('No block identifier provided');

        if (block == 'earliest')
            block = 0;

        if (block == 'latest')
            return this.getCurrentBlock(callback);

        if (isNaN(block) && utils.isHex(block))
            return this.getBlockByHash(block, callback);

        this.getBlockByNumber(block, callback);
    }

    getBlockByHash(blockHash, callback = false) {
        if (!callback)
            return this.injectPromise(this.getBlockByHash, blockHash);

        this.tronWeb.fullNode.request('wallet/getblockbyid', {
            value: blockHash
        }, 'post').then(block => {
            if (!Object.keys(block).length)
                return callback('Block not found');

            callback(null, block);
        }).catch(err => callback(err));
    }

    getBlockByNumber(blockID, callback = false) {
        if (!callback)
            return this.injectPromise(this.getBlockByNumber, blockID);

        if (!utils.isInteger(blockID) || blockID < 0)
            return callback('Invalid block number provided');

        this.tronWeb.fullNode.request('wallet/getblockbynum', {
            num: parseInt(blockID)
        }, 'post').then(block => {
            if (!Object.keys(block).length)
                return callback('Block not found');

            callback(null, block);
        }).catch(err => callback(err));
    }

    getBlockTransactionCount(block = this.tronWeb.defaultBlock, callback = false) {
        if (utils.isFunction(block)) {
            callback = block;
            block = this.tronWeb.defaultBlock;
        }

        if (!callback)
            return this.injectPromise(this.getBlockTransactionCount, block);

        this.getBlock(block).then(({transactions = []}) => {
            callback(null, transactions.length);
        }).catch(err => callback(err));
    }

    getTransactionFromBlock(block = this.tronWeb.defaultBlock, index, callback = false) {
        if (utils.isFunction(index)) {
            callback = index;
            index = 0;
        }

        if (utils.isFunction(block)) {
            callback = block;
            block = this.tronWeb.defaultBlock;
        }

        if (!callback)
            return this.injectPromise(this.getTransactionFromBlock, block, index);

        this.getBlock(block).then(({transactions = false}) => {
            if (!transactions)
                callback('Transaction not found in block');
            else if (typeof index == 'number') {
                if (index >= 0 && index < transactions.length)
                    callback(null, transactions[index]);
                else
                    callback('Invalid transaction index provided');
            } else
                callback(null, transactions);
        }).catch(err => callback(err));
    }

    getTransaction(transactionID, callback = false) {
        if (!callback)
            return this.injectPromise(this.getTransaction, transactionID);

        this.tronWeb.fullNode.request('wallet/gettransactionbyid', {
            value: transactionID
        }, 'post').then(transaction => {
            if (!Object.keys(transaction).length)
                return callback('Transaction not found');

            callback(null, transaction);
        }).catch(err => callback(err));
    }

    getConfirmedTransaction(transactionID, callback = false) {
        if (!callback)
            return this.injectPromise(this.getConfirmedTransaction, transactionID);

        this.tronWeb.solidityNode.request('walletsolidity/gettransactionbyid', {
            value: transactionID
        }, 'post').then(transaction => {
            if (!Object.keys(transaction).length)
                return callback('Transaction not found');

            callback(null, transaction);
        }).catch(err => callback(err));
    }

    getUnconfirmedTransactionInfo(transactionID, callback = false) {
        return this._getTransactionInfoById(transactionID, {confirmed: false}, callback)
    }

    getTransactionInfo(transactionID, callback = false) {
        return this._getTransactionInfoById(transactionID, {confirmed: true}, callback)
    }

    _getTransactionInfoById(transactionID, options, callback = false) {
        if (!callback)
            return this.injectPromise(this._getTransactionInfoById, transactionID, options);

        this.tronWeb[options.confirmed ? 'solidityNode' : 'fullNode'].request(`wallet${options.confirmed ? 'solidity' : ''}/gettransactioninfobyid`, {
            value: transactionID
        }, 'post').then(transaction => {
            callback(null, transaction);
        }).catch(err => callback(err));
    }

    getTransactionsToAddress(address = this.tronWeb.defaultAddress.hex, limit = 30, offset = 0, callback = false) {
        if (utils.isFunction(offset)) {
            callback = offset;
            offset = 0;
        }

        if (utils.isFunction(limit)) {
            callback = limit;
            limit = 30;
        }

        if (!callback)
            return this.injectPromise(this.getTransactionsToAddress, address, limit, offset);

        address = this.tronWeb.address.toHex(address);

        return this.getTransactionsRelated(address, 'to', limit, offset, callback);
    }

    getTransactionsFromAddress(address = this.tronWeb.defaultAddress.hex, limit = 30, offset = 0, callback = false) {
        if (utils.isFunction(offset)) {
            callback = offset;
            offset = 0;
        }

        if (utils.isFunction(limit)) {
            callback = limit;
            limit = 30;
        }

        if (!callback)
            return this.injectPromise(this.getTransactionsFromAddress, address, limit, offset);

        address = this.tronWeb.address.toHex(address);

        return this.getTransactionsRelated(address, 'from', limit, offset, callback);
    }

    async getTransactionsRelated(address = this.tronWeb.defaultAddress.hex, direction = 'all', limit = 30, offset = 0, callback = false) {
        if (utils.isFunction(offset)) {
            callback = offset;
            offset = 0;
        }

        if (utils.isFunction(limit)) {
            callback = limit;
            limit = 30;
        }

        if (utils.isFunction(direction)) {
            callback = direction;
            direction = 'all';
        }

        if (utils.isFunction(address)) {
            callback = address;
            address = this.tronWeb.defaultAddress.hex;
        }

        if (!callback)
            return this.injectPromise(this.getTransactionsRelated, address, direction, limit, offset);

        if (!['to', 'from', 'all'].includes(direction))
            return callback('Invalid direction provided: Expected "to", "from" or "all"');

        if (direction == 'all') {
            try {
                const [from, to] = await Promise.all([
                    this.getTransactionsRelated(address, 'from', limit, offset),
                    this.getTransactionsRelated(address, 'to', limit, offset)
                ])

                return callback(null, [
                    ...from.map(tx => (tx.direction = 'from', tx)),
                    ...to.map(tx => (tx.direction = 'to', tx))
                ].sort((a, b) => {
                    return b.raw_data.timestamp - a.raw_data.timestamp
                }));
            } catch (ex) {
                return callback(ex);
            }
        }

        if (!this.tronWeb.isAddress(address))
            return callback('Invalid address provided');

        if (!utils.isInteger(limit) || limit < 0 || (offset && limit < 1))
            return callback('Invalid limit provided');

        if (!utils.isInteger(offset) || offset < 0)
            return callback('Invalid offset provided');

        address = this.tronWeb.address.toHex(address);

        this.tronWeb.solidityNode.request(`walletextension/gettransactions${direction}this`, {
            account: {
                address
            },
            offset,
            limit
        }, 'post').then(({transaction}) => {
            callback(null, transaction);
        }).catch(err => callback(err));
    }

    getAccount(address = this.tronWeb.defaultAddress.hex, callback = false) {
        if (utils.isFunction(address)) {
            callback = address;
            address = this.tronWeb.defaultAddress.hex;
        }

        if (!callback)
            return this.injectPromise(this.getAccount, address);

        if (!this.tronWeb.isAddress(address))
            return callback('Invalid address provided');

        address = this.tronWeb.address.toHex(address);

        this.tronWeb.solidityNode.request('walletsolidity/getaccount', {
            address
        }, 'post').then(account => {
            callback(null, account);
        }).catch(err => callback(err));
    }

    getAccountById(id = false, callback = false) {
        if (!callback)
            return this.injectPromise(this.getAccountById, id);

        this.getAccountInfoById(id, {confirmed: true}, callback);
    }

    getAccountInfoById(id, options, callback) {
        if (this.validator.notValid([
            {
                name: 'accountId',
                type: 'hex',
                value: id
            },
            {
                name: 'accountId',
                type: 'string',
                lte: 32,
                gte: 8,
                value: id
            }
        ], callback))
            return;

        if (id.startsWith('0x')) {
            id = id.slice(2);
        }

        this.tronWeb[options.confirmed ? 'solidityNode' : 'fullNode'].request(`wallet${options.confirmed ? 'solidity' : ''}/getaccountbyid`, {
            account_id: id
        }, 'post').then(account => {
            callback(null, account);
        }).catch(err => callback(err));
    }

    getBalance(address = this.tronWeb.defaultAddress.hex, callback = false) {
        if (utils.isFunction(address)) {
            callback = address;
            address = this.tronWeb.defaultAddress.hex;
        }

        if (!callback)
            return this.injectPromise(this.getBalance, address);

        this.getAccount(address).then(({balance = 0}) => {
            callback(null, balance);
        }).catch(err => callback(err));
    }

    getUnconfirmedAccount(address = this.tronWeb.defaultAddress.hex, callback = false) {
        if (utils.isFunction(address)) {
            callback = address;
            address = this.tronWeb.defaultAddress.hex;
        }

        if (!callback)
            return this.injectPromise(this.getUnconfirmedAccount, address);

        if (!this.tronWeb.isAddress(address))
            return callback('Invalid address provided');

        address = this.tronWeb.address.toHex(address);

        this.tronWeb.fullNode.request('wallet/getaccount', {
            address
        }, 'post').then(account => {
            callback(null, account);
        }).catch(err => callback(err));
    }

    getUnconfirmedAccountById(id, callback = false) {
        if (!callback)
            return this.injectPromise(this.getUnconfirmedAccountById, id);

        this.getAccountInfoById(id, {confirmed: false}, callback);
    }

    getUnconfirmedBalance(address = this.tronWeb.defaultAddress.hex, callback = false) {
        if (utils.isFunction(address)) {
            callback = address;
            address = this.tronWeb.defaultAddress.hex;
        }

        if (!callback)
            return this.injectPromise(this.getUnconfirmedBalance, address);

        this.getUnconfirmedAccount(address).then(({balance = 0}) => {
            callback(null, balance);
        }).catch(err => callback(err));
    }

    getBandwidth(address = this.tronWeb.defaultAddress.hex, callback = false) {
        if (utils.isFunction(address)) {
            callback = address;
            address = this.tronWeb.defaultAddress.hex;
        }

        if (!callback)
            return this.injectPromise(this.getBandwidth, address);

        if (!this.tronWeb.isAddress(address))
            return callback('Invalid address provided');

        address = this.tronWeb.address.toHex(address);

        this.tronWeb.fullNode.request('wallet/getaccountnet', {
            address
        }, 'post').then(({freeNetUsed = 0, freeNetLimit = 0, NetUsed = 0, NetLimit = 0}) => {
            callback(null, (freeNetLimit - freeNetUsed) + (NetLimit - NetUsed));
        }).catch(err => callback(err));
    }

    getTokensIssuedByAddress(address = this.tronWeb.defaultAddress.hex, callback = false) {
        if (utils.isFunction(address)) {
            callback = address;
            address = this.tronWeb.defaultAddress.hex;
        }

        if (!callback)
            return this.injectPromise(this.getTokensIssuedByAddress, address);

        if (!this.tronWeb.isAddress(address))
            return callback('Invalid address provided');

        address = this.tronWeb.address.toHex(address);

        this.tronWeb.fullNode.request('wallet/getassetissuebyaccount', {
            address
        }, 'post').then(({assetIssue = false}) => {
            if (!assetIssue)
                return callback(null, {});

            const tokens = assetIssue.map(token => {
                return this._parseToken(token);
            }).reduce((tokens, token) => {
                return tokens[token.name] = token, tokens;
            }, {});

            callback(null, tokens);
        }).catch(err => callback(err));
    }

    getTokenFromID(tokenID = false, callback = false) {
        if (!callback)
            return this.injectPromise(this.getTokenFromID, tokenID);

        if (utils.isInteger(tokenID))
            tokenID = tokenID.toString()

        if (!utils.isString(tokenID) || !tokenID.length)
            return callback('Invalid token ID provided');

        this.tronWeb.fullNode.request('wallet/getassetissuebyname', {
            value: this.tronWeb.fromUtf8(tokenID)
        }, 'post').then(token => {
            if (!token.name)
                return callback('Token does not exist');

            callback(null, this._parseToken(token));
        }).catch(err => callback(err));
    }

    listNodes(callback = false) {
        if (!callback)
            return this.injectPromise(this.listNodes);

        this.tronWeb.fullNode.request('wallet/listnodes').then(({nodes = []}) => {
            callback(null, nodes.map(({address: {host, port}}) => (
                `${this.tronWeb.toUtf8(host)}:${port}`
            )));
        }).catch(err => callback(err));
    }

    getBlockRange(start = 0, end = 30, callback = false) {
        if (utils.isFunction(end)) {
            callback = end;
            end = 30;
        }

        if (utils.isFunction(start)) {
            callback = start;
            start = 0;
        }

        if (!callback)
            return this.injectPromise(this.getBlockRange, start, end);

        if (!utils.isInteger(start) || start < 0)
            return callback('Invalid start of range provided');

        if (!utils.isInteger(end) || end <= start)
            return callback('Invalid end of range provided');

        this.tronWeb.fullNode.request('wallet/getblockbylimitnext', {
            startNum: parseInt(start),
            endNum: parseInt(end) + 1
        }, 'post').then(({block = []}) => {
            callback(null, block);
        }).catch(err => callback(err));
    }

    listSuperRepresentatives(callback = false) {
        if (!callback)
            return this.injectPromise(this.listSuperRepresentatives);

        this.tronWeb.fullNode.request('wallet/listwitnesses').then(({witnesses = []}) => {
            callback(null, witnesses);
        }).catch(err => callback(err));
    }

    listTokens(limit = 0, offset = 0, callback = false) {
        if (utils.isFunction(offset)) {
            callback = offset;
            offset = 0;
        }

        if (utils.isFunction(limit)) {
            callback = limit;
            limit = 0;
        }

        if (!callback)
            return this.injectPromise(this.listTokens, limit, offset);

        if (!utils.isInteger(limit) || limit < 0 || (offset && limit < 1))
            return callback('Invalid limit provided');

        if (!utils.isInteger(offset) || offset < 0)
            return callback('Invalid offset provided');

        if (!limit) {
            return this.tronWeb.fullNode.request('wallet/getassetissuelist').then(({assetIssue = []}) => {
                callback(null, assetIssue.map(token => this._parseToken(token)));
            }).catch(err => callback(err));
        }

        this.tronWeb.fullNode.request('wallet/getpaginatedassetissuelist', {
            offset: parseInt(offset),
            limit: parseInt(limit)
        }, 'post').then(({assetIssue = []}) => {
            callback(null, assetIssue.map(token => this._parseToken(token)));
        }).catch(err => callback(err));
    }

    timeUntilNextVoteCycle(callback = false) {
        if (!callback)
            return this.injectPromise(this.timeUntilNextVoteCycle);

        this.tronWeb.fullNode.request('wallet/getnextmaintenancetime').then(({num = -1}) => {
            if (num == -1)
                return callback('Failed to get time until next vote cycle');

            callback(null, Math.floor(num / 1000));
        }).catch(err => callback(err));
    }

    getContract(contractAddress, callback = false) {
        if (!callback)
            return this.injectPromise(this.getContract, contractAddress);

        if (!this.tronWeb.isAddress(contractAddress))
            return callback('Invalid contract address provided');

        if (this.cache.contracts[contractAddress]) {
            callback(null, this.cache.contracts[contractAddress]);
            return;
        }

        contractAddress = this.tronWeb.address.toHex(contractAddress);

        this.tronWeb.fullNode.request('wallet/getcontract', {
            value: contractAddress
        }).then(contract => {
            if (contract.Error)
                return callback('Contract does not exist');
            this.cache.contracts[contractAddress] = contract;
            callback(null, contract);
        }).catch(err => callback(err));
    }

    async verifyMessage(message = false, signature = false, address = this.tronWeb.defaultAddress.base58, useTronHeader = true, callback = false) {
        if (utils.isFunction(address)) {
            callback = address;
            address = this.tronWeb.defaultAddress.base58;
            useTronHeader = true;
        }

        if (utils.isFunction(useTronHeader)) {
            callback = useTronHeader;
            useTronHeader = true;
        }

        if (!callback)
            return this.injectPromise(this.verifyMessage, message, signature, address, useTronHeader);

        if (!utils.isHex(message))
            return callback('Expected hex message input');

        if (Trx.verifySignature(message, address, signature, useTronHeader))
            return callback(null, true);

        callback('Signature does not match');
    }

    static verifySignature(message, address, signature, useTronHeader = true) {
        message = message.replace(/^0x/, '');
        signature = signature.replace(/^0x/, '');
        const messageBytes = [
            ...toUtf8Bytes(useTronHeader ? TRX_MESSAGE_HEADER : ETH_MESSAGE_HEADER),
            ...utils.code.hexStr2byteArray(message)
        ];

        const messageDigest = keccak256(new Uint8Array(messageBytes));
        const recovered = recoverAddress(messageDigest, {
            yParity: signature.substring(128, 130) == '1c' ? 1 : 0,
            r: '0x' + signature.substring(0, 64),
            s: '0x' + signature.substring(64, 128)
        });

        const tronAddress = ADDRESS_PREFIX + recovered.substr(2);
        const base58Address = TronWeb.address.fromHex(tronAddress);

        return base58Address == TronWeb.address.fromHex(address);
    }

    verifyMessageV2(message = false, signature = false, options = {}, callback = false) {
        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (!callback)
            return this.injectPromise(this.verifyMessageV2, message, signature, options);

        try {
            const base58Address = Trx.verifyMessageV2(message, signature);
            callback(null, base58Address);
        } catch(ex) {
            callback(ex);
        }
    }

    static verifyMessageV2(message, signature) {
        return utils.message.verifyMessage(message, signature);
    }

    verifyTypedData(domain, types, value, signature, address = this.tronWeb.defaultAddress.base58, callback = false) {
        if (utils.isFunction(address)) {
            callback = address;
            address = this.tronWeb.defaultAddress.base58;
        }

        if (!callback)
            return this.injectPromise(this.verifyTypedData, domain, types, value, signature, address);

        if (Trx.verifyTypedData(domain, types, value, signature, address))
            return callback(null, true);

        callback('Signature does not match');
    }

    static verifyTypedData(domain, types, value, signature, address) {
        signature = signature.replace(/^0x/, '');

        const messageDigest = utils._TypedDataEncoder.hash(domain, types, value);
        const recovered = recoverAddress(messageDigest, {
            yParity: signature.substring(128, 130) == '1c' ? 1 : 0,
            r: '0x' + signature.substring(0, 64),
            s: '0x' + signature.substring(64, 128),
        });

        const tronAddress = ADDRESS_PREFIX + recovered.substr(2);
        const base58Address = TronWeb.address.fromHex(tronAddress);

        return base58Address == TronWeb.address.fromHex(address);
    }

    async sign(transaction = false, privateKey = this.tronWeb.defaultPrivateKey, useTronHeader = true, multisig = false, callback = false) {

        if (utils.isFunction(multisig)) {
            callback = multisig;
            multisig = false;
        }

        if (utils.isFunction(useTronHeader)) {
            callback = useTronHeader;
            useTronHeader = true;
            multisig = false;
        }

        if (utils.isFunction(privateKey)) {
            callback = privateKey;
            privateKey = this.tronWeb.defaultPrivateKey;
            useTronHeader = true;
            multisig = false;
        }


        if (!callback)
            return this.injectPromise(this.sign, transaction, privateKey, useTronHeader, multisig);

        // Message signing
        if (utils.isString(transaction)) {

            if (!utils.isHex(transaction))
                return callback('Expected hex message input');

            try {
                const signatureHex = Trx.signString(transaction, privateKey, useTronHeader)
                return callback(null, signatureHex);
            } catch (ex) {
                callback(ex);
            }
        }

        if (!utils.isObject(transaction))
            return callback('Invalid transaction provided');

        if (!multisig && transaction.signature)
            return callback('Transaction is already signed');

        try {
            if (!multisig) {
                const address = this.tronWeb.address.toHex(
                    this.tronWeb.address.fromPrivateKey(privateKey)
                ).toLowerCase();

                if (address !== this.tronWeb.address.toHex(transaction.raw_data.contract[0].parameter.value.owner_address))
                    return callback('Private key does not match address in transaction');

                if (!txCheck(transaction)) {
                    return callback('Invalid transaction');
                }
            }
            return callback(null,
                utils.crypto.signTransaction(privateKey, transaction)
            );
        } catch (ex) {
            callback(ex);
        }
    }

    static signString(message, privateKey, useTronHeader = true) {
        message = message.replace(/^0x/, '');
        const value = `0x${privateKey.replace(/^0x/, '')}`;
        const signingKey = new SigningKey(value);
        const messageBytes = [
            ...toUtf8Bytes(useTronHeader ? TRX_MESSAGE_HEADER : ETH_MESSAGE_HEADER),
            ...utils.code.hexStr2byteArray(message)
        ];
        const messageDigest = keccak256(new Uint8Array(messageBytes));
        const signature = signingKey.sign(messageDigest);
        const signatureHex = [
            '0x',
            signature.r.substring(2),
            signature.s.substring(2),
            Number(signature.v).toString(16)
        ].join('');
        return signatureHex
    }

    /**
     * sign message v2 for verified header length
     *
     * @param {message to be signed, should be Bytes or string} message
     * @param {privateKey for signature} privateKey
     * @param {reserved} options
     * @param {callback function} callback
     */
    signMessageV2(message, privateKey = this.tronWeb.defaultPrivateKey, options = {}, callback = false) {
        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (utils.isFunction(privateKey)) {
            callback = privateKey;
            privateKey = this.tronWeb.defaultPrivateKey;
        }

        if (!callback)
            return this.injectPromise(this.signMessageV2, message, privateKey);

        try {
            const signatureHex = Trx.signMessageV2(message, privateKey);
            return callback(null, signatureHex);
        } catch (ex) {
            callback(ex);
        }
    }

    static signMessageV2(message, privateKey) {
        return utils.message.signMessage(message, privateKey);
    }

    _signTypedData(domain, types, value, privateKey = this.tronWeb.defaultPrivateKey, callback = false) {
        if (utils.isFunction(privateKey)) {
            callback = privateKey;
            privateKey = this.tronWeb.defaultPrivateKey;
        }

        if (!callback)
            return this.injectPromise(this._signTypedData, domain, types, value, privateKey);

        try {
            const signatureHex = Trx._signTypedData(domain, types, value, privateKey);
            return callback(null, signatureHex);
        } catch (ex) {
            callback(ex);
        }
    }

    static _signTypedData(domain, types, value, privateKey) {
        return utils.crypto._signTypedData(domain, types, value, privateKey);
    }

    async multiSign(transaction = false, privateKey = this.tronWeb.defaultPrivateKey, permissionId = false, callback = false) {

        if (utils.isFunction(permissionId)) {
            callback = permissionId;
            permissionId = 0;
        }

        if (utils.isFunction(privateKey)) {
            callback = privateKey;
            privateKey = this.tronWeb.defaultPrivateKey;
            permissionId = 0;
        }

        if (!callback)
            return this.injectPromise(this.multiSign, transaction, privateKey, permissionId);

        if (!utils.isObject(transaction) || !transaction.raw_data || !transaction.raw_data.contract)
            return callback('Invalid transaction provided');

        // If owner permission or permission id exists in transaction, do sign directly
        // If no permission id inside transaction or user passes permission id, use old way to reset permission id
        if (!transaction.raw_data.contract[0].Permission_id && permissionId > 0) {
            // set permission id
            transaction.raw_data.contract[0].Permission_id = permissionId;

            // check if private key insides permission list
            const address = this.tronWeb.address.toHex(this.tronWeb.address.fromPrivateKey(privateKey)).toLowerCase();
            const signWeight = await this.getSignWeight(transaction, permissionId);

            if (signWeight.result.code === 'PERMISSION_ERROR') {
                return callback(signWeight.result.message);
            }

            let foundKey = false;
            signWeight.permission.keys.map(key => {
                if (key.address === address)
                    foundKey = true;
            });

            if (!foundKey)
                return callback(privateKey + ' has no permission to sign');

            if (signWeight.approved_list && signWeight.approved_list.indexOf(address) != -1) {
                return callback(privateKey + ' already sign transaction');
            }

            // reset transaction
            if (signWeight.transaction && signWeight.transaction.transaction) {
                transaction = signWeight.transaction.transaction;
                if (permissionId > 0) {
                    transaction.raw_data.contract[0].Permission_id = permissionId;
                }
            } else {
                return callback('Invalid transaction provided');
            }
        }

        // sign
        try {
            if (!txCheck(transaction)) {
                return callback('Invalid transaction');
            }
            return callback(null, utils.crypto.signTransaction(privateKey, transaction));
        } catch (ex) {
            callback(ex);
        }
    }

    async getApprovedList(transaction, callback = false) {
        if (!callback)
            return this.injectPromise(this.getApprovedList, transaction);

        if (!utils.isObject(transaction))
            return callback('Invalid transaction provided');


        this.tronWeb.fullNode.request(
            'wallet/getapprovedlist',
            transaction,
            'post'
        ).then(result => {
            callback(null, result);
        }).catch(err => callback(err));
    }

    async getSignWeight(transaction, permissionId, callback = false) {
        if (utils.isFunction(permissionId)) {
            callback = permissionId;
            permissionId = undefined;
        }

        if (!callback)
            return this.injectPromise(this.getSignWeight, transaction, permissionId);

        if (!utils.isObject(transaction) || !transaction.raw_data || !transaction.raw_data.contract)
            return callback('Invalid transaction provided');

        if (utils.isInteger(permissionId)) {
            transaction.raw_data.contract[0].Permission_id = parseInt(permissionId);
        } else if (typeof transaction.raw_data.contract[0].Permission_id !== 'number') {
            transaction.raw_data.contract[0].Permission_id = 0;
        }

        if (!utils.isObject(transaction))
            return callback('Invalid transaction provided');


        this.tronWeb.fullNode.request(
            'wallet/getsignweight',
            transaction,
            'post'
        ).then(result => {
            callback(null, result);
        }).catch(err => callback(err));
    }

    sendRawTransaction(signedTransaction = false, options = {}, callback = false) {
        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (!callback)
            return this.injectPromise(this.sendRawTransaction, signedTransaction, options);

        if (!utils.isObject(signedTransaction))
            return callback('Invalid transaction provided');

        if (!utils.isObject(options))
            return callback('Invalid options provided');

        if (!signedTransaction.signature || !utils.isArray(signedTransaction.signature))
            return callback('Transaction is not signed');

        this.tronWeb.fullNode.request(
            'wallet/broadcasttransaction',
            signedTransaction,
            'post'
        ).then(result => {
            if (result.result)
                result.transaction = signedTransaction;
            callback(null, result);
        }).catch(err => callback(err));
    }

    sendHexTransaction(signedHexTransaction = false, options = {}, callback = false) {
        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (!callback)
            return this.injectPromise(this.sendHexTransaction, signedHexTransaction, options);

        if (!utils.isHex(signedHexTransaction))
            return callback('Invalid hex transaction provided');

        if (!utils.isObject(options))
            return callback('Invalid options provided');

        const params = {
            transaction: signedHexTransaction
        }

        this.tronWeb.fullNode.request(
            'wallet/broadcasthex',
             params,
            'post'
        ).then(result => {
            if (result.result) {
                result.transaction = JSON.parse(result.transaction)
                result.hexTransaction = signedHexTransaction;
            }
            callback(null, result);
        }).catch(err => callback(err));
    }

    async sendTransaction(to = false, amount = false, options = {}, callback = false) {
        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (typeof options === 'string')
            options = {privateKey: options};

        if (!callback)
            return this.injectPromise(this.sendTransaction, to, amount, options);

        if (!this.tronWeb.isAddress(to))
            return callback('Invalid recipient provided');

        if (!utils.isInteger(amount) || amount <= 0)
            return callback('Invalid amount provided');

        options = {
            privateKey: this.tronWeb.defaultPrivateKey,
            address: this.tronWeb.defaultAddress.hex,
            ...options
        };

        if (!options.privateKey && !options.address)
            return callback('Function requires either a private key or address to be set');

        try {
            const address = options.privateKey ? this.tronWeb.address.fromPrivateKey(options.privateKey) : options.address;
            const transaction = await this.tronWeb.transactionBuilder.sendTrx(to, amount, address);
            const signedTransaction = await this.sign(transaction, options.privateKey || undefined);
            const result = await this.sendRawTransaction(signedTransaction);

            return callback(null, result);
        } catch (ex) {
            return callback(ex);
        }
    }

    async sendToken(to = false, amount = false, tokenID = false, options = {}, callback = false) {
        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (typeof options === 'string')
            options = {privateKey: options};

        if (!callback)
            return this.injectPromise(this.sendToken, to, amount, tokenID, options);

        if (!this.tronWeb.isAddress(to))
            return callback('Invalid recipient provided');

        if (!utils.isInteger(amount) || amount <= 0)
            return callback('Invalid amount provided');

        if (utils.isInteger(tokenID))
            tokenID = tokenID.toString()

        if (!utils.isString(tokenID))
            return callback('Invalid token ID provided');

        options = {
            privateKey: this.tronWeb.defaultPrivateKey,
            address: this.tronWeb.defaultAddress.hex,
            ...options
        };

        if (!options.privateKey && !options.address)
            return callback('Function requires either a private key or address to be set');

        try {
            const address = options.privateKey ? this.tronWeb.address.fromPrivateKey(options.privateKey) : options.address;
            const transaction = await this.tronWeb.transactionBuilder.sendToken(to, amount, tokenID, address);
            const signedTransaction = await this.sign(transaction, options.privateKey || undefined);
            const result = await this.sendRawTransaction(signedTransaction);

            return callback(null, result);
        } catch (ex) {
            return callback(ex);
        }
    }

    /**
     * Freezes an amount of TRX.
     * Will give bandwidth OR Energy and TRON Power(voting rights)
     * to the owner of the frozen tokens.
     *
     * @param amount - is the number of frozen trx
     * @param duration - is the duration in days to be frozen
     * @param resource - is the type, must be either "ENERGY" or "BANDWIDTH"
     * @param options
     * @param callback
     */
    async freezeBalance(amount = 0, duration = 3, resource = "BANDWIDTH", options = {}, receiverAddress = undefined, callback = false) {
        if (utils.isFunction(receiverAddress)) {
            callback = receiverAddress;
            receiverAddress = undefined;
        }
        if (utils.isFunction(duration)) {
            callback = duration;
            duration = 3;
        }

        if (utils.isFunction(resource)) {
            callback = resource;
            resource = "BANDWIDTH";
        }

        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (typeof options === 'string')
            options = {privateKey: options};

        if (!callback)
            return this.injectPromise(this.freezeBalance, amount, duration, resource, options, receiverAddress);

        if (!['BANDWIDTH', 'ENERGY'].includes(resource))
            return callback('Invalid resource provided: Expected "BANDWIDTH" or "ENERGY"');

        if (!utils.isInteger(amount) || amount <= 0)
            return callback('Invalid amount provided');

        if (!utils.isInteger(duration) || duration < 3)
            return callback('Invalid duration provided, minimum of 3 days');

        options = {
            privateKey: this.tronWeb.defaultPrivateKey,
            address: this.tronWeb.defaultAddress.hex,
            ...options
        };

        if (!options.privateKey && !options.address)
            return callback('Function requires either a private key or address to be set');

        try {
            const address = options.privateKey ? this.tronWeb.address.fromPrivateKey(options.privateKey) : options.address;
            const freezeBalance = await this.tronWeb.transactionBuilder.freezeBalance(amount, duration, resource, address, receiverAddress);
            const signedTransaction = await this.sign(freezeBalance, options.privateKey || undefined);
            const result = await this.sendRawTransaction(signedTransaction);

            return callback(null, result);
        } catch (ex) {
            return callback(ex);
        }
    }

    /**
     * Unfreeze TRX that has passed the minimum freeze duration.
     * Unfreezing will remove bandwidth and TRON Power.
     *
     * @param resource - is the type, must be either "ENERGY" or "BANDWIDTH"
     * @param options
     * @param callback
     */
    async unfreezeBalance(resource = "BANDWIDTH", options = {}, receiverAddress = undefined, callback = false) {
        if (utils.isFunction(receiverAddress)) {
            callback = receiverAddress;
            receiverAddress = undefined;
        }

        if (utils.isFunction(resource)) {
            callback = resource;
            resource = 'BANDWIDTH';
        }

        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (typeof options === 'string')
            options = {privateKey: options};

        if (!callback)
            return this.injectPromise(this.unfreezeBalance, resource, options, receiverAddress);

        if (!['BANDWIDTH', 'ENERGY'].includes(resource))
            return callback('Invalid resource provided: Expected "BANDWIDTH" or "ENERGY"');

        options = {
            privateKey: this.tronWeb.defaultPrivateKey,
            address: this.tronWeb.defaultAddress.hex,
            ...options
        };

        if (!options.privateKey && !options.address)
            return callback('Function requires either a private key or address to be set');

        try {
            const address = options.privateKey ? this.tronWeb.address.fromPrivateKey(options.privateKey) : options.address;
            const unfreezeBalance = await this.tronWeb.transactionBuilder.unfreezeBalance(resource, address, receiverAddress);
            const signedTransaction = await this.sign(unfreezeBalance, options.privateKey || undefined);
            const result = await this.sendRawTransaction(signedTransaction);

            return callback(null, result);
        } catch (ex) {
            return callback(ex);
        }
    }

    /**
     * Modify account name
     * Note: Username is allowed to edit only once.
     *
     * @param privateKey - Account private Key
     * @param accountName - name of the account
     * @param callback
     *
     * @return modified Transaction Object
     */
    async updateAccount(accountName = false, options = {}, callback = false) {
        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (typeof options === 'string')
            options = {privateKey: options};

        if (!callback) {
            return this.injectPromise(this.updateAccount, accountName, options);
        }

        if (!utils.isString(accountName) || !accountName.length) {
            return callback('Name must be a string');
        }

        options = {
            privateKey: this.tronWeb.defaultPrivateKey,
            address: this.tronWeb.defaultAddress.hex,
            ...options
        };

        if (!options.privateKey && !options.address)
            return callback('Function requires either a private key or address to be set');

        try {
            const address = options.privateKey ? this.tronWeb.address.fromPrivateKey(options.privateKey) : options.address;
            const updateAccount = await this.tronWeb.transactionBuilder.updateAccount(accountName, address);
            const signedTransaction = await this.sign(updateAccount, options.privateKey || undefined);
            const result = await this.sendRawTransaction(signedTransaction);

            return callback(null, result);
        } catch (ex) {
            return callback(ex);
        }
    }

    signMessage(...args) {
        return this.sign(...args);
    }

    sendAsset(...args) {
        return this.sendToken(...args);
    }

    send(...args) {
        return this.sendTransaction(...args);
    }

    sendTrx(...args) {
        return this.sendTransaction(...args);
    }

    broadcast(...args) {
        return this.sendRawTransaction(...args);
    }

    broadcastHex(...args) {
        return this.sendHexTransaction(...args);
    }

    signTransaction(...args) {
        return this.sign(...args);
    }

    /**
     * Gets a network modification proposal by ID.
     */
    getProposal(proposalID = false, callback = false) {
        if (!callback)
            return this.injectPromise(this.getProposal, proposalID);

        if (!utils.isInteger(proposalID) || proposalID < 0)
            return callback('Invalid proposalID provided');

        this.tronWeb.fullNode.request('wallet/getproposalbyid', {
            id: parseInt(proposalID),
        }, 'post').then(proposal => {
            callback(null, proposal);
        }).catch(err => callback(err));
    }

    /**
     * Lists all network modification proposals.
     */
    listProposals(callback = false) {
        if (!callback)
            return this.injectPromise(this.listProposals);

        this.tronWeb.fullNode.request('wallet/listproposals', {}, 'post').then(({proposals = []}) => {
            callback(null, proposals);
        }).catch(err => callback(err));
    }

    /**
     * Lists all parameters available for network modification proposals.
     */
    getChainParameters(callback = false) {
        if (!callback)
            return this.injectPromise(this.getChainParameters);

        this.tronWeb.fullNode.request('wallet/getchainparameters', {}, 'post').then(({chainParameter = []}) => {
            callback(null, chainParameter);
        }).catch(err => callback(err));
    }

    /**
     * Get the account resources
     */
    getAccountResources(address = this.tronWeb.defaultAddress.hex, callback = false) {
        if (!callback)
            return this.injectPromise(this.getAccountResources, address);

        if (!this.tronWeb.isAddress(address))
            return callback('Invalid address provided');

        this.tronWeb.fullNode.request('wallet/getaccountresource', {
            address: this.tronWeb.address.toHex(address),
        }, 'post').then(resources => {
            callback(null, resources);
        }).catch(err => callback(err));
    }

    /**
     * Query the amount of resources of a specific resourceType delegated by fromAddress to toAddress
     */
    getDelegatedResourceV2(fromAddress = this.tronWeb.defaultAddress.hex, toAddress = this.tronWeb.defaultAddress.hex, options = { confirmed: true }, callback = false) {
        if(utils.isFunction(options)) {
            callback = options;
            options = { confirmed: true };
        }

        if(utils.isFunction(toAddress)) {
            callback = toAddress;
            toAddress = this.tronWeb.defaultAddress.hex;
        }

        if(utils.isFunction(fromAddress)) {
            callback = fromAddress;
            fromAddress = this.tronWeb.defaultAddress.hex;
            toAddress = this.tronWeb.defaultAddress.hex;
        }

        if (!callback)
            return this.injectPromise(this.getDelegatedResourceV2, fromAddress, toAddress, options);

        if (!this.tronWeb.isAddress(fromAddress))
            return callback('Invalid address provided');

        if (!this.tronWeb.isAddress(toAddress))
            return callback('Invalid address provided');

        this.tronWeb[options.confirmed ? 'solidityNode' : 'fullNode'].request(`wallet${options.confirmed ? 'solidity' : ''}/getdelegatedresourcev2`, {
            fromAddress: toHex(fromAddress),
            toAddress: toHex(toAddress)
        }, 'post').then(resources => {
            callback(null, resources);
        }).catch(err => callback(err));
    }

    /**
     * Query the resource delegation index by an account
     */
    getDelegatedResourceAccountIndexV2(address = this.tronWeb.defaultAddress.hex, options = { confirmed: true }, callback = false) {
        if(utils.isFunction(options)) {
            callback = options;
            options = { confirmed: true };
        }

        if(utils.isFunction(address)) {
            callback = address;
            address = this.tronWeb.defaultAddress.hex
        }

        if (!callback)
            return this.injectPromise(this.getDelegatedResourceAccountIndexV2, address, options);

        if (!this.tronWeb.isAddress(address))
            return callback('Invalid address provided');

        this.tronWeb[options.confirmed ? 'solidityNode' : 'fullNode'].request(`wallet${options.confirmed ? 'solidity' : ''}/getdelegatedresourceaccountindexv2`, {
            value: toHex(address)
        }, 'post').then(resources => {
            callback(null, resources);
        }).catch(err => callback(err));
    }

    /**
     * Query the amount of delegatable resources of the specified resource Type for target address, unit is sun.
     */
    getCanDelegatedMaxSize(address = this.tronWeb.defaultAddress.hex, resource = 'BANDWIDTH', options = { confirmed: true }, callback = false) {
        if(utils.isFunction(options)) {
            callback = options;
            options = { confirmed: true };
        }

        if(utils.isFunction(resource)) {
            callback = resource;
            resource = 'BANDWIDTH';
        }

        if(utils.isFunction(address)) {
            callback = address;
            address = this.tronWeb.defaultAddress.hex;
        }

        if (!callback)
            return this.injectPromise(this.getCanDelegatedMaxSize, address, resource, options);

        if (!this.tronWeb.isAddress(address))
            return callback('Invalid address provided');

        if (this.validator.notValid([
            {
                name: 'resource',
                type: 'resource',
                value: resource,
                msg: 'Invalid resource provided: Expected "BANDWIDTH" or "ENERGY"'
            }
        ], callback))
            return;

        this.tronWeb[options.confirmed ? 'solidityNode' : 'fullNode'].request(`wallet${options.confirmed ? 'solidity' : ''}/getcandelegatedmaxsize`, {
            owner_address: toHex(address),
            type: resource === "ENERGY" ? 1 : 0
        }, 'post').then(resources => {
            callback(null, resources);
        }).catch(err => callback(err));
    }

    /**
     * Remaining times of available unstaking API
     */
    getAvailableUnfreezeCount(address = this.tronWeb.defaultAddress.hex, options = { confirmed: true }, callback = false) {
        if(utils.isFunction(options)) {
            callback = options;
            options = { confirmed: true };
        }

        if(utils.isFunction(address)) {
            callback = address;
            address = this.tronWeb.defaultAddress.hex;
        }

        if (!callback)
            return this.injectPromise(this.getAvailableUnfreezeCount, address, options);

        if (!this.tronWeb.isAddress(address))
            return callback('Invalid address provided');

        this.tronWeb[options.confirmed ? 'solidityNode' : 'fullNode'].request(`wallet${options.confirmed ? 'solidity' : ''}/getavailableunfreezecount`, {
            owner_address: toHex(address),
        }, 'post').then(data => {
            callback(null, data);
        }).catch(err => callback(err));
    }

    /**
     * Query the withdrawable balance at the specified timestamp
     */
    getCanWithdrawUnfreezeAmount(address = this.tronWeb.defaultAddress.hex, timestamp = Date.now(), options = { confirmed: true }, callback = false) {
        if(utils.isFunction(options)) {
            callback = options;
            options = { confirmed: true };
        }

        if(utils.isFunction(timestamp)) {
            callback = timestamp;
            timestamp = Date.now();
        }

        if(utils.isFunction(address)) {
            callback = address;
            address = this.tronWeb.defaultAddress.hex;
        }

        if (!callback)
            return this.injectPromise(this.getCanWithdrawUnfreezeAmount, address, timestamp, options);

        if (!this.tronWeb.isAddress(address))
            return callback('Invalid address provided');

        if (!utils.isInteger(timestamp) || timestamp < 0)
            return callback('Invalid timestamp provided');

        this.tronWeb[options.confirmed ? 'solidityNode' : 'fullNode'].request(`wallet${options.confirmed ? 'solidity' : ''}/getcanwithdrawunfreezeamount`, {
            owner_address: toHex(address),
            timestamp: timestamp
        }, 'post').then(data => {
            callback(null, data);
        }).catch(err => callback(err));

    }

    /**
     * Get the exchange ID.
     */
    getExchangeByID(exchangeID = false, callback = false) {
        if (!callback)
            return this.injectPromise(this.getExchangeByID, exchangeID);

        if (!utils.isInteger(exchangeID) || exchangeID < 0)
            return callback('Invalid exchangeID provided');

        this.tronWeb.fullNode.request('wallet/getexchangebyid', {
            id: exchangeID,
        }, 'post').then(exchange => {
            callback(null, exchange);
        }).catch(err => callback(err));
    }

    /**
     * Lists the exchanges
     */
    listExchanges(callback = false) {
        if (!callback)
            return this.injectPromise(this.listExchanges);

        this.tronWeb.fullNode.request('wallet/listexchanges', {}, 'post').then(({exchanges = []}) => {
            callback(null, exchanges);
        }, 'post').catch(err => callback(err));
    }

    /**
     * Lists all network modification proposals.
     */
    listExchangesPaginated(limit = 10, offset = 0, callback = false) {
        if (utils.isFunction(offset)) {
            callback = offset;
            offset = 0;
        }
        if (utils.isFunction(limit)) {
            callback = limit;
            limit = 10;
        }
        if (!callback)
            return this.injectPromise(this.listExchangesPaginated, limit, offset);

        this.tronWeb.fullNode.request('wallet/getpaginatedexchangelist', {
            limit,
            offset
        }, 'post').then(({exchanges = []}) => {
            callback(null, exchanges);
        }).catch(err => callback(err));
    }

    /**
     * Get info about thre node
     */
    getNodeInfo(callback = false) {
        if (!callback)
            return this.injectPromise(this.getNodeInfo);

        this.tronWeb.fullNode.request('wallet/getnodeinfo', {}, 'post').then(info => {
            callback(null, info);
        }, 'post').catch(err => callback(err));
    }


    getTokenListByName(tokenID = false, callback = false) {
        if (!callback)
            return this.injectPromise(this.getTokenListByName, tokenID);

        if (utils.isInteger(tokenID))
            tokenID = tokenID.toString()

        if (!utils.isString(tokenID) || !tokenID.length)
            return callback('Invalid token ID provided');

        this.tronWeb.fullNode.request('wallet/getassetissuelistbyname', {
            value: this.tronWeb.fromUtf8(tokenID)
        }, 'post').then(token => {
            if (Array.isArray(token.assetIssue)) {
                callback(null, token.assetIssue.map(t => this._parseToken(t)));
            } else if (!token.name)
                return callback('Token does not exist');

            callback(null, this._parseToken(token));
        }).catch(err => callback(err));
    }

    getTokenByID(tokenID = false, callback = false) {
        if (!callback)
            return this.injectPromise(this.getTokenByID, tokenID);

        if (utils.isInteger(tokenID))
            tokenID = tokenID.toString()

        if (!utils.isString(tokenID) || !tokenID.length)
            return callback('Invalid token ID provided');

        this.tronWeb.fullNode.request('wallet/getassetissuebyid', {
            value: tokenID
        }, 'post').then(token => {
            if (!token.name)
                return callback('Token does not exist');

            callback(null, this._parseToken(token));
        }).catch(err => callback(err));
    }

    async getReward(address, options = {}, callback = false) {
        options.confirmed = true;
        return this._getReward(address, options, callback);
    }

    async getUnconfirmedReward(address, options = {}, callback = false) {
        options.confirmed = false;
        return this._getReward(address, options, callback);
    }

    async getBrokerage(address, options = {}, callback = false) {
        options.confirmed = true;
        return this._getBrokerage(address, options, callback);
    }

    async getUnconfirmedBrokerage(address, options = {}, callback = false) {
        options.confirmed = false;
        return this._getBrokerage(address, options, callback);
    }

    async _getReward(address = this.tronWeb.defaultAddress.hex, options, callback = false) {
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
            return this.injectPromise(this._getReward, address, options);

        if (this.validator.notValid([
            {
                name: 'origin',
                type: 'address',
                value: address
            }
        ], callback))
            return;

        const data = {
            address: toHex(address)
        };

        this.tronWeb[options.confirmed ? 'solidityNode' : 'fullNode'].request(`wallet${options.confirmed ? 'solidity' : ''}/getReward`, data, 'post')
            .then((result = {}) => {

                if (typeof result.reward === 'undefined')
                    return callback('Not found.');

                callback(null, result.reward);
            }).catch(err => callback(err));
    }


    async _getBrokerage(address = this.tronWeb.defaultAddress.hex, options, callback = false) {
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
            return this.injectPromise(this._getBrokerage, address, options);

        if (this.validator.notValid([
            {
                name: 'origin',
                type: 'address',
                value: address
            }
        ], callback))
            return;

        const data = {
            address: toHex(address)
        };

        this.tronWeb[options.confirmed ? 'solidityNode' : 'fullNode'].request(`wallet${options.confirmed ? 'solidity' : ''}/getBrokerage`, data, 'post')
            .then((result = {}) => {

                if (typeof result.brokerage === 'undefined')
                    return callback('Not found.');

                callback(null, result.brokerage);
            }).catch(err => callback(err));
    }

};
