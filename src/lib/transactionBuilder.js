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
        if(!callback)
            return this.injectPromise(this.sendTrx, to, amount, from);

        if(utils.isFunction(from)) {
            callback = from;
            from = this.tronWeb.defaultAddress.hex;
        }

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
}