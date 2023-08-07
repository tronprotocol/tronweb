import TronWeb from '../index';
import utils from '../utils';

export default class Validator {

    constructor(tronWeb = false) {
        if (!tronWeb || !tronWeb instanceof TronWeb)
            throw new Error('Expected instance of TronWeb');
        this.tronWeb = tronWeb;
    }

    invalid(param) {
        return param.msg || `Invalid ${param.name}${param.type === 'address' ? ' address' : ''} provided`;
    }

    notPositive(param) {
        return `${param.name} must be a positive integer`;
    }

    notEqual(param) {
        return param.msg || `${param.names[0]} can not be equal to ${param.names[1]}`;
    }

    notValid(params = [], callback = new Function) {

        let normalized = {};
        let no = false;
        for (const param of params) {
            let {
                name,
                names,
                value,
                type,
                gt,
                lt,
                gte,
                lte,
                se,
                optional
            } = param;
            if (optional && (
                !utils.isNotNullOrUndefined(value)
                || (type !== 'boolean' && value === false)))
                continue;
            normalized[param.name] = param.value;
            switch (type) {

                case 'address':
                    if (!this.tronWeb.isAddress(value)) {
                        no = true;
                    } else {
                        normalized[name] = this.tronWeb.address.toHex(value);
                    }
                    break;

                case 'integer':
                    if (!utils.isInteger(value) ||
                        (typeof gt === 'number' && value <= param.gt) ||
                        (typeof lt === 'number' && value >= param.lt) ||
                        (typeof gte === 'number' && value < param.gte) ||
                        (typeof lte === 'number' && value > param.lte)) {
                        no = true;
                    }
                    break;

                case 'positive-integer':
                    if (!utils.isInteger(value) || value <= 0) {
                        callback(this.notPositive(param));
                        return;
                    }
                    break;

                case 'tokenId':
                    if (!utils.isString(value) || !value.length) {
                        no = true;
                    }
                    break;

                case 'notEmptyObject':
                    if (!utils.isObject(value) || !Object.keys(value).length) {
                        no = true;
                    }
                    break;

                case 'notEqual':
                    if (normalized[names[0]] === normalized[names[1]]) {
                        callback(this.notEqual(param));
                        return true;
                    }
                    break;

                case 'resource':
                    if (!['BANDWIDTH', 'ENERGY'].includes(value)) {
                        no = true;
                    }
                    break;

                case 'url':
                    if (!utils.isValidURL(value)) {
                        no = true;
                    }
                    break;

                case 'hex':
                    if (!utils.isHex(value)) {
                        no = true;
                    }
                    break;

                case 'array':
                    if (!Array.isArray(value)) {
                        no = true;
                    }
                    break;

                case 'not-empty-string':
                    if (!utils.isString(value) || !value.length) {
                        no = true;
                    }
                    break;

                case 'boolean':
                    if (!utils.isBoolean(value)) {
                        no = true;
                    }
                    break;
                case 'string':
                    if (!utils.isString(value) ||
                        (typeof gt === 'number' && value.length <= param.gt) ||
                        (typeof lt === 'number' && value.length >= param.lt) ||
                        (typeof gte === 'number' && value.length < param.gte) ||
                        (typeof lte === 'number' && value.length > param.lte)) {
                        no = true;
                    }
                    break;
            }
            if (no) {
                callback(this.invalid(param));
                return true;
            }
        }
        return false;
    }
}

