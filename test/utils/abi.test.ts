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
            for (let i in expected) {
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
                '0x0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000928c9af0651632157ef27a2cf17ca72c575a4d21000000000000000000000000928c9af0651632157ef27a2cf17ca72c575a4d2100000000000000000000000000000000000000000000000000000000000000054f6e776572000000000000000000000000000000000000000000000000000000';
            const result = tronWeb.utils.abi.encodeParams(types, values);

            for (let i = 0; i < expected.length; i++) {
                assert.equal(result[i], expected[i]);
            }
        });
    });

    describe('#encodeParamsV2ByABI()-(v1 input)', function () {
        const tronWeb = tronWebBuilder.createInstance();
        let coder = tronWeb.utils.abi;

        let tests = loadTests('contract-interface');
        tests.forEach((test: any) => {
            let { normalizedValues, result, interface: abi } = test;
            const funcABI = JSON.parse(abi);
            const inputValues = getValues(JSON.parse(normalizedValues));
            funcABI[0].inputs = funcABI[0].outputs;
            let title = test.name + ' => (' + test.types + ') = (' + test.normalizedValues + ')';
            it('encodes parameters - ' + test.name + ' - ' + test.types, function () {
                this.timeout(120000);
                const encoded = coder.encodeParamsV2ByABI(funcABI[0], inputValues);
                assert.equal(encoded, result, 'encoded data - ' + title);
            });
        });
    });

    describe('#encodeParamsV2ByABI()-(v2 input)', function () {
        const tronWeb = tronWebBuilder.createInstance();
        let coder = tronWeb.utils.abi;

        let tests = loadTests('contract-interface-abi2');
        tests.forEach((test: any) => {
            let { values, result, interface: abi } = test;
            const funcABI = JSON.parse(abi);
            const inputValues = getValues(JSON.parse(values));
            funcABI[0].inputs = funcABI[0].outputs;
            let title = test.name + ' => (' + test.types + ') = (' + test.normalizedValues + ')';
            it('encodes parameters - ' + test.name + ' - ' + test.types, function () {
                this.timeout(120000);
                const encoded = coder.encodeParamsV2ByABI(funcABI[0], inputValues);
                assert.equal(encoded, result, 'encoded data - ' + title);
            });
        });
    });

    describe('#decodeParamsV2ByABI()-(v1 output)', function () {
        const tronWeb = tronWebBuilder.createInstance();
        let coder = tronWeb.utils.abi;

        let tests = loadTests('contract-interface');
        tests.forEach((test: any) => {
            let { normalizedValues, result, interface: abi } = test;
            const funcABI = JSON.parse(abi);
            const outputValues = getValues(JSON.parse(normalizedValues));
            let title = test.name + ' => (' + test.types + ') = (' + test.normalizedValues + ')';
            it('decodes parameters - ' + test.name + ' - ' + test.types, function () {
                this.timeout(120000);
                const decoded = coder.decodeParamsV2ByABI(funcABI[0], result);
                assert.ok(equals(decoded, outputValues), 'decoded data - ' + title);
            });
        });
    });

    describe('#decodeParamsV2ByABI()-(v2 output)', function () {
        const tronWeb = tronWebBuilder.createInstance();
        let coder = tronWeb.utils.abi;

        let tests = loadTests('contract-interface-abi2');
        tests.forEach((test: any) => {
            let { values, result, interface: abi } = test;
            const funcABI = JSON.parse(abi);
            const outputValues = getValues(JSON.parse(values));
            let title = test.name + ' => (' + test.types + ') = (' + test.normalizedValues + ')';
            it('decodes parameters - ' + test.name + ' - ' + test.types, function () {
                this.timeout(120000);
                const decoded = coder.decodeParamsV2ByABI(funcABI[0], result);
                assert.ok(equals(decoded, outputValues), 'decoded data - ' + title);
            });
        });
    });
});
