import { assert } from 'vitest';
import { BigNumber } from 'bignumber.js';
import { utils } from '../setup/TronWeb.js';

describe('utils.validations', function () {
    describe('type guards', function () {
        it('#isValidURL()', function () {
            assert.isTrue(utils.isValidURL('https://example.com'));
            assert.isTrue(utils.isValidURL('http://127.0.0.1:9090'));
            assert.isFalse(utils.isValidURL('ftp://example.com'));
            assert.isFalse(utils.isValidURL(123 as any));
        });

        it('#isObject() / #isArray()', function () {
            assert.isTrue(utils.isObject({}));
            assert.isFalse(utils.isObject([]));
            assert.isFalse(utils.isObject('a'));
            assert.isTrue(utils.isArray([]));
            assert.isFalse(utils.isArray({}));
        });

        it('#isJson()', function () {
            assert.isTrue(utils.isJson('{"a":1}'));
            assert.isFalse(utils.isJson('{a:1}'));
        });

        it('#isBoolean() / #isFunction()', function () {
            assert.isTrue(utils.isBoolean(false));
            assert.isFalse(utils.isBoolean(0));
            assert.isTrue(utils.isFunction(() => 1));
            assert.isFalse(utils.isFunction({}));
        });

        it('#isBigNumber()', function () {
            assert.isTrue(utils.isBigNumber(new BigNumber(1)));
            assert.isFalse(utils.isBigNumber(1));
            assert.isFalse(utils.isBigNumber(null));
        });

        it('#isString()', function () {
            assert.isTrue(utils.isString('a'));
            assert.isTrue(utils.isString(new String('a')));
            assert.isFalse(utils.isString(1));
        });

        it('#isHex()', function () {
            assert.isTrue(utils.isHex('0xdeadBEEF'));
            assert.isTrue(utils.isHex('41ab'));
            assert.isFalse(utils.isHex('0xzz'));
            assert.isFalse(utils.isHex(12 as any));
        });

        it('#isInteger()', function () {
            assert.isTrue(utils.isInteger(5));
            assert.isTrue(utils.isInteger('7'));
            assert.isFalse(utils.isInteger(1.5));
            assert.isFalse(utils.isInteger(null));
        });

        it('#isNotNullOrUndefined()', function () {
            assert.isTrue(utils.isNotNullOrUndefined(0));
            assert.isFalse(utils.isNotNullOrUndefined(null));
            assert.isFalse(utils.isNotNullOrUndefined(undefined));
        });
    });

    describe('#hasProperty() / #hasProperties()', function () {
        it('should check own properties only', function () {
            const obj = { a: 1, b: 2 };
            assert.isTrue(utils.hasProperty(obj, 'a'));
            assert.isFalse(utils.hasProperty(obj, 'toString'));
            assert.isTrue(!!utils.hasProperties(obj, 'a', 'b'));
            assert.isFalse(!!utils.hasProperties(obj, 'a', 'c'));
            assert.isFalse(!!utils.hasProperties(obj));
        });
    });

    describe('#mapEvent()', function () {
        const base = {
            block_number: 10,
            block_timestamp: 1700000000000,
            contract_address: 'TContract',
            event_name: 'Transfer',
            transaction_id: 'abc',
            result: { a: 1 },
        } as any;

        it('should map a confirmed event to solidityNode', function () {
            assert.deepEqual(utils.mapEvent(base), {
                block: 10,
                timestamp: 1700000000000,
                contract: 'TContract',
                name: 'Transfer',
                transaction: 'abc',
                result: { a: 1 },
                resourceNode: 'solidityNode',
            } as any);
        });

        it('should flag unconfirmed events and keep the fingerprint', function () {
            const mapped = utils.mapEvent({ ...base, _unconfirmed: true, _fingerprint: 'fp' });
            assert.equal(mapped.resourceNode, 'fullNode');
            assert.equal(mapped.unconfirmed, true);
            assert.equal(mapped.fingerprint, 'fp');
        });

        it('should prefer an explicit resource_Node', function () {
            assert.equal(utils.mapEvent({ ...base, resource_Node: 'custom' }).resourceNode, 'custom');
        });
    });

    describe('#parseEvent()', function () {
        const abi = {
            inputs: [
                { name: 'from', type: 'address' },
                { name: 'value', type: 'uint256' },
            ],
        };

        it('should return events without a result untouched', function () {
            const event = { event_name: 'X' } as any;
            assert.strictEqual(utils.parseEvent(event, abi), event);
        });

        it('should convert address fields of an object result to tron hex', function () {
            const event = { result: { from: '0xABCDEF', value: '5' } } as any;
            assert.deepEqual(utils.parseEvent(event, abi).result, { from: '41abcdef', value: '5' });
        });

        it('should name the entries of an array result', function () {
            const event = { result: ['0xABCDEF', '5'] } as any;
            assert.deepEqual({ ...(utils.parseEvent(event, abi).result as any) }, { from: '41abcdef', value: '5' });
        });
    });

    describe('#padLeft()', function () {
        it('should pad to the requested length', function () {
            assert.equal(utils.padLeft(7, '0', 3), '007');
            assert.equal(utils.padLeft('1234', '0', 3), '1234');
        });
    });

    describe('#sleep()', function () {
        it('should resolve after the given delay', async function () {
            const start = Date.now();
            await utils.sleep(20);
            assert.isAtLeast(Date.now() - start, 15);
        });
    });
});
