const assert = require('chai').assert;
const tronWebBuilder = require('./tronWebBuilder');

module.exports = async function (result, string) {

    assert.equal(
        result,
        tronWebBuilder.getInstance().toHex(string).substring(2)
    )
}
