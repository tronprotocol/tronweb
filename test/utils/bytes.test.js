const chai = require('chai');
const tronWebBuilder = require('../helpers/tronWebBuilder');

const assert = chai.assert;

describe('TronWeb.utils.bytes', function () {

    describe('#byte2hexStr()', function () {

        it("should convert a byte to a hex string", async function () {
            const tronWeb = tronWebBuilder.createInstance();

            assert.equal(tronWeb.utils.bytes.byte2hexStr(21), '15');
            assert.equal(tronWeb.utils.bytes.byte2hexStr(33), '21');
            assert.equal(tronWeb.utils.bytes.byte2hexStr(78), '4E');
            assert.equal(tronWeb.utils.bytes.byte2hexStr(156), '9C');
            assert.equal(tronWeb.utils.bytes.byte2hexStr(200), 'C8');

        });

        it("should throw if something else than a byte is passed as input", async function () {
            const tronWeb = tronWebBuilder.createInstance();

            assert.throws(() => {
                tronWeb.utils.bytes.byte2hexStr('15')
            }, 'Input must be a number');

            assert.throws(() => {
                tronWeb.utils.bytes.byte2hexStr(-15)
            }, 'Input must be a byte');

            assert.throws(() => {
                tronWeb.utils.bytes.byte2hexStr(1455)
            }, 'Input must be a byte');

        });
    });

    describe('#bytesToString()', function () {

        it("should convert an array of bytes to a hex string", async function () {
            const tronWeb = tronWebBuilder.createInstance();

            assert.equal(tronWeb.utils.bytes.bytesToString([78,112,87,69,99,65]), 'NpWEcA');

            assert.equal(tronWeb.utils.bytes.bytesToString([1178,2112,1087,969]), 'Қࡀпω');
        });
    });


    describe('#hextoString()', function () {

        it("should convert an array of bytes to a hex string", async function () {
            const tronWeb = tronWebBuilder.createInstance();

            assert.equal(tronWeb.utils.bytes.hextoString('af43ed56aa77'), '¯CíVªw');
            assert.equal(tronWeb.utils.bytes.hextoString('0xaf43'), '¯C');

        });
    });


});
