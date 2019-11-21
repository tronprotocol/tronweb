const chai = require('chai');
const assert = chai.assert;
const wait = require('../../helpers/wait');
const assertThrow = require('../../helpers/assertThrow');
const broadcaster = require('../../helpers/broadcaster');
const _ = require('lodash');
const tronWebBuilder = require('../../helpers/tronWebBuilder');
const TronWeb = tronWebBuilder.TronWeb;

const testRevertContract = require('../../fixtures/contracts').testRevert;
const testSetValContract = require('../../fixtures/contracts').testSetVal;

describe('#contract.method', function () {

    let accounts;
    let tronWeb;
    let emptyAccount;

    before(async function () {
        tronWeb = tronWebBuilder.createInstance();
        // ALERT this works only with Tron Quickstart:
        accounts = await tronWebBuilder.getTestAccounts(-1);
        emptyAccount = await TronWeb.createAccount();
    });

    describe('#send()', function () {

        let testRevert
        let testSetVal

        before(async function () {
            const tx = await broadcaster(tronWeb.transactionBuilder.createSmartContract({
                abi: testRevertContract.abi,
                bytecode: testRevertContract.bytecode
            }, accounts.b58[0]), accounts.pks[0])
            testRevert = await tronWeb.contract().at(tx.transaction.contract_address)

            const tx2 = await broadcaster(tronWeb.transactionBuilder.createSmartContract({
                abi: testSetValContract.abi,
                bytecode: testSetValContract.bytecode
            }, accounts.b58[0]), accounts.pks[0])
            testSetVal = await tronWeb.contract().at(tx2.transaction.contract_address)
        })

        it("should set accounts[2] as the owner and check it with getOwner(1)", async function () {
            await testRevert.setOwner(accounts.b58[2]).send()
            assert.equal(await testRevert.getOwner(1).call(), accounts.hex[2])
        })

        it("should revert if trying to set TSeFTBYCy3r2kZNYsj86G6Yz6rsmPdYdFs as the owner", async function () {
            this.timeout(30000)
            await assertThrow(testRevert.setOwner('TSeFTBYCy3r2kZNYsj86G6Yz6rsmPdYdFs').send({shouldPollResponse: true}),
                null,
                'REVERT'
            )
        });

        it("should set the val to 123", async function () {
            this.timeout(30000)
            let result = await testSetVal.set(123).send({
                shouldPollResponse: true,
                keepTxID: true
            })
            assert.equal(result[0].length, 64)
            assert.equal(result[1].toNumber(), 123)
        });

    });

    describe('#call()', function () {

        let testRevert

        before(async function () {
            const tx = await broadcaster(tronWeb.transactionBuilder.createSmartContract({
                abi: testRevertContract.abi,
                bytecode: testRevertContract.bytecode
            }, accounts.b58[0]), accounts.pks[0])
            testRevert = await tronWeb.contract().at(tx.transaction.contract_address)
            await testRevert.setOwner(accounts.b58[2]).send()
        })

        it("should getOwner(1) and get accounts[2]", async function () {
            assert.equal(await testRevert.getOwner(1).call(), accounts.hex[2])
        })

        it("should revert if call getOwner(2)", async function () {
            await assertThrow(testRevert.getOwner(2).call()
            )
        })

        it("should revert if call getOwner2()", async function () {
            await assertThrow(testRevert.getOwner2(2).call()
            )
        })

    });

});
