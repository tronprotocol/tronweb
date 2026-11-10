import { assert } from 'vitest';
import * as ethers from 'ethers';
import tronWebBuilder from '../helpers/tronWebBuilder.js';
import { getBytes } from '../../src/utils/bytesUtils.js';
const { ethersUtils } = tronWebBuilder.utils;

// The ported helpers must stay indistinguishable from ethers: same results,
// same returned instances, same thrown messages.
function sameOutcome(actual: () => unknown, expected: () => unknown) {
    let expectedValue: unknown, expectedError: any;
    try {
        expectedValue = expected();
    } catch (e) {
        expectedError = e;
    }

    if (expectedError) {
        assert.throws(actual as () => void, expectedError.message);
    } else {
        assert.deepEqual(actual(), expectedValue);
    }
}

const STRINGS = ['', 'hello world', 'a中😀', '﻿BOM', 'é', 'é', ' ߿ࠀ￿', '😀'.repeat(3)];

const BAD_UTF8 = [
    [0xff], // bad prefix
    [0x80], // unexpected continuation
    [0xe4, 0xb8], // overrun
    [0xe4, 0x41, 0xad], // missing continuation
    [0xc0, 0x80], // overlong
    [0xed, 0xa0, 0x80], // utf-16 surrogate
    [0xf4, 0x90, 0x80, 0x80], // out of range
    [0x41, 0xf0, 0x9f, 0x98, 0x80, 0xff, 0x80, 0x80, 0x42],
].map((b) => new Uint8Array(b));

describe('TronWeb.utils.ethersUtils byte helpers (ethers parity)', function () {
    describe('#getBytes() / #arrayify()', function () {
        it('returns the same Uint8Array instance', function () {
            const bytes = new Uint8Array([1, 2, 3]);
            assert.strictEqual(getBytes(bytes), bytes);
            assert.strictEqual(ethersUtils.arrayify(bytes), bytes);
        });

        it('matches ethers for valid and invalid inputs', function () {
            const inputs: any[] = ['0x', '0x00ff', '0xABcd', '0x0', '00ff', '0xzz', '', 123, null, [1, 2]];
            for (const input of inputs) {
                sameOutcome(
                    () => ethersUtils.arrayify(input),
                    () => ethers.getBytes(input)
                );
                sameOutcome(
                    () => getBytes(input, 'tx.data'),
                    () => ethers.getBytes(input, 'tx.data')
                );
            }
        });
    });

    describe('#concat()', function () {
        it('matches ethers', function () {
            const cases: any[] = [[], ['0x'], ['0x1901', new Uint8Array([0xab, 0xcd]), '0xEF'], ['0x12', 'nothex']];
            for (const datas of cases) {
                sameOutcome(
                    () => ethersUtils.concat(datas),
                    () => ethers.concat(datas)
                );
            }
        });
    });

    describe('#toUtf8Bytes()', function () {
        it('matches ethers for valid strings and every normalization form', function () {
            for (const str of STRINGS) {
                sameOutcome(
                    () => ethersUtils.toUtf8Bytes(str),
                    () => ethers.toUtf8Bytes(str)
                );
                for (const form of ['NFC', 'NFD', 'NFKC', 'NFKD'] as const) {
                    sameOutcome(
                        () => ethersUtils.toUtf8Bytes(str, form),
                        () => ethers.toUtf8Bytes(str, form)
                    );
                }
            }
        });

        it('matches ethers on lone surrogates, bad forms and non-strings', function () {
            const cases: [any, any?][] = [['\ud800'], ['a\udc00'], ['\ud800a'], ['abc', 'NFX'], [123]];
            for (const [str, form] of cases) {
                sameOutcome(
                    () => ethersUtils.toUtf8Bytes(str, form),
                    () => ethers.toUtf8Bytes(str, form)
                );
            }
        });
    });

    describe('#toUtf8String()', function () {
        it('round-trips valid strings (keeping a leading BOM) like ethers', function () {
            for (const str of STRINGS) {
                const bytes = ethers.toUtf8Bytes(str);
                assert.equal(ethersUtils.toUtf8String(bytes), str);
                assert.equal(ethersUtils.toUtf8String(ethers.hexlify(bytes)), str);
            }
        });

        it('matches ethers on invalid UTF-8 with each built-in onError', function () {
            for (const bytes of BAD_UTF8) {
                sameOutcome(
                    () => ethersUtils.toUtf8String(bytes),
                    () => ethers.toUtf8String(bytes)
                );
                for (const onError of Object.values(ethers.Utf8ErrorFuncs)) {
                    sameOutcome(
                        () => ethersUtils.toUtf8String(bytes, onError),
                        () => ethers.toUtf8String(bytes, onError)
                    );
                }
            }
        });

        it('passes the same arguments to a custom onError as ethers', function () {
            const record = (log: unknown[]) => (reason: string, offset: number, bytes: Uint8Array, output: number[], bad?: number) => {
                log.push([reason, offset, Array.from(bytes), [...output], bad]);
                return 0;
            };
            for (const bytes of BAD_UTF8) {
                const ours: unknown[] = [];
                const theirs: unknown[] = [];
                const a = ethersUtils.toUtf8String(bytes, record(ours) as ethers.Utf8ErrorFunc);
                const b = ethers.toUtf8String(bytes, record(theirs) as ethers.Utf8ErrorFunc);
                assert.equal(a, b);
                assert.deepEqual(ours, theirs);
            }
        });

        it('matches ethers on non-BytesLike input', function () {
            for (const input of ['0x1', 'abc', 42] as any[]) {
                sameOutcome(
                    () => ethersUtils.toUtf8String(input),
                    () => ethers.toUtf8String(input)
                );
            }
        });
    });

    describe('#id()', function () {
        it('matches ethers', function () {
            for (const str of [...STRINGS, 'transfer(address,uint256)']) {
                assert.equal(ethersUtils.id(str), ethers.id(str));
            }
            assert.equal(
                ethersUtils.id('transfer(address,uint256)'),
                '0xa9059cbb2ab09eb219583f4a59a5d0623ade346d962bcd4e46b11da047c9049b'
            );
            sameOutcome(
                () => ethersUtils.id('\ud800'),
                () => ethers.id('\ud800')
            );
        });
    });
});
