import providers from './lib/providers';
import utils from './utils';
import BigNumber from 'bignumber.js';
import EventEmitter from 'eventemitter3';
import { version } from './../package.json';
import semver from 'semver';
import injectpromise from 'injectpromise';

import TransactionBuilder from './lib/transactionBuilder';
import Trx from './lib/trx';
import Contract from './lib/contract';
import Plugin from './lib/plugin';
import Event from './lib/event';
import SideChain from './lib/sidechain';
import { keccak256 } from './utils/ethersUtils';
import { ADDRESS_PREFIX, TRON_BIP39_PATH_INDEX_0 } from './utils/address';

const DEFAULT_VERSION = '4.7.1';

const FEE_LIMIT = 150000000;

export default class TronWeb extends EventEmitter {
    static providers = providers;
    static BigNumber = BigNumber;
    static TransactionBuilder = TransactionBuilder;
    static Trx = Trx;
    static Contract = Contract;
    static Plugin = Plugin;
    static Event = Event;
    static version = version;
    static utils = utils;

    constructor(options = false,
        // for retro-compatibility:
        solidityNode = false, eventServer = false, sideOptions = false, privateKey = false) {
        super();

        let fullNode;
        let headers = false;
        let eventHeaders = false;

        if (typeof options === 'object' && (options.fullNode || options.fullHost)) {
            fullNode = options.fullNode || options.fullHost;
            sideOptions = solidityNode;
            solidityNode = options.solidityNode || options.fullHost;
            eventServer = options.eventServer || options.fullHost;
            headers = options.headers || false;
            eventHeaders = options.eventHeaders || headers;
            privateKey = options.privateKey;
        } else {
            fullNode = options;
        }
        if (utils.isString(fullNode))
            fullNode = new providers.HttpProvider(fullNode);

        if (utils.isString(solidityNode))
            solidityNode = new providers.HttpProvider(solidityNode);

        if (utils.isString(eventServer))
            eventServer = new providers.HttpProvider(eventServer);

        this.event = new Event(this);
        this.transactionBuilder = new TransactionBuilder(this);
        this.trx = new Trx(this);
        this.plugin = new Plugin(this, options);
        this.utils = utils;

        this.setFullNode(fullNode);
        this.setSolidityNode(solidityNode);
        this.setEventServer(eventServer);

        this.providers = providers;
        this.BigNumber = BigNumber;

        this.defaultBlock = false;
        this.defaultPrivateKey = false;
        this.defaultAddress = {
            hex: false,
            base58: false
        };

        [
            'sha3', 'toHex', 'toUtf8', 'fromUtf8',
            'toAscii', 'fromAscii', 'toDecimal', 'fromDecimal',
            'toSun', 'fromSun', 'toBigNumber', 'isAddress',
            'createAccount', 'address', 'version', 'createRandom', 'fromMnemonic'
        ].forEach(key => {
            this[key] = TronWeb[key];
        });
        // for sidechain
        if (typeof sideOptions === 'object' && (sideOptions.fullNode || sideOptions.fullHost)) {
            this.sidechain = new SideChain(sideOptions, TronWeb, this, privateKey);
        } else {
            privateKey = privateKey || sideOptions;
        }

        if (privateKey)
            this.setPrivateKey(privateKey);
        this.fullnodeVersion = DEFAULT_VERSION;
        this.feeLimit = FEE_LIMIT;
        this.injectPromise = injectpromise(this);

        if (headers) {
            this.setFullNodeHeader(headers);
        }

        if (eventHeaders) {
            this.setEventHeader(eventHeaders);
        }
    }

    async getFullnodeVersion() {
        try {
            const nodeInfo = await this.trx.getNodeInfo()
            this.fullnodeVersion = nodeInfo.configNodeInfo.codeVersion
            if (this.fullnodeVersion.split('.').length === 2) {
                this.fullnodeVersion += '.0';
            }
        } catch (err) {
            this.fullnodeVersion = DEFAULT_VERSION;
        }
    }

    setDefaultBlock(blockID = false) {
        if ([false, 'latest', 'earliest', 0].includes(blockID)) {
            return this.defaultBlock = blockID;
        }

        if (!utils.isInteger(blockID) || !blockID)
            throw new Error('Invalid block ID provided');

        this.defaultBlock = Math.abs(blockID);
    }

