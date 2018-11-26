import TronWeb from 'index';
import utils from 'utils';
import * as Ethers from 'ethers';

const TRX_MESSAGE_HEADER = '\x19TRON Signed Message:\n32';
const ETH_MESSAGE_HEADER = '\x19Ethereum Signed Message:\n32';

export default class Trx {
    constructor(tronWeb = false) {
        if(!tronWeb || !tronWeb instanceof TronWeb)
            throw new Error('Expected instance of TronWeb');

        this.tronWeb = tronWeb;
        this.injectPromise = utils.promiseInjector(this);
    }

    parseToken(token) {
        return {
            ...token,
            name: this.tronWeb.toUtf8(token.name),
            abbr: token.abbr && this.tronWeb.toUtf8(token.abbr),
            description: token.description && this.tronWeb.toUtf8(token.description),
            url: token.url && this.tronWeb.toUtf8(token.url)
        };
    }

    getCurrentBlock(callback = false) {
        if(!callback)
            return this.injectPromise(this.getCurrentBlock);

        this.tronWeb.fullNode.request('wallet/getnowblock').then(block => {
            callback(null, block);
        }).catch(err => callback(err));
    }

    getBlock(block = this.tronWeb.defaultBlock, callback = false) {
        if(utils.isFunction(block)) {
            callback = block;
            block = this.tronWeb.defaultBlock;            
        }

        if(!callback)
            return this.injectPromise(this.getBlock, block);

        if(block === false)
            return callback('No block identifier provided');

        if(block == 'earliest')
            block = 0;

        if(block == 'latest')
            return this.getCurrentBlock(callback);

        if(isNaN(block) && utils.isHex(block))
            return this.getBlockByHash(block, callback);

        this.getBlockByNumber(block, callback);
    }

    getBlockByHash(blockHash, callback = false) {
        if(!callback)
            return this.injectPromise(this.getBlockByHash, blockHash);

        this.tronWeb.fullNode.request('wallet/getblockbyid', { 
            value: blockHash 
        }, 'post').then(block => {
            if(!Object.keys(block).length)
                return callback('Block not found');

            callback(null, block);
        }).catch(err => callback(err));
    }

    getBlockByNumber(blockID, callback = false) {
        if(!callback)
            return this.injectPromise(this.getBlockByNumber, blockID);

        if(!utils.isInteger(blockID) || blockID < 0)
            return callback('Invalid block number provided');

        this.tronWeb.fullNode.request('wallet/getblockbynum', { 
            num: parseInt(blockID) 
        }, 'post').then(block => {
            if(!Object.keys(block).length)
                return callback('Block not found');

            callback(null, block);
        }).catch(err => callback(err));
    }

    getBlockTransactionCount(block = this.tronWeb.defaultBlock, callback = false) {
        if(utils.isFunction(block)) {
            callback = block;
            block = this.tronWeb.defaultBlock;            
        }

        if(!callback)
            return this.injectPromise(this.getBlockTransactionCount, block);

        this.getBlock(block).then(({ transactions = [] }) => {
            callback(null, transactions.length);
        }).catch(err => callback(err));
    }

    getTransactionFromBlock(block = this.tronWeb.defaultBlock, index = 0, callback = false) {
        if(utils.isFunction(index)) {
            callback = index;
            index = 0;
        }
        
        if(utils.isFunction(block)) {
            callback = block;
            block = this.tronWeb.defaultBlock;            
        }

        if(!callback)
            return this.injectPromise(this.getTransactionFromBlock, block, index);

        if(!utils.isInteger(index) || index < 0)
            return callback('Invalid transaction index provided');

        this.getBlock(block).then(({ transactions = false }) => {
            if(!transactions || transactions.length < index)
                return callback('Transaction not found in block');

            callback(null, transactions[index]);
        }).catch(err => callback(err));
    }

    getTransaction(transactionID, callback = false) {
        if(!callback)
            return this.injectPromise(this.getTransaction, transactionID);

        this.tronWeb.fullNode.request('wallet/gettransactionbyid', { 
            value: transactionID 
        }, 'post').then(transaction => {
            if(!Object.keys(transaction).length)
                return callback('Transaction not found');
                
            callback(null, transaction);
        }).catch(err => callback(err));
    }

