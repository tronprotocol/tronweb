import * as accounts from './accounts';
import * as base58 from './base58';
import * as bytes from './bytes';
import * as crypto from './crypto';
import * as code from './code';
import * as abi from './abi';
import * as ethersUtils from './ethersUtils';

import validator from 'validator';
import BigNumber from 'bignumber.js';
import {ADDRESS_PREFIX} from 'utils/address';

const utils = {
    isValidURL(url) {
        if (typeof url !== 'string')
            return false;
        return validator.isURL(url.toString(), {
            protocols: ['http', 'https'],
            require_tld: false
        });
    },

    isObject(obj) {
        return obj === Object(obj) && Object.prototype.toString.call(obj) !== '[object Array]';
    },

    isArray(array) {
        return Array.isArray(array);
    },

    isJson(string) {
        try {
            return !!JSON.parse(string);
        } catch (ex) {
            return false;
        }
    },

    isBoolean(bool) {
        return typeof bool === 'boolean';
    },

    isBigNumber(number) {
        return number && (number instanceof BigNumber || (number.constructor && number.constructor.name === 'BigNumber'));
    },

    isString(string) {
        return typeof string === 'string' || (string && string.constructor && string.constructor.name === 'String');
    },

    isFunction(obj) {
        return typeof obj === 'function';
    },

    isHex(string) {
        return (typeof string === 'string'
            && !isNaN(parseInt(string, 16))
            && /^(0x|)[a-fA-F0-9]+$/.test(string));
    },

    isInteger(number) {
        if (number === null)
            return false
        return Number.isInteger(
            Number(number)
        );
    },

    hasProperty(obj, property) {
        return Object.prototype.hasOwnProperty.call(obj, property);
    },

    hasProperties(obj, ...properties) {
        return properties.length && !properties.map(property => {
            return this.hasProperty(obj, property)
        }).includes(false);
    },

    mapEvent(event) {
        let data = {
            block: event.block_number,
            timestamp: event.block_timestamp,
            contract: event.contract_address,
            name: event.event_name,
            transaction: event.transaction_id,
            result: event.result,
            resourceNode: event.resource_Node || (event._unconfirmed ? 'fullNode' : 'solidityNode')
        };
        if (event._unconfirmed) {
            data.unconfirmed = event._unconfirmed
        }
        if (event._fingerprint) {
            data.fingerprint = event._fingerprint;
        }
        return data;
    },

    parseEvent(event, {inputs: abi}) {
        if (!event.result)
            return event;

        if (this.isObject(event.result)) {
            for (var i = 0; i < abi.length; i++) {
                let obj = abi[i];
                if (obj.type == 'address' && obj.name in event.result)
                    event.result[obj.name] = ADDRESS_PREFIX + event.result[obj.name].substr(2).toLowerCase();
            }
        } else if (this.isArray(event.result)) {
            event.result = event.result.reduce((obj, result, index) => {
                const {
                    name,
                    type
                } = abi[index];

                if (type == 'address')
                    result = ADDRESS_PREFIX + result.substr(2).toLowerCase();

                obj[name] = result;

                return obj;
            }, {});
        }

        return event;
    },

    padLeft(input, padding, amount) {
        let res = input.toString();

        while (res.length < amount)
            res = padding + res;

        return res;
    },

    isNotNullOrUndefined(val) {
        return val !== null && typeof val !== 'undefined';
    },

    async sleep(millis = 1000){
        return new Promise(resolve => setTimeout(resolve, millis));
    }
}

export default {
    ...utils,
    code,
    accounts,
    base58,
    bytes,
    crypto,
    abi,
    ethersUtils
};
