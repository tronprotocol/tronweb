import TronWeb from 'index';
import utils from 'utils';

export default class Validator {

    constructor(tronWeb = false) {
        if (!tronWeb || !tronWeb instanceof TronWeb)
            throw new Error('Expected instance of TronWeb');
        this.tronWeb = tronWeb;
    }

    invalid(param) {
        return param.msg || `Invalid ${param.name}${param.type === 'address' ? ' address' : ''} provided`;
    }

    notEqual(param) {
        return param.msg || `${param.names[0]} can not be equal to ${param.names[1]}`;
    }

    notValid(params = [], callback = new Function) {
        let normalized = {}
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
                optional
            } = param;
            if (optional && !utils.isNotNullOrUndefined(value))
                return false;
            switch (type) {

                case 'address':
                    if (!this.tronWeb.isAddress(value)) {
                        callback(this.invalid(param));
                        return true;
                    }
                    normalized[name] = this.tronWeb.address.toHex(value);
                    break;

                case 'integer':
                    if (!utils.isInteger(value) ||
                        (typeof gt === 'number' && !(value > param.gt)) ||
                        (typeof lt === 'number' && !(value < param.lt)) ||
                        (typeof gte === 'number' && !(value >= param.gte)) ||
                        (typeof lte === 'number' && !(value <= param.lte))) {
                        callback(this.invalid(param));
                        return true;
                    }
                    normalized[param.name] = param.value;
                    break;

                case 'tokenId':
                    if (!utils.isString(value) || !value.length) {
                        callback(this.invalid(param));
                        return true;
                    }
                    break;

                case 'notEmptyObject':
                    if (!utils.isObject(value) || !Object.keys(value).length) {
                        callback(this.invalid(param));
                        return true;
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
                        callback(this.invalid(param));
                        return true;
                    }
                    break;

                case 'url':
                    if (!utils.isValidURL(url)) {
                        callback(this.invalid(param));
                        return true;
                    }
                    break;
            }
        }
        return false;
    }
}