    setPrivateKey(privateKey) {
        try {
            this.setAddress(
                this.address.fromPrivateKey(privateKey)
            );
        } catch {
            throw new Error('Invalid private key provided');
        }

        this.defaultPrivateKey = privateKey;
        this.emit('privateKeyChanged', privateKey);
    }

    setAddress(address) {
        if (!this.isAddress(address))
            throw new Error('Invalid address provided');

        const hex = this.address.toHex(address);
        const base58 = this.address.fromHex(address);

        if (this.defaultPrivateKey && this.address.fromPrivateKey(this.defaultPrivateKey) !== base58)
            this.defaultPrivateKey = false;

        this.defaultAddress = {
            hex,
            base58
        };

        this.emit('addressChanged', { hex, base58 });
    }

    fullnodeSatisfies(version) {
        return semver.satisfies(this.fullnodeVersion, version);
    }

    isValidProvider(provider) {
        return Object.values(providers).some(knownProvider => provider instanceof knownProvider);
    }

    setFullNode(fullNode) {
        if (utils.isString(fullNode))
            fullNode = new providers.HttpProvider(fullNode);

        if (!this.isValidProvider(fullNode))
            throw new Error('Invalid full node provided');

        this.fullNode = fullNode;
        this.fullNode.setStatusPage('wallet/getnowblock');
    }

    setSolidityNode(solidityNode) {
        if (utils.isString(solidityNode))
            solidityNode = new providers.HttpProvider(solidityNode);

        if (!this.isValidProvider(solidityNode))
            throw new Error('Invalid solidity node provided');

        this.solidityNode = solidityNode;
        this.solidityNode.setStatusPage('walletsolidity/getnowblock');
    }

    setEventServer(...params) {
        this.event.setServer(...params)
    }

    setHeader (headers = {}) {
        const fullNode = new providers.HttpProvider(this.fullNode.host, 30000, false, false, headers);
        const solidityNode = new providers.HttpProvider(this.solidityNode.host, 30000, false, false, headers);
        const eventServer = new providers.HttpProvider(this.eventServer.host, 30000, false, false, headers);

        this.setFullNode(fullNode);
        this.setSolidityNode(solidityNode);
        this.setEventServer(eventServer);
    }

    setFullNodeHeader (headers = {}) {
        const fullNode = new providers.HttpProvider(this.fullNode.host, 30000, false, false, headers);
        const solidityNode = new providers.HttpProvider(this.solidityNode.host, 30000, false, false, headers);

        this.setFullNode(fullNode);
        this.setSolidityNode(solidityNode);
    }

