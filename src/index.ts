// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import providers from './lib/providers/index.js';
import type { Providers } from './lib/providers/index.js';
import utils from './utils/index.js';
import BigNumber from 'bignumber.js';
import EventEmitter from 'eventemitter3';

import { version } from '../package.json';
import semver from 'semver';

import TransactionBuilder from './lib/TransactionBuilder/TransactionBuilder.js';
import Trx from './lib/trx.js';
import Contract from './lib/contract/index.js';
// import Plugin from 'lib/plugin';
import Event from './lib/event.js';
// import SideChain from 'lib/sidechain';
import { keccak256 } from './utils/ethersUtils.js';
import { ADDRESS_PREFIX, fromHex, fromPrivateKey, isAddress, toHex, TRON_BIP39_PATH_INDEX_0 } from './utils/address.js';
import { AxiosRequestHeaders } from 'axios';
import HttpProvider from './lib/providers/HttpProvider.js';
import { decodeBase58Address, getBase58CheckAddress, isAddressValid, pkToAddress } from './utils/crypto.js';
import { byteArray2hexStr } from './utils/bytes.js';
import { hexStr2byteArray } from './utils/code.js';
import { isString } from './utils/validations.js';
import { DefaultAddress, NodeService, TronWebOptions } from './types/TronWeb';
import { ContractAbiInterface } from './types/ABI.js';
import { Address } from './types/Trx.js';

const DEFAULT_VERSION = '4.7.1';

const FEE_LIMIT = 150000000;

function isValidOptions(options: unknown): options is TronWebOptions {
    return (
        !!options &&
        typeof options === 'object' &&
        (!!(options as TronWebOptions).fullNode || !!(options as TronWebOptions).fullHost)
    );
}
export default class TronWeb extends EventEmitter {
    static providers = providers;
    static BigNumber = BigNumber;
    static TransactionBuilder = TransactionBuilder;
    static Trx = Trx;
    static Contract = Contract;
    // static Plugin = Plugin;
    static Event = Event;
    // static version = version;
    utils: typeof TronWeb.utils;
    static utils = utils;

    event: Event;
    trx: Trx;
    transactionBuilder: TransactionBuilder;
    trx: Trx;
    providers: Providers;
    BigNumber: typeof BigNumber;
    defaultBlock: number | false;
    defaultPrivateKey: string | false;
    defaultAddress: DefaultAddress;
    fullnodeVersion: string;
    feeLimit: number;

    fullNode!: HttpProvider;
    solidityNode!: HttpProvider;
    eventServer?: HttpProvider;

