const assert = require('chai').assert;

module.exports = async function (func, expectedError, errorContains) {
    let errMsg;
    try {
        await func
    } catch(err) {
        if (err.message)
            errMsg = err.message;
        else
            errMsg = err
    }
    if(expectedError)
        assert.equal(errMsg, expectedError);
    else if (errorContains)
        assert.isTrue(RegExp(errorContains).test(errMsg));
}
