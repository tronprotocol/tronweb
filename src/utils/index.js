import * as accounts from './accounts';
import * as base58 from './base58';
import * as bytes from './bytes';
import * as crypto from './crypto';
import * as code from './code';

import validator from 'validator';
import BigNumber from 'bignumber.js';

const utils = {
    isValidURL(url) {
        return validator.isURL(url, {
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
    }
}

export default {
    ...utils,
    code,
    accounts,
    base58,
    bytes,
    crypto
};