    constructor(options: TronWebOptions);
    constructor(fullNode: NodeService, solidityNode: NodeService, eventServer: NodeService, sideOptions: TronWebOptions);
    constructor(fullNode: NodeService, solidityNode: NodeService, eventServer: NodeService, privateKey: string);
    /* prettier-ignore */
    constructor(fullNode: NodeService, solidityNode: NodeService, eventServer: NodeService, sideOptions: TronWebOptions, privateKey?: string);
    constructor(
        options: TronWebOptions | NodeService,
        solidityNode: NodeService = '',
        eventServer: NodeService = '',
        sideOptions: string | TronWebOptions = '',
        privateKey = ''
    ) {
        super();

        let fullNode;
        let headers: AxiosRequestHeaders | false = false;
        let eventHeaders: AxiosRequestHeaders | false = false;

        if (isValidOptions(options)) {
            fullNode = options.fullNode || options.fullHost;
            sideOptions = solidityNode as string;
            solidityNode = (options.solidityNode || options.fullHost)!;
            eventServer = (options.eventServer || options.fullHost)!;
            headers = options.headers || false;
            eventHeaders = options.eventHeaders || headers;
            privateKey = options.privateKey!;
        } else {
            fullNode = options;
        }
        if (utils.isString(fullNode)) fullNode = new providers.HttpProvider(fullNode);

        if (utils.isString(solidityNode)) solidityNode = new providers.HttpProvider(solidityNode);

        if (utils.isString(eventServer)) eventServer = new providers.HttpProvider(eventServer);

        this.event = new Event(this);
        this.transactionBuilder = new TransactionBuilder(this);
        this.trx = new Trx(this);
        // this.plugin = new Plugin(this, options);
        this.utils = utils;

        this.setFullNode(fullNode as HttpProvider);
        this.setSolidityNode(solidityNode as HttpProvider);
        this.setEventServer(eventServer);

        this.providers = providers;
        this.BigNumber = BigNumber;

        this.defaultBlock = false;
        this.defaultPrivateKey = false;
        this.defaultAddress = {
            hex: false,
            base58: false,
        };

        // [
        //     'sha3',
        //     'toHex',
        //     'toUtf8',
        //     'fromUtf8',
        //     'toAscii',
        //     'fromAscii',
        //     'toDecimal',
        //     'fromDecimal',
        //     'toSun',
        //     'fromSun',
        //     'toBigNumber',
        //     'isAddress',
        //     'createAccount',
        //     'address',
        //     'version',
        //     'createRandom',
        //     'fromMnemonic',
        // ].forEach((key) => {
        //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //     // @ts-ignore
        //     this[key] = TronWeb[key];
        // });
        this.sha3 = TronWeb.sha3;
        this.fromUtf8 = TronWeb.fromUtf8;
        this.address = TronWeb.address;
        this.toUtf8 = TronWeb.toUtf8;
        this.isAddress = TronWeb.isAddress;
        this.fromAscii = TronWeb.fromAscii;
        this.toHex = TronWeb.toHex;
        this.toBigNumber = TronWeb.toBigNumber;
        this.fromDecimal = TronWeb.fromDecimal;
        this.createAccount = TronWeb.createAccount;
        // for sidechain
        // if (typeof sideOptions === 'object' && (sideOptions.fullNode || sideOptions.fullHost)) {
        //     this.sidechain = new SideChain(sideOptions, TronWeb, this, privateKey);
        // } else {
        //     privateKey = privateKey || sideOptions;
        // }

        if (privateKey) this.setPrivateKey(privateKey);
        this.fullnodeVersion = DEFAULT_VERSION;
        this.feeLimit = FEE_LIMIT;

        if (headers) {
            this.setFullNodeHeader(headers);
        }

        if (eventHeaders) {
            this.setEventHeader(eventHeaders);
        }
    }

    // async getFullnodeVersion() {
    //     try {
    //         const nodeInfo = await this.trx.getNodeInfo();
    //         this.fullnodeVersion = nodeInfo.configNodeInfo.codeVersion;
    //         if (this.fullnodeVersion.split('.').length === 2) {
    //             this.fullnodeVersion += '.0';
    //         }
    //     } catch (err) {
    //         this.fullnodeVersion = DEFAULT_VERSION;
    //     }
    // }

    // setDefaultBlock(blockID = false) {
    //     if ([false, 'latest', 'earliest', 0].includes(blockID)) {
    //         return (this.defaultBlock = blockID);
    //     }

    //     if (!utils.isInteger(blockID) || !blockID) throw new Error('Invalid block ID provided');

    //     this.defaultBlock = Math.abs(blockID);
    // }

    setPrivateKey(privateKey: string) {
        try {
            this.setAddress(TronWeb.address.fromPrivateKey(privateKey) as string);
        } catch {
            throw new Error('Invalid private key provided');
        }

        this.defaultPrivateKey = privateKey;
        this.emit('privateKeyChanged', privateKey);
    }

    setAddress(address: string) {
        if (!TronWeb.isAddress(address)) throw new Error('Invalid address provided');

        const hex = TronWeb.address.toHex(address);
        const base58 = TronWeb.address.fromHex(address);

        if (this.defaultPrivateKey && TronWeb.address.fromPrivateKey(this.defaultPrivateKey) !== base58)
            this.defaultPrivateKey = false;

        this.defaultAddress = {
            hex,
            base58,
        };

        this.emit('addressChanged', { hex, base58 });
    }

    fullnodeSatisfies(version: string) {
        return semver.satisfies(this.fullnodeVersion, version);
    }

