const assert = require('chai').assert;
const accWebBuilder = require('./accWebBuilder');

module.exports = async function (result, string) {

    assert.equal(
        result,
        accWebBuilder.getInstance().toHex(string).substring(2)
    )
}
