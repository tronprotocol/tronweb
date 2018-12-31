const chai = require('chai');
const assert = chai.assert;
const wait = require('../../helpers/wait');
const broadcaster = require('../../helpers/broadcaster');
const _ = require('lodash');
const tronWebBuilder = require('../../helpers/tronWebBuilder');
const TronWeb = tronWebBuilder.TronWeb;

const testRevertContract = require('../../fixtures/contracts').testRevert;

describe.only('#contract.method', function () {

    let accounts;
    let tronWeb;
    let emptyAccount;

    before(async function () {
        tronWeb = tronWebBuilder.createInstance();
        // ALERT this works only with Tron Quickstart:
        accounts = await tronWebBuilder.getTestAccounts(-1);
        emptyAccount = await TronWeb.createAccount();
    });

    describe('#send/call()', function () {

        let testRevert

        before(async function () {
            const tx = await broadcaster(tronWeb.transactionBuilder.createSmartContract({
                abi: testRevertContract.abi,
                bytecode: testRevertContract.bytecode
            }, accounts.b58[0]), accounts.pks[0])
            testRevert = await tronWeb.contract().at(tx.transaction.contract_address)
        })

        it("should set accounts[2] as the owner and check it with getOwner(1)", async function () {
            await testRevert.setOwner(accounts.b58[2]).send()
            assert.equal(await testRevert.getOwner(1).call(), accounts.hex[2])
        })

        it.only("should revert if trying to set address(0) as the owner", async function () {
            this.timeout(10000)
            try {
                await testRevert.setOwner('TSeFTBYCy3r2kZNYsj86G6Yz6rsmPdYdFs').send({shouldPollResponse: true})
                console.log(await testRevert.getOwner(1).call())
                assert.isTrue(false)
            } catch (err) {
                console.log(err)
                assert.isTrue(/The call have been reverted or have thrown an error/.test(err.message))
                assert.contains(/Address forbidden/.test(err.message))
            }
        });

        it("should revert if call getOwner(2)", async function () {
            try {
                console.log(await testRevert.getOwner(2).call())
                assert.isTrue(false)
            } catch (err) {
                console.log(err)
                assert.equal(err.message, 'The call have been reverted or have thrown an error. Error message:  Wrong check')
            }
        })


        it("should revert if call getOwner2()", async function () {
            try {
                console.log(await testRevert.getOwner2(2).call())
                assert.isTrue(false)
            } catch (err) {
                console.log(err)
                assert.equal(err.message, 'The call have been reverted or have thrown an error.')
            }
        })

    });

});
