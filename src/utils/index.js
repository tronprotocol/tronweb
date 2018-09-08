// import here, export them all as property of default
// i.e. utils.accounts.generateAccount()
// or utils.isValidURL()

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

    hasProperty(obj, property) {
        return Object.property.hasOwnProperty.call(obj, property);
    }
}

export default {
    ...utils
};