    getConfirmedTransaction(transactionID, callback = false) {
        if(!callback)
            return this.injectPromise(this.getConfirmedTransaction, transactionID);

        this.tronWeb.solidityNode.request('walletsolidity/gettransactionbyid', {
            value: transactionID
        }, 'post').then(transaction => {
            if(!Object.keys(transaction).length)
                return callback('Transaction not found');

            callback(null, transaction);
        }).catch(err => callback(err));
    }

    getTransactionInfo(transactionID, callback = false) {
        if(!callback)
            return this.injectPromise(this.getTransactionInfo, transactionID);

        this.tronWeb.solidityNode.request('walletsolidity/gettransactioninfobyid', { 
            value: transactionID 
        }, 'post').then(transaction => {
            callback(null, transaction);
        }).catch(err => callback(err));
    }

    getTransactionsToAddress(address = this.tronWeb.defaultAddress.hex, limit = 30, offset = 0, callback = false) {
        if(utils.isFunction(offset)) {
            callback = offset;
            offset = 0;            
        }

        if(utils.isFunction(limit)) {
            callback = limit;
            limit = 30;          
        }

        if(!callback)
            return this.injectPromise(this.getTransactionsToAddress, address, limit, offset);

        address = this.tronWeb.address.toHex(address);

        return this.getTransactionsRelated(address, 'to', limit, offset, callback);
    }

    getTransactionsFromAddress(address = this.tronWeb.defaultAddress.hex, limit = 30, offset = 0, callback = false) {
        if(utils.isFunction(offset)) {
            callback = offset;
            offset = 0;            
        }

        if(utils.isFunction(limit)) {
            callback = limit;
            limit = 30;           
        }

        if(!callback)
            return this.injectPromise(this.getTransactionsFromAddress, address, limit, offset);

        address = this.tronWeb.address.toHex(address);

        return this.getTransactionsRelated(address, 'from', limit, offset, callback);
    }

    async getTransactionsRelated(address = this.tronWeb.defaultAddress.hex, direction = 'all', limit = 30, offset = 0, callback = false) {
        if(utils.isFunction(offset)) {
            callback = offset;
            offset = 0;            
        }

        if(utils.isFunction(limit)) {
            callback = limit;
            limit = 30;         
        }

        if(utils.isFunction(direction)) {
            callback = direction;
            direction = 'all';
        }

        if(utils.isFunction(address)) {
            callback = address;
            address = this.tronWeb.defaultAddress.hex;
        }

        if(!callback)
            return this.injectPromise(this.getTransactionsRelated, address, direction, limit, offset);

        if(![ 'to', 'from', 'all' ].includes(direction))
            return callback('Invalid direction provided: Expected "to", "from" or "all"');
        
        if(direction == 'all') {
            try {
                const [from, to] = await Promise.all([
                    this.getTransactionsRelated(address, 'from', limit, offset),
                    this.getTransactionsRelated(address, 'to', limit, offset)
                ])

                return callback(null, [
                    ...from.map(tx => (tx.direction = 'from', tx)),
                    ...to.map(tx => (tx.direction = 'to', tx))
                ].sort((a, b) => b.raw_data.timestamp - a.raw_data.timestamp));
            } catch(ex) {
                return callback(ex);
            }
        }

        if(!this.tronWeb.isAddress(address))
            return callback('Invalid address provided');

        if(!utils.isInteger(limit) || limit < 0 || (offset && limit < 1))
            return callback('Invalid limit provided');

        if(!utils.isInteger(offset) || offset < 0)
            return callback('Invalid offset provided');

        address = this.tronWeb.address.toHex(address);

        this.tronWeb.solidityNode.request(`walletextension/gettransactions${direction}this`, {
            account: {
                address
            },
            offset,
            limit
        }, 'post').then(({ transaction }) => {
            callback(null, transaction);
        }).catch(err => callback(err));
    }

