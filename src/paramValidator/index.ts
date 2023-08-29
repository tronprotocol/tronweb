import { isAddress, toHex } from '../utils/address.js';
import { isNotNullOrUndefined, isInteger, isString, isObject, isValidURL, isHex, isBoolean } from '../utils/validations.js';

export type ValidatorParamType = {
    value?: string | number | boolean | Record<string, unknown> | unknown[];
    type: unknown;
    name?: string;
    msg?: string;
    names?: string[];
    gt?: number;
    lt?: number;
    gte?: number;
    lte?: number;
    se?: number;
    optional?: boolean;
};

export class Validator {
    invalid(param: ValidatorParamType) {
        return param.msg || `Invalid ${param.name}${param.type === 'address' ? ' address' : ''} provided`;
    }

    notPositive(param: ValidatorParamType) {
        return `${param.name} must be a positive integer`;
    }

    notEqual(param: ValidatorParamType) {
        return param.msg || `${param.names?.[0]} can not be equal to ${param.names?.[1]}`;
    }

    notValid(params: ValidatorParamType[]) {
        const normalized: Record<string, unknown> = {};
        let no = false;
        for (const param of params) {
            const { name, names, value, type, gt, lt, gte, lte, optional } = param;
            if (optional && (!isNotNullOrUndefined(value) || (type !== 'boolean' && value === false))) continue;
            normalized[name as string] = param.value;
            switch (type) {
                case 'address':
                    if (!isAddress(value as string)) {
                        no = true;
                    } else {
                        normalized[name as string] = toHex(value as string);
                    }
                    break;

                case 'integer':
                    if (
                        !isInteger(value) ||
                        (typeof gt === 'number' && value <= gt) ||
                        (typeof lt === 'number' && value >= lt) ||
                        (typeof gte === 'number' && value < gte) ||
                        (typeof lte === 'number' && value > lte)
                    ) {
                        no = true;
                    }
                    break;

                case 'positive-integer':
                    if (!isInteger(value) || value <= 0) {
                        throw new Error(this.notPositive(param));
                    }
                    break;

                case 'tokenId':
                    if (!isString(value) || !value.length) {
                        no = true;
                    }
                    break;

                case 'notEmptyObject':
                    if (!isObject(value) || !Object.keys(value).length) {
                        no = true;
                    }
                    break;

                case 'notEqual':
                    if (names && normalized[names[0]] === normalized[names[1]]) {
                        throw new Error(this.notEqual(param));
                    }
                    break;

                case 'resource':
                    if (!['BANDWIDTH', 'ENERGY'].includes(value as string)) {
                        no = true;
                    }
                    break;

                case 'url':
                    if (!isValidURL(value as string)) {
                        no = true;
                    }
                    break;

                case 'hex':
                    if (!isHex(value as string)) {
                        no = true;
                    }
                    break;

                case 'array':
                    if (!Array.isArray(value)) {
                        no = true;
                    }
                    break;

                case 'not-empty-string':
                    if (!isString(value) || !value.length) {
                        no = true;
                    }
                    break;

                case 'boolean':
                    if (!isBoolean(value)) {
                        no = true;
                    }
                    break;
                case 'string':
                    if (
                        !isString(value) ||
                        (typeof gt === 'number' && value.length <= gt) ||
                        (typeof lt === 'number' && value.length >= lt) ||
                        (typeof gte === 'number' && value.length < gte) ||
                        (typeof lte === 'number' && value.length > lte)
                    ) {
                        no = true;
                    }
                    break;
            }
            if (no) {
                throw new Error(this.invalid(param));
            }
        }
        return false;
    }
}
