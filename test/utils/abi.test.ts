import { assert } from 'chai';
import config from '../helpers/config.js';
import tronWebBuilder from '../helpers/tronWebBuilder.js';
import testUtils from '../helpers/testUtils.js';
import diskUtils from '../testcases/src/disk-utils.js';

const { ADDRESS_HEX, ADDRESS_BASE58 } = config;
const { loadTests } = diskUtils;

const { equals, getValues } = testUtils;

describe('TronWeb.utils.abi', function () {
    describe('#decodeParams()', function () {
        it('should decode abi coded params passing types and output', function () {
            const tronWeb = tronWebBuilder.createInstance();
            const types = ['string', 'string', 'uint8', 'bytes32', 'uint256'];
            const output =
                '0x00000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000012dc03b7993bad736ad595eb9e3ba51877ac17ecc31d2355f8f270125b9427ece700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011506920446179204e30306220546f6b656e00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000035049450000000000000000000000000000000000000000000000000000000000';

            const expected = [
                'Pi Day N00b Token',
                'PIE',
                18,
                '0xdc03b7993bad736ad595eb9e3ba51877ac17ecc31d2355f8f270125b9427ece7',
                0,
            ];

            const result = tronWeb.utils.abi.decodeParams([], types, output);

            for (let i = 0; i < expected.length; i++) {
                assert.equal(result[i], expected[i]);
            }
        });

        it('should decode abi coded params passing names, types and output', function () {
            const tronWeb = tronWebBuilder.createInstance();
            const names = ['Token', 'Graph', 'Qty', 'Bytes', 'Total'];
            const types = ['string', 'string', 'uint8', 'bytes32', 'uint256'];
            const output =
                '0x00000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000012dc03b7993bad736ad595eb9e3ba51877ac17ecc31d2355f8f270125b9427ece700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011506920446179204e30306220546f6b656e00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000035049450000000000000000000000000000000000000000000000000000000000';

            const expected: Record<string, any> = {
                Token: 'Pi Day N00b Token',
                Graph: 'PIE',
                Qty: 18,
                Bytes: '0xdc03b7993bad736ad595eb9e3ba51877ac17ecc31d2355f8f270125b9427ece7',
                Total: 0,
            };

            const result = tronWeb.utils.abi.decodeParams(names, types, output);
            for (const i in expected) {
                assert.equal(result[i], expected[i]);
            }
        });

        it('should throw if the string does not start with 0x', function () {
            const tronWeb = tronWebBuilder.createInstance();
            const types = ['string', 'string', 'uint8', 'bytes32', 'uint256'];
            const output =
                '00000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000012dc03b7993bad736ad595eb9e3ba51877ac17ecc31d2355f8f270125b9427ece700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011506920446179204e30306220546f6b656e00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000035049450000000000000000000000000000000000000000000000000000000000';
            assert.throws(() => {
                tronWeb.utils.abi.decodeParams([], types, output);
            }, /^invalid BytesLike value/);
        });

        it('should throw if the output format is wrong', function () {
            const tronWeb = tronWebBuilder.createInstance();
            const types = ['string', 'string', 'uint8', 'bytes32', 'uint256'];
            const output =
                '0x00000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000012dc03b7993bad736ad595eb9e3ba51877ac17ecc31d2355f8f270125b9427ece700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011506920446179204e30306220546f6b656e0000000000000000000000000000005049450000000000000000000000000000000000000000000000000000000000';

            assert.throws(() => {
                const result = tronWeb.utils.abi.decodeParams([], types, output);
                throw result[1];
            }, 'overflow');
        });

        it('should throw if the output is invalid', function () {
            const tronWeb = tronWebBuilder.createInstance();
            const types = ['string'];
            const output =
                '0x6630f88f000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000046173646600000000000000000000000000000000000000000000000000000000';

            assert.throws(() => {
                tronWeb.utils.abi.decodeParams([], types, output);
            }, 'The encoded string is not valid. Its length must be a multiple of 64.');
        });

        it('should decode if the output is prefixed with the method hash', function () {
            const tronWeb = tronWebBuilder.createInstance();
            const types = ['string'];
            const output =
                '0x6630f88f000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000046173646600000000000000000000000000000000000000000000000000000000';

            const result = tronWeb.utils.abi.decodeParams([], types, output, true);
            assert.equal(result, 'asdf');
        });
    });

    describe('#encodeParams()', function () {
        it('should encode abi coded params passing types and values', function () {
            const tronWeb = tronWebBuilder.createInstance();
            const types = ['string', 'string', 'uint8', 'bytes32', 'uint256'];
            const values = [
                'Pi Day N00b Token',
                'PIE',
                18,
                '0xdc03b7993bad736ad595eb9e3ba51877ac17ecc31d2355f8f270125b9427ece7',
                0,
            ];

            const expected =
                '0x00000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000012dc03b7993bad736ad595eb9e3ba51877ac17ecc31d2355f8f270125b9427ece700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011506920446179204e30306220546f6b656e00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000035049450000000000000000000000000000000000000000000000000000000000';

            const result = tronWeb.utils.abi.encodeParams(types, values);

            for (let i = 0; i < expected.length; i++) {
                assert.equal(result[i], expected[i]);
            }
        });

        it('should encode abi coded params passing addresses in hex and base58 mode', function () {
            const tronWeb = tronWebBuilder.createInstance();
            const types = ['string', 'address', 'address'];
            const values = ['Onwer', ADDRESS_HEX, ADDRESS_BASE58];

            const expected =
                '0x00000000000000000000000000000000000000000000000000000000000000600000000000000000000000007e5f4552091a69125d5dfcb7b8c2659029395bdf0000000000000000000000007e5f4552091a69125d5dfcb7b8c2659029395bdf00000000000000000000000000000000000000000000000000000000000000054f6e776572000000000000000000000000000000000000000000000000000000';
            const result = tronWeb.utils.abi.encodeParams(types, values);

            for (let i = 0; i < expected.length; i++) {
                assert.equal(result[i], expected[i]);
            }
        });
    });

    describe('#encodeParamsV2ByABI()-(v1 input)', function () {
        const tronWeb = tronWebBuilder.createInstance();
        const coder = tronWeb.utils.abi;

        const tests = loadTests('contract-interface');
        tests.forEach((test: any) => {
            const { normalizedValues, result, interface: abi } = test;
            const funcABI = JSON.parse(abi);
            const inputValues = getValues(JSON.parse(normalizedValues));
            funcABI[0].inputs = funcABI[0].outputs;
            const title = test.name + ' => (' + test.types + ') = (' + test.normalizedValues + ')';
            it('encodes parameters - ' + test.name + ' - ' + test.types, function () {
                const encoded = coder.encodeParamsV2ByABI(funcABI[0], inputValues);
                assert.equal(encoded, result, 'encoded data - ' + title);
            });
        });
    });

    describe('#encodeParamsV2ByABI()-(v2 input)', function () {
        const tronWeb = tronWebBuilder.createInstance();
        const coder = tronWeb.utils.abi;

        const tests = loadTests('contract-interface-abi2');
        tests.forEach((test: any) => {
            const { values, result, interface: abi } = test;
            const funcABI = JSON.parse(abi);
            const inputValues = getValues(JSON.parse(values));
            funcABI[0].inputs = funcABI[0].outputs;
            const title = test.name + ' => (' + test.types + ') = (' + test.normalizedValues + ')';
            it('encodes parameters - ' + test.name + ' - ' + test.types, function () {
                const encoded = coder.encodeParamsV2ByABI(funcABI[0], inputValues);
                assert.equal(encoded, result, 'encoded data - ' + title);
            });
        });
    });

    describe('#decodeParamsV2ByABI()-(v1 output)', function () {
        const tronWeb = tronWebBuilder.createInstance();
        const coder = tronWeb.utils.abi;

        const tests = loadTests('contract-interface');
        tests.forEach((test: any) => {
            const { normalizedValues, result, interface: abi } = test;
            const funcABI = JSON.parse(abi);
            const outputValues = getValues(JSON.parse(normalizedValues));
            const title = test.name + ' => (' + test.types + ') = (' + test.normalizedValues + ')';
            it('decodes parameters - ' + test.name + ' - ' + test.types, function () {
                const decoded = coder.decodeParamsV2ByABI(funcABI[0], result);
                assert.ok(equals(decoded, outputValues), 'decoded data - ' + title);
            });
        });
    });

    describe('#decodeParamsV2ByABI()-(v2 output)', function () {
        const tronWeb = tronWebBuilder.createInstance();
        const coder = tronWeb.utils.abi;

        const tests = loadTests('contract-interface-abi2');
        tests.forEach((test: any) => {
            const { values, result, interface: abi } = test;
            const funcABI = JSON.parse(abi);
            const outputValues = getValues(JSON.parse(values));
            const title = test.name + ' => (' + test.types + ') = (' + test.normalizedValues + ')';
            it('decodes parameters - ' + test.name + ' - ' + test.types, function () {
                const decoded = coder.decodeParamsV2ByABI(funcABI[0], result);
                assert.ok(equals(decoded, outputValues), 'decoded data - ' + title);
            });
        });
    });

    describe('#encodeFunctionData()', function () {
        const tronWeb = tronWebBuilder.createInstance();
        const coder = tronWeb.utils.abi;

        it('should encode a function call with base58 address and uint256 params', function () {
            const funcABI = {
                name: 'transfer',
                type: 'function',
                inputs: [
                    { name: 'to', type: 'address' },
                    { name: 'amount', type: 'uint256' },
                ],
                outputs: [],
            };
            const encoded = coder.encodeFunctionData(funcABI, [ADDRESS_BASE58, 100]);
            assert.equal(
                encoded,
                'a9059cbb0000000000000000000000007e5f4552091a69125d5dfcb7b8c2659029395bdf' +
                    '0000000000000000000000000000000000000000000000000000000000000064'
            );
        });

        it('should return only the selector for a function without params', function () {
            const funcABI = { name: 'totalSupply', type: 'function', inputs: [], outputs: [] };
            assert.equal(coder.encodeFunctionData(funcABI), '18160ddd');
        });

        it('should keep trcToken in selector computation and encode the value as uint256', function () {
            const funcABI = {
                name: 'transfer',
                type: 'function',
                inputs: [{ name: 'id', type: 'trcToken' }],
                outputs: [],
            };
            const encoded = coder.encodeFunctionData(funcABI, [1000100]);
            assert.equal(encoded, 'e7bf839c00000000000000000000000000000000000000000000000000000000000f42a4');
        });

        it('should support trcToken arrays', function () {
            const funcABI = {
                name: 'tokenArray',
                type: 'function',
                inputs: [{ name: 'ids', type: 'trcToken[]' }],
                outputs: [],
            };
            const encoded = coder.encodeFunctionData(funcABI, [[1000100, 1000200]]);
            assert.equal(
                encoded,
                '259191d40000000000000000000000000000000000000000000000000000000000000020' +
                    '0000000000000000000000000000000000000000000000000000000000000002' +
                    '00000000000000000000000000000000000000000000000000000000000f42a4' +
                    '00000000000000000000000000000000000000000000000000000000000f4308'
            );
        });

        it('should support tuple params with nested trcToken and address', function () {
            const funcABI = {
                name: 'tokenTuple',
                type: 'function',
                inputs: [
                    {
                        name: 's',
                        type: 'tuple',
                        components: [
                            { name: 'id', type: 'trcToken' },
                            { name: 'owner', type: 'address' },
                        ],
                    },
                ],
                outputs: [],
            };
            const encoded = coder.encodeFunctionData(funcABI, [[1000100, ADDRESS_BASE58]]);
            assert.equal(
                encoded,
                '9cae886500000000000000000000000000000000000000000000000000000000000f42a4' +
                    '0000000000000000000000007e5f4552091a69125d5dfcb7b8c2659029395bdf'
            );
        });

        it('should throw a clear error when the argument count mismatches the inputs', function () {
            const funcABI = {
                name: 'transfer',
                type: 'function',
                inputs: [
                    { name: 'to', type: 'address' },
                    { name: 'amount', type: 'uint256' },
                ],
                outputs: [],
            };
            assert.throws(() => {
                coder.encodeFunctionData(funcABI, [ADDRESS_BASE58]);
            }, /expected 2 arguments, got 1/);
            assert.throws(() => {
                coder.encodeFunctionData({ name: 'totalSupply', type: 'function', inputs: [], outputs: [] }, [1]);
            }, /expected 0 arguments, got 1/);
        });

        it('should propagate the underlying error for invalid parameter types', function () {
            const funcABI = {
                name: 'foo',
                type: 'function',
                inputs: [{ name: 'a', type: 'uint257' }],
                outputs: [],
            };
            assert.throws(() => {
                coder.encodeFunctionData(funcABI, [1]);
            }, /invalid numeric width/);
        });

        it('should throw for non-function fragments', function () {
            assert.throws(() => {
                coder.encodeFunctionData({ type: 'constructor', stateMutability: 'nonpayable', inputs: [] } as any, []);
            }, /only "function" type fragments/);
            assert.throws(() => {
                coder.encodeFunctionData({ name: 'Transfer', type: 'event', inputs: [] } as any, []);
            }, /only "function" type fragments/);
        });
    });
});