    getAccount(address = this.tronWeb.defaultAddress.hex, callback = false) {
        if(utils.isFunction(address)) {
            callback = address;
            address = this.tronWeb.defaultAddress.hex;            
        }

        if(!callback)
            return this.injectPromise(this.getAccount, address);

        if(!this.tronWeb.isAddress(address))
            return callback('Invalid address provided');

        address = this.tronWeb.address.toHex(address);

        this.tronWeb.solidityNode.request('walletsolidity/getaccount', {
            address
        }, 'post').then(account => {
            callback(null, account);
        }).catch(err => callback(err));
    }

    getBalance(address = this.tronWeb.defaultAddress.hex, callback = false) {
        if(utils.isFunction(address)) {
            callback = address;
            address = this.tronWeb.defaultAddress.hex;            
        }

        if(!callback)
            return this.injectPromise(this.getBalance, address);

        this.getAccount(address).then(({ balance = 0 }) => {
            callback(null, balance);
        }).catch(err => callback(err));
    }

    getUnconfirmedAccount(address = this.tronWeb.defaultAddress.hex, callback = false) {
        if(utils.isFunction(address)) {
            callback = address;
            address = this.tronWeb.defaultAddress.hex;
        }

        if(!callback)
            return this.injectPromise(this.getUnconfirmedAccount, address);

        if(!this.tronWeb.isAddress(address))
            return callback('Invalid address provided');

        address = this.tronWeb.address.toHex(address);

        this.tronWeb.fullNode.request('wallet/getaccount', {
            address
        }, 'post').then(account => {
            callback(null, account);
        }).catch(err => callback(err));
    }

    getUnconfirmedBalance(address = this.tronWeb.defaultAddress.hex, callback = false) {
        if(utils.isFunction(address)) {
            callback = address;
            address = this.tronWeb.defaultAddress.hex;
        }

        if(!callback)
            return this.injectPromise(this.getUnconfirmedBalance, address);

        this.getUnconfirmedAccount(address).then(({ balance = 0 }) => {
            callback(null, balance);
        }).catch(err => callback(err));
    }

    getBandwidth(address = this.tronWeb.defaultAddress.hex, callback = false) {
        if(utils.isFunction(address)) {
            callback = address;
            address = this.tronWeb.defaultAddress.hex;            
        }

        if(!callback)
            return this.injectPromise(this.getBandwidth, address);

        if(!this.tronWeb.isAddress(address))
            return callback('Invalid address provided');

        address = this.tronWeb.address.toHex(address);

        this.tronWeb.fullNode.request('wallet/getaccountnet', {
            address
        }, 'post').then(({ freeNetUsed = 0, freeNetLimit = 0, NetUsed = 0, NetLimit = 0 }) => {
            callback(null, (freeNetLimit - freeNetUsed) + (NetLimit - NetUsed));
        }).catch(err => callback(err));
    }

    getTokensIssuedByAddress(address = this.tronWeb.defaultAddress.hex, callback = false) {
        if(utils.isFunction(address)) {
            callback = address;
            address = this.tronWeb.defaultAddress.hex;            
        }

        if(!callback)
            return this.injectPromise(this.getTokensIssuedByAddress, address);

        if(!this.tronWeb.isAddress(address))
            return callback('Invalid address provided');

        address = this.tronWeb.address.toHex(address);

        this.tronWeb.fullNode.request('wallet/getassetissuebyaccount', {
            address
        }, 'post').then(({ assetIssue = false }) => {
            if(!assetIssue)
                return callback(null, {});

            const tokens = assetIssue.map(token => {
                return this.parseToken(token);
            }).reduce((tokens, token) => {
                return tokens[token.name] = token, tokens;
            }, {});

            callback(null, tokens);
        }).catch(err => callback(err));
    }

    getTokenFromID(tokenID = false, callback = false) {
        if(!callback)
            return this.injectPromise(this.getTokenFromID, tokenID);

        if(!utils.isString(tokenID) || !tokenID.length)
            return callback('Invalid token ID provided');

        this.tronWeb.fullNode.request('wallet/getassetissuebyname', {
            value: this.tronWeb.fromUtf8(tokenID)
        }, 'post').then(token => {
            if(!token.name)
                return callback('Token does not exist');
                
            callback(null, this.parseToken(token));
        }).catch(err => callback(err));
    }

