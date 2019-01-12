import providers from 'lib/providers';
import utils from 'utils';
import BigNumber from 'bignumber.js';
import EventEmitter from 'eventemitter3';

import TransactionBuilder from 'lib/transactionBuilder';
import Trx from 'lib/trx';
import Contract from 'lib/contract';

import {keccak256} from 'js-sha3';

export default class TronWeb extends EventEmitter {
    static providers = providers;
    static BigNumber = BigNumber;
    static TransactionBuilder = TransactionBuilder;
    static Trx = Trx;
    static Contract = Contract;

    constructor(fullNode, solidityNode, eventServer = false, privateKey = false) {
        super();

        if(utils.isString(fullNode))
            fullNode = new providers.HttpProvider(fullNode);

        if(utils.isString(solidityNode))
            solidityNode = new providers.HttpProvider(solidityNode);

        if(utils.isString(eventServer))
            eventServer = new providers.HttpProvider(eventServer);

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
            'createAccount', 'address'
        ].forEach(key => {
            this[key] = TronWeb[key];
        });

        if(privateKey)
            this.setPrivateKey(privateKey);

        this.transactionBuilder = new TransactionBuilder(this);
        this.trx = new Trx(this);
        this.utils = utils;

        this.injectPromise = utils.promiseInjector(this);
    }

    setDefaultBlock(blockID = false) {
        if([false, 'latest', 'earliest', 0].includes(blockID)) {
            return this.defaultBlock = blockID;
        }

        if(!utils.isInteger(blockID) || !blockID)
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
        if(!this.isAddress(address))
            throw new Error('Invalid address provided');

        const hex = this.address.toHex(address);
        const base58 = this.address.fromHex(address);

        if(this.defaultPrivateKey && this.address.fromPrivateKey(this.defaultPrivateKey) !== base58)
            this.defaultPrivateKey = false;

        this.defaultAddress = {
            hex,
            base58
        };

        this.emit('addressChanged', {hex, base58});
    }

    isValidProvider(provider) {
        return Object.values(providers).some(knownProvider => provider instanceof knownProvider);
    }

    setFullNode(fullNode) {
        if(utils.isString(fullNode))
            fullNode = new providers.HttpProvider(fullNode);

        if(!this.isValidProvider(fullNode))
            throw new Error('Invalid full node provided');

        this.fullNode = fullNode;
        this.fullNode.setStatusPage('wallet/getnowblock');
    }

    setSolidityNode(solidityNode) {
        if(utils.isString(solidityNode))
            solidityNode = new providers.HttpProvider(solidityNode);

        if(!this.isValidProvider(solidityNode))
            throw new Error('Invalid solidity node provided');

        this.solidityNode = solidityNode;
        this.solidityNode.setStatusPage('walletsolidity/getnowblock');
    }

    setEventServer(eventServer = false) {
        if(!eventServer)
            return this.eventServer = false;

        if(utils.isString(eventServer))
            eventServer = new providers.HttpProvider(eventServer);

        if(!this.isValidProvider(eventServer))
            throw new Error('Invalid event server provided');

        this.eventServer = eventServer;
        this.eventServer.isConnected = () => this.eventServer.request('healthcheck').then(() => true).catch(() => (
            this.eventServer.request('events?size=1').then(data => (
                Array.isArray(data)
            ))
        )).catch(() => false);
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

    getEventResult(contractAddress = false, sinceTimestamp = 0, eventName = false, blockNumber = false, size = 20, page = 1, callback = false) {

        if(utils.isFunction(page)) {
            callback = page;
            page = 1;
        }

        if(utils.isFunction(size)) {
            callback = size;
            size = 20;
        }

        if(!callback)
            return this.injectPromise(this.getEventResult, contractAddress, sinceTimestamp, eventName, blockNumber, size, page);

        if(!this.eventServer)
            callback('No event server configured');

        const routeParams = [];

        if(!this.isAddress(contractAddress))
            return callback('Invalid contract address provided');

        if(eventName && !contractAddress)
            return callback('Usage of event name filtering requires a contract address');

        if(!utils.isInteger(sinceTimestamp))
            return callback('Invalid sinceTimestamp provided');

        if(!utils.isInteger(size))
            return callback('Invalid size provided');

        if(size > 200) {
            console.warn('Defaulting to maximum accepted size: 200');
            size = 200;
        }

        if(!utils.isInteger(page))
            return callback('Invalid page provided');

        if(blockNumber && !eventName)
            return callback('Usage of block number filtering requires an event name');

        if(contractAddress)
            routeParams.push(this.address.fromHex(contractAddress));

        if(eventName)
            routeParams.push(eventName);

        if(blockNumber)
            routeParams.push(blockNumber);

        return this.eventServer.request(`event/contract/${routeParams.join('/')}?since=${sinceTimestamp}&size=${size}&page=${page}`).then((data = false) => {
            if(!data)
                return callback('Unknown error occurred');

            if(!utils.isArray(data))
                return callback(data);

            return callback(null,
                data.map(event => utils.mapEvent(event))
            );
        }).catch(err => callback((err.response && err.response.data) || err));
    }

    getEventByTransactionID(transactionID = false, callback = false) {
        if(!callback)
            return this.injectPromise(this.getEventByTransactionID, transactionID);

        if(!this.eventServer)
            callback('No event server configured');

        return this.eventServer.request(`event/transaction/${transactionID}`).then((data = false) => {
            if(!data)
                return callback('Unknown error occurred');

            if(!utils.isArray(data))
                return callback(data);

            return callback(null,
                data.map(event => utils.mapEvent(event))
            );
        }).catch(err => callback((err.response && err.response.data) || err));
    }

    contract(abi = [], address = false) {
        return new Contract(this, abi, address);
    }

    static get address() {
        return {
            fromHex(address) {
                if(!utils.isHex(address))
                    return address;

                return utils.crypto.getBase58CheckAddress(
                    utils.code.hexStr2byteArray(address.replace(/^0x/,'41'))
                );
            },
            toHex(address) {
                if(utils.isHex(address))
                    return address.toLowerCase().replace(/^0x/, '41');

                return utils.code.byteArray2hexStr(
                    utils.crypto.decodeBase58Address(address)
                ).toLowerCase();
            },
            fromPrivateKey(privateKey) {
                try {
                    return utils.crypto.pkToAddress(privateKey);
                } catch {
                    return false;
                }
            }
        }
    }

    static sha3(string, prefix = true) {
        return (prefix ? '0x' : '') + keccak256(string);
    }

    static toHex(val) {
        if(utils.isBoolean(val))
            return TronWeb.fromDecimal(+val);

        if(utils.isBigNumber(val))
            return TronWeb.fromDecimal(val);

        if(typeof val === 'object')
            return TronWeb.fromUtf8(JSON.stringify(val));

        if(utils.isString(val)) {
            if(/^(-|)0x/.test(val))
                return val;

            if(!isFinite(val))
                return TronWeb.fromUtf8(val);
        }

        let result = TronWeb.fromDecimal(val);
        if(result === '0xNaN') {
            throw new Error('The passed value is not convertible to a hex string');
        } else {
            return result;
        }
    }

    static toUtf8(hex) {
        if(utils.isHex(hex)) {
            hex = hex.replace(/^0x/, '');
            return Buffer.from(hex, 'hex').toString('utf8');
        } else {
            throw new Error('The passed value is not a valid hex string');
        }
    }

    static fromUtf8(string) {
        if(!utils.isString(string)) {
            throw new Error('The passed value is not a valid utf-8 string')
        }
        return '0x' + Buffer.from(string, 'utf8').toString('hex');
    }

    static toAscii(hex) {
        if(utils.isHex(hex)) {
            let str = "";
            let i = 0, l = hex.length;
            if(hex.substring(0, 2) === '0x') {
                i = 2;
            }
            for(; i < l; i += 2) {
                let code = parseInt(hex.substr(i, 2), 16);
                str += String.fromCharCode(code);
            }
            return str;
        } else {
            throw new Error('The passed value is not a valid hex string');
        }
    }

    static fromAscii(string, padding) {
        if(!utils.isString(string)) {
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
        if(utils.isBigNumber(amount))
            return amount;

        if(utils.isString(amount) && /^(-|)0x/.test(amount))
            return new BigNumber(amount.replace('0x', ''), 16);

        return new BigNumber(amount.toString(10), 10);
    }

    static isAddress(address = false) {
        if(!utils.isString(address))
            return false;

        // Convert HEX to Base58
        if(address.length === 42) {
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

    static async createAccount(callback = false) {
        const account = utils.accounts.generateAccount();

        if(callback)
            callback(null, account);

        return account;
    }

    async isConnected(callback = false) {
        if(!callback)
            return this.injectPromise(this.isConnected);

        callback(null, {
            fullNode: await this.fullNode.isConnected(),
            solidityNode: await this.solidityNode.isConnected(),
            eventServer: this.eventServer && await this.eventServer.isConnected()
        });
    }
};
