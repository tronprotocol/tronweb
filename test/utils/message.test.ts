import { assert } from 'vitest';
import tronWebBuilder from '../helpers/tronWebBuilder.js';
const utils = tronWebBuilder.utils;

import messageCases from '../testcases/src/sign-message.js';
const tests = messageCases.tests;

describe('TronWeb.utils.message', function () {
    describe('#hashMessage()', function () {
        tests.forEach(function (test) {
            it('hashes a message "' + test.name + '"', function () {
                let hash = utils.message.hashMessage(test.message);
                assert.equal(hash, test.messageHash, 'calculates message hash');
            });
        });
    });

    describe('#signMessage()', function () {
        tests.forEach(function (test) {
            it('signs a message "' + test.name + '"', function () {
                const signature = utils.message.signMessage(test.message, test.privateKey);
                assert.equal(signature, test.signature, 'computes message signature');
            });
        });
    });

    describe('#signMessage() private key handling', function () {
        const key = 'e5a7d3c6b1f04c2d9e8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e';

        it('accepts the key with or without 0x and in either hex case, with the same signature', function () {
            const reference = utils.message.signMessage('hello', key);
            assert.equal(utils.message.signMessage('hello', '0x' + key), reference);
            assert.equal(utils.message.signMessage('hello', key.toUpperCase()), reference);
            assert.equal(utils.message.signMessage('hello', '0x' + key.toUpperCase()), reference);
            assert.equal(utils.message.signMessage('hello', new String(key) as string), reference);
        });

        const malformed: Record<string, unknown> = {
            'trailing newline': key + '\n',
            'carriage return': key + '\r\n',
            '63 hex digits': key.slice(1),
            '65 hex digits': key + 'f',
            '0X prefix': '0X' + key,
            'leading space': ' ' + key,
            'non-hex digit': key.slice(0, 63) + 'g',
            'empty string': '',
            'not a string': false,
        };

        for (const [name, pk] of Object.entries(malformed)) {
            it(`rejects a key with a ${name} without echoing it`, function () {
                let error: any;
                try {
                    utils.message.signMessage('hello', pk as string);
                } catch (err) {
                    error = err;
                }
                assert.instanceOf(error, Error);
                assert.equal(error.message, 'Invalid private key provided');
                assert.isUndefined((error as any).value);
                assert.notInclude(error.message, key.slice(1));
                assert.notInclude(String(error.stack), key.slice(1));
            });
        }
    });

    describe('#verifyMessage()', function () {
        tests.forEach(function (test) {
            it('verify a message "' + test.name + '"', function () {
                const address = utils.message.verifyMessage(test.message, test.signature);
                assert.equal(address, test.address, 'verifies message signature');
            });
        });
    });
});