    listNodes(callback = false) {
        if(!callback)
            return this.injectPromise(this.listNodes);

        this.tronWeb.fullNode.request('wallet/listnodes').then(({ nodes = [] }) => {
            callback(null, nodes.map(({ address: { host, port } }) => (
                `${this.tronWeb.toUtf8(host)}:${port}`
            )));
        }).catch(err => callback(err));
    }

    getBlockRange(start = 0, end = 30, callback = false) {
        if(utils.isFunction(end)) {
            callback = end;
            end = 30;            
        }

        if(utils.isFunction(start)) {
            callback = start;
            start = 0;
        }

        if(!callback)
            return this.injectPromise(this.getBlockRange, start, end);

        if(!utils.isInteger(start) || start < 0)
            return callback('Invalid start of range provided');

        if(!utils.isInteger(end) || end <= start)
            return callback('Invalid end of range provided');

        this.tronWeb.fullNode.request('wallet/getblockbylimitnext', { 
            startNum: parseInt(start),
            endNum: parseInt(end) + 1
        }, 'post').then(({ block = [] }) => {
            callback(null, block);
        }).catch(err => callback(err));
    }

    listSuperRepresentatives(callback = false) {
        if(!callback)
            return this.injectPromise(this.listSuperRepresentatives);

        this.tronWeb.fullNode.request('wallet/listwitnesses').then(({ witnesses = [] }) => {
            callback(null, witnesses);
        }).catch(err => callback(err));
    }

    listTokens(limit = 0, offset = 0, callback = false) {
        if(utils.isFunction(offset)) {
            callback = offset;
            offset = 0;            
        }

        if(utils.isFunction(limit)) {
            callback = limit;
            limit = 0;  
        }
        
        if(!callback)
            return this.injectPromise(this.listTokens, limit, offset);

        if(!utils.isInteger(limit) || limit < 0 || (offset && limit < 1))
            return callback('Invalid limit provided');

        if(!utils.isInteger(offset) || offset < 0)
            return callback('Invalid offset provided');

        if(!limit) {
            return this.tronWeb.fullNode.request('wallet/getassetissuelist').then(({ assetIssue = [] }) => {
                callback(null, assetIssue.map(token => this.parseToken(token)));
            }).catch(err => callback(err));
        }

        this.tronWeb.fullNode.request('wallet/getpaginatedassetissuelist', {
            offset: parseInt(offset),
            limit: parseInt(limit)
        }, 'post').then(({ assetIssue = [] }) => {
            callback(null, assetIssue.map(token => this.parseToken(token)));
        }).catch(err => callback(err));
    }

    timeUntilNextVoteCycle(callback = false) {
        if(!callback)
            return this.injectPromise(this.timeUntilNextVoteCycle);

        this.tronWeb.fullNode.request('wallet/getnextmaintenancetime').then(({ num = -1 }) => {
            if(num == -1)
                return callback('Failed to get time until next vote cycle');

            callback(null, Math.floor(num / 1000));
        }).catch(err => callback(err));
    }

    getContract(contractAddress, callback = false) {
        if(!callback)
            return this.injectPromise(this.getContract, contractAddress);

        if(!this.tronWeb.isAddress(contractAddress))
            return callback('Invalid contract address provided');

        contractAddress = this.tronWeb.address.toHex(contractAddress);

        this.tronWeb.fullNode.request('wallet/getcontract', {
            value: contractAddress
        }).then(contract => {
            if(contract.Error)
                return callback('Contract does not exist');

            callback(null, contract);
        }).catch(err => callback(err));
    }