    isValidProvider(provider: unknown) {
        return Object.values(providers).some((knownProvider) => provider instanceof knownProvider);
    }

    setFullNode(fullNode: HttpProvider | string) {
        if (isString(fullNode)) fullNode = new providers.HttpProvider(fullNode);

        if (!this.isValidProvider(fullNode)) throw new Error('Invalid full node provided');

        this.fullNode = fullNode;
        this.fullNode.setStatusPage('wallet/getnowblock');
    }

    setSolidityNode(solidityNode: HttpProvider | string) {
        if (utils.isString(solidityNode)) solidityNode = new providers.HttpProvider(solidityNode);

        if (!this.isValidProvider(solidityNode)) throw new Error('Invalid solidity node provided');

        this.solidityNode = solidityNode;
        this.solidityNode.setStatusPage('walletsolidity/getnowblock');
    }

    setEventServer(eventServer: NodeService, healthcheck?: string) {
        this.event.setServer(eventServer, healthcheck);
    }

    // setHeader(headers = {}) {
    //     const fullNode = new providers.HttpProvider(this.fullNode.host, 30000, false, false, headers);
    //     const solidityNode = new providers.HttpProvider(this.solidityNode.host, 30000, false, false, headers);
    //     const eventServer = new providers.HttpProvider(this.eventServer.host, 30000, false, false, headers);

    //     this.setFullNode(fullNode);
    //     this.setSolidityNode(solidityNode);
    //     this.setEventServer(eventServer);
    // }

    setFullNodeHeader(headers = {}) {
        const fullNode = new providers.HttpProvider(this.fullNode.host, 30000, '', '', headers);
        const solidityNode = new providers.HttpProvider(this.solidityNode.host, 30000, '', '', headers);

        this.setFullNode(fullNode);
        this.setSolidityNode(solidityNode);
    }

    setEventHeader(headers = {}) {
        const eventServer = new providers.HttpProvider(this.eventServer!.host, 30000, '', '', headers);
        this.setEventServer(eventServer);
    }

    // currentProviders() {
    //     return {
    //         fullNode: this.fullNode,
    //         solidityNode: this.solidityNode,
    //         eventServer: this.eventServer,
    //     };
    // }

    // currentProvider() {
    //     return this.currentProviders();
    // }

    // getEventResult(...params) {
    //     if (typeof params[1] !== 'object') {
    //         params[1] = {
    //             sinceTimestamp: params[1] || 0,
    //             eventName: params[2] || false,
    //             blockNumber: params[3] || false,
    //             size: params[4] || 20,
    //             page: params[5] || 1,
    //         };
    //         params.splice(2, 4);

    //         // callback:
    //         if (!utils.isFunction(params[2])) {
    //             if (utils.isFunction(params[1].page)) {
    //                 params[2] = params[1].page;
    //                 params[1].page = 1;
    //             } else if (utils.isFunction(params[1].size)) {
    //                 params[2] = params[1].size;
    //                 params[1].size = 20;
    //                 params[1].page = 1;
    //             }
    //         }
    //     }

    //     return this.event.getEventsByContractAddress(...params);
    // }

    // getEventByTransactionID(...params) {
    //     return this.event.getEventsByTransactionID(...params);
    // }

    contract(abi?: ContractAbiInterface = [], address?: Address) {
        return new Contract(this, abi, address);
    }

    address: typeof TronWeb.address;
    static get address() {
        return {
            fromHex(address: string) {
                return fromHex(address);
            },
            toHex(address: string) {
                return toHex(address);
            },
            fromPrivateKey(privateKey: string, strict = false) {
                return fromPrivateKey(privateKey, strict);
            },
        };
    }

    sha3: typeof TronWeb.sha3;
    static sha3(string: string, prefix = true) {
        return (prefix ? '0x' : '') + keccak256(Buffer.from(string, 'utf-8')).toString().substring(2);
    }

