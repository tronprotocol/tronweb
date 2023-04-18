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
const { testRevert, testConstant, arrayParam, rawParam, funcABIV2, funcABIV2_2, funcABIV2_3, funcABIV2_4, testSetVal } = require('../fixtures/contracts');
const waitChainData = require('../helpers/waitChainData');
const { equals, getValues } = require('../helpers/testUtils');

const TronWeb = tronWebBuilder.TronWeb;
const MTronWeb = tronWebBuilder.mTronWeb;
const {
    ADDRESS_HEX,
    ADDRESS_BASE58,
    UPDATED_TEST_TOKEN_OPTIONS,
    PRIVATE_KEY,
    getTokenOptions,
    isProposalApproved
} = require('../helpers/config');

describe('mTronWeb.transactionBuilder', function () {

    let accounts;
    let tronWeb;
    let emptyAccount;
    let isAllowSameTokenNameApproved

    before(async function () {
        tronWeb = tronWebBuilder.createInstance();
        // ALERT this works only with Tron Quickstart:
        accounts = await tronWebBuilder.getTestAccounts(-1);
        emptyAccount = await TronWeb.createAccount();
        isAllowSameTokenNameApproved = await isProposalApproved(tronWeb, 'getAllowSameTokenName')
    });

    describe("#createSmartContract", async function () {

        it('should create a smart contract contains payInfo with default parameters', async function () {

            const options = {
                abi: testRevert.abi,
                bytecode: testRevert.bytecode,
                feeLimit: 8e7
            };
            for (let i = 0; i < 2; i++) {
                if (i === 1) options.permissionId = 2;
                const tx = await tronWeb.transactionBuilder.createSmartContract(options)
                assert.equal(tx.raw_data.contract[0].parameter.value.new_contract.consume_user_resource_percent, 100);
                assert.equal(tx.raw_data.contract[0].parameter.value.new_contract.origin_energy_limit, 1e7);
                assert.equal(tx.raw_data.fee_limit, 8e7);
                assert.equal(tx.raw_data.contract[0].Permission_id || 0, options.permissionId || 0);
                assert.isObject(tx.payInfo);
                assert.equal(tx.payInfo.abi, testRevert.abi);
            }
        });
    });

    describe("#triggerSmartContractWithRawParam", async function () {

        it('should create or trigger a smart contract with rawParameter', async function () {
            const issuerAddress = accounts.hex[0];
            const issuerPk = accounts.pks[0];
            const transaction = await tronWeb.transactionBuilder.createSmartContract(
                {
                    abi: rawParam.abi,
                    bytecode: rawParam.bytecode,
                    rawParameter:
                        "0x0000000000000000000000000000000000000000000000000000000000000001",
                },
                issuerAddress
            );
            delete transaction.payInfo;
            const receipt = await broadcaster(null, issuerPk, transaction);
            while (true) {
                const tx = await tronWeb.trx.getTransactionInfo(
                    transaction.txID
                );
                if (Object.keys(tx).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }

            const setTransaction = await tronWeb.transactionBuilder.triggerSmartContract(
                transaction.contract_address,
                "setCheck(uint256)",
                {
                    rawParameter:
                        "0x0000000000000000000000000000000000000000000000000000000000000002",
                },
                [],
                issuerAddress
            );
            assert.isObject(setTransaction.transaction.payInfo);
            assert.equal(setTransaction.transaction.payInfo.function_selector, 'setCheck(uint256)');
        });
    });
})