    async verifyMessage(message = false, signature = false, address = this.tronWeb.defaultAddress.base58, useTronHeader = true, callback = false) {
        if(utils.isFunction(address)) {
            callback = address;
            address = this.tronWeb.defaultAddress.base58;
            useTronHeader = true;
        }

        if(utils.isFunction(useTronHeader)) {
            callback = useTronHeader;
            useTronHeader = true;
        }

        if(!callback)
            return this.injectPromise(this.verifyMessage, message, signature, address, useTronHeader);

        if(!utils.isHex(message))
            return callback('Expected hex message input');

        if(message.substr(0, 2) == '0x')
            message = message.substring(2);

        if(signature.substr(0, 2) == '0x')
            signature = signature.substr(2);

        const messageBytes = [
            ...Ethers.utils.toUtf8Bytes(useTronHeader ? TRX_MESSAGE_HEADER : ETH_MESSAGE_HEADER),
            ...utils.code.hexStr2byteArray(message)
        ];

        const messageDigest = Ethers.utils.keccak256(messageBytes);
        const recovered = Ethers.utils.recoverAddress(messageDigest, {
            recoveryParam: signature.substring(128, 130) == '1c' ? 1 : 0,
            r: '0x' + signature.substring(0, 64),
            s: '0x' + signature.substring(64, 128)
        });

        const tronAddress = '41' + recovered.substr(2);
        const base58Address = this.tronWeb.address.fromHex(tronAddress);

        if(base58Address == this.tronWeb.address.fromHex(address))
            return callback(null, true);

        callback('Signature does not match');
    }

    async sign(transaction = false, privateKey = this.tronWeb.defaultPrivateKey, useTronHeader = true, callback = false) {
        if(utils.isFunction(privateKey)) {
            callback = privateKey;
            privateKey = this.tronWeb.defaultPrivateKey;
            useTronHeader = true;
        }

        if(utils.isFunction(useTronHeader)) {
            callback = useTronHeader;
            useTronHeader = true;
        }

        if(!callback)
            return this.injectPromise(this.sign, transaction, privateKey, useTronHeader);

        // Message signing
        if(utils.isString(transaction)) {
            if(transaction.substring(0, 2) == '0x')
                transaction = transaction.substring(2);

            if(!utils.isHex(transaction))
                return callback('Expected hex message input');

            try {
                const signingKey = new Ethers.utils.SigningKey(privateKey);
                const messageBytes = [
                    ...Ethers.utils.toUtf8Bytes(useTronHeader ? TRX_MESSAGE_HEADER : ETH_MESSAGE_HEADER),
                    ...utils.code.hexStr2byteArray(transaction)
                ];

                const messageDigest = Ethers.utils.keccak256(messageBytes);
                const signature = signingKey.signDigest(messageDigest);

                const signatureHex = [
                    '0x',
                    signature.r.substring(2),
                    signature.s.substring(2),
                    Number(signature.v).toString(16)
                ].join('');

                return callback(null, signatureHex);
            } catch(ex) {
                callback(ex);
            }
        }

        if(!utils.isObject(transaction))
            return callback('Invalid transaction provided');

        if(transaction.signature)
            return callback('Transaction is already signed');

        try {
            const address = this.tronWeb.address.toHex(
                this.tronWeb.address.fromPrivateKey(privateKey)
            ).toLowerCase();

            if(address !== transaction.raw_data.contract[0].parameter.value.owner_address.toLowerCase())
                return callback('Private key does not match address in transaction');

            return callback(null,
                utils.crypto.signTransaction(privateKey, transaction)
            );
        } catch(ex) {
            callback(ex);
        }
    }

