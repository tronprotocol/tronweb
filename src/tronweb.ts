import { HttpProvider, providers } from './lib/providers/index.js';
import type { Providers } from './lib/providers/index.js';
import utils from './utils/index.js';
import { BigNumber } from 'bignumber.js';
import EventEmitter from 'eventemitter3';
import semver from 'semver';

import { TransactionBuilder } from './lib/TransactionBuilder/TransactionBuilder.js';
import { Trx } from './lib/trx.js';
import { Contract } from './lib/contract/index.js';
import { Plugin } from './lib/plugin.js';
import { Event } from './lib/event.js';
import { keccak256 } from './utils/ethersUtils.js';
import { fromHex, fromPrivateKey, isAddress, toHex, toChecksumAddress, isChecksumAddress } from './utils/address.js';
import { HeadersType } from './types/Providers.js';
import { isString } from './utils/validations.js';
import { DefaultAddress, NodeProvider, TronWebOptions, IBigNumber } from './types/TronWeb.js';
import { ContractAbiInterface, ContractInstance } from './types/ABI.js';
import { Address } from './types/Trx.js';

const DEFAULT_VERSION = '4.7.1';

const FEE_LIMIT = 150000000;

const version = '6.0.4';

function isValidOptions(options: unknown): options is TronWebOptions {
    return (
        !!options &&
        typeof options === 'object' &&
        (!!(options as TronWebOptions).fullNode || !!(options as TronWebOptions).fullHost)
    );
}

export class TronWeb extends EventEmitter {
    providers: Providers;
    BigNumber: typeof BigNumber;
    transactionBuilder: TransactionBuilder;
    trx: Trx;
    plugin: Plugin;
    event: Event;
    version: typeof TronWeb.version;
    static version = version;
    utils: typeof utils;

    defaultBlock: number | false | 'earliest' | 'latest';
    defaultPrivateKey: string | false;
    defaultAddress: DefaultAddress;
    fullnodeVersion: string;
    feeLimit: number;

    fullNode!: HttpProvider;
    solidityNode!: HttpProvider;
    eventServer?: HttpProvider;

