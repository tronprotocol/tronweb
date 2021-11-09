
const chai = require('chai');
const {ADDRESS_HEX, ADDRESS_BASE58} = require('../helpers/config');
const tronWebBuilder = require('../helpers/tronWebBuilder');
const TronWeb = require('../setup/TronWeb');
const { loadTests, saveTests } = require('../testcases/src/disk-utils');
const ethers = require('ethers');
const assert = chai.assert;

const bnify = ethers.BigNumber.from;

function equals(actual, expected) {
  // Array (treat recursively)
  if (Array.isArray(actual)) {
      if (!Array.isArray(expected) || actual.length !== expected.length) { return false; }
      for (let i = 0; i < actual.length; i++) {
          if (!equals(actual[i], expected[i])) { return false; }
      }
      return true;
  }

  if (typeof(actual) === 'number') { actual = bnify(actual); }
  if (typeof(expected) === 'number') { expected = bnify(expected); }

  // BigNumber
  if (actual.eq) {
      if (typeof(expected) === 'string' && expected.match(/^-?0x[0-9A-Fa-f]*$/)) {
          let neg = (expected.substring(0, 1) === '-');
          if (neg) { expected = expected.substring(1); }
          expected = bnify(expected);
          if (neg) { expected = expected.mul(-1); }
      }
      if (!actual.eq(expected)) { return false; }
      return true;
  }

  // Uint8Array
  if (expected.buffer) {
      if (!ethers.utils.isHexString(actual)) { return false; }
      actual = ethers.utils.arrayify(actual);

      if (!actual.buffer || actual.length !== expected.length) { return false; }
      for (let i = 0; i < actual.length; i++) {
          if (actual[i] !== expected[i]) { return false; }
      }

      return true;
  }

  // Maybe address?
  try {
      if (TronWeb.isAddress(actual)) {
        let actualAddress = actual;
        let expectedAddress = TronWeb.address.toHex(expected);

        return (actualAddress === expectedAddress);
      }
  } catch (error) { }

  // Something else
  return (actual === expected);
}


