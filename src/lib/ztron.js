/*
** for shield transaction
*/
import TronWeb from 'index';
import injectpromise from 'injectpromise';
import Validator from 'paramValidator';

export default class ZTron {
    constructor(tronWeb = false) {
        if (!tronWeb || !tronWeb instanceof TronWeb)
            throw new Error('Expected instance of TronWeb');
        this.tronWeb = tronWeb;
        this.injectPromise = injectpromise(this);
        this.validator = new Validator(tronWeb);
    }

    async getExpandedSpendingKey(spendingKey, callback = false) {
        if (!callback) {
            return this.injectPromise(this.getExpandedSpendingKey, spendingKey);
        }

        if (this.validator.notValid([
            {
                name: 'spending key',
                type: 'not-empty-string',
                value: spendingKey
            }
        ], callback))
            return;

        const data = {
            value: spendingKey
        }

        this.tronWeb.fullNode.request('wallet/getexpandedspendingkey', data, 'post')
            .then(result => callback(null, result))
            .catch(err => callback(err));
    }

    async getAkFromAsk(ask, callback = false) {
        if (!callback) {
            return this.injectPromise(this.getAkFromAsk, ask)
        }

        if (this.validator.notValid([
            {
                name: 'ask',
                type: 'not-empty-string',
                value: ask
            }
        ], callback))
            return;

        const data = {
            value: ask
        }

        this.tronWeb.fullNode.request('wallet/getakfromask', data, 'post')
            .then(result => callback(null, result))
            .catch(err => callback(err));
    }

    async getNkFromNsk(nsk, callback = false) {
        if (!callback) {
            return this.injectPromise(this.getNkFromNsk, nsk);
        }

        if (this.validator.notValid([
            {
                name: 'ask',
                type: 'not-empty-string',
                value: nsk
            }
        ], callback))
            return;

        const data = {
            value: nsk
        }

        this.tronWeb.fullNode.request('wallet/getnkfromnsk', data, 'post')
            .then(result => callback(null, result))
            .catch(err => callback(err));
    }

    async getSpendingKey(callback = false) {
        if (!callback) {
            return this.injectPromise(this.getSpendingKey);
        }

        this.tronWeb.fullNode.request('wallet/getspendingkey', null, 'get')
            .then(result => callback(null, result))
            .catch(err => callback(err));
    }

    async getDiversifier(callback = false) {
        if (!callback) {
            return this.injectPromise(this.getDiversifier);
        }

        this.tronWeb.fullNode.request('wallet/getdiversifier', null, 'get')
            .then(result => callback(null, result))
            .catch(err => callback(err));
    }

    async getIncomingViewingKey(ak, nk, callback = false) {
        if (!callback) {
            return this.injectPromise(this.getIncomingViewingKey, ak, nk)
        }

        if (this.validator.notValid([
            {
                name: 'ak',
                type: 'not-empty-string',
                value: ak
            },
            {
                name: 'nk',
                type: 'not-empty-string',
                value: nk
            }
        ], callback))
            return;

        const data = {
            ak,
            nk
        }

        this.tronWeb.fullNode.request('wallet/getincomingviewingkey', data, 'post')
            .then(result => callback(null, result))
            .catch(err => callback(err));
    }

    async getZenPaymentAddress(ivk, d, callback = false) {
        if (!callback) {
            return this.injectPromise(this.getZenPaymentAddress, ivk, d);
        }

        if (this.validator.notValid([
            {
                name: 'ivk',
                type: 'not-empty-string',
                value: ivk
            },
            {
                name: 'd',
                type: 'not-empty-string',
                value: d
            }
        ], callback))
            return;

        const data = {
            ivk,
            d
        }

        this.tronWeb.fullNode.request('wallet/getzenpaymentaddress', data, 'post')
            .then(result => callback(null, result))
            .catch(err => callback(err));
    }

    async getRcm(callback = false) {
        if (!callback) {
            return this.injectPromise(this.getRcm);
        }

        this.tronWeb.fullNode.request('wallet/getrcm', null, 'get')
            .then(result => callback(null, result))
            .catch(err => callback(err));
    }

    async getNewShieldedAddress(callback = false) {
        if (!callback) {
            return this.injectPromise(this.getNewShieldedAddress);
        }

        this.tronWeb.fullNode.request('wallet/getnewshieldedaddress', null, 'get')
            .then(result => callback(null, result))
            .catch(err => callback(err));
    }

    async createSpendAuthSig(ask, txHash, alpha, callback = false) {
        if(typeof alpha === 'function'){
            callback = alpha;
            const rcm = await this.getRcm();
            if(rcm && rcm.value){
                alpha = rcm.value;
            }else{
                return callback('Failed to generate rcm element')
            }
        }
        if (!callback) {
            return this.injectPromise(this.createSpendAuthSig, ask, txHash, alpha);
        }

        if (this.validator.notValid([
            {
                name: 'ask',
                type: 'not-empty-string',
                value: ask
            },
            {
                name: 'tx_hash',
                type: 'not-empty-string',
                value: txHash
            },
            {
                name: 'alpha',
                type: 'string',
                lte: 64,
                gte: 64,
                value: alpha
            }
        ], callback))
            return;

        const data = {
            ask,
            txHash,
            alpha
        }

        this.tronWeb.fullNode.request('wallet/createspendauthsig', data, 'post')
            .then(result => callback(null, result))
            .catch(err => callback(err));
    }
}