    toHex: typeof TronWeb.toHex;
    static toHex(val: any) {
        if (utils.isBoolean(val)) return TronWeb.fromDecimal(+val);

        if (utils.isBigNumber(val)) return TronWeb.fromDecimal(val);

        if (typeof val === 'object') return TronWeb.fromUtf8(JSON.stringify(val));

        if (utils.isString(val)) {
            if (/^(-|)0x/.test(val)) return val;

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (!isFinite(val) || /^\s*$/.test(val)) return TronWeb.fromUtf8(val);
        }

        const result = TronWeb.fromDecimal(val);
        if (result === '0xNaN') {
            throw new Error('The passed value is not convertible to a hex string');
        } else {
            return result;
        }
    }

    toUtf8: typeof TronWeb.toUtf8;
    static toUtf8(hex: string) {
        if (utils.isHex(hex)) {
            hex = hex.replace(/^0x/, '');
            return Buffer.from(hex, 'hex').toString('utf8');
        } else {
            throw new Error('The passed value is not a valid hex string');
        }
    }

    fromUtf8: typeof TronWeb.fromUtf8;
    static fromUtf8(string: string) {
        if (!utils.isString(string)) {
            throw new Error('The passed value is not a valid utf-8 string');
        }
        return '0x' + Buffer.from(string, 'utf8').toString('hex');
    }

    static toAscii(hex: string) {
        if (utils.isHex(hex)) {
            let str = '';
            let i = 0;
            const l = hex.length;
            if (hex.substring(0, 2) === '0x') {
                i = 2;
            }
            for (; i < l; i += 2) {
                const code = parseInt(hex.substr(i, 2), 16);
                str += String.fromCharCode(code);
            }
            return str;
        } else {
            throw new Error('The passed value is not a valid hex string');
        }
    }

    fromAscii: typeof TronWeb.fromAscii;
    static fromAscii(string: string, padding?: number) {
        if (!utils.isString(string)) {
            throw new Error('The passed value is not a valid utf-8 string');
        }
        return '0x' + Buffer.from(string, 'ascii').toString('hex').padEnd(padding!, '0');
    }

    static toDecimal(value: string) {
        return TronWeb.toBigNumber(value).toNumber();
    }

    fromDecimal: typeof TronWeb.fromDecimal;
    static fromDecimal(value: number | BigNumber) {
        const number = TronWeb.toBigNumber(value);
        const result = number.toString(16);

        return number.isLessThan(0) ? '-0x' + result.substr(1) : '0x' + result;
    }

    static fromSun(sun: number) {
        const trx = TronWeb.toBigNumber(sun).div(1_000_000);
        return utils.isBigNumber(sun) ? trx : trx.toString(10);
    }

    static toSun(trx: number) {
        const sun = TronWeb.toBigNumber(trx).times(1_000_000);
        return utils.isBigNumber(trx) ? sun : sun.toString(10);
    }

    toBigNumber: typeof TronWeb.toBigNumber;
    static toBigNumber(amount: string | number | BigNumber = 0) {
        if (utils.isBigNumber(amount)) return amount;

        if (utils.isString(amount) && /^(-|)0x/.test(amount)) return new BigNumber(amount.replace('0x', ''), 16);

        return new BigNumber(amount.toString(10), 10);
    }

    isAddress: typeof TronWeb.isAddress;
    static isAddress(address = ''): boolean {
        return isAddress(address);
    }

    createAccount: typeof TronWeb.createAccount;
    static async createAccount() {
        const account = utils.accounts.generateAccount();

        return account;
    }

    // static createRandom(options) {
    //     const account = utils.accounts.generateRandom(options);

    //     return account;
    // }

    // static fromMnemonic(mnemonic, path = TRON_BIP39_PATH_INDEX_0, wordlist = null) {
    //     const account = utils.accounts.generateAccountWithMnemonic(mnemonic, path, wordlist);

    //     return account;
    // }

    // async isConnected(callback = false) {
    //     if (!callback) return this.injectPromise(this.isConnected);

    //     return callback(null, {
    //         fullNode: await this.fullNode.isConnected(),
    //         solidityNode: await this.solidityNode.isConnected(),
    //         eventServer: this.eventServer && (await this.eventServer.isConnected()),
    //     });
    // }
}
