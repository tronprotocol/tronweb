const chai = require('chai');
const assert = chai.assert;
const wait = require('../../helpers/wait');
const assertThrow = require('../../helpers/assertThrow');
const broadcaster = require('../../helpers/broadcaster');
const _ = require('lodash');
const tronWebBuilder = require('../../helpers/tronWebBuilder');
const TronWeb = tronWebBuilder.TronWeb;

const testCustomError = require('../../fixtures/contracts').testCustomError;

describe('#contract.index', function () {

    let accounts;
    let tronWeb;
    let emptyAccount;

    before(async function () {
        tronWeb = tronWebBuilder.createInstance();
        // ALERT this works only with Tron Quickstart:
        accounts = await tronWebBuilder.getTestAccounts(-1);
        emptyAccount = await TronWeb.createAccount();
    });

    describe('#customError', function () {
        let customError;

        before(async function () {
            const tx = await broadcaster(tronWeb.transactionBuilder.createSmartContract({
                abi: testCustomError.abi,
                bytecode: testCustomError.bytecode
            }, accounts.b58[0]), accounts.pks[0]);
            customError = await tronWeb.contract(testCustomError.abi, tx.transaction.contract_address);
        })

        it('should revert with custom error', async () => {
            const txid = await customError.test(111).send();
            await wait(10);
            const data = await tronWeb.trx.getTransactionInfo(txid);
            const errorData = data.contractResult;
            const expectedErrorData = 
                TronWeb.sha3('CustomError(uint256,uint256)', false).slice(0, 8) +
                '000000000000000000000000000000000000000000000000000000000000006f' + // 111
                '0000000000000000000000000000000000000000000000000000000000000001'; // 1
            assert.equal(errorData, expectedErrorData);
        })
    })
});
