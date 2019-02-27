const chai = require('chai');
const tronWebBuilder = require('../helpers/tronWebBuilder');

const assert = chai.assert;

describe('TronWeb.utils.base58', function () {

    describe('#encode58()', function () {

        it("should encode a buffer in base58 string", async function () {
            const tronWeb = tronWebBuilder.createInstance();

            let input = Buffer.from('0xbf7e698', 'utf-8');
            let expected = 'cnTsZgYWJRAw';

            assert.equal(tronWeb.utils.base58.encode58(input), expected);

            input = [30, 78, 62, 66, 37, 65, 36, 39, 38];
            expected = 'PNfgHhpd9fqF';

            assert.equal(tronWeb.utils.base58.encode58(input), expected);

            input = '0xbf7e698';
            expected = 'BLw3T83';

            assert.equal(tronWeb.utils.base58.encode58(input), expected);

            input = '12354345';
            expected = '3toVqjxtiu2q';

            assert.equal(tronWeb.utils.base58.encode58(input), expected);
        });


        it("should return '' or '1' if passing something different from a buffer", async function () {
            // TODO. Is this what we want?
            const tronWeb = tronWebBuilder.createInstance();

            assert.equal(tronWeb.utils.base58.encode58([]), '');
            assert.equal(tronWeb.utils.base58.encode58('some string'), '');
            assert.equal(tronWeb.utils.base58.encode58({key: 1}), '1');
        });
    });

    describe('#decode58()', function () {

        it("should decode a base58 string in a buffer", async function () {
            const tronWeb = tronWebBuilder.createInstance();

            const input = 'cnTsZgYWJRAw';
            const expected = Buffer.from('0xbf7e698', 'utf-8');

            const decoded = tronWeb.utils.base58.decode58(input)

            assert.equal(Buffer.compare(expected, Buffer.from(decoded, 'utf-8')), 0);

        });


        it("should return [] or [0] if passing something '' or '1'", async function () {
            // TODO. As above. Is this what we want?
            const tronWeb = tronWebBuilder.createInstance();

            assert.equal(JSON.stringify(tronWeb.utils.base58.decode58('')), "[]");
            assert.equal(JSON.stringify(tronWeb.utils.base58.decode58('1')), "[0]");
        });
    });

});
