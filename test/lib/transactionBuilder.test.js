const chai = require('chai');
const assert = chai.assert;
const assertThrow = require('../helpers/assertThrow');
const wait = require('../helpers/wait');
const broadcaster = require('../helpers/broadcaster');
const _ = require('lodash');
const tronWebBuilder = require('../helpers/tronWebBuilder');
const TronWeb = tronWebBuilder.TronWeb;
const config = require('../helpers/config');
const {ADDRESS_HEX, UPDATED_TEST_TOKEN_OPTIONS} = config;
const getTokenOptions = config.getTokenOptions;

describe('TronWeb.transactionBuilder', function () {

    let accounts;
    let tronWeb;
    let emptyAccount;

    before(async function () {
        tronWeb = tronWebBuilder.createInstance();
        // ALERT this works only with Tron Quickstart:
        accounts = await tronWebBuilder.getTestAccounts(-1);
        emptyAccount = await TronWeb.createAccount();
    });

    describe('#constructor()', function () {

        it('should have been set a full instance in tronWeb', function () {

            assert.instanceOf(tronWeb.transactionBuilder, TronWeb.TransactionBuilder);
        });

    });

    describe('#sendTrx()', function () {

        it(`should send 10 trx from default address to accounts[1]`, async function () {
            const transaction = await tronWeb.transactionBuilder.sendTrx(accounts.b58[1], 10);

            const parameter = transaction.raw_data.contract[0].parameter;

            assert.equal(transaction.txID.length, 64);
            assert.equal(parameter.value.amount, 10);
            assert.equal(parameter.value.owner_address, ADDRESS_HEX);
            assert.equal(parameter.value.to_address, accounts.hex[1]);
            assert.equal(parameter.type_url, 'type.googleapis.com/protocol.TransferContract');
        });

        it(`should send 10 trx from accounts[0] to accounts[1]`, async function () {
            const transaction = await tronWeb.transactionBuilder.sendTrx(accounts.b58[1], 10, accounts.b58[0]);

            const parameter = transaction.raw_data.contract[0].parameter;

            assert.equal(transaction.txID.length, 64);
            assert.equal(parameter.value.amount, 10);
            assert.equal(parameter.value.owner_address, accounts.hex[0]);
            assert.equal(parameter.value.to_address, accounts.hex[1]);
            assert.equal(parameter.type_url, 'type.googleapis.com/protocol.TransferContract');
        });

        it('should throw if an invalid address is passed', async function () {

            await assertThrow(
                tronWeb.transactionBuilder.sendTrx('40f0b27e3d16060a5b0e8e995120e00', 10),
                'Invalid recipient address provided'
            );

        });

        it('should throw if an invalid amount is passed', async function () {

            await assertThrow(
                tronWeb.transactionBuilder.sendTrx(accounts.hex[2], -10),
                'Invalid amount provided'
            );

        });

        it('should throw if an invalid origin address is passed', async function () {

            await assertThrow(
                tronWeb.transactionBuilder.sendTrx(accounts.hex[3], 10, '40f0b27e3d16060a5b0e8e995120e00'),
                'Invalid origin address provided'
            );

        });


        it('should throw if trying to transfer to itself', async function () {

            await assertThrow(
                tronWeb.transactionBuilder.sendTrx(accounts.hex[3], 10, accounts.hex[3]),
                'Cannot transfer TRX to the same account'
            );

        });

        it('should throw if trying to transfer from an account with not enough funds', async function () {

            await assertThrow(
                tronWeb.transactionBuilder.sendTrx(accounts.hex[3], 10, emptyAccount.address.base58),
                null,
                'ContractValidateException'
            );

        });
    });

    describe('#createToken()', function () {

        // This test passes only the first time because, in order to test updateToken, we broadcast the token creation

        it(`should allow accounts[2] to create a TestToken`, async function () {

            const options = getTokenOptions();

            const transaction = await tronWeb.transactionBuilder.createToken(options, accounts.b58[2]);
            const parameter = transaction.raw_data.contract[0].parameter;
            assert.equal(transaction.txID.length, 64);
            assert.equal(parameter.value.total_supply, options.totalSupply);
            assert.equal(parameter.value.abbr, tronWeb.toHex(options.abbreviation).substring(2));
            assert.equal(parameter.value.owner_address, accounts.hex[2]);
            assert.equal(parameter.type_url, 'type.googleapis.com/protocol.AssetIssueContract');
        });

        it(`should create a TestToken passing any number as a string`, async function () {
            const options = getTokenOptions();
            options.totalSupply = '100'
            options.frozenAmount = '5'
            options.frozenDuration = '2'
            options.saleEnd = options.saleEnd.toString()
            const transaction = await tronWeb.transactionBuilder.createToken(options);
            const parameter = transaction.raw_data.contract[0].parameter;
            assert.equal(parameter.value.abbr, tronWeb.toHex(options.abbreviation).substring(2));
        });

        it('should throw if an invalid name is passed', async function () {

            const options = getTokenOptions();
            options.name = 123;

            await assertThrow(
                tronWeb.transactionBuilder.createToken(options),
                'Invalid token name provided'
            );

        });

        it('should throw if an invalid abbrevation is passed', async function () {

            const options = getTokenOptions();
            options.abbreviation = 123;

            await assertThrow(
                tronWeb.transactionBuilder.createToken(options),
                'Invalid token abbreviation provided'
            );

        });

        it('should throw if an invalid supply amount is passed', async function () {

            const options = getTokenOptions();
            options.totalSupply = [];

            await assertThrow(
                tronWeb.transactionBuilder.createToken(options),
                'Invalid supply amount provided'
            );

        });

        it('should throw if TRX ratio is not a positive integer', async function () {

            const options = getTokenOptions();
            options.trxRatio = {};

            await assertThrow(
                tronWeb.transactionBuilder.createToken(options),
                'TRX ratio must be a positive integer'
            );

        });

        it('should throw if token ratio is not a positive integer', async function () {

            const options = getTokenOptions();
            options.tokenRatio = 'tokenRatio';

            await assertThrow(
                tronWeb.transactionBuilder.createToken(options),
                'Token ratio must be a positive integer'
            );

        });

        it('should throw if sale start is invalid', async function () {

            const options = getTokenOptions();
            options.saleStart = Date.now() - 1;

            await assertThrow(
                tronWeb.transactionBuilder.createToken(options),
                'Invalid sale start timestamp provided'
            );

            options.saleStart = 'something';

            await assertThrow(
                tronWeb.transactionBuilder.createToken(options),
                'Invalid sale start timestamp provided'
            );

        });

        it('should throw if sale end is invalid', async function () {

            const options = getTokenOptions();
            options.saleEnd = Date.now() - 1000;

            await assertThrow(
                tronWeb.transactionBuilder.createToken(options),
                'Invalid sale end timestamp provided'
            );

            options.saleEnd = 'something';

            await assertThrow(
                tronWeb.transactionBuilder.createToken(options),
                'Invalid sale end timestamp provided'
            );

        });

        it('should throw if an invalid description is passed', async function () {

            const options = getTokenOptions();
            options.description = 123;

            await assertThrow(
                tronWeb.transactionBuilder.createToken(options),
                'Invalid token description provided'
            );

            options.description = '';

            await assertThrow(
                tronWeb.transactionBuilder.createToken(options),
                'Invalid token description provided'
            );

        });

        it('should throw if an invalid url is passed', async function () {

            const options = getTokenOptions();
            options.url = 123;

            await assertThrow(
                tronWeb.transactionBuilder.createToken(options),
                'Invalid token url provided'
            );

            options.url = '';

            await assertThrow(
                tronWeb.transactionBuilder.createToken(options),
                'Invalid token url provided'
            );

            options.url = '//www.example.com';

            await assertThrow(
                tronWeb.transactionBuilder.createToken(options),
                'Invalid token url provided'
            );

        });

        it('should throw if freeBandwidth is invalid', async function () {

            const options = getTokenOptions();
            options.freeBandwidth = -1;

            await assertThrow(
                tronWeb.transactionBuilder.createToken(options),
                'Invalid free bandwidth amount provided'
            );

            options.freeBandwidth = 'something';

            await assertThrow(
                tronWeb.transactionBuilder.createToken(options),
                'Invalid free bandwidth amount provided'
            );

        });

        it('should throw if freeBandwidthLimit is invalid', async function () {
            const options = getTokenOptions();

            options.freeBandwidth = 10;
            delete options.freeBandwidthLimit;

            await assertThrow(
                tronWeb.transactionBuilder.createToken(options),
                'Invalid free bandwidth limit provided'
            );

            options.freeBandwidthLimit = 'something';

            await assertThrow(
                tronWeb.transactionBuilder.createToken(options),
                'Invalid free bandwidth limit provided'
            );

        });

        it('should throw if frozen supply is invalid', async function () {

            const options = getTokenOptions();
            options.frozenAmount = -1;

            await assertThrow(
                tronWeb.transactionBuilder.createToken(options),
                'Invalid frozen supply provided'
            );

            options.frozenAmount = 'something';

            await assertThrow(
                tronWeb.transactionBuilder.createToken(options),
                'Invalid frozen supply provided'
            );
        });

        it('should throw if frozen supply is invalid', async function () {
            const options = getTokenOptions();

            delete options.frozenAmount;

            await assertThrow(
                tronWeb.transactionBuilder.createToken(options),
                'Invalid frozen duration provided'
            );

            options.frozenAmount = 10;
            options.frozenDuration = 'something';

            await assertThrow(
                tronWeb.transactionBuilder.createToken(options),
                'Invalid frozen duration provided'
            );

        });

        it('should throw if the issuer address is invalid', async function () {

            const options = getTokenOptions();

            await assertThrow(
                tronWeb.transactionBuilder.createToken(options, '0xzzzww'),
                'Invalid issuer address provided'
            );

        });

        describe('#createAsset()', function () {

            // This test passes only the first time because, in order to test updateToken, we broadcast the token creation

            it(`should allow accounts[2] to create a TestToken`, async function () {
                const options = getTokenOptions();
                const transaction = await tronWeb.transactionBuilder.createAsset(options, accounts.b58[2]);
                const parameter = transaction.raw_data.contract[0].parameter;
                assert.equal(transaction.txID.length, 64);
                assert.equal(parameter.value.total_supply, options.totalSupply);
                assert.equal(parameter.value.abbr, tronWeb.toHex(options.abbreviation).substring(2));
                assert.equal(parameter.value.owner_address, accounts.hex[2]);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.AssetIssueContract');
            });
        });

    });

    describe('#updateAccount()', function () {

        it(`should update accounts[3]`, async function () {

            const newName = 'New name'
            const transaction = await tronWeb.transactionBuilder.updateAccount(newName, accounts.b58[3]);
            const parameter = transaction.raw_data.contract[0].parameter;

            assert.equal(transaction.txID.length, 64);
            assert.equal(parameter.value.account_name, tronWeb.toHex(newName).substring(2));
            assert.equal(parameter.value.owner_address, accounts.hex[3]);
            assert.equal(parameter.type_url, 'type.googleapis.com/protocol.AccountUpdateContract');
        });

        it('should throw if an invalid name is passed', async function () {

            await assertThrow(
                tronWeb.transactionBuilder.updateAccount(123, accounts.b58[4]),
                'Name must be a string'
            );

        });

        it('should throw if the issuer address is invalid', async function () {

            await assertThrow(
                tronWeb.transactionBuilder.updateAccount('New name', '0xzzzww'),
                'Invalid origin address provided'
            );

        });

    });

    describe('#updateToken()', function () {

        before(async function () {

            const options = getTokenOptions();
            try {
                await broadcaster(tronWeb.transactionBuilder.createToken(options, accounts.b58[2]), accounts.pks[2])
            } catch (err) {
                console.log('Token has already been created')
                // token has already been created
            }
        });

        it(`should allow accounts[2] to update a TestToken`, async function () {
            const transaction = await tronWeb.transactionBuilder.updateToken(UPDATED_TEST_TOKEN_OPTIONS, accounts.b58[2]);
            const parameter = transaction.raw_data.contract[0].parameter;
            assert.equal(transaction.txID.length, 64);
            assert.equal(parameter.value.description, tronWeb.toHex(UPDATED_TEST_TOKEN_OPTIONS.description).substring(2));
            assert.equal(parameter.value.url, tronWeb.toHex(UPDATED_TEST_TOKEN_OPTIONS.url).substring(2));
            assert.equal(parameter.value.owner_address, accounts.hex[2]);
            assert.equal(parameter.type_url, 'type.googleapis.com/protocol.UpdateAssetContract');
        });

        it('should throw if an invalid description is passed', async function () {

            const options = _.clone(UPDATED_TEST_TOKEN_OPTIONS);
            options.description = 123;

            await assertThrow(
                tronWeb.transactionBuilder.updateToken(options, accounts.hex[2]),
                'Invalid token description provided'
            );

            options.description = '';

            await assertThrow(
                tronWeb.transactionBuilder.updateToken(options, accounts.hex[2]),
                'Invalid token description provided'
            );

        });


        it('should throw if an invalid url is passed', async function () {

            const options = _.clone(UPDATED_TEST_TOKEN_OPTIONS);
            options.url = 123;

            await assertThrow(
                tronWeb.transactionBuilder.updateToken(options, accounts.hex[2]),
                'Invalid token url provided'
            );

            options.url = '';

            await assertThrow(
                tronWeb.transactionBuilder.updateToken(options, accounts.hex[2]),
                'Invalid token url provided'
            );

            options.url = '//www.example.com';

            await assertThrow(
                tronWeb.transactionBuilder.updateToken(options, accounts.hex[2]),
                'Invalid token url provided'
            );

        });

        it('should throw if freeBandwidth is invalid', async function () {

            const options = _.clone(UPDATED_TEST_TOKEN_OPTIONS);
            options.freeBandwidth = -1;

            await assertThrow(
                tronWeb.transactionBuilder.updateToken(options, accounts.hex[2]),
                'Invalid free bandwidth amount provided'
            );

            options.freeBandwidth = 'something';

            await assertThrow(
                tronWeb.transactionBuilder.updateToken(options, accounts.hex[2]),
                'Invalid free bandwidth amount provided'
            );

        });

        it('should throw if freeBandwidthLimit is invalid', async function () {
            const options = _.clone(UPDATED_TEST_TOKEN_OPTIONS);

            options.freeBandwidth = 10;
            delete options.freeBandwidthLimit;

            await assertThrow(
                tronWeb.transactionBuilder.updateToken(options, accounts.hex[2]),
                'Invalid free bandwidth limit provided'
            );

            options.freeBandwidthLimit = 'something';

            await assertThrow(
                tronWeb.transactionBuilder.updateToken(options, accounts.hex[2]),
                'Invalid free bandwidth limit provided'
            );

        });

        it('should throw if the issuer address is invalid', async function () {

            await assertThrow(
                tronWeb.transactionBuilder.updateToken(UPDATED_TEST_TOKEN_OPTIONS, '0xzzzww'),
                'Invalid issuer address provided'
            );

        });

        describe('#updateAsset()', async function () {
            it(`should allow accounts[2] to update a TestToken`, async function () {
                const transaction = await tronWeb.transactionBuilder.updateAsset(UPDATED_TEST_TOKEN_OPTIONS, accounts.b58[2]);
                const parameter = transaction.raw_data.contract[0].parameter;
                assert.equal(transaction.txID.length, 64);
                assert.equal(parameter.value.description, tronWeb.toHex(UPDATED_TEST_TOKEN_OPTIONS.description).substring(2));
                assert.equal(parameter.value.url, tronWeb.toHex(UPDATED_TEST_TOKEN_OPTIONS.url).substring(2));
                assert.equal(parameter.value.owner_address, accounts.hex[2]);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.UpdateAssetContract');
            });
        });

    });

    describe('#purchaseToken()', function () {

        let tokenOptions

        before(async function () {

            tokenOptions = getTokenOptions();
            try {
                await broadcaster(tronWeb.transactionBuilder.createToken(tokenOptions, accounts.b58[3]), accounts.pks[3])
            } catch (err) {
                // token has already been created
            }
        });

        it(`should allow accounts[2] to purchase a token created by accounts[3]`, async function () {

            this.timeout(5000);
            wait(3);

            const transaction = await tronWeb.transactionBuilder.purchaseToken(accounts.b58[3], tokenOptions.name, 20, accounts.b58[2]);
            const parameter = transaction.raw_data.contract[0].parameter;
            assert.equal(transaction.txID.length, 64);
            assert.equal(parameter.value.amount, 20);
            assert.equal(parameter.value.asset_name, tronWeb.toHex(tokenOptions.name).substring(2));
            assert.equal(parameter.value.owner_address, accounts.hex[2]);
            assert.equal(parameter.value.to_address, accounts.hex[3]);
            assert.equal(parameter.type_url, 'type.googleapis.com/protocol.ParticipateAssetIssueContract');
        });

        it("should throw if issuerAddress is invalid", async function () {

            await assertThrow(
                tronWeb.transactionBuilder.purchaseToken('sasdsadasfa', tokenOptions.name, 20, accounts.b58[2]),
                'Invalid issuer address provided'
            )

        });

        it("should throw if issuerAddress is not the right one", async function () {
            await assertThrow(
                tronWeb.transactionBuilder.purchaseToken(accounts.b58[4], tokenOptions.name, 20, accounts.b58[2]),
                null,
                'The asset is not issued by'
            )
        });

        it("should throw if the token Id is invalid", async function () {

            await assertThrow(
                tronWeb.transactionBuilder.purchaseToken(accounts.b58[3], 123432, 20, accounts.b58[2]),
                'Invalid token ID provided'
            )
        });

        it("should throw if token does not exist", async function () {

            await assertThrow(
                tronWeb.transactionBuilder.purchaseToken(accounts.b58[3], 'SomeToken', 20, accounts.b58[2]),
                null,
                'No asset named '
            )

        });

        it("should throw if buyer address is invalid", async function () {

            await assertThrow(
                tronWeb.transactionBuilder.purchaseToken(accounts.b58[3], tokenOptions.name, 20, 'sasdadasdas'),
                'Invalid buyer address provided'
            )

        });

        it("should throw if amount is invalid", async function () {

            await assertThrow(
                tronWeb.transactionBuilder.purchaseToken(accounts.b58[3], tokenOptions.name, -3, accounts.b58[2]),
                'Invalid amount provided'
            )

            await assertThrow(
                tronWeb.transactionBuilder.purchaseToken(accounts.b58[3], tokenOptions.name, "some-amount", accounts.b58[2]),
                'Invalid amount provided'
            )

        });


    });

    describe('#sendToken()', function () {

        let tokenOptions

        before(async function () {

            tokenOptions = getTokenOptions();
            try {
                await broadcaster(tronWeb.transactionBuilder.createToken(tokenOptions, accounts.b58[3]), accounts.pks[3])
                wait(3);
                await broadcaster(tronWeb.transactionBuilder.purchaseToken(accounts.b58[3], tokenOptions.name, 20, accounts.b58[2]), accounts.pks[2])
            } catch (err) {
                // token has already been created
            }
        });

    });

});
