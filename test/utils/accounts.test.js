const chai = require('chai');
const {ADDRESS_HEX, ADDRESS_BASE58} = require('../helpers/config');
const accWebBuilder = require('../helpers/accWebBuilder');

const assert = chai.assert;

describe('AccWeb.utils.accounts', function () {

    describe('#generateAccount()', function () {

        it("should generate a new account", async function () {
            const accWeb = accWebBuilder.createInstance();

            const newAccount = await accWeb.utils.accounts.generateAccount();
            assert.equal(newAccount.privateKey.length, 64);
            assert.equal(newAccount.publicKey.length, 130);
            let address = accWeb.address.fromPrivateKey(newAccount.privateKey);
            assert.equal(address, newAccount.address.base58);

            assert.equal(accWeb.address.toHex(address), newAccount.address.hex.toLowerCase());
        });
    });
});
