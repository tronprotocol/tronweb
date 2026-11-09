import { assert } from 'vitest';
import { BigNumber } from 'bignumber.js';
import { TronWeb, utils } from '../setup/TronWeb.js';
import { Validator, toInteger } from '../../src/paramValidator/index.js';

const PRIVATE_KEY = '0000000000000000000000000000000000000000000000000000000000000001';
const RECIPIENT = 'TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY';
const BLOCK_HEADER = {
    ref_block_bytes: '0001',
    ref_block_hash: '0000000000000001',
    expiration: 1_800_000_060_000,
    timestamp: 1_800_000_000_000,
};

describe('paramValidator', function () {
    describe('#toInteger()', function () {
        it('accepts integer numbers, bigints and digit strings', function () {
            assert.strictEqual(toInteger(0), 0);
            assert.strictEqual(toInteger(-3), -3);
            assert.strictEqual(toInteger(1e6), 1_000_000);
            assert.strictEqual(toInteger(1_000_000n), 1_000_000);
            assert.strictEqual(toInteger('1000000'), 1_000_000);
            assert.strictEqual(toInteger('-5'), -5);
        });

        it('accepts integer BigNumbers regardless of the exponential notation setting', function () {
            assert.strictEqual(toInteger(new BigNumber(1_000_000)), 1_000_000);
            assert.strictEqual(toInteger(new BigNumber('1e6')), 1_000_000);
            assert.strictEqual(toInteger(new BigNumber('12.0')), 12);
            const Exp = BigNumber.clone({ EXPONENTIAL_AT: 2 });
            assert.strictEqual(String(new Exp(1_000_000)), '1e+6');
            assert.strictEqual(toInteger(new Exp(1_000_000)), 1_000_000);
        });

        it('rejects strings that only coerce to an integer', function () {
            for (const value of ['1e6', '1E6', '0x10', '0b1', '', ' 12 ', '12.0', '+5', '1_000', 'Infinity']) {
                assert.isUndefined(toInteger(value), JSON.stringify(value));
            }
        });

        it('rejects fractions, non-finite values and other types', function () {
            for (const value of [1.5, NaN, Infinity, -Infinity, true, false, null, undefined, [], [1], {}, () => 1]) {
                assert.isUndefined(toInteger(value), String(value));
            }
            assert.isUndefined(toInteger({ valueOf: () => 1, toString: () => '1' }));
        });

        it('rejects non-integer BigNumbers and look-alikes', function () {
            for (const value of [new BigNumber(1.5), new BigNumber(NaN), new BigNumber(Infinity), new BigNumber(-Infinity)]) {
                assert.isUndefined(toInteger(value), value.toString());
            }
            assert.isUndefined(toInteger({ constructor: { name: 'BigNumber' }, isInteger: () => true, toFixed: () => '1' }));
        });
    });

    describe('Validator', function () {
        const validator = new Validator();
        const check =
            (type: string, value: unknown, bounds: Record<string, number> = {}) =>
            () =>
                validator.notValid([{ name: 'amount', type, value: value as any, ...bounds }]);

        it('applies integer bounds to the parsed value', function () {
            assert.doesNotThrow(check('integer', '10', { gt: 0, lte: 10 }));
            assert.doesNotThrow(check('integer', new BigNumber(10), { gt: 0, lte: 10 }));
            assert.throws(check('integer', new BigNumber(11), { lte: 10 }), 'Invalid amount provided');
            assert.throws(check('integer', '0', { gt: 0 }), 'Invalid amount provided');
            assert.throws(check('integer', '1e6', { gt: 0 }), 'Invalid amount provided');
        });

        it('rejects non-positive and coerced values for positive-integer', function () {
            assert.doesNotThrow(check('positive-integer', new BigNumber(1)));
            assert.doesNotThrow(check('positive-integer', '1'));
            for (const value of [0, -1, '1e6', new BigNumber(0), new BigNumber(0.5), new BigNumber(NaN)]) {
                assert.throws(check('positive-integer', value), 'amount must be a positive integer');
            }
        });

        it('leaves utils.isInteger unchanged', function () {
            assert.isTrue(utils.isInteger('1e6'));
        });
    });

    describe('TransactionBuilder integer arguments', function () {
        const tronWeb = new TronWeb({ fullHost: 'http://127.0.0.1:1', privateKey: PRIVATE_KEY });
        const options = { blockHeader: BLOCK_HEADER };

        it('rejects amounts that parseInt would encode differently', async function () {
            for (const value of ['1e6', '0x10', '10.5', 1.5, '']) {
                let error: Error | undefined;
                try {
                    await tronWeb.transactionBuilder.sendTrx(RECIPIENT, value as any, undefined, options);
                } catch (e) {
                    error = e as Error;
                }
                assert.equal(error?.message, 'Invalid amount provided', JSON.stringify(value));
            }
        });

        it('encodes the validated amount for numbers, digit strings, bigints and BigNumbers', async function () {
            const Exp = BigNumber.clone({ EXPONENTIAL_AT: 2 });
            for (const value of [1_000_000, '1000000', 1_000_000n, new BigNumber(1_000_000), new Exp(1_000_000)]) {
                const tx = await tronWeb.transactionBuilder.sendTrx(RECIPIENT, value as any, undefined, options);
                assert.strictEqual(tx.raw_data.contract[0].parameter.value.amount, 1_000_000);
                assert.isTrue(utils.transaction.txCheck(tx));
            }
        });

        it('encodes BigNumber values passed into fields that were not parsed before', async function () {
            const tx = await tronWeb.transactionBuilder.createTRXExchange(
                'TestToken',
                new BigNumber(1000) as any,
                new BigNumber(2000) as any,
                undefined,
                options
            );
            const value = tx.raw_data.contract[0].parameter.value;
            assert.strictEqual(value.first_token_balance, 1000);
            assert.strictEqual(value.second_token_balance, 2000);
            assert.isTrue(utils.transaction.txCheck(tx));
        });
    });
});
