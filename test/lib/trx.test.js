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

        it('should sign a transaction', async function () {

            const transaction = await tronWeb.transactionBuilder.freezeBalance(100e6, 3, 'BANDWIDTH', accounts.b58[1])
            let signedTransaction = await tronWeb.trx.sign(transaction, accounts.pks[1]);


            signedTransaction = await tronWeb.trx.sign(signedTransaction, accounts.pks[2], null, true)

            assert.equal(signedTransaction.signature.length, 2)

        })

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
