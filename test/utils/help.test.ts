import { assert } from 'vitest';
import {
    hexStringToBase58,
    base58ToHexString,
    hexStringToUtf8,
    stringUtf8tHex,
    address2HexString,
    hexString2Address,
    hexString2Utf8,
    stringUtf8toHex,
} from '../../src/utils/help.js';
import config from '../helpers/config.js';

const { ADDRESS_HEX, ADDRESS_BASE58 } = config;

describe('utils.help', function () {
    describe('#hexStringToBase58()', function () {
        it('should convert a hex address to base58', function () {
            assert.equal(hexStringToBase58(ADDRESS_HEX), ADDRESS_BASE58);
            assert.equal(hexString2Address(ADDRESS_HEX), ADDRESS_BASE58);
        });

        it('should return an empty string for too short or odd-length input', function () {
            assert.equal(hexStringToBase58('4'), '');
            assert.equal(hexStringToBase58('417'), '');
        });
    });

    describe('#base58ToHexString()', function () {
        it('should convert a base58 address to hex', function () {
            assert.equal(base58ToHexString(ADDRESS_BASE58).toLowerCase(), ADDRESS_HEX);
        });

        it('should return an empty string when the input cannot be decoded', function () {
            assert.equal(base58ToHexString('abc'), '');
        });
    });

    describe('#address2HexString()', function () {
        it('should return a hex address unchanged', function () {
            assert.equal(address2HexString(ADDRESS_HEX), ADDRESS_HEX);
        });

        it('should convert a base58 address to hex', function () {
            assert.equal(address2HexString(ADDRESS_BASE58).toLowerCase(), ADDRESS_HEX);
        });
    });

    describe('utf8 <-> hex', function () {
        it('should convert between strings and hex', function () {
            assert.equal(stringUtf8tHex('hello'), '68656c6c6f');
            assert.equal(stringUtf8toHex('hello'), '68656c6c6f');
            assert.equal(stringUtf8tHex(''), '');
            assert.equal(hexStringToUtf8('68656c6c6f'), 'hello');
            assert.equal(hexString2Utf8('68656c6c6f'), 'hello');
        });
    });
});