    setEventHeader (headers = {}) {
        const eventServer = new providers.HttpProvider(this.eventServer.host, 30000, false, false, headers);
        this.setEventServer(eventServer);
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


    getEventResult(...params) {

        if (typeof params[1] !== 'object') {
            params[1] = {
                sinceTimestamp: params[1] || 0,
                eventName: params[2] || false,
                blockNumber: params[3] || false,
                size: params[4] || 20,
                page: params[5] || 1
            }
            params.splice(2, 4)

            // callback:
            if (!utils.isFunction(params[2])) {

                if (utils.isFunction(params[1].page)) {
                    params[2] = params[1].page;
                    params[1].page = 1;
                } else if (utils.isFunction(params[1].size)) {
                    params[2] = params[1].size;
                    params[1].size = 20;
                    params[1].page = 1;
                }
            }
        }

        return this.event.getEventsByContractAddress(...params);
    }

    getEventByTransactionID(...params) {
        return this.event.getEventsByTransactionID(...params)
    }

    contract(abi = [], address = false) {
        return new Contract(this, abi, address);
    }

    static get address() {
        return {
            fromHex(address) {
                if (!utils.isHex(address))
                    return address;

                return utils.crypto.getBase58CheckAddress(
                    utils.code.hexStr2byteArray(address.replace(/^0x/, ADDRESS_PREFIX))
                );
            },
            toHex(address) {
                if (utils.isHex(address))
                    return address.toLowerCase().replace(/^0x/, ADDRESS_PREFIX);

                return utils.code.byteArray2hexStr(
                    utils.crypto.decodeBase58Address(address)
                ).toLowerCase();
            },
            fromPrivateKey(privateKey, strict = false) {
                try {
                    return utils.crypto.pkToAddress(privateKey, strict);
                } catch {
                    return false;
                }
            }
        }
    }

    static sha3(string, prefix = true) {
        return (prefix ? '0x' : '') + keccak256(Buffer.from(string, 'utf-8')).toString().substring(2);
    }

    static toHex(val) {
        if (utils.isBoolean(val))
            return TronWeb.fromDecimal(+val);

        if (utils.isBigNumber(val))
            return TronWeb.fromDecimal(val);

        if (typeof val === 'object')
            return TronWeb.fromUtf8(JSON.stringify(val));

        if (utils.isString(val)) {
            if (/^(-|)0x/.test(val))
                return val;

            if ((!isFinite(val)) || /^\s*$/.test(val))
                return TronWeb.fromUtf8(val);
        }

        let result = TronWeb.fromDecimal(val);
        if (result === '0xNaN') {
            throw new Error('The passed value is not convertible to a hex string');
        } else {
            return result;
        }
    }

    static toUtf8(hex) {
        if (utils.isHex(hex)) {
            hex = hex.replace(/^0x/, '');
            return Buffer.from(hex, 'hex').toString('utf8');
        } else {
            throw new Error('The passed value is not a valid hex string');
        }
    }

    static fromUtf8(string) {
        if (!utils.isString(string)) {
            throw new Error('The passed value is not a valid utf-8 string')
        }
        return '0x' + Buffer.from(string, 'utf8').toString('hex');
    }

    static toAscii(hex) {
        if (utils.isHex(hex)) {
            let str = "";
            let i = 0, l = hex.length;
            if (hex.substring(0, 2) === '0x') {
                i = 2;
            }
            for (; i < l; i += 2) {
                let code = parseInt(hex.substr(i, 2), 16);
                str += String.fromCharCode(code);
            }
            return str;
        } else {
            throw new Error('The passed value is not a valid hex string');
        }
    }

    static fromAscii(string, padding) {
        if (!utils.isString(string)) {
            throw new Error('The passed value is not a valid utf-8 string')
        }
        return '0x' + Buffer.from(string, 'ascii').toString('hex').padEnd(padding, '0');
    }


    static toDecimal(value) {
        return TronWeb.toBigNumber(value).toNumber();
    }

    static fromDecimal(value) {
        const number = TronWeb.toBigNumber(value);
        const result = number.toString(16);

        return number.isLessThan(0) ? '-0x' + result.substr(1) : '0x' + result;
    }

    static fromSun(sun) {
        const trx = TronWeb.toBigNumber(sun).div(1_000_000);
        return utils.isBigNumber(sun) ? trx : trx.toString(10);
    }

    static toSun(trx) {
        const sun = TronWeb.toBigNumber(trx).times(1_000_000);
        return utils.isBigNumber(trx) ? sun : sun.toString(10);
    }

    static toBigNumber(amount = 0) {
        if (utils.isBigNumber(amount))
            return amount;

        if (utils.isString(amount) && /^(-|)0x/.test(amount))
            return new BigNumber(amount.replace('0x', ''), 16);

        return new BigNumber(amount.toString(10), 10);
    }

    static isAddress(address = false) {
        if (!utils.isString(address))
            return false;

        // Convert HEX to Base58
        if (address.length === 42) {
            try {
                return TronWeb.isAddress(
                    utils.crypto.getBase58CheckAddress(
                        utils.code.hexStr2byteArray(address) // it throws an error if the address starts with 0x
                    )
                );
            } catch (err) {
                return false;
            }
        }
        try {
            return utils.crypto.isAddressValid(address);
        } catch (err) {
            return false;
        }
    }

    static async createAccount() {
        const account = utils.accounts.generateAccount();

        return account;
    }

    static createRandom(options) {
        const account = utils.accounts.generateRandom(options);

        return account
    }

    static fromMnemonic(mnemonic, path = TRON_BIP39_PATH_INDEX_0, wordlist = null) {
        const account = utils.accounts.generateAccountWithMnemonic(mnemonic, path, wordlist);

        return account
    }

    async isConnected(callback = false) {
        if (!callback)
            return this.injectPromise(this.isConnected);

        return callback(null, {
            fullNode: await this.fullNode.isConnected(),
            solidityNode: await this.solidityNode.isConnected(),
            eventServer: this.eventServer && await this.eventServer.isConnected()
        });
    }
};
