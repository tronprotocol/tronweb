import { BigNumber } from 'bignumber.js';
import { isAddress, toHex } from '../utils/address.js';
import { isNotNullOrUndefined, isString, isObject, isValidURL, isHex, isBoolean } from '../utils/validations.js';

export type ValidatorParamType = {
    value?: string | number | bigint | boolean | BigNumber | Record<string, unknown> | unknown[];
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

const INTEGER_STRING = /^-?\d+$/;

/**
 * Strictly reads an integer argument: an integer number, a bigint, a plain digit string such as
 * '1000000' or an integer BigNumber. Anything else, including strings that merely coerce to an
 * integer ('1e6', '0x10', ' 12 ', ''), fractions, NaN/Infinity, booleans and arrays, yields
 * undefined. Builders encode the returned number, so the value written into a transaction is
 * always the one that was validated.
 */
export function toInteger(value: unknown): number | undefined {
    switch (typeof value) {
        case 'number':
            return Number.isInteger(value) ? value : undefined;
        case 'bigint':
            return Number(value);
        case 'string':
            return INTEGER_STRING.test(value) ? Number(value) : undefined;
        case 'object': {
            if (!BigNumber.isBigNumber(value)) return undefined;
            // Copy first so the checks run on bignumber.js prototype methods, not instance overrides,
            // and so the result does not depend on the global EXPONENTIAL_AT setting.
            const copy = new BigNumber(value);
            return copy.isFinite() && copy.isInteger() ? Number(copy.toFixed()) : undefined;
        }
        default:
            return undefined;
    }
}

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

                case 'integer': {
                    const integer = toInteger(value);
                    if (
                        integer === undefined ||
                        (typeof gt === 'number' && integer <= gt) ||
                        (typeof lt === 'number' && integer >= lt) ||
                        (typeof gte === 'number' && integer < gte) ||
                        (typeof lte === 'number' && integer > lte)
                    ) {
                        no = true;
                    }
                    break;
                }

                case 'positive-integer': {
                    const integer = toInteger(value);
                    if (integer === undefined || integer <= 0) {
                        throw new Error(this.notPositive(param));
                    }
                    break;
                }

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
