const assert = require('chai').assert;

module.exports = async function (func, expectedError, expectedErrorContains) {
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
    else if (expectedErrorContains)
        assert.notEqual(errMsg.indexOf(expectedErrorContains), -1)
}
