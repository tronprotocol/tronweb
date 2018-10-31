import * as accounts from './accounts';
import * as base58 from './base58';
import * as bytes from './bytes';
import * as crypto from './crypto';
import * as code from './code';
import * as abi from './abi';

import validator from 'validator';
import BigNumber from 'bignumber.js';

const utils = {
    isValidURL(url) {
        return validator.isURL(url.toString(), {
            protocols: [ 'http', 'https' ]
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
        return typeof string === 'string' && !isNaN(parseInt(string, 16));
    },

    isInteger(number) {
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

    injectPromise(func, ...args) {
        return new Promise((resolve, reject) => {
            func(...args, (err, res) => {
                if(err)
                    reject(err);
                else resolve(res);
            });
        });
    },

    promiseInjector(scope) {
        return (func, ...args) => {
            return this.injectPromise(func.bind(scope), ...args);
        }
    },

    mapEvent(event) {
        return {
            block: event.block_number,
            timestamp: event.block_timestamp,
            contract: event.contract_address,
            name: event.event_name,
            transaction: event.transaction_id,
            result: event.result,
            resourceNode: event.resource_Node
        };
    },

    parseEvent(event, { inputs: abi }) {
        if(!event.result)
            return event;

        if (this.isObject(event.result)) {
            for (var i = 0; i < abi.length; i++) {
                let obj = abi[i];
                if (obj.type == 'address' && obj.name in event.result)
                    event.result[obj.name] = '41' + event.result[obj.name].substr(2).toLowerCase();
            }
        } else if (this.isArray(event.result)) {
            event.result = event.result.reduce((obj, result, index) => {
                const {
                    name,
                    type
                } = abi[index];

                if(type == 'address')
                    result = '41' + result.substr(2).toLowerCase();

                obj[name] = result;

                return obj;
            }, {});
        }

        return event;
    },

    padLeft(input, padding, amount) {
        let res = input.toString();

        while(res.length < amount)
            res = padding + res;

        return res;
    }
}

export default {
    ...utils,
    code,
    accounts,
    base58,
    bytes,
    crypto,
    abi
};
