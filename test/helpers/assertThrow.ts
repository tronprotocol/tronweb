import { assert } from 'chai';

export default async function (func: unknown, expectedError?: any, expectedErrorContains?: any) {
    let errMsg;
    try {
        await func;
    } catch (err: any) {
        if (typeof err === 'object') {
            if (err.message) errMsg = err.message;
            else if (err.error) errMsg = err.error;
        } else errMsg = err;
        if (expectedError) assert.equal(errMsg, expectedError);
        else if (expectedErrorContains) {
            if (!Array.isArray(expectedErrorContains)) {
                expectedErrorContains = [expectedErrorContains];
            }
            for (const expected of expectedErrorContains) {
                assert.notEqual(errMsg.indexOf(expected), -1);
            }
        }
    }
}
