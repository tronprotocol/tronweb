import TronWeb from 'index';
import utils from 'utils';

export default class TransactionBuilder {
    constructor(tronWeb = false) {
        if(!tronWeb || !tronWeb instanceof TronWeb)
            throw new Error('Expected instance of TronWeb');

        this.tronWeb = tronWeb;
        this.injectPromise = utils.promiseInjector(this);
    }

    sendTrx(to = false, amount = 0, from = this.tronWeb.defaultAddress.hex, callback = false) {
        if(utils.isFunction(from)) {
            callback = from;
            from = this.tronWeb.defaultAddress.hex;
        }
        
        if(!callback)
            return this.injectPromise(this.sendTrx, to, amount, from);

        if(!this.tronWeb.isAddress(to))
            return callback('Invalid recipient address provided');

        if(!utils.isInteger(amount) || amount <= 0)
            return callback('Invalid amount provided');

        if(!this.tronWeb.isAddress(from))
            return callback('Invalid origin address provided');

        to = this.tronWeb.address.toHex(to);
        from = this.tronWeb.address.toHex(from);

        if(to === from)
            return callback('Cannot transfer TRX to the same account');

        this.tronWeb.fullNode.request('wallet/createtransaction', {
            to_address: to,
            owner_address: from,
            amount: parseInt(amount)
        }, 'post').then(transaction => {
            if(transaction.Error)
                return callback(transaction.Error);

            callback(null, transaction);
        }).catch(err => callback(err));
    }

    sendToken(to = false, amount = 0, tokenID = false, from = this.tronWeb.defaultAddress.hex, callback = false) {
        if(utils.isFunction(from)) {
            callback = from;
            from = this.tronWeb.defaultAddress.hex;
        }
        
        if(!callback)
            return this.injectPromise(this.sendToken, to, amount, tokenID, from);

        if(!this.tronWeb.isAddress(to))
            return callback('Invalid recipient address provided');

        if(!utils.isInteger(amount) || amount <= 0)
            return callback('Invalid amount provided');

        if(!utils.isString(tokenID) || !tokenID.length)
            return callback('Invalid token ID provided');

        if(!this.tronWeb.isAddress(from))
            return callback('Invalid origin address provided');

        to = this.tronWeb.address.toHex(to);
        tokenID = this.tronWeb.fromUtf8(tokenID);
        from = this.tronWeb.address.toHex(from);

        if(to === from)
            return callback('Cannot transfer tokens to the same account');

        this.tronWeb.fullNode.request('wallet/transferasset', {
            to_address: to,
            owner_address: from,
            asset_name: tokenID,
            amount: parseInt(amount)
        }, 'post').then(transaction => {
            if(transaction.Error)
                return callback(transaction.Error);

            callback(null, transaction);
        }).catch(err => callback(err));
    }

    purchaseToken(issuerAddress = false, tokenID = false, amount = 0, buyer = this.tronWeb.defaultAddress.hex, callback = false) {
        if(utils.isFunction(buyer)) {
            callback = buyer;
            buyer = this.tronWeb.defaultAddress.hex;
        }
        
        if(!callback)
            return this.injectPromise(this.purchaseToken, issuerAddress, tokenID, amount, buyer);

        if(!this.tronWeb.isAddress(issuerAddress))
            return callback('Invalid issuer address provided');

        if(!utils.isString(tokenID) || !tokenID.length)
            return callback('Invalid token ID provided');

        if(!utils.isInteger(amount) || amount <= 0)
            return callback('Invalid amount provided');

        if(!this.tronWeb.isAddress(buyer))
            return callback('Invalid buyer address provided');

        this.tronWeb.fullNode.request('wallet/participateassetissue', {
            to_address: this.tronWeb.address.toHex(issuerAddress),
            owner_address: this.tronWeb.address.toHex(buyer),
            asset_name: this.tronWeb.fromUtf8(tokenID),
            amount: parseInt(amount)
        }, 'post').then(transaction => {
            if(transaction.Error)
                return callback(transaction.Error);

            callback(null, transaction);
        }).catch(err => callback(err));
    }

    freezeBalance(address = this.tronWeb.defaultAddress.hex, amount = 0, duration = 3, callback = false) {
        if(utils.isFunction(duration)) {
            callback = duration;
            duration = 3;
        }

        if(!callback)
            return this.injectPromise(this.freezeBalance, address, amount, duration);

        if(!this.tronWeb.isAddress(address))
            return callback('Invalid address provided');

        if(!utils.isInteger(amount) || amount <= 0)
            return callback('Invalid amount provided');

        if(!utils.isInteger(duration) || duration < 3)
            return callback('Invalid duration provided, minimum of 3 days');

        this.tronWeb.fullNode.request('wallet/freezebalance', {
            owner_address: this.tronWeb.address.toHex(address),
            frozen_balance: parseInt(amount),
            frozen_duration: parseInt(duration)
        }, 'post').then(transaction => {
            if(transaction.Error)
                return callback(transaction.Error);

            callback(null, transaction);
        }).catch(err => callback(err));
    }

    unfreezeBalance(address = this.tronWeb.defaultAddress.hex, callback = false) {
        if(utils.isFunction(address)) {
            callback = address;
            address = this.tronWeb.defaultAddress.hex;
        }

        if(!callback)
            return this.injectPromise(this.unfreezeBalance, address);

        if(!this.tronWeb.isAddress(address))
            return callback('Invalid address provided');
        
        this.tronWeb.fullNode.request('wallet/unfreezebalance', {
            owner_address: this.tronWeb.address.toHex(address)
        }, 'post').then(transaction => {
            if(transaction.Error)
                return callback(transaction.Error);

            callback(null, transaction);
        }).catch(err => callback(err));
    }

    withdrawBlockRewards(address = this.tronWeb.defaultAddress.hex, callback = false) {
        if(utils.isFunction(address)) {
            callback = address;
            address = this.tronWeb.defaultAddress.hex;
        }

        if(!callback)
            return this.injectPromise(this.withdrawBlockRewards, address);

        if(!this.tronWeb.isAddress(address))
            return callback('Invalid address provided');
        
        this.tronWeb.fullNode.request('wallet/withdrawbalance', {
            owner_address: this.tronWeb.address.toHex(address)
        }, 'post').then(transaction => {
            if(transaction.Error)
                return callback(transaction.Error);

            callback(null, transaction);
        }).catch(err => callback(err));
    }

    sendAsset(...args) {
        return this.sendToken(...args);
    }

    purchaseAsset(...args) {
        return this.purchaseToken(...args);
    }
}