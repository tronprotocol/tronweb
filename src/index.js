import providers from 'lib/providers';
import utils from 'utils';
import axios from 'axios';
import BigNumber from 'bignumber.js';

import TransactionBuilder from 'lib/transactionBuilder';
import Trx from 'lib/trx';
import Witness from 'lib/witness';

export default class TronWeb {
    static providers = providers;
    static BigNumber = BigNumber;
    
    constructor(fullNode, solidityNode, eventServer = false) {
        this.setFullNode(fullNode);
        this.setSolidityNode(solidityNode);
        this.setEventServer(eventServer);
        
        this.providers = providers;
        this.BigNumber = BigNumber;

        this.transactionBuilder = new TransactionBuilder(this);
        this.trx = new Trx(this);
        this.witness = new Witness(this);

        this.injectPromise = utils.promiseInjector(this);
    }

    isValidProvider(provider) {
        return Object.values(providers).some(knownProvider => provider instanceof knownProvider);
    }

    isEventServerConnected() {
        if(!this.eventServer)
            return false;

        return axios.get(this.eventServer).then(({ data }) => {
            return utils.hasProperty(data, '_links');
        }).catch(() => false);
    }

    setFullNode(fullNode) {
        if(!this.isValidProvider(fullNode))
            throw new Error('Invalid full node provided');

        this.fullNode = fullNode;
        this.fullNode.setStatusPage('wallet/getnowblock');
    }

    setSolidityNode(solidityNode) {
        if(!this.isValidProvider(solidityNode))
            throw new Error('Invalid solidity node provided');

        this.solidityNode = solidityNode;
        this.solidityNode.setStatusPage('walletsolidity/getnowblock');
    }

    setEventServer(eventServer = false) {
        if(eventServer !== false && !utils.isValidURL(eventServer))
            throw new Error('Invalid URL provided for event server');

        this.eventServer = eventServer;
    }

    currentProviders() {
        return {
            fullNode: this.fullNode,
            solidityNode: this.solidityNode,
            eventServer: this.eventServer
        };
    }

    currentProvider() {
        return this.currentProviders();
    }

    // TODO
    sha3(string, options = {}) {
        // encoding: hex if string is hex
    }

    toHex(val) {
        if(utils.isBoolean(val))
            return this.fromDecimal(+val);

        if(utils.isBigNumber(val))
            return this.fromDecimal(val);

        if(typeof val === 'object')
            return this.fromUtf8(JSON.stringify(val));

        if(utils.isString(val)) {
            if(val.indexOf('-0x') === 0)
                return this.fromDecimal(val);

            if(val.indexOf('0x') === 0)
                return val;

            if(!isFinite(val))
                return this.fromUtf8(val);
        }

        return this.fromDecimal(val);
    }

    toUtf8(hex) {
        return Buffer.from(hex, 'hex').toString('utf8');
    }

    fromUtf8(string) {
        return Buffer.from(string, 'utf8').toString('hex');
    }

    toAscii(hex) {
        return Buffer.from(hex, 'hex').toString('ascii');
    }

    fromAscii(string, padding) {
        return Buffer.from(string, 'ascii').toString('hex').padEnd(padding, '0');
    }

    toDecimal(value) {
        return this.toBigNumber(value).toNumber();
    }

    fromDecimal(value) {
        const number = this.toBigNumber(value);
        const result = number.toString(16);

        return number.lessThan(0) ? '-0x' + result.substr(1) : '0x' + result;
    }

    fromSun(sun) {
        const trx = this.toBigNumber(trx).div(1_000_000);        
        return utils.isBigNumber(sun) ? trx : trx.toString(10);
    }

    toSun(trx) {
        const sun = this.toBigNumber(trx).times(1_000_000);        
        return utils.isBigNumber(trx) ? sun : sun.toString(10);
    }

    toBigNumber(amount = 0) {
        if(utils.isBigNumber(amount))
            return amount;

        if(utils.isString(amount) && (amount.indexOf('0x') === 0 || amount.indexOf('-0x') === 0))
            return new BigNumber(amount.replace('0x', ''), 16);

        return new BigNumber(amount.toString(10), 10);
    }

    // TODO
    isAddress(hex) {

    }

    // TODO
    compile(solditySource) {

    }

    // TODO
    getEventResult(contractAddress, eventName, blockNumber, callback = false) {
        if(!callback)
            return this.injectPromise(this.getEventResult, contractAddress, eventName, blockNumber);
    }

    // TODO
    getEventByTransacionID(transactionID, callback = false) {
        if(!callback)
            return this.injectPromise(this.getEventByTransacionID, transactionID);
    }

    // TODO
    createAccount(callback = false) {
        if(!callback)
            return this.injectPromise(this.createAccount);

        callback(null, utils.accounts.generateAccount());
    }

    async isConnected(callback = false) {
        if(!callback)
            return this.injectPromise(this.isConnected);

        callback(null, {
            fullNode: await this.fullNode.isConnected(),
            solidityNode: await this.solidityNode.isConnected(),
            eventServer: await this.isEventServerConnected()
        });
    }
};