    sendRawTransaction(signedTransaction = false, options = {}, callback = false) {
        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if(!callback)
            return this.injectPromise(this.sendRawTransaction, signedTransaction, options);

        if(!utils.isObject(signedTransaction))
            return callback('Invalid transaction provided');

        if(!utils.isObject(options))
            return callback('Invalid options provided');

        if(!signedTransaction.signature || !utils.isArray(signedTransaction.signature))
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


    async sendTransaction(to = false, amount = false, options = {}, callback = false) {
        if(utils.isFunction(options)) {
            callback = options;
            options = {};
        }
        
        if(typeof options === 'string')
            options = { privateKey: options };

        if(!callback)
            return this.injectPromise(this.sendTransaction, to, amount, options);

        if(!this.tronWeb.isAddress(to))
            return callback('Invalid recipient provided');

        if(!utils.isInteger(amount) || amount <= 0)
            return callback('Invalid amount provided');

        options = {
            privateKey: this.tronWeb.defaultPrivateKey,
            address: this.tronWeb.defaultAddress.hex,
            ...options
        };

        if(!options.privateKey && !options.address)
            return callback('Function requires either a private key or address to be set');

        try {
            const address = options.privateKey ? this.tronWeb.address.fromPrivateKey(options.privateKey) : options.address;
            const transaction = await this.tronWeb.transactionBuilder.sendTrx(to, amount, address);
            const signedTransaction = await this.sign(transaction, options.privateKey || undefined);
            const result = await this.sendRawTransaction(signedTransaction);

            return callback(null, result);
        } catch(ex) {
            return callback(ex);
        }
    }

    async sendToken(to = false, amount = false, tokenID = false, options = {}, callback = false) {
        if(utils.isFunction(options)) {
            callback = options;
            options = {};
        }
        
        if(typeof options === 'string')
            options = { privateKey: options };

        if(!callback)
            return this.injectPromise(this.sendToken, to, amount, tokenID, options);

        if(!this.tronWeb.isAddress(to))
            return callback('Invalid recipient provided');

        if(!utils.isInteger(amount) || amount <= 0)
            return callback('Invalid amount provided');

        if(!utils.isString(tokenID))
            return callback('Invalid token ID provided');

        options = {
            privateKey: this.tronWeb.defaultPrivateKey,
            address: this.tronWeb.defaultAddress.hex,
            ...options
        };

        if(!options.privateKey && !options.address)
            return callback('Function requires either a private key or address to be set');

        try {
            const address = options.privateKey ? this.tronWeb.address.fromPrivateKey(options.privateKey) : options.address;
            const transaction = await this.tronWeb.transactionBuilder.sendToken(to, amount, tokenID, address);
            const signedTransaction = await this.sign(transaction, options.privateKey || undefined);
            const result = await this.sendRawTransaction(signedTransaction);

            return callback(null, result);
        } catch(ex) {
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
    async freezeBalance(amount = 0, duration = 3, resource = "BANDWIDTH", options = {}, callback = false)
    {
        if(utils.isFunction(duration)) {
            callback = duration;
            duration = 3;
        }

        if(utils.isFunction(resource)) {
            callback = resource;
            resource = "BANDWIDTH";
        }

        if(utils.isFunction(options)) {
            callback = options;
            options = {};
        }
        
        if(typeof options === 'string')
            options = { privateKey: options };

        if(!callback)
            return this.injectPromise(this.freezeBalance, amount, duration, resource, options);

        if(![ 'BANDWIDTH', 'ENERGY' ].includes(resource))
            return callback('Invalid resource provided: Expected "BANDWIDTH" or "ENERGY"');

        if(!utils.isInteger(amount) || amount <= 0)
            return callback('Invalid amount provided');

        if(!utils.isInteger(duration) || duration < 3)
            return callback('Invalid duration provided, minimum of 3 days');

        options = {
            privateKey: this.tronWeb.defaultPrivateKey,
            address: this.tronWeb.defaultAddress.hex,
            ...options
        };

        if(!options.privateKey && !options.address)
            return callback('Function requires either a private key or address to be set');

        try {
            const address = options.privateKey ? this.tronWeb.address.fromPrivateKey(options.privateKey) : options.address;
            const freezeBalance = await this.tronWeb.transactionBuilder.freezeBalance(amount, duration, resource, address);
            const signedTransaction = await this.sign(freezeBalance, options.privateKey || undefined);
            const result = await this.sendRawTransaction(signedTransaction);

            return callback(null, result);
        } catch(ex) {
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
    async unfreezeBalance(resource = "BANDWIDTH", options = {}, callback = false)
    {
        if(utils.isFunction(resource)) {
            callback = resource;
            resource = 'BANDWIDTH';
        }

        if(utils.isFunction(options)) {
            callback = options;
            options = {};
        }
        
        if(typeof options === 'string')
            options = { privateKey: options };

        if(!callback)
            return this.injectPromise(this.unfreezeBalance, resource, options);

        if(![ 'BANDWIDTH', 'ENERGY' ].includes(resource))
            return callback('Invalid resource provided: Expected "BANDWIDTH" or "ENERGY"');

        options = {
            privateKey: this.tronWeb.defaultPrivateKey,
            address: this.tronWeb.defaultAddress.hex,
            ...options
        };

        if(!options.privateKey && !options.address)
            return callback('Function requires either a private key or address to be set');

        try {
            const address = options.privateKey ? this.tronWeb.address.fromPrivateKey(options.privateKey) : options.address;
            const unfreezeBalance = await this.tronWeb.transactionBuilder.unfreezeBalance(resource, address);
            const signedTransaction = await this.sign(unfreezeBalance, options.privateKey || undefined);
            const result = await this.sendRawTransaction(signedTransaction);

            return callback(null, result);
        } catch(ex) {
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
    async updateAccount(accountName = false, options = {},  callback = false)
    {
        if(utils.isFunction(options)) {
            callback = options;
            options = {};
        }
        
        if(typeof options === 'string')
            options = { privateKey: options };

        if(!callback) {
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

        if(!options.privateKey && !options.address)
            return callback('Function requires either a private key or address to be set');

        try {
            const address = options.privateKey ? this.tronWeb.address.fromPrivateKey(options.privateKey) : options.address;
            const updateAccount = await this.tronWeb.transactionBuilder.updateAccount(accountName, address);
            const signedTransaction = await this.sign(updateAccount, options.privateKey || undefined);
            const result = await this.sendRawTransaction(signedTransaction);

            return callback(null, result);
        } catch(ex) {
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

    signTransaction(...args) {
        return this.sign(...args);
    }

    /**
     * Gets a network modification proposal by ID.
     */
    getProposal(proposalID = false, callback = false) {
        if(!callback)
            return this.injectPromise(this.getProposal, proposalID);

        if(!utils.isInteger(proposalID) || proposalID < 0)
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
        if(!callback)
            return this.injectPromise(this.listProposals);

        this.tronWeb.fullNode.request('wallet/listproposals', {}, 'post').then(({ proposals = [] }) => {
            callback(null, proposals);
        }).catch(err => callback(err));
    }

    /**
     * Lists all parameters available for network modification proposals.
     */
    getChainParameters(callback = false) {
        if(!callback)
            return this.injectPromise(this.getChainParameters);

        this.tronWeb.fullNode.request('wallet/getchainparameters', {}, 'post').then(({ chainParameter = [] }) => {
            callback(null, chainParameter);
        }).catch(err => callback(err));
    }

    /**
     * Get the account resources
     */
    getAccountResources(address = this.tronWeb.defaultAddress.hex, callback = false) {
        if(!callback)
            return this.injectPromise(this.getAccountResources, address);

        if(!this.tronWeb.isAddress(address))
            return callback('Invalid address provided');

        this.tronWeb.fullNode.request('wallet/getaccountresource', { 
            address: this.tronWeb.address.toHex(address),
        }, 'post').then(resources => {
            callback(null, resources);
        }).catch(err => callback(err));
    }

    /**
     * Get the exchange ID.
     */
    getExchangeByID(exchangeID = false, callback = false) {
        if(!callback)
            return this.injectPromise(this.getExchangeByID, exchangeID);

        if(!utils.isInteger(exchangeID) || exchangeID < 0)
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
        if(!callback)
            return this.injectPromise(this.listExchanges);

        this.tronWeb.fullNode.request('wallet/listexchanges', {}, 'post').then(({ exchanges = [] }) => {
            callback(null, exchanges);
        }, 'post').catch(err => callback(err));
    }

    /**
     * Lists all network modification proposals.
     */
    listExchangesPaginated(limit = 10, offset = 0, callback = false) {
        if(utils.isFunction(offset)) {
            callback = offset;
            offset = 0;
        }
        if(utils.isFunction(limit)) {
            callback = limit;
            limit = 30;
        }
        if(!callback)
            return this.injectPromise(this.listExchanges);

        this.tronWeb.fullNode.request('wallet/listexchangespaginated', {
            limit,
            offset
        }, 'post').then(({ exchanges = [] }) => {
            callback(null, exchanges);
        }).catch(err => callback(err));
    }
};