    constructor(options: TronWebOptions);
    constructor(fullNode: NodeProvider, solidityNode: NodeProvider, eventServer?: NodeProvider, privateKey?: string);
    /* prettier-ignore */
    constructor(fullNode: NodeProvider, solidityNode: NodeProvider, eventServer: NodeProvider, privateKey?: string);
    constructor(
        options: TronWebOptions | NodeProvider,
        solidityNode: NodeProvider = '',
        eventServer?: NodeProvider,
        privateKey = ''
    ) {
        super();

        let fullNode;
        let headers: HeadersType | false = false;
        let eventHeaders: HeadersType | false = false;

        if (isValidOptions(options)) {
            fullNode = options.fullNode || options.fullHost;
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
        this.plugin = new Plugin(this, {
            disablePlugins: isValidOptions(options) ? options.disablePlugins : false,
        });
        this.utils = utils;

        this.setFullNode(fullNode as HttpProvider);
        this.setSolidityNode(solidityNode as HttpProvider);
        this.setEventServer(eventServer!);

        this.providers = providers;
        this.BigNumber = BigNumber;

        this.defaultBlock = false;
        this.defaultPrivateKey = false;
        this.defaultAddress = {
            hex: false,
            base58: false,
        };

        this.version = TronWeb.version;
        this.sha3 = TronWeb.sha3;
        this.fromUtf8 = TronWeb.fromUtf8;
        this.address = TronWeb.address;
        this.toAscii = TronWeb.toAscii;
        this.toUtf8 = TronWeb.toUtf8;
        this.isAddress = TronWeb.isAddress;
        this.fromAscii = TronWeb.fromAscii;
        this.toHex = TronWeb.toHex;
        this.toBigNumber = TronWeb.toBigNumber;
        this.toDecimal = TronWeb.toDecimal;
        this.fromDecimal = TronWeb.fromDecimal;
        this.toSun = TronWeb.toSun;
        this.fromSun = TronWeb.fromSun;
        this.createAccount = TronWeb.createAccount;
        this.createRandom = TronWeb.createRandom;
        this.fromMnemonic = TronWeb.fromMnemonic;

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

    async getFullnodeVersion() {
        try {
            const nodeInfo = await this.trx.getNodeInfo();
            this.fullnodeVersion = nodeInfo.configNodeInfo.codeVersion;
            if (this.fullnodeVersion.split('.').length === 2) {
                this.fullnodeVersion += '.0';
            }
        } catch (err) {
            this.fullnodeVersion = DEFAULT_VERSION;
        }
    }

    setDefaultBlock(blockID: false | 'latest' | 'earliest' | number = false) {
        if ([false, 'latest', 'earliest', 0].includes(blockID)) {
            return (this.defaultBlock = blockID);
        }

        if (!utils.isInteger(blockID) || !blockID) throw new Error('Invalid block ID provided');

        return (this.defaultBlock = Math.abs(blockID));
    }

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

    setEventServer(eventServer: NodeProvider, healthcheck?: string) {
        this.event.setServer(eventServer, healthcheck);
    }

    setHeader(headers = {}) {
        const fullNode = new providers.HttpProvider(this.fullNode.host, 30000, '', '', headers);
        const solidityNode = new providers.HttpProvider(this.solidityNode.host, 30000, '', '', headers);
        const eventServer = new providers.HttpProvider(this.eventServer!.host, 30000, '', '', headers);

        this.setFullNode(fullNode);
        this.setSolidityNode(solidityNode);
        this.setEventServer(eventServer);
    }

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

    currentProviders() {
        return {
            fullNode: this.fullNode,
            solidityNode: this.solidityNode,
            eventServer: this.eventServer,
        };
    }

    currentProvider() {
        return this.currentProviders();
    }

    getEventResult(...params: Parameters<Event['getEventsByContractAddress']>): ReturnType<Event['getEventsByContractAddress']> {
        return this.event.getEventsByContractAddress(...params);
    }

    getEventByTransactionID(
        ...params: Parameters<Event['getEventsByTransactionID']>
    ): ReturnType<Event['getEventsByTransactionID']> {
        return this.event.getEventsByTransactionID(...params);
    }

    contract<Abi extends ContractAbiInterface>(abi: Abi = [] as any, address?: Address): ContractInstance<Abi> {
        return new Contract<Abi>(this, abi, address!) as ContractInstance<Abi>;
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
            toChecksumAddress(address: string) {
                return toChecksumAddress(address);
            },
            isChecksumAddress(address: string) {
                return isChecksumAddress(address);
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
    static toHex(val: string | number | boolean | Record<string | number | symbol, unknown> | unknown[] | IBigNumber) {
        if (utils.isBoolean(val)) return TronWeb.fromDecimal(+val);

        if (utils.isBigNumber(val)) return TronWeb.fromDecimal(val);

        if (typeof val === 'object') return TronWeb.fromUtf8(JSON.stringify(val));

        if (utils.isString(val)) {
            if (/^(-|)0x/.test(val)) return val;

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (!isFinite(val) || /^\s*$/.test(val)) return TronWeb.fromUtf8(val);
        }

        const result = TronWeb.fromDecimal(val as number);
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

    toAscii: typeof TronWeb.toAscii;
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

    toDecimal: typeof TronWeb.toDecimal;
    static toDecimal(value: string | number | IBigNumber) {
        return TronWeb.toBigNumber(value).toNumber();
    }

    fromDecimal: typeof TronWeb.fromDecimal;
    static fromDecimal(value: number | IBigNumber) {
        const number = TronWeb.toBigNumber(value);
        const result = number.toString(16);

        return number.isLessThan(0) ? '-0x' + result.substr(1) : '0x' + result;
    }

    fromSun: typeof TronWeb.fromSun;
    static fromSun(sun: number): string | IBigNumber {
        const trx = TronWeb.toBigNumber(sun).div(1_000_000);
        return utils.isBigNumber(sun) ? trx : trx.toString(10);
    }

    toSun: typeof TronWeb.toSun;
    static toSun(trx: number): string | IBigNumber {
        const sun = TronWeb.toBigNumber(trx).times(1_000_000);
        return utils.isBigNumber(trx) ? sun : sun.toString(10);
    }

    toBigNumber: typeof TronWeb.toBigNumber;
    static toBigNumber(amount: string | number | IBigNumber = 0): IBigNumber {
        if (utils.isBigNumber(amount)) return amount;

        if (utils.isString(amount) && /^(-|)0x/.test(amount)) return new BigNumber(amount.replace('0x', ''), 16);

        return new BigNumber(amount.toString(10), 10);
    }

    isAddress: typeof TronWeb.isAddress;
    static isAddress(address: unknown = ''): boolean {
        return isAddress(address);
    }

    createAccount: typeof TronWeb.createAccount;
    static async createAccount() {
        const account = utils.accounts.generateAccount();

        return account;
    }

    createRandom: typeof TronWeb.createRandom;
    static createRandom(
        ...params: Parameters<(typeof utils)['accounts']['generateRandom']>
    ): ReturnType<(typeof utils)['accounts']['generateRandom']> {
        const account = utils.accounts.generateRandom(...params);

        return account;
    }

    fromMnemonic: typeof TronWeb.fromMnemonic;
    static fromMnemonic(
        ...params: Parameters<(typeof utils)['accounts']['generateAccountWithMnemonic']>
    ): ReturnType<(typeof utils)['accounts']['generateAccountWithMnemonic']> {
        const account = utils.accounts.generateAccountWithMnemonic(...params);

        return account;
    }

    async isConnected() {
        return {
            fullNode: await this.fullNode.isConnected(),
            solidityNode: await this.solidityNode.isConnected(),
            eventServer: this.eventServer && (await this.eventServer.isConnected()),
        };
    }
}
export default TronWeb;
