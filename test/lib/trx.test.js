const chai = require('chai');
const assert = chai.assert;
const txPars = require('../helpers/txPars');
const jlog = require('../helpers/jlog');
const assertThrow = require('../helpers/assertThrow');
const wait = require('../helpers/wait');
const broadcaster = require('../helpers/broadcaster');
const pollAccountFor = require('../helpers/pollAccountFor');
const _ = require('lodash');
const tronWebBuilder = require('../helpers/tronWebBuilder');
const assertEqualHex = require('../helpers/assertEqualHex');
const TronWeb = tronWebBuilder.TronWeb;
const config = require('../helpers/config');
const {
    ADDRESS_HEX,
    ADDRESS_BASE58,
    UPDATED_TEST_TOKEN_OPTIONS,
    PRIVATE_KEY,
    getTokenOptions,
    isProposalApproved
} = require('../helpers/config');
const testRevertContract = require('../fixtures/contracts').testRevert;

describe('TronWeb.trx', function () {

    let accounts;
    let tronWeb;
    let emptyAccount;

    before(async function () {
        tronWeb = tronWebBuilder.createInstance();
        // ALERT this works only with Tron Quickstart:
        accounts = await tronWebBuilder.getTestAccounts(-1);
        emptyAccount = await TronWeb.createAccount();
    });

    // Contrstuctor Test
    describe('#constructor()', function () {

        it('should have been set a full instance in tronWeb', function () {

            assert.instanceOf(tronWeb.trx, TronWeb.Trx);
        });

    });


    // Account Test (10 - 11)

    describe("#getAccount", async function () {

        it('should get account by hex or base58 address', async function () {
            const addressType = ['hex', 'b58'];
            let account;
            for (let type of addressType) {
                account = await tronWeb.trx.getAccount(accounts[type][10]);
                assert.equal(account.address, accounts.hex[10]);
            }
        });

        it('should throw address is not valid error', async function () {
            await assertThrow(
                tronWeb.trx.getAccount('notAnAddress'),
                'Invalid address provided'
            );
        });

    });


    describe("#getAccountResources", async function () {

        it('should get account resource by hex or base58 address', async function () {
            const addressType = ['hex', 'b58'];
            let accountResource;
            for (let type of addressType) {
                accountResource = await tronWeb.trx.getAccountResources(accounts[type][10]);
                assert.isDefined(accountResource.freeNetLimit);
                assert.isDefined(accountResource.TotalEnergyLimit);
            }
        });

        it('should throw address is not valid error', async function () {
            await assertThrow(
                tronWeb.trx.getAccountResources('notAnAddress'),
                'Invalid address provided'
            );
        });

    });


    describe("#getBalance", async function () {

        it('should get balance by hex or base58 address', async function () {
            const addressType = ['hex', 'b58'];
            let balance;
            for (let type of addressType) {
                balance = await tronWeb.trx.getBalance(accounts[type][10]);
                assert.isTrue(balance >= 0);
            }
        });

    });


    describe("#getBandwidth", async function () {

        it('should get bandwith by hex or base58 address', async function () {
            const addressType = ['hex', 'b58'];
            let bp;
            for (let type of addressType) {
                bp = await tronWeb.trx.getBandwidth(accounts[type][10]);
                assert.isTrue(bp >= 0);
            }
        });

    });


    describe("#getUnconfirmedAccount", async function () {

        let accountArray;

        before(async function(){
            accountArray = [];
            for (let i = 10; i < 12; i++) {
                const account = await tronWeb.createAccount();
                const transaction = await tronWeb.transactionBuilder.sendTrx(account.address.hex, 10e6, accounts.hex[i]);
                await broadcaster(null, accounts.pks[i], transaction);
                accountArray.push(account);
            }
        });

        it('should get unconfirmed account by address', async function () {
            for (let account of accountArray) {
                const accnt = await tronWeb.trx.getUnconfirmedAccount(account.address.hex);
                assert.equal(accnt.address, account.address.hex.toLowerCase());
            }
        });

        it('should throw address is not valid error', async function () {
            await assertThrow(
                tronWeb.trx.getUnconfirmedAccount('notAnAddress'),
                'Invalid address provided'
            );
        });

    });


    describe("#getUnconfirmedBalance", async function () {

        let accountArray;

        before(async function(){
            accountArray = [];
            for (let i = 10; i < 12; i++) {
                const account = await tronWeb.createAccount();
                const transaction = await tronWeb.transactionBuilder.sendTrx(account.address.hex, 10e6, accounts.hex[i]);
                await broadcaster(null, accounts.pks[i], transaction);
                accountArray.push(account);
            }
        });

        it('should get unconfirmed balance by account address', async function () {
            for (let account of accountArray) {
                const balance = await tronWeb.trx.getUnconfirmedBalance(account.address.hex);
                assert.equal(balance, 10e6);
            }
        });

    });


    describe("#updateAccount", async function () {

        it('should update account name', async function () {
            const accountName = Math.random().toString(36).substr(2);
            await tronWeb.trx.updateAccount(accountName, {privateKey: accounts.pks[11], address: accounts.hex[11]});
            const account = await tronWeb.trx.getUnconfirmedAccount(accounts.hex[11]);
            assert.equal(tronWeb.toUtf8(account.account_name), accountName);
        });

        it('should throw name must be a string error', async function () {
            await assertThrow(
                tronWeb.trx.updateAccount({}),
                'Name must be a string'
            );
        });

    });


    // Signature Test (12 - 14)

    describe("#sign", async function () {

        let transaction;

        beforeEach(async function() {
            transaction = await tronWeb.transactionBuilder.freezeBalance(10e6, 3, 'BANDWIDTH', accounts.b58[12]);
        });

        it('should sign a transaction', async function () {
            const signedTransaction = await tronWeb.trx.sign(transaction, accounts.pks[12]);
            assert.equal(signedTransaction.txID, transaction.txID);
            assert.equal(signedTransaction.signature.length, 1);
        });

        it('should throw transaction not valid error', async function () {
            await assertThrow(
                tronWeb.trx.sign(undefined, accounts.pks[12]),
                'Invalid transaction provided'
            );
        });

        it('should throw transaction is already signed error', async function () {
            const signedTransaction = await tronWeb.trx.sign(transaction, accounts.pks[12]);
            await assertThrow(
                tronWeb.trx.sign(signedTransaction, accounts.pks[12]),
                'Transaction is already signed'
            );
        });

        it('should throw private key does not match address error', async function () {
            await assertThrow(
                tronWeb.trx.sign(transaction, accounts.pks[12]),
                'Private key does not match address in transaction'
            );
        });

    });


    describe("#signMessage", async function () {

        it('should sign a hex string message', async function () {
            const hexMsg = '0xe66f4c8f323229131006ad3e4a2ca65dfdf339f0';
            const signedMsg = await tronWeb.trx.sign(hexMsg, accounts.pks[12]);
            assert.isTrue(signedMsg.startsWith('0x'));
        });

        it('should throw expected hex message input error', async function () {
            const hexMsg = 'e66f4c8f323229131006ad3e4a2ca65dfdf339f0';
            await assertThrow(
                tronWeb.trx.sign(hexMsg, accounts.pks[12]),
                'Private key does not match address in transaction'
            );
        });

    });


    describe("#verifyMessage", async function () {

        let hexMsg;
        let signedMsg;

        before(async function() {
            hexMsg = '0xe66f4c8f323229131006ad3e4a2ca65dfdf339f0';
            signedMsg = await tronWeb.trx.sign(hexMsg, accounts.pks[12], null, false);
        });

        it('should verify signature of signed string message', async function () {
            const result = await tronWeb.trx.verifyMessage(hexMsg, signedMsg, accounts.hex[12], null);
            assert.isTrue(result);
        });

        it('should throw expected hex message input error', async function () {
            await assertThrow(
                tronWeb.trx.verifyMessage('e66f4c8f323229131006ad3e4a2ca65dfdf339f0', signedMsg, accounts.hex[12], null),
                'Expected hex message input'
            );
        });

        it('should throw signature does not match error', async function () {
            const fakeSig = '0xafd220c015fd38ffcd34455ddf4f11d20549d9565f558dd84b508c37854727887879d62e675a285c0caf' +
                'a34ea7814b0ae5b74835bdfb612205deb8b97d7c24811c';
            await assertThrow(
                tronWeb.trx.verifyMessage(hexMsg, fakeSig, accounts.hex[12], null),
                'Signature does not match'
            );
        });
    });


    describe("#multiSignTransaction", async function () {

        const threshold = 3;

        before(async function() {
            this.timeout(10000);
            // update account permission
            let ownerAddress = accounts.hex[12];
            let ownerPk = accounts.pks[12];
            let ownerPermission = { type: 0, permission_name: 'owner' };
            ownerPermission.threshold = threshold;
            ownerPermission.keys  = [];
            let activePermission = { type: 2, permission_name: 'active0' };
            activePermission.threshold = threshold;
            activePermission.operations = '7fff1fc0037e0000000000000000000000000000000000000000000000000000';
            activePermission.keys = [];

            for (let i = 12; i < 15; i++) {
                let address = accounts.hex[i];
                let weight = 1;
                ownerPermission.keys.push({ address: address, weight: weight });
                activePermission.keys.push({ address: address, weight: weight });
            }

            const updateTransaction = await tronWeb.transactionBuilder.updateAccountPermissions(
                ownerAddress,
                ownerPermission,
                null,
                [activePermission]
            );
            assert.isTrue(updateTransaction.txID && updateTransaction.txID.length === 64);

            // broadcast update transaction
            const signedUpdateTransaction = await tronWeb.trx.sign(updateTransaction, ownerPk, null, false);
            await tronWeb.trx.broadcast(signedUpdateTransaction);

            await wait(3);
        });

        it('should multi-sign a transaction by owner permission', async function () {

            const transaction = await tronWeb.transactionBuilder.freezeBalance(10e6, 3, 'BANDWIDTH', accounts.b58[12]);
            let signedTransaction = await tronWeb.trx.multiSign(transaction, accounts.pks[12], 0);
            signedTransaction = await tronWeb.trx.multiSign(signedTransaction, accounts.pks[13], 0);
            signedTransaction = await tronWeb.trx.multiSign(signedTransaction, accounts.pks[14], 0);
            assert.equal(signedTransaction.signature.length, 3);

            // broadcast multi-sign transaction
            const result = await tronWeb.trx.broadcast(signedTransaction);
            assert.isTrue(result.result);

        });

        it('should verify weight after multi-sign by owner permission', async function () {

            // create transaction and do multi-sign
            const transaction = await tronWeb.transactionBuilder.sendTrx(accounts.hex[13], 10e6, accounts.hex[12]);

            // sign and verify sign weight
            let signedTransaction = transaction;
            let signWeight;
            for (let i = 12; i < 15; i++) {
                signedTransaction = await tronWeb.trx.multiSign(signedTransaction, accounts.pks[i], 0);
                signWeight = await tronWeb.trx.getSignWeight(signedTransaction);
                if (i < 14) {
                    assert.equal(signWeight.result.code, 'NOT_ENOUGH_PERMISSION');
                }
                assert.equal(signWeight.approved_list.length, i - 12 + 1);
            }

            // get approved list
            const approvedList = await tronWeb.trx.getApprovedList(signedTransaction);
            assert.isTrue(approvedList.approved_list.length === threshold);

            // broadcast multi-sign transaction
            const result = await tronWeb.trx.broadcast(signedTransaction);
            assert.isTrue(result.result);

        });

        it('should multi-sign a transaction with no permission error by owner permission', async function () {

            const transaction = await tronWeb.transactionBuilder.freezeBalance(10e6, 3, 'BANDWIDTH', accounts.b58[12])
            try {
                await tronWeb.trx.multiSign(transaction, (accounts.pks[12] + '123'), 0);
            } catch (e) {
                assert.isTrue(e.indexOf('has no permission to sign') != -1);
            }

        });

        it('should multi-sign duplicated a transaction by owner permission', async function () {

            const transaction = await tronWeb.transactionBuilder.sendTrx(accounts.hex[13], 10e6, accounts.hex[12]);
            try {
                let signedTransaction = await tronWeb.trx.multiSign(transaction, accounts.pks[12], 0);
                await tronWeb.trx.multiSign(signedTransaction, accounts.pks[12], 0);
            } catch (e) {
                assert.isTrue(e.indexOf('already sign transaction') != -1);
            }

        });

        it('should multi-sign a transaction by active permission', async function () {

            const transaction = await tronWeb.transactionBuilder.sendTrx(accounts.hex[13], 10e6, accounts.hex[12]);
            let signedTransaction = await tronWeb.trx.multiSign(transaction, accounts.pks[12], 2);
            signedTransaction = await tronWeb.trx.multiSign(signedTransaction, accounts.pks[13], 2);
            signedTransaction = await tronWeb.trx.multiSign(signedTransaction, accounts.pks[14], 2);

            assert.equal(signedTransaction.signature.length, 3);

            // broadcast multi-sign transaction
            const result = await tronWeb.trx.broadcast(signedTransaction);
            assert.isTrue(result.result);

        });

        it('should verify weight after multi-sign by active permission', async function () {

            // create transaction and do multi-sign
            const transaction = await tronWeb.transactionBuilder.sendTrx(accounts.hex[13], 10e6, accounts.hex[12]);

            // sign and verify sign weight
            let signedTransaction = transaction;
            let signWeight;
            for (let i = 12; i < 15; i++) {
                signedTransaction = await tronWeb.trx.multiSign(signedTransaction, accounts.pks[i], 2);
                signWeight = await tronWeb.trx.getSignWeight(signedTransaction, 2);
                if (i < 14) {
                    assert.equal(signWeight.result.code, 'NOT_ENOUGH_PERMISSION');
                }
                assert.equal(signWeight.approved_list.length, i - 12 + 1);
            }

            // get approved list
            const approvedList = await tronWeb.trx.getApprovedList(signedTransaction);
            assert.isTrue(approvedList.approved_list.length === threshold);

            // broadcast multi-sign transaction
            const result = await tronWeb.trx.broadcast(signedTransaction);
            assert.isTrue(result.result);

        });

        it('should multi-sign a transaction with no permission error by active permission', async function () {

            const transaction = await tronWeb.transactionBuilder.sendTrx(accounts.hex[13], 10e6, accounts.hex[12]);
            try {
                await tronWeb.trx.multiSign(transaction, (accounts.pks[12] + '123'), 2);
            } catch (e) {
                assert.isTrue(e.indexOf('has no permission to sign') != -1);
            }

        });

        it('should multi-sign duplicated a transaction by active permission', async function () {

            const transaction = await tronWeb.transactionBuilder.sendTrx(accounts.hex[13], 10e6, accounts.hex[12]);
            try {
                let signedTransaction = await tronWeb.trx.multiSign(transaction, accounts.pks[12], 2);
                await tronWeb.trx.multiSign(signedTransaction, accounts.pks[12], 2);
            } catch (e) {
                assert.isTrue(e.indexOf('already sign transaction') != -1);
            }

        });

        it('should multi-sign a transaction with permission error by both owner and active permission', async function () {

            try {
                const transaction = await tronWeb.transactionBuilder.sendTrx(accounts.hex[13], 10e6, accounts.hex[12]);
                let signedTransaction = await tronWeb.trx.multiSign(transaction, accounts.pks[12], 0);
                await tronWeb.trx.multiSign(signedTransaction, accounts.pks[12], 2);
            } catch (e) {
                assert.isTrue(e.indexOf('not contained of permission') != -1);
            }

        });

        it('should multi-sign a transaction with wrong permission id error', async function () {

            try {
                const transaction = await tronWeb.transactionBuilder.sendTrx(accounts.hex[13], 10e6, accounts.hex[12]);
                await tronWeb.trx.multiSign(transaction, accounts.pks[12], 1);
            } catch (e) {
                assert.isTrue(e.indexOf('permission isn\'t exit') != -1);
            }

        });

    });


    // Block Test

    describe("#getBlock", async function () {

        it('should get earliest or latest block', async function () {
            let earliestParentHash = '957dc2d350daecc7bb6a38f3938ebde0a0c1cedafe15f0edae4256a2907449f6';
            const blockType = ['earliest', 'latest'];
            let block;
            for (let type of blockType) {
                block = await tronWeb.trx.getBlock(type);
                if (type === 'earliest') {
                    assert.equal(earliestParentHash, block.block_header.raw_data.parentHash);
                }
                if (type === 'latest') {
                    assert.isNumber(block.block_header.raw_data.number);
                }
            }
        });

        it('should throw no block identifier provided error', async function () {
            await assertThrow(
                tronWeb.trx.getBlock(false),
                'No block identifier provided'
            );
        });

        it('should throw block not found error', async function () {
            await assertThrow(
                tronWeb.trx.getBlock(10e10),
                'Block not found'
            );
        });

        it('should throw invalid block number provided error', async function () {
            await assertThrow(
                tronWeb.trx.getBlock(-1),
                'Invalid block number provided'
            );
        });

    });


    describe("#getBlockByHash", async function () {

        it('should get block by block hash (id)', async function () {
            const block = await tronWeb.trx.getBlock('latest');
            const blockByHash = await tronWeb.trx.getBlockByHash(block.blockID);
            assert.equal(block.blockID, blockByHash.blockID);
        });

    });


    describe("#getBlockByNumber", async function () {

        it('should get block by block number', async function () {
            const block = await tronWeb.trx.getBlock('latest');
            const blockByNumber = await tronWeb.trx.getBlockByNumber(block.block_header.raw_data.number);
            assert.equal(block.blockID, blockByNumber.blockID);
        });

    });


    describe("#getBlockRange", async function () {

        it('should get block by range', async function () {
            const blocks = await tronWeb.trx.getBlockRange(0, 5);
            assert.equal(blocks.length, 6);
        });

        it('should get invalid start or end error by range', async function () {
            const ranges = [[-1, 5, 'start'], [1, -5, 'end']];
            for (let range of ranges) {
                await assertThrow(
                    tronWeb.trx.getBlockRange(range[0], range[1]),
                    `Invalid ${range[2]} of range provided`
                );
            }
        });

    });


    describe("#getBlockTransactionCount", async function () {

        it('should get transaction count by block number, \'latest\' or \'earliest\'', async function () {
            const blockType = [1, 'latest', 'earliest'];
            for (let type of blockType) {
                const count = await tronWeb.trx.getBlockTransactionCount(type);
                assert.isNumber(count);
            }
        });

    });


    describe("#getCurrentBlock", async function () {

        it('should get current block', async function () {
            const block = await tronWeb.trx.getCurrentBlock();
            assert.isNumber(block.block_header.raw_data.number);
        });

    });


    // Transaction Test (15 - 16)

    describe("#send", async function () {

        it('should send trx', async function () {
            const balanceBefore = await tronWeb.trx.getUnconfirmedBalance(accounts.hex[16]);
            await tronWeb.trx.send(accounts.hex[16], 10e6, { privateKey: accounts.pks[15], address: accounts.hex[15] });
            const balanceAfter = await tronWeb.trx.getUnconfirmedBalance(accounts.hex[16]);
            assert.equal(balanceAfter - balanceBefore, 10e6);
        });

        it('should throw invalid recipient provided error', async function () {
            await assertThrow(
                tronWeb.trx.send('notValidAddress', 10e6, { privateKey: accounts.pks[15] }),
                'Invalid recipient provided'
            );
        });

        it('should throw invalid amount provided error', async function () {
            await assertThrow(
                tronWeb.trx.send(accounts.hex[12], -1, { privateKey: accounts.pks[15] }),
                'Invalid amount provided'
            );
        });

    });


    describe("#sendTransaction", async function () {

        it('should send trx', async function () {
            const balanceBefore = await tronWeb.trx.getUnconfirmedBalance(accounts.hex[16]);
            await tronWeb.trx.sendTransaction(accounts.hex[16], 10e6, { privateKey: accounts.pks[15] });
            const balanceAfter = await tronWeb.trx.getUnconfirmedBalance(accounts.hex[16]);
            assert.equal(balanceAfter - balanceBefore, 10e6);
        });

        it('should throw invalid recipient provided error', async function () {
            await assertThrow(
                tronWeb.trx.sendTransaction('notValidAddress', 10e6, { privateKey: accounts.pks[15] }),
                'Invalid recipient provided'
            );
        });

        it('should throw invalid amount provided error', async function () {
            await assertThrow(
                tronWeb.trx.sendTransaction(accounts.hex[11], -1, { privateKey: accounts.pks[15] }),
                'Invalid amount provided'
            );
        });

    });


    describe("#sendTrx", async function () {

        it('should send trx', async function () {
            const balanceBefore = await tronWeb.trx.getUnconfirmedBalance(accounts.hex[16]);
            await tronWeb.trx.sendTrx(accounts.hex[16], 10e6, { privateKey: accounts.pks[15], address: accounts.hex[15] });
            const balanceAfter = await tronWeb.trx.getUnconfirmedBalance(accounts.hex[16]);
            assert.equal(balanceAfter - balanceBefore, 10e6);
        });

        it('should throw invalid recipient provided error', async function () {
            await assertThrow(
                tronWeb.trx.sendTrx('notValidAddress', 10e6, { privateKey: accounts.pks[15] }),
                'Invalid recipient provided'
            );
        });

        it('should throw invalid amount provided error', async function () {
            await assertThrow(
                tronWeb.trx.sendTrx(accounts.hex[12], -1, { privateKey: accounts.pks[15] }),
                'Invalid amount provided'
            );
        });

    });


    describe("#freezeBalance", async function () {

        it('should freeze balance for energy or bandwidth', async function () {
            let accountBefore = await tronWeb.trx.getAccount(ADDRESS_HEX);
            await tronWeb.trx.freezeBalance(10e6, 3, 'BANDWIDTH', {}, accounts.b58[15]);
            let accountAfter = await tronWeb.trx.getUnconfirmedAccount(ADDRESS_HEX);
            assert.equal((!accountBefore.frozen ? 0: accountBefore.frozen[0].frozen_balance) + 10e6, accountAfter.frozen[0].frozen_balance);

            accountBefore = accountAfter;
            await tronWeb.trx.freezeBalance(10e6, 3, 'ENERGY', {}, accounts.b58[15]);
            accountAfter = await tronWeb.trx.getUnconfirmedAccount(ADDRESS_HEX);
            assert.equal(
                (Object.keys(accountBefore.account_resource).length === 0
                    ? 0
                    : accountBefore.account_resource.frozen_balance_for_energy.frozen_balance) + 10e6,
                accountAfter.account_resource.frozen_balance_for_energy.frozen_balance
            );
        });

        it('should throw invalid resource provided: expected "BANDWIDTH" or "ENERGY" error', async function () {
            await assertThrow(
                tronWeb.trx.freezeBalance(10e8, 3, 'GAS', {}, accounts.b58[15]),
                'Invalid resource provided: Expected "BANDWIDTH" or "ENERGY"'
            );
        });

        it('should throw invalid amount provided error', async function () {
            await assertThrow(
                tronWeb.trx.freezeBalance(-10, 3, 'BANDWIDTH', {}, accounts.b58[15]),
                'Invalid amount provided'
            );
        });

        it('should throw invalid duration provided, minimum of 3 days error', async function () {
            await assertThrow(
                tronWeb.trx.freezeBalance(10e8, 2, 'BANDWIDTH', {}, accounts.b58[15]),
                'Invalid duration provided, minimum of 3 days'
            );
        });
    });


    // skip since duration too long
    describe.skip("#unfreezeBalance", async function () {

        before(async function(){
            await tronWeb.trx.freezeBalance(10e6, 3, 'BANDWIDTH', {}, accounts.b58[15]);
            await tronWeb.trx.freezeBalance(10e6, 3, 'ENERGY', {}, accounts.b58[15]);
        });

        it('should unfreeze balance', async function () {
            let accountBefore = await tronWeb.trx.getUnconfirmedAccount(ADDRESS_HEX);
            await tronWeb.trx.unfreezeBalance('BANDWIDTH', {}, accounts.b58[15]);
            let accountAfter = await tronWeb.trx.getUnconfirmedAccount(ADDRESS_HEX);
            assert.equal(accountBefore.frozen[0].frozen_balance - 10e6, accountAfter.frozen[0].frozen_balance);

            accountBefore = accountAfter;
            await tronWeb.trx.unfreezeBalance('ENERGY', {}, accounts.b58[15]);
            accountAfter = await tronWeb.trx.getUnconfirmedAccount(ADDRESS_HEX);
            assert.equal(
                accountBefore.account_resource.frozen_balance_for_energy.frozen_balance - 10e6,
                accountAfter.account_resource.frozen_balance_for_energy.frozen_balance
            );
        });

        it('should throw invalid resource provided: expected "BANDWIDTH" or "ENERGY" error', async function () {
            await assertThrow(
                tronWeb.trx.unfreezeBalance(10e8, 3, 'GAS', {}, accounts.b58[15]),
                'Invalid resource provided: Expected "BANDWIDTH" or "ENERGY"'
            );
        });

    });


    describe("#broadcast", async function () {

        let transaction;
        let signedTransaction;

        before(async function () {
            transaction = await tronWeb.transactionBuilder.freezeBalance(10e6, 3, 'BANDWIDTH', accounts.b58[15]);
            signedTransaction = await tronWeb.trx.sign(transaction, accounts.pks[15]);
        });

        it('should broadcast a transaction', async function () {
            this.timeout(20000);
            const result = await tronWeb.trx.broadcast(signedTransaction);
            assert.isTrue(result.result);
            assert.equal(result.transaction.signature[0], signedTransaction.signature[0]);
        });

        it('should throw invalid transaction provided error', async function () {
            await assertThrow(
                tronWeb.trx.broadcast(false),
                'Invalid transaction provided'
            );
        });

        it('should throw invalid options provided error', async function () {
            await assertThrow(
                tronWeb.trx.broadcast(signedTransaction, false),
                'Invalid options provided'
            );
        });

        it('should throw transaction is not signed error', async function () {
            await assertThrow(
                tronWeb.trx.broadcast(transaction),
                'Transaction is not signed'
            );
        });
    });


    describe("#getTransaction", async function () {

        let transaction;

        before(async function(){
            transaction = await tronWeb.trx.freezeBalance(10e6, 3, 'BANDWIDTH', {}, accounts.b58[15]);
            transaction = transaction.transaction;
        });

        it('should get transaction by id', async function () {
            const tx = await tronWeb.trx.getTransaction(transaction.txID);
            assert.equal(tx.txID, transaction.txID);
        });

        it('should throw transaction not found error', async function () {
            await assertThrow(
                tronWeb.trx.getTransaction('a8813981b1737d9caf7d51b200760a16c9cdbc826fa8de102386af898048cbe5'),
                'Transaction not found'
            );
        });

    });


    describe("#getTransactionFromBlock", async function () {

        let transaction;
        let currBlockNum;

        before(async function(){
            this.timeout(10000);
            // await wait(5); // wait for new clear block generated
            transaction = await tronWeb.trx.freezeBalance(10e6, 3, 'BANDWIDTH', {}, accounts.b58[15]);
            transaction = transaction.transaction;
            const currBlock = await tronWeb.trx.getBlock('latest');
            currBlockNum = currBlock.block_header.raw_data.number;
        });

        it('should get transaction from block', async function () {
            this.timeout(10000);
            for (let i = currBlockNum; i < currBlockNum + 3;) {
                try {
                    const tx = await tronWeb.trx.getTransactionFromBlock(i, 0);
                    // assert.equal(tx.txID, transaction.txID);
                    assert.isDefined(tx.txID);
                    break;
                } catch (e) {
                    if (e === 'Transaction not found in block') {
                        i++;
                        continue;
                    } else if (e === 'Block not found') {
                        await wait(3);
                        continue;
                    } else {
                        throw new Error(e);
                        break;
                    }
                }
            }
        });

        it('should throw transaction not found error by transaction from block', async function () {
            await assertThrow(
                tronWeb.trx.getTransactionFromBlock(currBlockNum - 1, 0),
                'Transaction not found in block'
            );
        });

        it('should throw block not found error by transaction from block', async function () {
            await assertThrow(
                tronWeb.trx.getTransactionFromBlock(currBlockNum + 50, 0),
                'Block not found'
            );
        });

        it('should throw invalid index error by transaction from block', async function () {
            await assertThrow(
                tronWeb.trx.getTransactionFromBlock(currBlockNum, -1),
                'Invalid transaction index provided'
            );
        });

    });


    describe("#getTransactionInfo", async function () {

        let transaction;

        before(async function(){
            transaction = await tronWeb.trx.freezeBalance(10e6, 3, 'BANDWIDTH', {}, accounts.b58[15]);
            transaction = transaction.transaction;
        });

        it('should get transaction info by id', async function () {
            this.timeout(20000);
            while (true) {
                const tx = await tronWeb.trx.getTransactionInfo(transaction.txID);
                if (Object.keys(tx).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    assert.equal(tx.id, transaction.txID);
                    break;
                }
            }
        });

    });


    describe("#getConfirmedTransaction", async function () {

        let transaction;

        before(async function(){
            transaction = await tronWeb.trx.freezeBalance(10e6, 3, 'BANDWIDTH', {}, accounts.b58[15]);
        });

        it('should get confirmed transaction by tx id', async function () {
            this.timeout(20000);
            while (true) {
                try {
                    const tx = await tronWeb.trx.getConfirmedTransaction(transaction.transaction.txID);
                    assert.equal(tx.txID, transaction.transaction.txID);
                    break;
                } catch (e) {
                    if (e === 'Transaction not found') {
                        await wait(3);
                        continue;
                    } else {
                        throw new Error(e);
                        break;
                    }
                }
            }
        });

    });


    // Token Test (10 - 19)

    describe("#sendAsset", async function () {

        before(async function(){
            // create token for 10
            const options = getTokenOptions();
            await broadcaster(await tronWeb.transactionBuilder.createToken(options, accounts.hex[10]), accounts.pks[10]);
        });

        it('should send trx by to address and verify account balance', async function () {
            const token = await tronWeb.trx.getTokensIssuedByAddress(accounts.hex[10]);

            const assetBefore = (await tronWeb.trx.getUnconfirmedAccount(accounts.hex[11])).asset;
            // transfer from account 10 to 11
            await tronWeb.trx.sendAsset(
                accounts.hex[11],
                10e4,
                token[Object.keys(token)[0]]['name'],
                { privateKey: accounts.pks[10] }
            );
            const assetAfter = (await tronWeb.trx.getUnconfirmedAccount(accounts.hex[11])).asset;

            assert.equal(!assetBefore ? 0 : assetBefore[0].value, assetAfter[0].value - 10e4);
        });

        it('should throw invalid recipient provided error', async function () {
            const token = await tronWeb.trx.getTokensIssuedByAddress(accounts.hex[10]);
            await assertThrow(
                tronWeb.trx.sendAsset(
                    'notValidAddress',
                    10e4,
                    token[Object.keys(token)[0]]['name'],
                    { privateKey: accounts.pks[10] }
                ),
                'Invalid recipient provided'
            );
        });

        it('should throw invalid amount provided error', async function () {
            const token = await tronWeb.trx.getTokensIssuedByAddress(accounts.hex[10]);
            await assertThrow(
                tronWeb.trx.sendAsset(
                    accounts.hex[11],
                    -10,
                    token[Object.keys(token)[0]]['name'],
                    { privateKey: accounts.pks[10] }
                ),
                'Invalid amount provided'
            );
        });

        it('should throw invalid token ID provided error', async function () {
            const token = await tronWeb.trx.getTokensIssuedByAddress(accounts.hex[10]);
            await assertThrow(
                tronWeb.trx.sendAsset(
                    accounts.hex[11],
                    10e4,
                    {},
                    { privateKey: accounts.pks[10] }
                ),
                'Invalid token ID provided'
            );
        });

        it('should throw cannot transfer tokens to the same account provided error', async function () {
            const token = await tronWeb.trx.getTokensIssuedByAddress(accounts.hex[10]);
            await assertThrow(
                tronWeb.trx.sendAsset(
                    accounts.hex[10],
                    10e4,
                    token[Object.keys(token)[0]]['name'],
                    { privateKey: accounts.pks[10] }
                ),
                'Cannot transfer tokens to the same account'
            );
        });

    });


    describe("#sendToken", async function () {

        before(async function(){
            // create token for 11
            const options = getTokenOptions();
            await broadcaster(await tronWeb.transactionBuilder.createToken(options, accounts.hex[11]), accounts.pks[11]);
        });

        it('should send trx by to address and verify account balance', async function () {
            const token = await tronWeb.trx.getTokensIssuedByAddress(accounts.hex[11]);

            const assetBefore = (await tronWeb.trx.getUnconfirmedAccount(accounts.hex[12])).asset;
            // transfer from account 10 to 11
            await tronWeb.trx.sendToken(
                accounts.hex[12],
                10e4,
                token[Object.keys(token)[0]]['name'],
                { privateKey: accounts.pks[11] }
            );
            const assetAfter = (await tronWeb.trx.getUnconfirmedAccount(accounts.hex[12])).asset;

            assert.equal(!assetBefore ? 0 : assetBefore[0].value, assetAfter[0].value - 10e4);
        });

        it('should throw invalid recipient provided error', async function () {
            const token = await tronWeb.trx.getTokensIssuedByAddress(accounts.hex[11]);
            await assertThrow(
                tronWeb.trx.sendToken(
                    'notValidAddress',
                    10e4,
                    token[Object.keys(token)[0]]['name'],
                    { privateKey: accounts.pks[11] }
                ),
                'Invalid recipient provided'
            );
        });

        it('should throw invalid amount provided error', async function () {
            const token = await tronWeb.trx.getTokensIssuedByAddress(accounts.hex[11]);
            await assertThrow(
                tronWeb.trx.sendToken(
                    accounts.hex[10],
                    -10,
                    token[Object.keys(token)[0]]['name'],
                    { privateKey: accounts.pks[11] }
                ),
                'Invalid amount provided'
            );
        });

        it('should throw invalid token ID provided error', async function () {
            const token = await tronWeb.trx.getTokensIssuedByAddress(accounts.hex[11]);
            await assertThrow(
                tronWeb.trx.sendAsset(
                    accounts.hex[10],
                    10e4,
                    {},
                    { privateKey: accounts.pks[11] }
                ),
                'Invalid token ID provided'
            );
        });

        it('should throw cannot transfer tokens to the same account provided error', async function () {
            const token = await tronWeb.trx.getTokensIssuedByAddress(accounts.hex[11]);
            await assertThrow(
                tronWeb.trx.sendAsset(
                    accounts.hex[11],
                    10e4,
                    token[Object.keys(token)[0]]['name'],
                    { privateKey: accounts.pks[11] }
                ),
                'Cannot transfer tokens to the same account'
            );
        });

    });


    describe("#getTokenFromID", async function () {

        before(async function(){
            const options = getTokenOptions();
            await broadcaster(await tronWeb.transactionBuilder.createToken(options, accounts.hex[12]), accounts.pks[12]);
        });

        it('should get token by name', async function () {
            const tokens = await tronWeb.trx.listTokens(5, 0);
            for (let token of tokens) {
                const tk = await tronWeb.trx.getTokenFromID(token.name);
                assert.equal(tk.id, token.id);
            }
        });

        it('should throw invalid token ID provided error', async function () {
            await assertThrow(
                tronWeb.trx.getTokenFromID({}),
                'Invalid token ID provided'
            );
        });

        it('should throw token does not exist error', async function () {
            await assertThrow(
                tronWeb.trx.getTokenFromID(1234565),
                'Token does not exist'
            );
        });

    });


    describe("#getTokensIssuedByAddress", async function () {

        before(async function(){
            const options = getTokenOptions();
            await broadcaster(await tronWeb.transactionBuilder.createToken(options, accounts.hex[13]), accounts.pks[13]);
        });

        it('should get token by issued address', async function () {
            const tokens = await tronWeb.trx.listTokens(5, 0);
            for (let token of tokens) {
                const tk = await tronWeb.trx.getTokensIssuedByAddress(token.owner_address);
                assert.equal(tk[Object.keys(tk)[0]]['id'], token.id);
            }
        });

        it('should throw invalid address provided error', async function () {
            await assertThrow(
                tronWeb.trx.getTokensIssuedByAddress('abcdefghijklmn'),
                'Invalid address provided'
            );
        });

    });


    describe("#listTokens", async function () {

        it('should list all tokens by limit', async function () {
            const tokens = await tronWeb.trx.listTokens(10, 0);
            assert.isArray(tokens);
            for (let token of tokens) {
                assert.isDefined(token.id);
            }
        });

        it('should throw invalid limit provided error', async function () {
            await assertThrow(
                tronWeb.trx.listTokens(-1, 0),
                'Invalid limit provided'
            );
        });

        it('should throw invalid offset provided error', async function () {
            await assertThrow(
                tronWeb.trx.listTokens(5, -1),
                'Invalid offset provided'
            );
        });

    });


    describe("#parseToken", async function () {

        it('should list all tokens by limit', async function () {
            const tokens = await tronWeb.trx.listTokens(10, 0);
            for (let token of tokens) {
                const cloneToken = JSON.parse(JSON.stringify(token));
                token.name = tronWeb.fromUtf8(token.name);
                token.abbr = tronWeb.fromUtf8(token.abbr);
                token.description = token.description && tronWeb.fromUtf8(token.description);
                token.url = tronWeb.fromUtf8(token.url);

                const tk = tronWeb.trx._parseToken(token);
                assert.equal(tk.name, cloneToken.name);
                assert.equal(tk.abbr, cloneToken.abbr);
                assert.equal(tk.description, cloneToken.description);
                assert.equal(tk.url, cloneToken.url);
            }
        });

    });


    // Exchange Test

    describe("#listExchanges", async function () {

        before(async function(){
            let tokenNames = [];

            // create token
            for (let i = 14; i < 16; i++) {
                const options = getTokenOptions();
                await broadcaster(await tronWeb.transactionBuilder.createToken(options, accounts.hex[i]), accounts.pks[i]);
                const token = await tronWeb.trx.getTokensIssuedByAddress(accounts.hex[i]);
                await broadcaster(await tronWeb.transactionBuilder.sendToken(
                    accounts.hex[0],
                    10e4,
                    token[Object.keys(token)[0]]['name'],
                    token[Object.keys(token)[0]]['owner_address']
                ), accounts.pks[i]);
                tokenNames.push(token[Object.keys(token)[0]]['name']);
            }

            await broadcaster(
                await tronWeb.transactionBuilder.createTokenExchange(tokenNames[0], 10e3, tokenNames[1], 10e3, accounts.hex[0]),
                accounts.pks[0]
            );

        });

        it('should get exchange by id', async function () {
            const exchanges = await tronWeb.trx.listExchanges();
            assert.isArray(exchanges);
            for (let exchange of exchanges) {
                assert.isDefined(exchange.exchange_id);
            }
        });

    });


    describe("#listExchangesPaginated", async function () {

        before(async function(){
            let tokenNames = [];

            // create token
            for (let i = 16; i < 18; i++) {
                const options = getTokenOptions();
                await broadcaster(await tronWeb.transactionBuilder.createToken(options, accounts.hex[i]), accounts.pks[i]);
                const token = await tronWeb.trx.getTokensIssuedByAddress(accounts.hex[i]);
                await broadcaster(await tronWeb.transactionBuilder.sendToken(
                    accounts.hex[0],
                    10e4,
                    token[Object.keys(token)[0]]['name'],
                    token[Object.keys(token)[0]]['owner_address']
                ), accounts.pks[i]);
                tokenNames.push(token[Object.keys(token)[0]]['name']);
            }

            await broadcaster(
                await tronWeb.transactionBuilder.createTokenExchange(tokenNames[0], 10e3, tokenNames[1], 10e3, accounts.hex[0]),
                accounts.pks[0]
            );

        });

        it('should get exchange by id', async function () {
            const exchanges = await tronWeb.trx.listExchangesPaginated(10, 0);
            assert.isArray(exchanges);
            assert.isTrue(exchanges.length > 0);
            for (let exchange of exchanges) {
                assert.isDefined(exchange.exchange_id);
            }
        });

    });


    describe("#getExchangeByID", async function () {

        let exchanges;

        before(async function(){
            this.timeout(10000);

            let tokenNames = [];

            // create token
            for (let i = 18; i < 20; i++) {
                const options = getTokenOptions();
                await broadcaster(await tronWeb.transactionBuilder.createToken(options, accounts.hex[i]), accounts.pks[i]);
                await wait(1);
                const token = await tronWeb.trx.getTokensIssuedByAddress(accounts.hex[i]);
                await broadcaster(await tronWeb.transactionBuilder.sendToken(
                    accounts.hex[0],
                    10e4,
                    token[Object.keys(token)[0]]['name'],
                    token[Object.keys(token)[0]]['owner_address']
                ), accounts.pks[i]);
                tokenNames.push(token[Object.keys(token)[0]]['name']);
            }

            await broadcaster(
                await tronWeb.transactionBuilder.createTokenExchange(tokenNames[0], 10e3, tokenNames[1], 10e3, accounts.hex[0]),
                accounts.pks[0]
            );

            exchanges = await tronWeb.trx.listExchanges();
        });

        it('should get exchange by id', async function () {
            for (let exchange of exchanges) {
                const ex = await tronWeb.trx.getExchangeByID(exchange.exchange_id);
                assert.equal(ex.exchange_id, exchange.exchange_id);
            }
        });

    });


    // Proposal Test

    describe("#getChainParameters", async function () {

        it('should get proposal list', async function () {
            const params = await tronWeb.trx.getChainParameters();
            assert.isArray(params);
            assert.isDefined(params[0].key);
        });

    });


    describe("#getProposal", async function () {

        let proposals;

        before(async function(){
            // create proposal
            let parameters = [{"key": 0, "value": 100000}, {"key": 1, "value": 2}]
            await broadcaster(
                await tronWeb.transactionBuilder.createProposal(parameters[0], ADDRESS_BASE58),
                PRIVATE_KEY
            );

            proposals = await tronWeb.trx.listProposals();
        });

        it('should get proposal by id', async function () {
            for (let proposal of proposals) {
                const ps = await tronWeb.trx.getProposal(proposal.proposal_id);
                assert.equal(ps.proposal_id, proposal.proposal_id);
            }
        });

        it('should throw invalid proposalID provided error', async function () {
            await assertThrow(
                tronWeb.trx.getProposal(-1),
                'Invalid proposalID provided'
            );
        });

    });


    describe("#listProposals", async function () {

        before(async function(){
            // create proposal
            for (let i = 0; i < 5; i++) {
                let parameters = [{"key": i + 1, "value": 100000}, {"key": i + 2, "value": 2}]
                await broadcaster(
                    await tronWeb.transactionBuilder.createProposal(parameters[0], ADDRESS_BASE58),
                    PRIVATE_KEY
                );
            }
        });

        it('should list seeds node', async function () {
            const proposals = await tronWeb.trx.listProposals();
            assert.isArray(proposals);
            for (let proposal of proposals) {
                assert.isDefined(proposal.proposal_id);
                assert.isDefined(proposal.proposer_address);
            }
        });

    });


    // Contract Test

    describe("#getContract", async function () {

        let transaction;

        before(async function(){
            transaction = await tronWeb.transactionBuilder.createSmartContract({
                abi: testRevertContract.abi,
                bytecode: testRevertContract.bytecode
            }, accounts.hex[18]);
            await broadcaster(null, accounts.pks[18], transaction);
        });

        it('should get contract by contract address', async function () {
            const contract = await tronWeb.trx.getContract(transaction.contract_address);
            assert.equal(contract.contract_address, transaction.contract_address);
        });

        it('should throw invalid contract address provided error', async function () {
            await assertThrow(
                tronWeb.trx.getContract('notAddress'),
                'Invalid contract address provided'
            );
        });

        it('should throw contract does not exist error', async function () {
            await assertThrow(
                tronWeb.trx.getContract('417cbcc41052b59584d1ac9fc1ce39106533aa1d40'),
                'Contract does not exist'
            );
        });

    });


    // Node Test

    describe("#listNodes", async function () {

        it('should list seeds node', async function () {
            const nodes = await tronWeb.trx.listNodes();
            assert.isArray(nodes);
        });

    });


    // SR Test

    describe("#listSuperRepresentatives", async function () {

        it('should list super representatives', async function () {
            const srs = await tronWeb.trx.listSuperRepresentatives();
            assert.isArray(srs);
            for (let sr of srs) {
                assert.isDefined(sr.address);
                assert.isDefined(sr.voteCount);
                assert.isDefined(sr.latestBlockNum);
            }
        });

    });


    describe("#timeUntilNextVoteCycle", async function () {

        it('should get time util next vote cycle', async function () {
            const num = await tronWeb.trx.timeUntilNextVoteCycle();
            assert.isNumber(num);
        });

    });


});
