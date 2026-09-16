import { assert } from 'vitest';
import * as vm from 'node:vm';
import { clonePlainData, cloneTransaction } from '../../src/utils/clone.js';

// Builds a value in another realm. Its objects carry that realm's prototypes, so neither
// `instanceof` nor an `Object.prototype` identity check recognises them from here.
// `node:vm` is a Node-only API (the browser suite gets a stub for it), so the tests that
// build their inputs this way run in Node only.
const foreign = <T>(source: string): T => vm.runInNewContext(`(${source})`) as T;
const isNode = !('window' in globalThis);

describe('TronWeb.utils.clone', function () {
    describe('#clonePlainData()', function () {
        const options = (bytes = false) => ({
            root: 'input',
            bytes,
            invalid: (reason: string, path: string) => new Error(`Invalid input: ${reason} at ${path}`),
        });

        describe.runIf(isNode)('values from another realm', function () {
            it('clones plain objects and arrays into objects and arrays of this realm', function () {
                const input = foreign<{ a: number; list: unknown[]; nested: { c: string } }>(
                    '{ a: 1, list: [1, { b: 2n }], nested: { c: "x" } }'
                );
                assert.notStrictEqual(Object.getPrototypeOf(input), Object.prototype);
                assert.isFalse(input.list instanceof Array);

                const out = clonePlainData(input, options());

                assert.deepEqual(out, { a: 1, list: [1, { b: 2n }], nested: { c: 'x' } });
                assert.strictEqual(Object.getPrototypeOf(out), Object.prototype);
                assert.strictEqual(Object.getPrototypeOf(out.nested), Object.prototype);
                assert.strictEqual(Object.getPrototypeOf(out.list[1]), Object.prototype);
                assert.isTrue(out.list instanceof Array);
            });

            it('copies a Uint8Array into a Uint8Array of this realm when bytes is set', function () {
                const input = foreign<Uint8Array>('new Uint8Array([1, 2, 3])');
                assert.isFalse(input instanceof Uint8Array);

                const out = clonePlainData(input, options(true));

                assert.isTrue(out instanceof Uint8Array);
                assert.notStrictEqual(out, input);
                assert.deepEqual(Array.from(out), [1, 2, 3]);
            });

            it('rejects class instances, naming the path', function () {
                const input = foreign<{ x: object }>('{ x: new (class Fancy { a = 1 })() }');

                assert.throws(() => clonePlainData(input, options()), 'Invalid input: not a plain object at input.x');
            });
        });

        describe('nesting depth', function () {
            // `levels` nested objects, the root counting as one: nest(1) is {}, nest(2) is { a: {} }, ...
            const nestObjects = (levels: number): Record<string, unknown> => {
                let value: Record<string, unknown> = {};
                for (let i = 1; i < levels; i++) value = { a: value };
                return value;
            };
            const nestArrays = (levels: number): unknown[] => {
                let value: unknown[] = [];
                for (let i = 1; i < levels; i++) value = [value];
                return value;
            };

            it('copies objects nested up to 64 levels deep', function () {
                const out = clonePlainData(nestObjects(64), options());

                assert.deepEqual(out, nestObjects(64));
            });

            it('rejects objects nested deeper than 64 levels, naming the path', function () {
                assert.throws(
                    () => clonePlainData(nestObjects(65), options()),
                    `Invalid input: nesting deeper than 64 levels at input${'.a'.repeat(64)}`
                );
            });

            it('counts arrays as levels too', function () {
                assert.deepEqual(clonePlainData(nestArrays(64), options()), nestArrays(64));
                assert.throws(
                    () => clonePlainData(nestArrays(65), options()),
                    `Invalid input: nesting deeper than 64 levels at input${'[0]'.repeat(64)}`
                );
            });
        });
    });

    describe('#cloneTransaction()', function () {
        const sample = () => ({
            visible: false,
            txID: 'ab'.repeat(32),
            raw_data_hex: '0a02',
            raw_data: {
                contract: [
                    {
                        parameter: {
                            value: { owner_address: '41aa', amount: 1 },
                            type_url: 'type.googleapis.com/protocol.TransferContract',
                        },
                        type: 'TransferContract',
                    },
                ],
                ref_block_bytes: '0001',
                expiration: 1700000000000,
            },
        });

        it('returns a deep copy that shares no references with the input', function () {
            const input = sample();
            const out = cloneTransaction(input);

            assert.deepEqual(out, input);
            assert.notStrictEqual(out, input);
            assert.notStrictEqual(out.raw_data, input.raw_data);
            assert.notStrictEqual(out.raw_data.contract, input.raw_data.contract);
            assert.notStrictEqual(out.raw_data.contract[0].parameter.value, input.raw_data.contract[0].parameter.value);
            assert.isTrue(Array.isArray(out.raw_data.contract));
        });

        it('preserves primitives as they are, including bigint, null and undefined', function () {
            const input = {
                big: 2n ** 64n,
                num: 1,
                str: 'x',
                bool: true,
                nil: null,
                undef: undefined,
                list: [1n, null, undefined, 'y'],
            };
            const out = cloneTransaction(input);

            assert.strictEqual(out.big, 2n ** 64n);
            assert.strictEqual(typeof out.big, 'bigint');
            assert.strictEqual(out.num, 1);
            assert.strictEqual(out.str, 'x');
            assert.strictEqual(out.bool, true);
            assert.strictEqual(out.nil, null);
            assert.isTrue('undef' in out);
            assert.strictEqual(out.undef, undefined);
            assert.deepEqual(out.list, [1n, null, undefined, 'y']);
            assert.notStrictEqual(out.list, input.list);
        });

        it('reads every getter exactly once and stores the value as a plain data property', function () {
            let reads = 0;
            const input: { txID?: string; raw_data: { contract: never[] } } = { raw_data: { contract: [] } };
            Object.defineProperty(input, 'txID', {
                enumerable: true,
                get: () => (++reads === 1 ? 'real' : 'fake'),
            });

            const out = cloneTransaction(input);

            assert.equal(reads, 1);
            assert.equal(out.txID, 'real');
            assert.equal(out.txID, 'real');
            assert.equal(reads, 1);
            const descriptor = Object.getOwnPropertyDescriptor(out, 'txID')!;
            assert.isUndefined(descriptor.get);
            assert.equal(descriptor.value, 'real');
        });

        it('reads through a Proxy once and returns an object that is no longer trapped', function () {
            let gets = 0;
            const target = { txID: 'real', raw_data: { contract: [] } };
            const proxy = new Proxy(target, {
                get(t, key, receiver) {
                    gets++;
                    return Reflect.get(t, key, receiver);
                },
            });

            const out = cloneTransaction(proxy);
            const getsDuringClone = gets;

            assert.isAbove(getsDuringClone, 0);
            assert.notStrictEqual(out, proxy);
            assert.equal(out.txID, 'real');
            assert.deepEqual(out.raw_data, { contract: [] });
            assert.equal(gets, getsDuringClone);
        });

        it('gives the copy a plain prototype, also for a null-prototype input', function () {
            const nullProto = Object.assign(Object.create(null), { txID: 'x' });

            const out = cloneTransaction(nullProto);

            assert.strictEqual(Object.getPrototypeOf(out), Object.prototype);
            assert.equal(out.txID, 'x');
        });

        it('throws on class instances, naming the path', function () {
            class Fancy {
                amount = 1;
            }

            assert.throws(
                () => cloneTransaction({ raw_data: { contract: [{ parameter: new Fancy() }] } }),
                'Invalid transaction provided: not a plain object at transaction.raw_data.contract[0].parameter'
            );
            assert.throws(() => cloneTransaction(new Fancy()), 'Invalid transaction provided: not a plain object at transaction');
        });

        it('keeps an own __proto__ key as a data property of the copy without re-targeting its prototype', function () {
            // JSON.parse creates a real own property; an object literal's `__proto__:` would not.
            const input = JSON.parse('{"__proto__": {"polluted": true}, "txID": "x"}');

            const out = cloneTransaction(input);

            assert.strictEqual(Object.getPrototypeOf(out), Object.prototype);
            assert.isFalse('polluted' in out);
            assert.deepEqual(Object.getOwnPropertyDescriptor(out, '__proto__'), {
                value: { polluted: true },
                writable: true,
                enumerable: true,
                configurable: true,
            });
            assert.notStrictEqual(out['__proto__'], input['__proto__']);
            assert.deepEqual(Object.keys(out), ['__proto__', 'txID']);
            assert.equal(JSON.stringify(out), '{"__proto__":{"polluted":true},"txID":"x"}');
        });

        it('names the path of an invalid value under an own __proto__ key', function () {
            const input = Object.defineProperty({ txID: 'x' }, '__proto__', { value: () => 1, enumerable: true });

            assert.throws(
                () => cloneTransaction(input),
                'Invalid transaction provided: unsupported function at transaction.__proto__'
            );
        });

        it('clones shared (non-circular) references into independent copies', function () {
            const shared = { amount: 1 };
            const out = cloneTransaction({ a: shared, b: shared });

            assert.deepEqual(out, { a: { amount: 1 }, b: { amount: 1 } });
            assert.notStrictEqual(out.a, out.b);
        });

        it('throws on circular references, naming the path', function () {
            const input: { raw_data: { contract: never[]; self?: unknown } } = { raw_data: { contract: [] } };
            input.raw_data.self = input;

            assert.throws(
                () => cloneTransaction(input),
                'Invalid transaction provided: circular reference at transaction.raw_data.self'
            );
        });

        it('throws on values that are not plain transaction data, naming the path', function () {
            const cases: [unknown, string][] = [
                [{ raw_data: { f: () => 1 } }, 'unsupported function at transaction.raw_data.f'],
                [{ raw_data: { s: Symbol('s') } }, 'unsupported symbol at transaction.raw_data.s'],
                [{ raw_data: { d: new Date(0) } }, 'unsupported Date at transaction.raw_data.d'],
                [{ raw_data: { m: new Map() } }, 'unsupported Map at transaction.raw_data.m'],
                [{ raw_data: { contract: [new Uint8Array(1)] } }, 'unsupported Uint8Array at transaction.raw_data.contract[0]'],
            ];
            for (const [input, expected] of cases) {
                assert.throws(() => cloneTransaction(input), `Invalid transaction provided: ${expected}`);
            }
        });
    });
});
