// @ts-ignore
import { TronWeb, utils } from '../setup/TronWeb.js';
import { isHexString } from 'ethers';

const bnify = (n: string | number) => BigInt(n);

const getValues = (object: any, named?: string[]) => {
    if (Array.isArray(object)) {
        let result: any[] = [];
        object.forEach(function (object) {
            result.push(getValues(object, named));
        });
        return result;
    }

    switch (object.type) {
        case 'number':
            return bnify(object.value);

        case 'boolean':
        case 'string':
            return object.value;

        case 'buffer':
            return utils.ethersUtils.arrayify(object.value);

        case 'tuple':
            let result: any[] = getValues(object.value, named);
            if (named) {
                let namedResult: Record<string, any> = {};
                result.forEach((value, index) => {
                    namedResult['r' + String(index)] = value;
                });
                return namedResult;
            }
            return result;

        default:
            throw new Error('invalid type - ' + object.type);
    }
};

const equals = (actual: any, expected: any) => {
    // Array (treat recursively)
    if (Array.isArray(actual)) {
        if (!Array.isArray(expected) || actual.length !== expected.length) {
            return false;
        }
        for (let i = 0; i < actual.length; i++) {
            if (!equals(actual[i], expected[i])) {
                return false;
            }
        }
        return true;
    }

    if (typeof actual === 'number') {
        actual = bnify(actual);
    }
    if (typeof expected === 'number') {
        expected = bnify(expected);
    }

    // BigNumber
    if (actual.eq) {
        if (typeof expected === 'string' && expected.match(/^-?0x[0-9A-Fa-f]*$/)) {
            let neg = expected.substring(0, 1) === '-';
            if (neg) {
                expected = expected.substring(1);
            }
            expected = bnify(expected);
            if (neg) {
                expected = expected.mul(-1);
            }
        }
        if (!actual.eq(expected)) {
            return false;
        }
        return true;
    }

    // Uint8Array
    if (expected.buffer) {
        if (!isHexString(actual)) {
            return false;
        }
        actual = utils.ethersUtils.arrayify(actual);

        if (!actual.buffer || actual.length !== expected.length) {
            return false;
        }
        for (let i = 0; i < actual.length; i++) {
            if (actual[i] !== expected[i]) {
                return false;
            }
        }

        return true;
    }

    // Maybe address?
    try {
        if (TronWeb.isAddress(actual)) {
            let actualAddress = actual;
            let expectedAddress = TronWeb.address.toHex(expected);

            return actualAddress === expectedAddress;
        }
    } catch (error) {}

    // Something else
    return actual === expected;
};

export default {
    getValues,
    equals,
};
