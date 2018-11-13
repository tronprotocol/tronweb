const chai = require('chai');
const assert = chai.assert;
const assertThrow = require('../helpers/assertThrow');
const tronWebBuilder = require('../helpers/tronWebBuilder');
const TronWeb = tronWebBuilder.TronWeb;
const {ADDRESS_HEX, ADDRESS_BASE58} = require('../helpers/config').constants;

describe('TronWeb.transactionBuilder', function () {

    let accounts;
    let tronWeb;
    let emptyAccount;

    before(async function () {
        tronWeb = tronWebBuilder.createInstance();
        // ALERT this works only with Tron Quickstart:
        accounts = await tronWebBuilder.getTestAccounts();
        emptyAccount = await TronWeb.createAccount();
    });

    describe('#constructor()', function () {

        it('should have been set a full instance in tronWeb', function () {

            assert.instanceOf(tronWeb.transactionBuilder, TronWeb.TransactionBuilder);
        });

    });

    describe('#sendTrx()', function () {

        it(`should send 10 trx from default address to accounts[1]`, async function () {
            const tronWeb = tronWebBuilder.createInstance();
            const transaction = await tronWeb.transactionBuilder.sendTrx(accounts.b58[1], 10);

            const parameter = transaction.raw_data.contract[0].parameter;

            assert.equal(transaction.txID.length, 64);
            assert.equal(parameter.value.amount, 10);
            assert.equal(parameter.value.owner_address, ADDRESS_HEX);
            assert.equal(parameter.value.to_address, accounts.hex[1]);
            assert.equal(parameter.type_url, 'type.googleapis.com/protocol.TransferContract');
        });

        it(`should send 10 trx from accounts[0] to accounts[1]`, async function () {
            const tronWeb = tronWebBuilder.createInstance();
            const transaction = await tronWeb.transactionBuilder.sendTrx(accounts.b58[1], 10, accounts.b58[0]);

            const parameter = transaction.raw_data.contract[0].parameter;

            assert.equal(transaction.txID.length, 64);
            assert.equal(parameter.value.amount, 10);
            assert.equal(parameter.value.owner_address, accounts.hex[0]);
            assert.equal(parameter.value.to_address, accounts.hex[1]);
            assert.equal(parameter.type_url, 'type.googleapis.com/protocol.TransferContract');
        });

        it('should throw if an invalid address is passed', async function () {

            assertThrow(
                tronWeb.transactionBuilder.sendTrx('40f0b27e3d16060a5b0e8e995120e00', 10),
                'Invalid recipient address provided'
            );

        });

        it('should throw if an invalid amount is passed', async function () {

            assertThrow(
                tronWeb.transactionBuilder.sendTrx(accounts.hex[2], -10),
                'Invalid amount provided'
            );

        });

        it('should throw if an invalid origin address is passed', async function () {

            assertThrow(
                tronWeb.transactionBuilder.sendTrx(accounts.hex[3], 10, '40f0b27e3d16060a5b0e8e995120e00'),
                'Invalid origin address provided'
            );

        });


        it('should throw if trying to transfer to itself', async function () {

            assertThrow(
                tronWeb.transactionBuilder.sendTrx(accounts.hex[3], 10, accounts.hex[3]),
                'Cannot transfer TRX to the same account'
            );

        });

        it('should throw if trying to transfer from an account with not enough funds', async function () {

            assertThrow(
                tronWeb.transactionBuilder.sendTrx(accounts.hex[3], 10, emptyAccount.address.base58),
                null,
                'ContractValidateException'
            );

        });



        //
    })


});
