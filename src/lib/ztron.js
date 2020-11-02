/*
** for shield transaction
*/
import TronWeb from 'index';
import injectpromise from 'injectpromise';
import Validator from 'paramValidator';
import utils from 'utils';

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
                name: 'spendingKey',
                type: 'not-empty-string',
                value: spendingKey
            }
        ], callback))
            return;

        const params = {
            value: spendingKey
        }

        this.tronWeb.fullNode.request('wallet/getexpandedspendingkey', params, 'post')
            .then(data => callback(null, data))
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
                name: 'nsk',
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
        if (typeof alpha === 'function') {
            callback = alpha;
            const rcm = await this.getRcm();
            if (rcm && rcm.value) {
                alpha = rcm.value;
            } else {
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

    async createMintParams(ovk, fromAmount, shieldedReceives = {}, shieldedTRC20ContractAddress, callback = false) {
        if (utils.isObject(ovk)) {
            callback = fromAmount;
            fromAmount = ovk.from_amount;
            shieldedReceives = ovk.shielded_receives;
            shieldedTRC20ContractAddress = ovk.shielded_TRC20_contract_address;
            ovk = ovk.ovk;
        }

        if (!callback) {
            return this.injectPromise(this.createMintParams, ovk, fromAmount, shieldedReceives, shieldedTRC20ContractAddress);
        }
        if (this.validator.notValid([
            {
                name: 'ovk',
                type: 'string',
                value: ovk
            },
            {
                name: 'fromAmount',
                type: 'string',
                value: fromAmount
            },
            {
                name: 'shieldedReceives',
                type: 'notEmptyObject',
                value: shieldedReceives
            },
            {
                name: 'shieldedTRC20ContractAddress',
                type: 'address',
                value: shieldedTRC20ContractAddress
            }
        ], callback))
            return;

        const params = {
            ovk,
            from_amount: fromAmount,
            shielded_receives: shieldedReceives,
            shielded_TRC20_contract_address: this.tronWeb.address.toHex(shieldedTRC20ContractAddress)
        }

        this.tronWeb.fullNode.request('wallet/createshieldedcontractparameters', params, 'post')
            .then(data => callback(null, data))
            .catch(err => callback(err));
    }

    async createMintParamsWithoutAsk(ovk, fromAmount, shieldedReceives = {}, shieldedTRC20ContractAddress, callback = false) {
        if (utils.isObject(ovk)) {
            callback = fromAmount;
            fromAmount = ovk.from_amount;
            shieldedReceives = ovk.shielded_receives;
            shieldedTRC20ContractAddress = ovk.shielded_TRC20_contract_address;
            ovk = ovk.ovk;
        }

        if (!callback) {
            return this.injectPromise(this.createMintParamsWithoutAsk, ovk, fromAmount, shieldedReceives, shieldedTRC20ContractAddress);
        }

        if (this.validator.notValid([
            {
                name: 'ovk',
                type: 'string',
                value: ovk
            },
            {
                name: 'fromAmount',
                type: 'string',
                value: fromAmount
            },
            {
                name: 'shieldedReceives',
                type: 'notEmptyObject',
                value: shieldedReceives
            },
            {
                name: 'shieldedTRC20ContractAddress',
                type: 'address',
                value: shieldedTRC20ContractAddress
            }
        ], callback))
            return;

        const params = {
            ovk,
            from_amount: fromAmount,
            shielded_receives: shieldedReceives,
            shielded_TRC20_contract_address: this.tronWeb.address.toHex(shieldedTRC20ContractAddress)
        }

        this.tronWeb.fullNode.request('wallet/createshieldedcontractparameterswithoutask', params, 'post')
            .then(result => callback(null, result))
            .catch(err => callback(err));
    }

    async createTransferParams(ask, nsk, ovk, shieldedSpends, shieldedReceives, shieldedTRC20ContractAddress, callback = false) {
        if (utils.isObject(ask)) {
            callback = nsk;
            nsk = ask.nsk;
            ovk = ask.ovk;
            shieldedSpends = ask.shielded_spends;
            shieldedReceives = ask.shielded_receives;
            shieldedTRC20ContractAddress = ask.shielded_TRC20_contract_address;
            ask = ask.ask;
        }

        if (!callback) {
            return this.injectPromise(this.createTransferParams, ask, nsk, ovk, shieldedSpends, shieldedReceives, shieldedTRC20ContractAddress);
        }

        if (this.validator.notValid([
            {
                name: 'ask',
                type: 'string',
                value: ask
            },
            {
                name: 'nsk',
                type: 'string',
                value: nsk
            },
            {
                name: 'ovk',
                type: 'string',
                value: ovk
            },
            {
                name: 'shieldedSpends',
                type: 'array',
                value: shieldedSpends
            },
            {
                name: 'shieldedReceives',
                type: 'array',
                value: shieldedReceives
            },
            {
                name: 'shieldedTRC20ContractAddress',
                type: 'address',
                value: shieldedTRC20ContractAddress
            }
        ], callback))
            return;

        const params = {
            ask,
            nsk,
            ovk,
            shielded_spends: shieldedSpends,
            shielded_receives: shieldedReceives,
            shielded_TRC20_contract_address: this.tronWeb.address.toHex(shieldedTRC20ContractAddress)
        }

        this.tronWeb.fullNode.request('wallet/createshieldedcontractparameters', params, 'post')
            .then(data => callback(null, data))
            .catch(err => callback(err));

    }

    async createTransferParamsWithoutAsk(ak, nsk, ovk, shieldedSpends, shieldedReceives, shieldedTRC20ContractAddress, callback = false) {
        if (utils.isObject(ak)) {
            callback = nsk;
            nsk = ak.nsk;
            ovk = ak.ovk;
            shieldedSpends = ak.shielded_spends;
            shieldedReceives = ak.shielded_receives;
            shieldedTRC20ContractAddress = ak.shielded_TRC20_contract_address;
            ak = ak.ak;
        }

        if (!callback) {
            return this.injectPromise(this.createTransferParamsWithoutAsk, ak, nsk, ovk, shieldedSpends, shieldedReceives, shieldedTRC20ContractAddress);
        }

        if (this.validator.notValid([
            {
                name: 'ak',
                type: 'string',
                value: ak
            },
            {
                name: 'nsk',
                type: 'string',
                value: nsk
            },
            {
                name: 'ovk',
                type: 'string',
                value: ovk
            },
            {
                name: 'shieldedSpends',
                type: 'array',
                value: shieldedSpends
            },
            {
                name: 'shieldedReceives',
                type: 'array',
                value: shieldedReceives
            },
            {
                name: 'shieldedTRC20ContractAddress',
                type: 'address',
                value: shieldedTRC20ContractAddress
            }
        ], callback))
            return;

        const params = {
            ak,
            nsk,
            ovk,
            shielded_spends: shieldedSpends,
            shielded_receives: shieldedReceives,
            shielded_TRC20_contract_address: this.tronWeb.address.toHex(shieldedTRC20ContractAddress)
        }

        this.tronWeb.fullNode.request('wallet/createshieldedcontractparameterswithoutask', params, 'post')
            .then(data => callback(null, data))
            .catch(err => callback(err));

    }

    async createBurnParams(ask, nsk, ovk, shieldedSpends, shieldedReceives, transparentToAddress, toAmount, shieldedTRC20ContractAddress, callback = false) {
        if (utils.isObject(ask)) {
            callback = nsk;
            nsk = ask.nsk;
            ovk = ask.ovk;
            shieldedSpends = ask.shielded_spends;
            shieldedReceives = ask.shielded_receives;
            transparentToAddress = ask.transparent_to_address;
            toAmount = ask.to_amount;
            shieldedTRC20ContractAddress = ask.shielded_TRC20_contract_address;
            ask = ask.ask;
        }

        if (!callback) {
            return this.injectPromise(this.createBurnParams, ask, nsk, ovk, shieldedSpends, shieldedReceives, transparentToAddress, toAmount, shieldedTRC20ContractAddress);
        }

        if (this.validator.notValid([
            {
                name: 'ask',
                type: 'string',
                value: ask
            },
            {
                name: 'nsk',
                type: 'string',
                value: nsk
            },
            {
                name: 'ovk',
                type: 'string',
                value: ovk
            },
            {
                name: 'shieldedSpends',
                type: 'array',
                value: shieldedSpends
            },
            {
                name: 'shieldedReceives',
                type: 'array',
                value: shieldedReceives
            },
            {
                name: 'transparentToAddress',
                type: 'address',
                value: transparentToAddress
            },
            {
                name: 'toAmount',
                type: 'string',
                value: toAmount
            },
            {
                name: 'shieldedTRC20ContractAddress',
                type: 'address',
                value: shieldedTRC20ContractAddress
            }
        ], callback))
            return;

        const params = {
            ask,
            nsk,
            ovk,
            shielded_spends: shieldedSpends,
            shielded_receives: shieldedReceives,
            transparent_to_address: transparentToAddress,
            to_amount: toAmount,
            shielded_TRC20_contract_address: this.tronWeb.address.toHex(shieldedTRC20ContractAddress)
        }
        this.tronWeb.fullNode.request('wallet/createshieldedcontractparameters', params, 'post')
            .then(data => callback(null, data))
            .catch(err => callback(err));
    }

    async createBurnParamsWithoutAsk(ak, nsk, ovk, shieldedSpends, shieldedReceives, transparentToAddress, toAmount, shieldedTRC20ContractAddress, visible = false, callback = false) {
        if (utils.isObject(ak)) {
            callback = nsk;
            nsk = ak.nsk;
            ovk = ak.ovk;
            shieldedSpends = ak.shielded_spends;
            shieldedReceives = ak.shielded_receives;
            transparentToAddress = ak.transparent_to_address;
            toAmount = ak.to_amount;
            shieldedTRC20ContractAddress = ak.shielded_TRC20_contract_address;
            visible = ak.visible;
            ak = ak.ak;
        }

        if (!callback) {
            return this.injectPromise(this.createBurnParamsWithoutAsk, ak, nsk, ovk, shieldedSpends, shieldedReceives, transparentToAddress, toAmount, shieldedTRC20ContractAddress, visible);
        }

        if (this.validator.notValid([
            {
                name: 'ak',
                type: 'string',
                value: ak
            },
            {
                name: 'nsk',
                type: 'string',
                value: nsk
            },
            {
                name: 'ovk',
                type: 'string',
                value: ovk
            },
            {
                name: 'shieldedSpends',
                type: 'array',
                value: shieldedSpends
            },
            {
                name: 'shieldedReceives',
                type: 'array',
                value: shieldedReceives
            },
            {
                name: 'transparentToAddress',
                type: 'address',
                value: transparentToAddress
            },
            {
                name: 'toAmount',
                type: 'string',
                value: toAmount
            },
            {
                name: 'shieldedTRC20ContractAddress',
                type: 'address',
                value: shieldedTRC20ContractAddress
            }
        ], callback))
            return;

        const params = {
            ak,
            nsk,
            ovk,
            shielded_spends: shieldedSpends,
            shielded_receives: shieldedReceives,
            transparent_to_address: this.tronWeb.address.toHex(transparentToAddress),
            to_amount: toAmount,
            shielded_TRC20_contract_address: this.tronWeb.address.toHex(shieldedTRC20ContractAddress),
            visible
        }

        this.tronWeb.fullNode.request('wallet/createshieldedcontractparameterswithoutask', params, 'post')
            .then(data => callback(null, data))
            .catch(err => callback(err));
    }

}
