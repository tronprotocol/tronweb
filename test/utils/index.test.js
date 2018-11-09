const chai = require('chai');
const {ADDRESS_HEX, ADDRESS_BASE58} = require('../helpers/config').constants;
const tronWebBuilder = require('../helpers/tronWebBuilder');
const TronWeb = tronWebBuilder.TronWeb;

const assert = chai.assert;

describe('TronWeb.utils', function () {

    describe('#isHex()', function () {
        it('should verify that a string is an hex string', function () {

            const tronWeb = tronWebBuilder.createInstance();

            let input = '0x1';
            let expected = true;
            assert.equal(tronWeb.utils.isHex(input), expected);

            input = '0x0';
            expected = true;
            assert.equal(tronWeb.utils.isHex(input), expected);

            input = '0x73616c616d6f6e';
            expected = true;
            assert.equal(tronWeb.utils.isHex(input), expected);

            input = '73616c616d6f';
            expected = true;
            assert.equal(tronWeb.utils.isHex(input), expected);

            input = '0x73616c616d6fsz';
            expected = false;
            assert.equal(tronWeb.utils.isHex(input), expected);

            input = 'x898989';
            expected = false;
            assert.equal(tronWeb.utils.isHex(input), expected);

        });

    });
});
