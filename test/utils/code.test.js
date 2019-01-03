const chai = require('chai');
const tronWebBuilder = require('../helpers/tronWebBuilder');

const assert = chai.assert;

describe('TronWeb.utils.code', function () {

    describe('#bin2String()', function () {

        it("should convert a byte to a hex string", async function () {
            const tronWeb = tronWebBuilder.createInstance();

            assert.equal(tronWeb.utils.code.bin2String([78, 112, 87, 69, 99, 65]), 'NpWEcA');
        });
    });

    describe('#arrayEquals()', function () {

        it("should compare two arrays to see if they are equal", async function () {
            const tronWeb = tronWebBuilder.createInstance();

            const a = [78, 112, 87, 69, 99, 65];
            const b = [78, 112, 69, 99, 65];
            const c = [78, 112, 69, 99, 65];
            const d = [78, 'casa', {a: 1}, 99, [65, 2]];
            const e = [78, 'casa', {a: 1}, 99, [65, 2]];

            assert.isTrue(tronWeb.utils.code.arrayEquals(a, a));
            assert.isTrue(tronWeb.utils.code.arrayEquals(b, c));
            assert.isTrue(tronWeb.utils.code.arrayEquals(d, e));

            assert.isFalse(tronWeb.utils.code.arrayEquals(a, b));
            assert.isFalse(tronWeb.utils.code.arrayEquals(d, e, true));

        });
    });

    describe('#stringToBytes()', function () {

        it("should convert a string to an array of bytes", async function () {
            const tronWeb = tronWebBuilder.createInstance();

            const a = 'Қࡀпω';

            assert.isTrue(tronWeb.utils.code.arrayEquals(tronWeb.utils.code.stringToBytes('Қࡀпω'), [210, 154, 224, 161, 128, 208, 191, 207, 137], true));

            // TODO We have something wrong, in fact this should be the reverse of the command above:
            assert.equal(tronWeb.utils.bytes.bytesToString([1178, 2112, 1087, 969]), 'Қࡀпω');

        });

        it("should throw if something else than a string is passed as input", async function () {
            const tronWeb = tronWebBuilder.createInstance();

            assert.throws(() => {
                tronWeb.utils.code.stringToBytes([210, 154, 224, 161, 128, 208, 191, 207, 137])
            }, 'The passed string is not a string');

            assert.throws(() => {
                tronWeb.utils.code.stringToBytes(356253)
            }, 'The passed string is not a string');

        });
    });

    describe('#hexChar2byte()', function () {

        it("should convert an hex char to a byte", async function () {
            const tronWeb = tronWebBuilder.createInstance();

            assert.equal(tronWeb.utils.code.hexChar2byte('0'), 0);
            assert.equal(tronWeb.utils.code.hexChar2byte('D'), 13);
            assert.equal(tronWeb.utils.code.hexChar2byte('d'), 13);
            assert.equal(tronWeb.utils.code.hexChar2byte('7'), 7);

        });

        it("should throw if something else than a string is passed as input", async function () {
            const tronWeb = tronWebBuilder.createInstance();

            assert.throws(() => {
                tronWeb.utils.code.hexChar2byte(12)
            }, 'The passed hex char is not a valid hex char');

            assert.throws(() => {
                tronWeb.utils.code.hexChar2byte('Z')
            }, 'The passed hex char is not a valid hex char');

        });
    });

    describe('#isHexChar()', function () {

        it("should verify that an hex char is a valid hex char", async function () {
            const tronWeb = tronWebBuilder.createInstance();

            assert.equal(tronWeb.utils.code.isHexChar('0'), 1);
            assert.equal(tronWeb.utils.code.isHexChar('e'), 1);
            assert.equal(tronWeb.utils.code.isHexChar('D'), 1);

            assert.equal(tronWeb.utils.code.isHexChar('Z'), 0);
            assert.equal(tronWeb.utils.code.isHexChar(66), 0);
        });
    });

    describe('#hexStr2byteArray()', function () {

        it("should verify that an hex char is a valid hex char", async function () {
            const tronWeb = tronWebBuilder.createInstance();

            assert.isTrue(tronWeb.utils.code.arrayEquals(tronWeb.utils.code.hexStr2byteArray('49206C6F7665206461726B20636F6D6564696573'), [73, 32, 108, 111, 118, 101, 32, 100, 97, 114, 107, 32, 99, 111, 109, 101, 100, 105, 101, 115]));

        });

        it("should throw if we pass an invalid hex string", async function () {
            const tronWeb = tronWebBuilder.createInstance();

            assert.throws(() => {
                tronWeb.utils.code.hexStr2byteArray('ZASSyue')
            }, 'The passed hex char is not a valid hex string');

            assert.throws(() => {
                tronWeb.utils.code.hexStr2byteArray(123)
            }, 'The passed string is not a string');

        });
    });

    describe('#strToDate()', function () {

        it("should verify that an hex char is a valid hex char", async function () {
            const tronWeb = tronWebBuilder.createInstance();

            let input = '2018-09-23 13-45-03';
            let regex = RegExp('Sep 23 2018 13:45:03')
            assert.isTrue(regex.test(tronWeb.utils.code.strToDate(input).toString()));

            input = '2018-09-23';
            regex = RegExp('Sep 23 2018 00:00:00')
            assert.isTrue(regex.test(tronWeb.utils.code.strToDate(input).toString()));

        });

        it("should throw if we pass an invalid hex string", async function () {
            const tronWeb = tronWebBuilder.createInstance();

            assert.throws(() => {
                tronWeb.utils.code.strToDate('2018-02-')
            }, 'The passed date string is not valid');

            assert.throws(() => {
                tronWeb.utils.code.strToDate(123)
            }, 'The passed date string is not valid');

            assert.throws(() => {
                tronWeb.utils.code.strToDate('2018-0212')
            }, 'The passed date string is not valid');

            assert.throws(() => {
                tronWeb.utils.code.strToDate('90-22-21')
            }, 'The passed date string is not valid');
        });
    });

    describe('#isNumber()', function () {

        it("should verify that an numeric char is a number", async function () {
            const tronWeb = tronWebBuilder.createInstance();

            assert.equal(tronWeb.utils.code.isNumber('0'), 1);
            assert.equal(tronWeb.utils.code.isHexChar('Z'), 0);
        });
    });

    describe('#getStringType()', function () {

        it("should return the type of a string", async function () {
            const tronWeb = tronWebBuilder.createInstance();

            assert.equal(tronWeb.utils.code.getStringType('bf7e69851988c80e5484e52f4f6aca99479458b6'), 1);

            // TODO Should the next test return 1?
            assert.equal(tronWeb.utils.code.getStringType('4136b9c3690c3be15a4ad697965b1e5e088ae131f2'), 3);

            assert.equal(tronWeb.utils.code.getStringType('3534'), 2);
            assert.equal(tronWeb.utils.code.getStringType('ERC20Token'), 3);

            assert.equal(tronWeb.utils.code.getStringType(3.45), -1);
        });
    });
});