function getValues(object, named) {
  if (Array.isArray(object)) {
      let result = [];
      object.forEach(function(object) {
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
          return ethers.utils.arrayify(object.value);

      case 'tuple':
          let result = getValues(object.value, named);
          if (named) {
              let namedResult = {};
              result.forEach((value, index) => {
                  namedResult['r' + String(index)] = value;
              });
              return namedResult;
          }
          return result;

      default:
          throw new Error('invalid type - ' + object.type);
  }
}


describe('TronWeb.utils.abi', function () {

    describe('#decodeParams()', function () {
        it('should decode abi coded params passing types and output', function () {

            const tronWeb = tronWebBuilder.createInstance();
            const types = ['string', 'string', 'uint8', 'bytes32', 'uint256'];
            const output = '0x00000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000012dc03b7993bad736ad595eb9e3ba51877ac17ecc31d2355f8f270125b9427ece700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011506920446179204e30306220546f6b656e00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000035049450000000000000000000000000000000000000000000000000000000000';

            const expected = [
                'Pi Day N00b Token',
                'PIE',
                18,
                '0xdc03b7993bad736ad595eb9e3ba51877ac17ecc31d2355f8f270125b9427ece7',
                0
            ];


            const result = tronWeb.utils.abi.decodeParams(types, output);

            for(let i = 0; i < expected.length; i++) {
                assert.equal(result[i], expected[i]);
            }
        });

        it('should decode abi coded params passing names, types and output', function () {

            const tronWeb = tronWebBuilder.createInstance();
            const names = ['Token', 'Graph', 'Qty', 'Bytes', 'Total'];
            const types = ['string', 'string', 'uint8', 'bytes32', 'uint256'];
            const output = '0x00000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000012dc03b7993bad736ad595eb9e3ba51877ac17ecc31d2355f8f270125b9427ece700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011506920446179204e30306220546f6b656e00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000035049450000000000000000000000000000000000000000000000000000000000';

            const expected = {
                Token: 'Pi Day N00b Token',
                Graph: 'PIE',
                Qty: 18,
                Bytes: '0xdc03b7993bad736ad595eb9e3ba51877ac17ecc31d2355f8f270125b9427ece7',
                Total: 0
            };

            const result = tronWeb.utils.abi.decodeParams(names, types, output);
            for(let i in expected) {
                assert.equal(result[i], expected[i]);
            }
        });

        it('should throw if the string does not start with 0x', function () {

            const tronWeb = tronWebBuilder.createInstance();
            const types = ['string', 'string', 'uint8', 'bytes32', 'uint256'];
            const output =
                '00000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000012dc03b7993bad736ad595eb9e3ba51877ac17ecc31d2355f8f270125b9427ece700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011506920446179204e30306220546f6b656e00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000035049450000000000000000000000000000000000000000000000000000000000';
            assert.throws(() => {
                tronWeb.utils.abi.decodeParams(types, output)
            }, 'invalid arrayify value');
        });

        it('should throw if the output format is wrong', function () {

            const tronWeb = tronWebBuilder.createInstance();
            const types = ['string', 'string', 'uint8', 'bytes32', 'uint256'];
            const output = '0x00000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000012dc03b7993bad736ad595eb9e3ba51877ac17ecc31d2355f8f270125b9427ece700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011506920446179204e30306220546f6b656e0000000000000000000000000000005049450000000000000000000000000000000000000000000000000000000000';

            assert.throws(() => {
                tronWeb.utils.abi.decodeParams(types, output)
            }, 'overflow');
        });

        it('should throw if the output is invalid', function () {

            const tronWeb = tronWebBuilder.createInstance();
            const types = ['string'];
            const output = '0x6630f88f000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000046173646600000000000000000000000000000000000000000000000000000000';

            assert.throws(() => {
                tronWeb.utils.abi.decodeParams(types, output)
            }, 'The encoded string is not valid. Its length must be a multiple of 64.');
        });

        it('should decode if the output is prefixed with the method hash', function () {

            const tronWeb = tronWebBuilder.createInstance();
            const types = ['string'];
            const output = '0x6630f88f000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000046173646600000000000000000000000000000000000000000000000000000000';

            const result = tronWeb.utils.abi.decodeParams(types, output, true)
            assert.equal(result, 'asdf')
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
                0
            ];

            const expected = '0x00000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000012dc03b7993bad736ad595eb9e3ba51877ac17ecc31d2355f8f270125b9427ece700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011506920446179204e30306220546f6b656e00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000035049450000000000000000000000000000000000000000000000000000000000';


            const result = tronWeb.utils.abi.encodeParams(types, values);

            for(let i = 0; i < expected.length; i++) {
                assert.equal(result[i], expected[i]);
            }
        });

        it('should encode abi coded params passing addresses in hex and base58 mode', function () {

            const tronWeb = tronWebBuilder.createInstance();
            const types = ['string', 'address', 'address'];
            const values = [
                'Onwer',
                ADDRESS_HEX,
                ADDRESS_BASE58
            ];

            const expected = '0x0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000928c9af0651632157ef27a2cf17ca72c575a4d21000000000000000000000000928c9af0651632157ef27a2cf17ca72c575a4d2100000000000000000000000000000000000000000000000000000000000000054f6e776572000000000000000000000000000000000000000000000000000000';
            const result = tronWeb.utils.abi.encodeParams(types, values);

            for(let i = 0; i < expected.length; i++) {
                assert.equal(result[i], expected[i]);
            }
        });
    });

    describe('#encodeParamsV2ByABI()-(v1 input)', function() {
      const tronWeb = tronWebBuilder.createInstance();
      let coder = tronWeb.utils.abi;

      let tests = loadTests('contract-interface');
      tests.forEach((test) => {
          let { normalizedValues, result, interface } = test;
          const funcABI = JSON.parse(interface);
          const inputValues = getValues(JSON.parse(normalizedValues))
          funcABI[0].inputs = funcABI[0].outputs;
          let title = test.name + ' => (' + test.types + ') = (' + test.normalizedValues + ')';
          it(('encodes parameters - ' + test.name + ' - ' + test.types), function() {
              this.timeout(120000);
              const encoded = coder.encodeParamsV2ByABI(funcABI[0], inputValues);
              assert.equal(encoded, result, 'encoded data - ' + title);

          });
      });
    });

    describe('#encodeParamsV2ByABI()-(v2 input)', function() {
      const tronWeb = tronWebBuilder.createInstance();
      let coder = tronWeb.utils.abi;

      let tests = loadTests('contract-interface-abi2');
      tests.forEach((test) => {
          let { values, result, interface } = test;
          const funcABI = JSON.parse(interface);
          const inputValues = getValues(JSON.parse(values))
          funcABI[0].inputs = funcABI[0].outputs;
          let title = test.name + ' => (' + test.types + ') = (' + test.normalizedValues + ')';
          it(('encodes parameters - ' + test.name + ' - ' + test.types), function() {
              this.timeout(120000);
              const encoded = coder.encodeParamsV2ByABI(funcABI[0], inputValues);
              assert.equal(encoded, result, 'encoded data - ' + title);

          });
      });
    });

    describe('#decodeParamsV2ByABI()-(v1 output)', function() {
      const tronWeb = tronWebBuilder.createInstance();
      let coder = tronWeb.utils.abi;

      let tests = loadTests('contract-interface');
      tests.forEach((test) => {
          let { normalizedValues, result, interface } = test;
          const funcABI = JSON.parse(interface);
          const outputValues = getValues(JSON.parse(normalizedValues))
          let title = test.name + ' => (' + test.types + ') = (' + test.normalizedValues + ')';
          it(('decodes parameters - ' + test.name + ' - ' + test.types), function() {
              this.timeout(120000);
              const encoded = coder.decodeParamsV2ByABI(funcABI[0], result);
              assert.ok(equals(encoded, outputValues), 'encoded data - ' + title);
          });
      });
    });

    describe('#decodeParamsV2ByABI()-(v1 output)', function() {
      const tronWeb = tronWebBuilder.createInstance();
      let coder = tronWeb.utils.abi;

      let tests = loadTests('contract-interface-abi2');
      tests.forEach((test) => {
          let { values, result, interface } = test;
          const funcABI = JSON.parse(interface);
          const outputValues = getValues(JSON.parse(values))
          let title = test.name + ' => (' + test.types + ') = (' + test.normalizedValues + ')';
          it(('decodes parameters - ' + test.name + ' - ' + test.types), function() {
              this.timeout(120000);
              const encoded = coder.decodeParamsV2ByABI(funcABI[0], result);
              assert.ok(equals(encoded, outputValues), 'encoded data - ' + title);
          });
      });
    });
});

