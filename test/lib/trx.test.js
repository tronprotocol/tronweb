const chai = require('chai');
const assert = chai.assert;
const txPars = require('../helpers/txPars');
const jlog = require('../helpers/jlog');
const ethUtil = require('eth-sig-util');
const assertThrow = require('../helpers/assertThrow');
const wait = require('../helpers/wait');
const broadcaster = require('../helpers/broadcaster');
const pollAccountFor = require('../helpers/pollAccountFor');
const _ = require('lodash');
const tronWebBuilder = require('../helpers/tronWebBuilder');
const assertEqualHex = require('../helpers/assertEqualHex');
const TronWeb = tronWebBuilder.TronWeb;
const config = require('../helpers/config');
const {ADDRESS_HEX, ADDRESS_BASE58, UPDATED_TEST_TOKEN_OPTIONS, PRIVATE_KEY} = config;

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

    describe('#constructor()', function () {

        it('should have been set a full instance in tronWeb', function () {

            assert.instanceOf(tronWeb.trx, TronWeb.Trx);
        });

    });

    describe("#multiSignTransaction", async function () {

        const threshold = 3;

        before(async function() {
            // update account permission
            let ownerAddress = accounts.hex[0];
            let ownerPk = accounts.pks[0];
            let ownerPermission = { type: 0, permission_name: 'owner' };
            ownerPermission.threshold = threshold;
            ownerPermission.keys  = [];
            let activePermission = { type: 2, permission_name: 'active0' };
            activePermission.threshold = threshold;
            activePermission.operations = '7fff1fc0037e0000000000000000000000000000000000000000000000000000';
            activePermission.keys = [];

            for (let i = 0; i < 5; i++) {
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
            await tronWeb.trx.broadcast(signedUpdateTransaction)
        });

        it('should multi-sign a transaction by owner permission', async function () {

            const transaction = await tronWeb.transactionBuilder.freezeBalance(100e6, 3, 'BANDWIDTH', accounts.b58[0])
            let signedTransaction = await tronWeb.trx.multiSign(transaction, accounts.pks[0], 0);
            signedTransaction = await tronWeb.trx.multiSign(signedTransaction, accounts.pks[1], 0);
            signedTransaction = await tronWeb.trx.multiSign(signedTransaction, accounts.pks[2], 0);
            assert.equal(signedTransaction.signature.length, 3);

            // broadcast multi-sign transaction
            const result = await tronWeb.trx.broadcast(signedTransaction);
            assert.isTrue(result.result);

        });

        it('should verify weight after multi-sign by owner permission', async function () {

            // create transaction and do multi-sign
            const transaction = await tronWeb.transactionBuilder.sendTrx(accounts.hex[1], 10e8, accounts.hex[0]);

            // sign and verify sign weight
            let signedTransaction, signWeight;
            for (let i = 0; i < threshold; i++) {
                signedTransaction = await tronWeb.trx.multiSign(transaction, accounts.pks[i], 0);
                signWeight = await tronWeb.trx.getSignWeight(signedTransaction);
                if (i == threshold - 1) {
                    assert.equal(signWeight.approved_list.length, threshold);
                } else {
                    assert.equal(signWeight.approved_list.length, i + 1);
                    assert.equal(signWeight.result.code, 'NOT_ENOUGH_PERMISSION');
                }
            }

            // get approved list
            const approvedList = await tronWeb.trx.getApprovedList(transaction);
            assert.isTrue(approvedList.approved_list.length === threshold);

            // broadcast multi-sign transaction
            const result = await tronWeb.trx.broadcast(signedTransaction);
            assert.isTrue(result.result);

        });

        it('should multi-sign a transaction with no permission error by owner permission', async function () {

            const transaction = await tronWeb.transactionBuilder.freezeBalance(100e6, 3, 'BANDWIDTH', accounts.b58[0])
            try {
                await tronWeb.trx.multiSign(transaction, (accounts.pks[0] + '123'), 0);
            } catch (e) {
                assert.isTrue(e.indexOf('has no permission to sign') != -1);
            }

        });

        it('should multi-sign duplicated a transaction by owner permission', async function () {

            const transaction = await tronWeb.transactionBuilder.sendTrx(accounts.hex[1], 10e8, accounts.hex[0]);
            try {
                let signedTransaction = await tronWeb.trx.multiSign(transaction, accounts.pks[0], 0);
                await tronWeb.trx.multiSign(signedTransaction, accounts.pks[0], 0);
            } catch (e) {
                assert.isTrue(e.indexOf('already sign transaction') != -1);
            }

        });

        it('should multi-sign a transaction by active permission', async function () {

            const transaction = await tronWeb.transactionBuilder.sendTrx(accounts.hex[1], 10e8, accounts.hex[0]);
            let signedTransaction = await tronWeb.trx.multiSign(transaction, accounts.pks[0], 2);
            signedTransaction = await tronWeb.trx.multiSign(signedTransaction, accounts.pks[1], 2);
            signedTransaction = await tronWeb.trx.multiSign(signedTransaction, accounts.pks[2], 2);
            assert.equal(signedTransaction.signature.length, 3);

            // broadcast multi-sign transaction
            const result = await tronWeb.trx.broadcast(signedTransaction);
            assert.isTrue(result.result);

        });

        it('should verify weight after multi-sign by active permission', async function () {

            // create transaction and do multi-sign
            const transaction = await tronWeb.transactionBuilder.sendTrx(accounts.hex[1], 10e8, accounts.hex[0]);

            // sign and verify sign weight
            let signedTransaction, signWeight;
            for (let i = 0; i < threshold; i++) {
                signedTransaction = await tronWeb.trx.multiSign(transaction, accounts.pks[i], 2);
                signWeight = await tronWeb.trx.getSignWeight(signedTransaction);
                if (i == threshold - 1) {
                    assert.equal(signWeight.approved_list.length, threshold);
                } else {
                    assert.equal(signWeight.approved_list.length, i + 1);
                    assert.equal(signWeight.result.code, 'NOT_ENOUGH_PERMISSION');
                }
            }

            // get approved list
            const approvedList = await tronWeb.trx.getApprovedList(transaction);
            assert.isTrue(approvedList.approved_list.length === threshold);

            // broadcast multi-sign transaction
            const result = await tronWeb.trx.broadcast(signedTransaction);
            assert.isTrue(result.result);

        });

        it('should multi-sign a transaction with no permission error by active permission', async function () {

            const transaction = await tronWeb.transactionBuilder.sendTrx(accounts.hex[1], 10e8, accounts.hex[0]);
            try {
                await tronWeb.trx.multiSign(transaction, (accounts.pks[0] + '123'), 2);
            } catch (e) {
                assert.isTrue(e.indexOf('has no permission to sign') != -1);
            }

        });

        it('should multi-sign duplicated a transaction by active permission', async function () {

            const transaction = await tronWeb.transactionBuilder.sendTrx(accounts.hex[1], 10e8, accounts.hex[0]);
            try {
                let signedTransaction = await tronWeb.trx.multiSign(transaction, accounts.pks[0], 2);
                await tronWeb.trx.multiSign(signedTransaction, accounts.pks[0], 2);
            } catch (e) {
                assert.isTrue(e.indexOf('already sign transaction') != -1);
            }

        });

        it('should multi-sign a transaction with permission error by both owner and active permission', async function () {

            try {
                const transaction = await tronWeb.transactionBuilder.sendTrx(accounts.hex[1], 10e8, accounts.hex[0]);
                let signedTransaction = await tronWeb.trx.multiSign(transaction, accounts.pks[0], 0);
                await tronWeb.trx.multiSign(signedTransaction, accounts.pks[0], 2);
            } catch (e) {
                assert.isTrue(e.indexOf('not contained of permission') != -1);
            }

        });

        it('should multi-sign a transaction with wrong permission id error', async function () {

            try {
                const transaction = await tronWeb.transactionBuilder.sendTrx(accounts.hex[1], 10e8, accounts.hex[0]);
                await tronWeb.trx.multiSign(transaction, accounts.pks[0], 1);
            } catch (e) {
                assert.isTrue(e.indexOf('permission isn\'t exit') != -1);

            }

        });

    });

    describe("#broadcast", async function () {

        let signedTransaction

        before(async function () {
            const transaction = await tronWeb.transactionBuilder.freezeBalance(100e6, 3, 'BANDWIDTH', accounts.b58[2])
            signedTransaction = await tronWeb.trx.sign(transaction, accounts.pks[2]);
        })

        it('should broadcast a transaction', async function () {

            this.timeout(20000)
            const result = await tronWeb.trx.broadcast(signedTransaction)
            assert.equal(result.transaction.signature[0], signedTransaction.signature[0])
        })
    });


    describe("#freezeBalance", async function () {
    });
    describe("#getAccount", async function () {
    });
    describe("#getAccountResources", async function () {
    });
    describe("#getBalance", async function () {
    });
    describe("#getBandwidth", async function () {
    });
    describe("#getBlock", async function () {
    });
    describe("#getBlockByHash", async function () {
    });
    describe("#getBlockByNumber", async function () {
    });
    describe("#getBlockRange", async function () {
    });
    describe("#getBlockTransactionCount", async function () {
    });
    describe("#getChainParameters", async function () {
    });
    describe("#getConfirmedTransaction", async function () {
    });
    describe("#getContract", async function () {
    });
    describe("#getCurrentBlock", async function () {
    });
    describe("#getExchangeByID", async function () {
    });
    describe("#getProposal", async function () {
    });
    describe("#getTokenFromID", async function () {
    });
    describe("#getTokensIssuedByAddress", async function () {
    });
    describe("#getTransaction", async function () {
    });
    describe("#getTransactionFromBlock", async function () {
    });
    describe("#getTransactionInfo", async function () {
    });
    describe("#getTransactionsFromAddress", async function () {
    });
    describe("#getTransactionsRelated", async function () {
    });
    describe("#getTransactionsToAddress", async function () {
    });
    describe("#getUnconfirmedAccount", async function () {
    });
    describe("#getUnconfirmedBalance", async function () {
    });
    describe("#listExchanges", async function () {
    });
    describe("#listExchangesPaginated", async function () {
    });
    describe("#listNodes", async function () {
    });
    describe("#listProposals", async function () {
    });
    describe("#listSuperRepresentatives", async function () {
    });
    describe("#listTokens", async function () {
    });
    describe("#parseToken", async function () {
    });
    describe("#send", async function () {
    });
    describe("#sendAsset", async function () {
    });
    describe("#sendToken", async function () {
    });
    describe("#sendTransaction", async function () {
    });
    describe("#sendTrx", async function () {
    });
    describe("#sign", async function () {
    });
    describe("#signMessage", async function () {
    });
    describe("#timeUntilNextVoteCycle", async function () {
    });
    describe("#unfreezeBalance", async function () {
    });
    describe("#updateAccount", async function () {
    });
    describe("#verifyMessage", async function () {
    });

});
