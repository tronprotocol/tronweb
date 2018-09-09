import TronWeb from 'index';
import utils from 'utils';

export default class Trx {
    constructor(tronWeb = false) {
        if(!tronWeb || !tronWeb instanceof TronWeb)
            throw new Error('Expected instance of TronWeb');

        this.tronWeb = tronWeb;
        this.injectPromise = utils.promiseInjector(this);
    }

    getCurrentBlock(callback = false) {
        if(!callback)
            return this.injectPromise(this.getCurrentBlock);

        this.tronWeb.fullNode.request('wallet/getnowblock').then(block => {
            callback(null, block);
        }).catch(err => callback(err));
    }

    getBlock(block = this.tronWeb.defaultBlock, callback = false) {
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
            callback(null, block);
        }).catch(err => callback(err));
    }

    getBlockTransactionCount(block, callback = false) {
        if(!callback)
            return this.injectPromise(this.getBlockTransactionCount, block);

        this.getBlock(block).then(({ transactions = [] }) => {
            callback(null, transactions.length);
        }).catch(err => callback(err));
    }

    getTransaction(transactionID, callback = false) {
        if(!callback)
            return this.injectPromise(this.getTransaction, transactionID);

        this.tronWeb.fullNode.request('wallet/gettransactionbyid', { 
            value: transactionID 
        }, 'post').then(transaction => {
            callback(null, transaction);
        }).catch(err => callback(err));
    }

    getTransactionsToAddress(address = this.tronWeb.defaultAddress, limit = 30, offset = 0, callback = false) {
        if(!callback)
            return this.injectPromise(this.getTransactionsToAddress, address, limit, offset);

        return this.getTransactionsRelated(address, 'to', limit, offset, callback);
    }

    getTransactionsFromAddress(address = this.tronWeb.defaultAddress, limit = 30, offset = 0, callback = false) {
        if(!callback)
            return this.injectPromise(this.getTransactionsFromAddress, address, limit, offset);

        return this.getTransactionsRelated(address, 'from', limit, offset, callback);
    }

    async getTransactionsRelated(address = this.tronWeb.defaultAddress, direction = 'all', limit = 30, offset = 0, callback = false) {
        if(!callback)
            return this.injectPromise(this.getTransactionsRelated, address, direction, limit, offset);

        if(![ 'to', 'from', 'all' ].includes(direction))
            return callback('Invalid direction provided: Expected "to", "from" or "all"');
        
        if(direction == 'all') {
            try {
                const from = await this.getTransactionsRelated(address, 'from', limit, offset);
                const to = await this.getTransactionsRelated(address, 'to', limit, offset);

                callback(null, [
                    ...from.map(tx => (tx.direction = 'from', tx)),
                    ...to.map(tx => (tx.direction = 'to', tx))
                ].sort((a, b) => b.raw_data.timestamp - a.raw_data.timestamp));
            } catch(ex) {
                return callback(ex);
            }
        }

        if(!this.tronWeb.isAddress(address))
            return callback('Invalid address provided');

        if(!utils.isInteger(limit) || limit < 1)
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

    getAccount(address = this.tronWeb.defaultAddress, callback = false) {
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

    getBalance(address = this.tronWeb.defaultAddress, callback = false) {
        if(!callback)
            return this.injectPromise(this.getBalance, address);

        this.getAccount(address).then(({ balance = 0 }) => {
            callback(null, balance);
        }).catch(err => callback(err));
    }

    getBandwidth(address = this.tronWeb.defaultAddress, callback = false) {
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

    getTokensIssuedByAddress(address = this.tronWeb.defaultAddress, callback = false) {
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

            const tokens = assetIssue.map(token => ({
                ...token,
                name: this.tronWeb.toUtf8(token.name),
                abbr: token.abbr && this.tronWeb.toUtf8(token.abbr),
                description: token.description && this.tronWeb.toUtf8(token.description),
                url: token.url && this.tronWeb.toUtf8(token.url)
            })).reduce((tokens, token) => {
                return tokens[token.name] = token, tokens;
            }, {});

            callback(null, tokens);
        }).catch(err => callback(err));
    }
};