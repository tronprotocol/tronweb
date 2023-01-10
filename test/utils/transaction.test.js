const chai = require('chai');
const tronWebBuilder = require('../helpers/tronWebBuilder');
const TronWeb = tronWebBuilder.TronWeb;
const broadcaster = require('../helpers/broadcaster');
const wait = require('../helpers/wait');
const waitChainData = require('../helpers/waitChainData');
const { testRevert, testConstant } = require('../fixtures/contracts');
const ethers = require('ethers');
const AbiCoder = ethers.utils.AbiCoder;
const assert = chai.assert;

const {
    ADDRESS_BASE58,
    PRIVATE_KEY,
    getTokenOptions,
    isProposalApproved,
    UPDATED_TEST_TOKEN_OPTIONS
} = require('../helpers/config');

describe('TronWeb.utils.transaction', function () {
    let accounts;
    let tronWeb;
    let isAllowSameTokenNameApproved

    before(async function () {
        tronWeb = tronWebBuilder.createInstance();
        // ALERT this works only with Tron Quickstart:
        accounts = await tronWebBuilder.getTestAccounts(-1);
        accounts = {
            b58: accounts.b58.slice(50),
            hex: accounts.hex.slice(50),
            pks: accounts.pks.slice(50),
        }
        isAllowSameTokenNameApproved = await isProposalApproved(tronWeb, 'getAllowSameTokenName')
    });

    describe('#txCheck', function () {

        const commonAssertPb = (transaction) => {
            const transactionPb = TronWeb.utils.transaction.txJsonToPb(transaction);
            const rawDataBytes = transactionPb.getRawData().serializeBinary();
            const txID = TronWeb.utils.ethersUtils.sha256(rawDataBytes);

            assert.equal(txID.replace(/^0x/, ''), transaction.txID);
        };

        describe('#case TransferContract', function () {
            let params
            before(() => {
                params = [
                    [accounts.b58[1], 10, { permissionId: 2 }],
                    [accounts.b58[1], 10]
                ];
            })
            it(`it should return true`, async function () {
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.sendTrx(
                        ...param
                    );
                    const authResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult, true);
                    commonAssertPb(transaction);

                    transaction.raw_data_hex = transaction.raw_data_hex + '00';
                    const authResult2 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult2, false);

                    transaction.txID = transaction.txID + '00';
                    const authResult3 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult3, false);

                    transaction.raw_data.ref_block_bytes = transaction.raw_data.ref_block_bytes + '00';
                    const tampResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(tampResult, false);
                }
            });
        });

        describe('#case TransferAssetContract', function () {

            let tokenOptions
            let tokenID

            before(async function () {

                this.timeout(30000)

                tokenOptions = getTokenOptions();
                await broadcaster(tronWeb.transactionBuilder.sendTrx(accounts.b58[3], 100e6), PRIVATE_KEY);
                await broadcaster(tronWeb.transactionBuilder.createToken(tokenOptions, accounts.b58[3]), accounts.pks[3])

                let tokenList
                await waitChainData('token', accounts.b58[3]);
                tokenList = await tronWeb.trx.getTokensIssuedByAddress(accounts.b58[3]);
                if (isAllowSameTokenNameApproved) {
                    tokenID = tokenList[tokenOptions.name].id
                } else {
                    tokenID = tokenList[tokenOptions.name].name
                }

            });

            it(`it should return true`, async function () {
                const params = [
                    [accounts.b58[1], 5, tokenID, accounts.b58[3], { permissionId: 2 }],
                    [accounts.b58[1], 5, tokenID, accounts.b58[3]]
                ];
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.sendToken(
                        ...param
                    );
                    const authResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult, true);
                    commonAssertPb(transaction);

                    transaction.raw_data_hex = transaction.raw_data_hex + '00';
                    const authResult2 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult2, false);

                    transaction.txID = transaction.txID + '00'
                    const authResult3 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult3, false);

                    transaction.raw_data.ref_block_hash = transaction.raw_data.ref_block_hash + '00';
                    const tampResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(tampResult, false);
                }
            });
        });

        describe('#case ParticipateAssetIssueContract', function () {

            let tokenOptions
            let tokenID

            before(async function () {
                tokenOptions = getTokenOptions();
                tokenOptions.saleEnd += 60 * 60 * 1000;
                await broadcaster(tronWeb.transactionBuilder.createToken(tokenOptions, accounts.b58[2]), accounts.pks[2])
                let tokenList = await tronWeb.trx.getTokensIssuedByAddress(accounts.b58[2])
                if (isAllowSameTokenNameApproved) {
                    tokenID = tokenList[tokenOptions.name].id
                } else {
                    tokenID = tokenList[tokenOptions.name].name
                }
                assert.equal(tokenList[tokenOptions.name].abbr, tokenOptions.abbreviation)
                params = [
                    [accounts.b58[2], tokenID, 20, accounts.b58[0], { permissionId: 2 }],
                    [accounts.b58[2], tokenID, 20, accounts.b58[0]]
                ];

                await wait(4);
            });

            it(`it should return true`, async function () {
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.purchaseToken(
                        ...param
                    );
                    const authResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult, true);
                    commonAssertPb(transaction);

                    transaction.raw_data_hex = transaction.raw_data_hex + '00';
                    const authResult2 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult2, false);

                    transaction.txID = transaction.txID + '00'
                    const authResult3 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult3, false);

                    transaction.raw_data.ref_block_bytes = transaction.raw_data.ref_block_bytes + '00';
                    const tampResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(tampResult, false);
                }
            });
        });

        describe('#case TriggerSmartContract', function () {

            let transaction;
            before(async function () {
                this.timeout(20000);

                transaction = await tronWeb.transactionBuilder.createSmartContract({
                    abi: testConstant.abi,
                    bytecode: testConstant.bytecode
                }, accounts.hex[1]);
                await broadcaster(null, accounts.pks[1], transaction);
                while (true) {
                    const tx = await tronWeb.trx.getTransactionInfo(transaction.txID);
                    if (Object.keys(tx).length === 0) {
                        await wait(3);
                        continue;
                    } else {
                        break;
                    }
                }
            })

            it('should trigger smart contract successfully', async function () {
                this.timeout(20000);

                const contractAddress = transaction.contract_address;
                const issuerAddress = accounts.hex[1];
                let functionSelector = 'testPure(uint256,uint256)';
                const parameter = [
                    { type: 'uint256', value: 1 },
                    { type: 'uint256', value: 2 }
                ]
                const options = {};

                for (let i = 0; i < 2; i++) {
                    if (i === 1) options.permissionId = 2;
                    transaction = await tronWeb.transactionBuilder.triggerSmartContract(
                        contractAddress,
                        functionSelector,
                        options,
                        parameter,
                        issuerAddress,
                    );

                    const authResult =
                        TronWeb.utils.transaction.txCheck(transaction.transaction);
                    assert.equal(authResult, true);
                    commonAssertPb(transaction.transaction);

                    transaction.transaction.raw_data_hex = transaction.transaction.raw_data_hex + '00';
                    const authResult2 =
                        TronWeb.utils.transaction.txCheck(transaction.transaction);
                    assert.equal(authResult2, false);

                    transaction.transaction.txID = transaction.transaction.txID + '00'
                    const authResult3 =
                        TronWeb.utils.transaction.txCheck(transaction.transaction);
                    assert.equal(authResult3, false);

                    transaction.transaction.raw_data.expiration = transaction.transaction.raw_data.expiration + '00';
                    const tampResult =
                        TronWeb.utils.transaction.txCheck(transaction.transaction);
                    assert.equal(tampResult, false);
                }
            });

        });

        describe('#case FreezeBalanceContract', function () {

            it('it should return true', async function () {
                const params = [
                    [100e6, 3, 'BANDWIDTH', accounts.b58[1], { permissionId: 2 }],
                    [100e6, 3, 'BANDWIDTH', accounts.b58[1]]
                ];

                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.freezeBalance(...param);
                    const authResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult, true);
                    commonAssertPb(transaction);

                    transaction.raw_data_hex = transaction.raw_data_hex + '00';
                    const authResult2 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult2, false);

                    transaction.txID = transaction.txID + '00'
                    const authResult3 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult3, false);

                    transaction.raw_data.timestamp = transaction.raw_data.timestamp + '00';
                    const tampResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(tampResult, false);
                }
            })

        });

        describe.skip('#case UnfreezeBalanceContract', function () {
            // this is not fully testable because the minimum time before unfreezing is 3 days
            async function freezeBandWith() {
                const transaction = await tronWeb.transactionBuilder.freezeBalance(100e6, 3, 'BANDWIDTH', accounts.b58[1]);
                await broadcaster(transaction, accounts.pks[1]);
                while (true) {
                    const tx = await tronWeb.trx.getTransactionInfo(transaction.txID);
                    if (Object.keys(tx).length === 0) {
                        await wait(3);
                        continue;
                    } else {
                        break;
                    }
                }
            };

            it('it should return true', async function () {
                const params = [
                    ['BANDWIDTH', accounts.b58[1], { permissionId: 2 }],
                    ['BANDWIDTH', accounts.b58[1]]
                ];

                for (let param of params) {
                    await freezeBandWith();
                    const transaction = await tronWeb.transactionBuilder.unfreezeBalance(...param)
                    const authResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult, true);
                    commonAssertPb(transaction);

                    transaction.raw_data_hex = transaction.raw_data_hex + '00';
                    const authResult2 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult2, false);

                    transaction.txID = transaction.txID + '00'
                    const authResult3 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult3, false);
                }
            })

        });

        describe.skip('#case WithdrawBalanceContract', function () {

            // this is not fully testable because the minimum time before withdrawBlockRewards is 1 days
            // witnessAccount does not have any reward

            before(async () => {
                await broadcaster(tronWeb.transactionBuilder.sendTrx(accounts.b58[1], 10000e6), PRIVATE_KEY);
                const transaction = await tronWeb.transactionBuilder.applyForSR(accounts.b58[1], 'url.tron.network');
                await broadcaster(transaction, accounts.pks[1]);
                while (true) {
                    const tx = await tronWeb.trx.getTransactionInfo(transaction.txID);
                    if (Object.keys(tx).length === 0) {
                        await wait(3);
                        continue;
                    } else {
                        break;
                    }
                }
            });

            it(`it should return true`, async function () {
                const params = [
                    [accounts.b58[1], { permissionId: 2 }],
                    [accounts.b58[1]]
                ];
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.withdrawBlockRewards(
                        ...param
                    );
                    const authResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult, true);
                    commonAssertPb(transaction);

                    transaction.raw_data_hex = transaction.raw_data_hex + '00';
                    const authResult2 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult2, false);

                    transaction.txID = transaction.txID + '00'
                    const authResult3 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult3, false);
                }
            });
        });

        describe('#case FreezeBalanceV2Contract', function () {
            let params = [];

            before(async () => {
                params = [
                    [10e7, 'BANDWIDTH', accounts.b58[1], { permissionId: 2 }],
                    [10e7, 'BANDWIDTH', accounts.b58[1]]
                ];
            });

            it('should return true', async function () {
                for (const param of params) {
                    const transaction = await tronWeb.transactionBuilder.freezeBalanceV2(...param);

                    const authResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult, true);

                    transaction.raw_data_hex = transaction.raw_data_hex + '00';
                    const authResult2 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult2, false);

                    transaction.txID = transaction.txID + '00'
                    const authResult3 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult3, false);
                }
            });
        });

        describe('#case UnfreezeBalanceV2Contract', function () {
            let params = [];

            before(async () => {
                params = [
                    [10e6, 'BANDWIDTH', accounts.b58[1]],
                    [10e6, 'BANDWIDTH', accounts.b58[1], { permissionId: 2 }],
                ];
            });

            it('should return true', async function () {
                for (const param of params) {
                    const freezeTx = await tronWeb.transactionBuilder.freezeBalanceV2(...param);
                    await broadcaster(null, accounts.pks[1], freezeTx);
                    await waitChainData('tx', freezeTx.txID);
                    const transaction = await tronWeb.transactionBuilder.unfreezeBalanceV2(...param);

                    const authResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult, true);
                
                    transaction.raw_data_hex = transaction.raw_data_hex + '00';
                    const authResult2 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult2, false);

                    transaction.txID = transaction.txID + '00'
                    const authResult3 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult3, false);
                }
            });
        });

        describe('#case DelegateResourceContract', function () {
            let params = [];

            before(async () => {
                params = [
                    [10e6, accounts.b58[2], 'BANDWIDTH', accounts.b58[1], false, { permissionId: 2 }],
                    [10e6, accounts.b58[2], 'BANDWIDTH', accounts.b58[1], false]
                ];
                const freezeTx = await tronWeb.transactionBuilder.freezeBalanceV2(10e8, 'BANDWIDTH', accounts.b58[1]);
                await broadcaster(null, accounts.pks[1], freezeTx);
                await waitChainData('tx', freezeTx.txID);
            });

            it('should return true', async function () {
                for (const param of params) {
                    const transaction = await tronWeb.transactionBuilder.delegateResource(...param);

                    const authResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult, true);
                
                    transaction.raw_data_hex = transaction.raw_data_hex + '00';
                    const authResult2 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult2, false);

                    transaction.txID = transaction.txID + '00'
                    const authResult3 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult3, false);
                }
            });
        });

        describe('#case UnDelegateResourceContract', function () {
            let params = [];

            before(async () => {
                params = [
                    [10e6, accounts.b58[2], 'BANDWIDTH', accounts.b58[1], { permissionId: 2 }],
                    [10e6, accounts.b58[2], 'BANDWIDTH', accounts.b58[1]]
                ];
            });

            it('should return true', async function () {
                for (const param of params) {
                    const delegateTx = await tronWeb.transactionBuilder.delegateResource(...param);
                    await broadcaster(null, accounts.pks[1], delegateTx);
                    await waitChainData('tx', delegateTx.txID);

                    const transaction = await tronWeb.transactionBuilder.undelegateResource(...param);

                    const authResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult, true);

                    transaction.raw_data_hex = transaction.raw_data_hex + '00';
                    const authResult2 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult2, false);

                    transaction.txID = transaction.txID + '00'
                    const authResult3 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult3, false);
                }
            });
        });

        describe('#case WithdrawExpireUnfreezeContract', function () {
            let params = [];

            before(async () => {
                params = [
                    [accounts.b58[1], { permissionId: 2 }],
                    [accounts.b58[1]]
                ];
                const freezeTx = await tronWeb.transactionBuilder.freezeBalanceV2(10e6, 'BANDWIDTH', ...params[1]);
                await broadcaster(null, accounts.pks[1], freezeTx);
                await waitChainData('tx', freezeTx.txID);
                const unfreezeTx = await tronWeb.transactionBuilder.unfreezeBalanceV2(10e6, 'BANDWIDTH', ...params[1]);
                await broadcaster(null, accounts.pks[1], unfreezeTx);
                await waitChainData('tx', unfreezeTx.txID);
                await wait(65); // freeze timeout in 60s in dev docker
            });

            it('should return true', async function () {
                for (const param of params) {
                    const transaction = await tronWeb.transactionBuilder.withdrawExpireUnfreeze(...param);
                        
                    const authResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult, true);

                    transaction.raw_data_hex = transaction.raw_data_hex + '00';
                    const authResult2 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult2, false);

                    transaction.txID = transaction.txID + '00'
                    const authResult3 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult3, false);
                }
            });
        });

        describe("#case WitnessCreateContract", async function () {

            let url = 'https://xtron.network';

            it('should allow accounts[1] to apply for SR, it should return true', async function () {

                const params = [
                    [accounts.b58[1], url, { permissionId: 2 }],
                    [accounts.b58[1], url]
                ];

                for (let param of params) {
                    const sendTrxTransaction = await tronWeb.transactionBuilder.sendTrx(accounts.b58[1], 11000e6);
                    await broadcaster(sendTrxTransaction, PRIVATE_KEY);
                    const transaction = await tronWeb.transactionBuilder.applyForSR(...param);

                    const authResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult, true);
                    commonAssertPb(transaction);

                    transaction.raw_data_hex = transaction.raw_data_hex + '00';
                    const authResult2 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult2, false);

                    transaction.txID = transaction.txID + '00'
                    const authResult3 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult3, false);

                    transaction.raw_data.ref_block_hash = transaction.raw_data.ref_block_hash + '00';
                    const tampResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(tampResult, false);
                }
            });

        });

        describe('#case VoteWitnessContract', function () {

            let url = 'https://xtron.network';

            before(async function () {

                await broadcaster(tronWeb.transactionBuilder.sendTrx(accounts.b58[0], 10000e6), PRIVATE_KEY);
                await broadcaster(tronWeb.transactionBuilder.applyForSR(accounts.b58[0], url), accounts.pks[0])
                await broadcaster(tronWeb.transactionBuilder.freezeBalanceV2(100e6, 'BANDWIDTH', accounts.b58[1]), accounts.pks[1])
            })

            it('should allows accounts.b58[1] to vote for accounts[0] as SR, it should return true', async function () {
                const list = [
                    [
                        {
                            [accounts.hex[0]]: 5,
                        },
                    ],
                    [
                        {
                            [accounts.hex[0]]: 5,
                        },
                        2,
                    ]
                ]
                for (const [votes, Permission_id] of list) {
                    const transaction = await tronWeb.transactionBuilder.vote(
                        votes,
                        accounts.b58[1],
                        { permissionId: Permission_id }
                    );
                    const authResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult, true);
                    commonAssertPb(transaction);

                    transaction.raw_data_hex = transaction.raw_data_hex + '00';
                    const authResult2 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult2, false);

                    transaction.txID = transaction.txID + '00'
                    const authResult3 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult3, false);

                    transaction.raw_data.ref_block_bytes = transaction.raw_data.ref_block_bytes + '00';
                    const tampResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(tampResult, false);
                }

            })

        });

        describe("#case CreateSmartContract", function () {
            it('should create a smart contract with default parameters, it should return true', async function () {

                const options = {
                    abi: testRevert.abi,
                    bytecode: testRevert.bytecode,
                    feeLimit: 8e7
                };
                for (let i = 0; i < 2; i++) {
                    if (i === 1) options.permissionId = 2;
                    const transaction = await tronWeb.transactionBuilder.createSmartContract(options)
                    const authResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult, true);
                    commonAssertPb(transaction);

                    transaction.raw_data_hex = transaction.raw_data_hex + '00';
                    const authResult2 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult2, false);

                    transaction.txID = transaction.txID + '00'
                    const authResult3 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult3, false);

                    transaction.raw_data.expiration = transaction.raw_data.expiration + '00';
                    const tampResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(tampResult, false);
                }
            });
        });

        describe("#case ClearABIContract", function () {

            let transaction;
            let contract;
            before(async function () {
                this.timeout(20000);

                transaction = await tronWeb.transactionBuilder.createSmartContract({
                    abi: testConstant.abi,
                    bytecode: testConstant.bytecode
                }, accounts.hex[3]);
                await broadcaster(null, accounts.pks[3], transaction);
                await waitChainData('tx', transaction.txID);
            })

            it('should clear contract abi, it should return true', async function () {
                this.timeout(10000);

                const contractAddress = transaction.contract_address;
                const ownerAddress = accounts.hex[3];

                const params = [
                    // [contractAddress, ownerAddress, { permissionId: 2 }], // Not supported temporarily
                    [contractAddress, ownerAddress]
                ];

                for (let param of params) {
                    // verify contract abi before
                    contract = await tronWeb.trx.getContract(contractAddress);
                    assert.isTrue(Object.keys(contract.abi).length > 0)

                    // clear abi
                    transaction = await tronWeb.transactionBuilder.clearABI(...param);
                    const authResult =
                            TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult, true);
                    commonAssertPb(transaction);

                    transaction.raw_data_hex = transaction.raw_data_hex + '00';
                    const authResult2 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult2, false);

                    transaction.txID = transaction.txID + '00'
                    const authResult3 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult3, false);

                    transaction.raw_data.timestamp = transaction.raw_data.timestamp + '00';
                    const tampResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(tampResult, false);
                }
                
            });
        });

        describe("#case UpdateBrokerageContract", async function () {
            before(async () => {
                await broadcaster(tronWeb.transactionBuilder.sendTrx(accounts.b58[1], 10000e6), PRIVATE_KEY);
                const transaction = await tronWeb.transactionBuilder.applyForSR(accounts.b58[1], 'url.tron.network');
                await broadcaster(transaction, accounts.pks[1]);
                while (true) {
                    const tx = await tronWeb.trx.getTransactionInfo(transaction.txID);
                    if (Object.keys(tx).length === 0) {
                        await wait(3);
                        continue;
                    } else {
                        break;
                    }
                }
            });
            it('should auth sr brokerage successful', async function () {
                let params = [
                    // [10, accounts.hex[1], { permissionId: 2 }], // No suppored for multiSign
                    [10, accounts.hex[1]]
                ];
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.updateBrokerage(...param);
                    const authResult =
                            TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult, true);
                    commonAssertPb(transaction);

                    transaction.raw_data_hex = transaction.raw_data_hex + '00';
                    const authResult2 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult2, false);

                    transaction.txID = transaction.txID + '00'
                    const authResult3 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult3, false);

                    transaction.raw_data.ref_block_bytes = transaction.raw_data.ref_block_bytes + '00';
                    const tampResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(tampResult, false);
                }
            });
        });

        describe("#case AssetIssueContract", function () {
            it(`should allow accounts[2] to create a TestToken`, async function () {

                const options = getTokenOptions();
                const createrAccountIdx = 4;
                for (let i = 0; i < 2; i++) {
                    if (i === 1) options.permissionId = 2;
                    const transaction = await tronWeb.transactionBuilder.createToken(options, accounts.b58[createrAccountIdx]);
                    const authResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult, true);
                    commonAssertPb(transaction);

                    transaction.raw_data_hex = transaction.raw_data_hex + '00';
                    const authResult2 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult2, false);

                    transaction.txID = transaction.txID + '00'
                    const authResult3 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult3, false);

                    transaction.raw_data.ref_block_bytes = transaction.raw_data.ref_block_bytes + '00';
                    const tampResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(tampResult, false);
                }
            });
        });

        describe("#case UpdateAssetContract", function () {
            let tokenOptions
            let tokenID
    
            before(async function () {
    
                this.timeout(10000)
    
                tokenOptions = getTokenOptions();
                await broadcaster(tronWeb.transactionBuilder.createToken(tokenOptions, accounts.b58[3]), accounts.pks[3])
    
                let tokenList
                while (!tokenList) {
                    tokenList = await tronWeb.trx.getTokensIssuedByAddress(accounts.b58[3])
                }
                if (isAllowSameTokenNameApproved) {
                    tokenID = tokenList[tokenOptions.name].id
                } else {
                    tokenID = tokenList[tokenOptions.name].name
                }
            });
    
            it(`should allow accounts[3] to update a TestToken`, async function () {
                for (let i = 0; i < 2; i++) {
                    if (i === 1) UPDATED_TEST_TOKEN_OPTIONS.permissionId = 2;
                    const transaction = await tronWeb.transactionBuilder.updateToken(UPDATED_TEST_TOKEN_OPTIONS, accounts.b58[3]);
                    const authResult = TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult, true);
                    commonAssertPb(transaction);

                    transaction.raw_data_hex = transaction.raw_data_hex + '00';
                    const authResult2 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult2, false);

                    transaction.txID = transaction.txID + '00'
                    const authResult3 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult3, false);

                    transaction.raw_data.ref_block_bytes = transaction.raw_data.ref_block_bytes + '00';
                    const tampResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(tampResult, false);
                }
            });
    
        });

        describe("#case AccountCreateContract", function () {
            it(`should create accounts[3]`, async function () {
                const newAccount = await TronWeb.createAccount();
                const params = [
                    [newAccount.address.base58, accounts.b58[3], { permissionId: 2 }],
                    [newAccount.address.base58, accounts.b58[3]]
                ];

                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.createAccount(...param);
                    const authResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult, true);
                    commonAssertPb(transaction);

                    transaction.raw_data_hex = transaction.raw_data_hex + '00';
                    const authResult2 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult2, false);

                    transaction.txID = transaction.txID + '00'
                    const authResult3 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult3, false);

                    transaction.raw_data.ref_block_hash = transaction.raw_data.ref_block_hash + '00';
                    const tampResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(tampResult, false);
                }
            });
        });

        describe("#case AccountUpdateContract", function () {
            it(`should update accounts[3]`, async function () {
                const newName = 'New name'
                const params = [
                    [newName, accounts.b58[3], { permissionId: 2 }],
                    [newName, accounts.b58[3]]
                ];

                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.updateAccount(...param);
                    const authResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult, true);
                    commonAssertPb(transaction);

                    transaction.raw_data_hex = transaction.raw_data_hex + '00';
                    const authResult2 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult2, false);

                    transaction.txID = transaction.txID + '00'
                    const authResult3 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult3, false);

                    transaction.raw_data.ref_block_hash = transaction.raw_data.ref_block_hash + '00';
                    const tampResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(tampResult, false);
                }
            });
        });

        describe("#case SetAccountIdContract", function () {
            it(`should set account id accounts[3]`, async function () {
            
                for (let i = 0; i < 2; i++) {
                    let accountId = TronWeb.toHex('abcabc110');
                    let param = [accountId, accounts.b58[3]]
                    if (i === 1) {
                        accountId = TronWeb.toHex('testtest');
                        param = [accountId, accounts.b58[3], { permissionId: 2 }]
                    }
                    const transaction = await tronWeb.transactionBuilder.setAccountId(param[0]);
                    const authResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult, true);
                    commonAssertPb(transaction);

                    transaction.raw_data_hex = transaction.raw_data_hex + '00';
                    const authResult2 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult2, false);

                    transaction.txID = transaction.txID + '00'
                    const authResult3 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult3, false);

                    transaction.raw_data.ref_block_hash = transaction.raw_data.ref_block_hash + '00';
                    const tampResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(tampResult, false);
                }

            });
        });

        describe("#case ProposalCreateContract", function () {
            let parameters = [{ "key": 0, "value": 100000 }, { "key": 1, "value": 2 }]
            before(async () => {
                await broadcaster(tronWeb.transactionBuilder.sendTrx(accounts.b58[3], 10000e6), PRIVATE_KEY);
                const transaction = await tronWeb.transactionBuilder.applyForSR(accounts.b58[3], 'url.tron.network');
                await broadcaster(transaction, accounts.pks[3]);
                await waitChainData('tx', transaction.txID);
            });

            it('should allow the SR account to create a new proposal as a single object', async function () {

                const inputs = [
                    [parameters[0], accounts.b58[3], { permissionId: 2 }],
                    [parameters[0], accounts.b58[3]]
                ];
                for (let input of inputs) {
                    const transaction = await tronWeb.transactionBuilder.createProposal(...input)
                    const authResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult, true);
                    commonAssertPb(transaction);

                    transaction.raw_data_hex = transaction.raw_data_hex + '00';
                    const authResult2 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult2, false);

                    transaction.txID = transaction.txID + '00'
                    const authResult3 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult3, false);

                    transaction.raw_data.ref_block_bytes = transaction.raw_data.ref_block_bytes + '00';
                    const tampResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(tampResult, false);
                }

            })
        });

        describe("#case ProposalDeleteContract", function () {
            let proposals;

            before(async function () {
                // comments below should be uncomment when first run
                // const transaction = await tronWeb.transactionBuilder.applyForSR(ADDRESS_BASE58, 'url.tron.network');
                // await broadcaster(transaction, PRIVATE_KEY);
                // await waitChainData('tx', transaction.txID);

                let parameters = [{ "key": 0, "value": 100000 }, { "key": 1, "value": 2 }]

                await broadcaster(tronWeb.transactionBuilder.createProposal(parameters, ADDRESS_BASE58), PRIVATE_KEY)

                proposals = await tronWeb.trx.listProposals();
            })

            it('should allow the SR to delete its own proposal', async function () {

                const params = [
                    [proposals[0].proposal_id, { permissionId: 2 }],
                    [proposals[0].proposal_id]
                ];
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.deleteProposal(...param)
                    const authResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult, true);
                    commonAssertPb(transaction);

                    transaction.raw_data_hex = transaction.raw_data_hex + '00';
                    const authResult2 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult2, false);

                    transaction.txID = transaction.txID + '00'
                    const authResult3 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult3, false);

                    transaction.raw_data.ref_block_bytes = transaction.raw_data.ref_block_bytes + '00';
                    const tampResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(tampResult, false);
                }

            });
        });

        describe("#case ProposalApproveContract", function () {
            let proposals;

            before(async function () {

                this.timeout(20000)

                const sendTrxTransaction = await tronWeb.transactionBuilder.sendTrx(accounts.b58[5], 10000e6);
                await broadcaster(sendTrxTransaction, PRIVATE_KEY);
                waitChainData('tx', sendTrxTransaction.txID);
                const applyForSrTransaction = await tronWeb.transactionBuilder.applyForSR(accounts.b58[5], 'url.tron.network');
                await broadcaster(applyForSrTransaction, accounts.pks[5]);
                waitChainData('tx', applyForSrTransaction.txID);
                let parameters = [{ "key": 0, "value": 100000 }, { "key": 1, "value": 2 }]

                await broadcaster(tronWeb.transactionBuilder.createProposal(parameters, ADDRESS_BASE58), PRIVATE_KEY)

                proposals = await tronWeb.trx.listProposals();

            })

            it('should allow vote proposal', async function () {

                const params = [
                    [proposals[0].proposal_id, true, accounts.b58[5], { permissionId: 2 }],
                    [proposals[0].proposal_id, true, accounts.b58[5]]
                ];
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.voteProposal(...param)
                    const authResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult, true);
                    commonAssertPb(transaction);

                    transaction.raw_data_hex = transaction.raw_data_hex + '00';
                    const authResult2 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult2, false);

                    transaction.txID = transaction.txID + '00'
                    const authResult3 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult3, false);

                    transaction.raw_data.ref_block_bytes = transaction.raw_data.ref_block_bytes + '00';
                    const tampResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(tampResult, false);
                }

            })
        });

        describe("#case ExchangeCreateContract", function () {
            const idxS = 4;
            const idxE = 6;
            const toIdx1 = 2;
            const toIdx2 = 1;
            let tokenNames = [];

            before(async function () {
                this.timeout(20000);

                // create token
                for (let i = idxS; i < idxE; i++) {
                    const options = getTokenOptions();
                    const transaction = await tronWeb.transactionBuilder.createToken(options, accounts.hex[i]);
                    await broadcaster(null, accounts.pks[i], transaction);
                    await waitChainData('token', accounts.hex[i]);
                    const token = await tronWeb.trx.getTokensIssuedByAddress(accounts.hex[i]);
                    await waitChainData('tokenById', token[Object.keys(token)[0]]['id']);
                    await broadcaster(null, accounts.pks[i], await tronWeb.transactionBuilder.sendToken(
                        accounts.hex[toIdx1],
                        10e4,
                        token[Object.keys(token)[0]]['id'],
                        token[Object.keys(token)[0]]['owner_address']
                    ));
                    await waitChainData('sendToken', accounts.hex[toIdx1], 0);
                    await broadcaster(null, accounts.pks[i], await tronWeb.transactionBuilder.sendToken(
                        accounts.hex[toIdx2],
                        10e4,
                        token[Object.keys(token)[0]]['id'],
                        token[Object.keys(token)[0]]['owner_address']
                    ));
                    await waitChainData('sendToken', accounts.hex[toIdx2], 0);
                    tokenNames.push(token[Object.keys(token)[0]]['id']);
                }

            });

            it('should create token exchange', async function () {
                let transaction = await tronWeb.transactionBuilder.createTokenExchange(tokenNames[0], 10e3, tokenNames[1], 10e3, accounts.hex[toIdx1]);
                const authResult =
                    TronWeb.utils.transaction.txCheck(transaction);
                assert.equal(authResult, true);
                commonAssertPb(transaction);

                transaction = await tronWeb.transactionBuilder.createTokenExchange(tokenNames[0], 10e3, tokenNames[1], 10e3, accounts.hex[toIdx1], { permissionId: 2 });
                const authResult2 =
                    TronWeb.utils.transaction.txCheck(transaction);
                assert.equal(authResult2, true);
                commonAssertPb(transaction);

                transaction.raw_data_hex = transaction.raw_data_hex + '00';
                const authResult3 =
                    TronWeb.utils.transaction.txCheck(transaction);
                assert.equal(authResult3, false);

                transaction.txID = transaction.txID + '00'
                const authResult4 =
                    TronWeb.utils.transaction.txCheck(transaction);
                assert.equal(authResult4, false);

                transaction.raw_data.ref_block_hash = transaction.raw_data.ref_block_hash + '00';
                const tampResult =
                    TronWeb.utils.transaction.txCheck(transaction);
                assert.equal(tampResult, false);
            });
        });

        describe("#case ExchangeInjectContract", function () {
            const idxS = 6;
            const idxE = 8;
            let tokenNames = [];
            let exchangeId = '';

            before(async function () {
                this.timeout(20000);

                // create token
                for (let i = idxS; i < idxE; i++) {
                    const options = getTokenOptions();
                    const transaction = await tronWeb.transactionBuilder.createToken(options, accounts.hex[i]);
                    await broadcaster(null, accounts.pks[i], transaction);
                    await waitChainData('token', accounts.hex[i]);
                    const token = await tronWeb.trx.getTokensIssuedByAddress(accounts.hex[i]);
                    await waitChainData('tokenById', token[Object.keys(token)[0]]['id']);
                    await broadcaster(null, accounts.pks[i], await tronWeb.transactionBuilder.sendToken(
                        tronWeb.defaultAddress.hex,
                        10e4,
                        token[Object.keys(token)[0]]['id'],
                        token[Object.keys(token)[0]]['owner_address']
                    ));
                    tokenNames.push(token[Object.keys(token)[0]]['id']);
                }
                const transaction = await tronWeb.transactionBuilder.createTokenExchange(tokenNames[1], 10, tokenNames[0], 10);
                await broadcaster(null, PRIVATE_KEY, transaction);
                let receipt = await tronWeb.trx.getTransactionInfo(transaction.txID);
                while (!Object.keys(receipt).length) {
                    await wait(5);
                    receipt = await tronWeb.trx.getTransactionInfo(transaction.txID);
                }
                exchangeId = receipt.exchange_id;
            });
            it(`it should return true`, async function () {
                const params = [
                    [exchangeId, tokenNames[0], 10, { permissionId: 2 }],
                    [exchangeId, tokenNames[0], 10]
                ];
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.injectExchangeTokens(
                        ...param
                    );
                    const authResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult, true);
                    commonAssertPb(transaction);

                    transaction.raw_data_hex = transaction.raw_data_hex + '00';
                    const authResult2 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult2, false);

                    transaction.txID = transaction.txID + '00'
                    const authResult3 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult3, false);

                    transaction.raw_data.ref_block_hash = transaction.raw_data.ref_block_hash + '00';
                    const tampResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(tampResult, false);
                }
            });
        });

        describe("#case ExchangeWithdrawContract", function () {
            const idxS = 0;
            const idxE = 2;
            let tokenNames = [];
            let exchangeId = '';

            before(async function () {
                this.timeout(20000);

                // create token
                for (let i = idxS; i < idxE; i++) {
                    const options = getTokenOptions();
                    const transaction = await tronWeb.transactionBuilder.createToken(options, accounts.hex[i]);
                    await broadcaster(null, accounts.pks[i], transaction);
                    await waitChainData('token', accounts.hex[i]);
                    const token = await tronWeb.trx.getTokensIssuedByAddress(accounts.hex[i]);
                    await waitChainData('tokenById', token[Object.keys(token)[0]]['id']);
                    await broadcaster(null, accounts.pks[i], await tronWeb.transactionBuilder.sendToken(
                        tronWeb.defaultAddress.hex,
                        10e4,
                        token[Object.keys(token)[0]]['id'],
                        token[Object.keys(token)[0]]['owner_address']
                    ));
                    tokenNames.push(token[Object.keys(token)[0]]['id']);
                }
                const transaction = await tronWeb.transactionBuilder.createTokenExchange(tokenNames[1], 10, tokenNames[0], 10);
                await broadcaster(transaction);
                let receipt = await tronWeb.trx.getTransactionInfo(transaction.txID);
                while (!Object.keys(receipt).length) {
                    await wait(5);
                    receipt = await tronWeb.trx.getTransactionInfo(transaction.txID);
                }
                exchangeId = receipt.exchange_id;

                transaction.raw_data_hex = transaction.raw_data_hex + '00';
                const authResult2 =
                    TronWeb.utils.transaction.txCheck(transaction);
                assert.equal(authResult2, false);

            });
            it(`it should return true`, async function () {
                const params = [
                    [exchangeId, tokenNames[0], 10, { permissionId: 2 }],
                    [exchangeId, tokenNames[0], 10]
                ];
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.withdrawExchangeTokens(
                        ...param
                    );
                    const authResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult, true);
                    commonAssertPb(transaction);

                    transaction.raw_data_hex = transaction.raw_data_hex + '00';
                    const authResult2 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult2, false);

                    transaction.txID = transaction.txID + '00'
                    const authResult3 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult3, false);

                    transaction.raw_data.ref_block_bytes = transaction.raw_data.ref_block_bytes + '00';
                    const tampResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(tampResult, false);
                }
            });
        });

        describe("#case ExchangeTransactionContract", function () {
            const idxS = 8;
            const idxE = 10;
            let tokenNames = [];
            let exchangeId = '';

            before(async function () {
                this.timeout(20000);

                // create token
                for (let i = idxS; i < idxE; i++) {
                    const options = getTokenOptions();
                    const transaction = await tronWeb.transactionBuilder.createToken(options, accounts.hex[i]);
                    await broadcaster(null, accounts.pks[i], transaction);
                    await waitChainData('token', accounts.hex[i]);
                    const token = await tronWeb.trx.getTokensIssuedByAddress(accounts.hex[i]);
                    await waitChainData('tokenById', token[Object.keys(token)[0]]['id']);
                    await broadcaster(null, accounts.pks[i], await tronWeb.transactionBuilder.sendToken(
                        tronWeb.defaultAddress.hex,
                        10e4,
                        token[Object.keys(token)[0]]['id'],
                        token[Object.keys(token)[0]]['owner_address']
                    ));
                    tokenNames.push(token[Object.keys(token)[0]]['id']);
                }
                const transaction = await tronWeb.transactionBuilder.createTokenExchange(tokenNames[1], 10, tokenNames[0], 10);
                await broadcaster(transaction);
                let receipt = await tronWeb.trx.getTransactionInfo(transaction.txID);
                while (!Object.keys(receipt).length) {
                    await wait(5);
                    receipt = await tronWeb.trx.getTransactionInfo(transaction.txID);
                }
                exchangeId = receipt.exchange_id;
            });
            it(`it should return true`, async function () {
                const params = [
                    [exchangeId, tokenNames[0], 10, 5, { permissionId: 2 }],
                    [exchangeId, tokenNames[0], 10, 5]
                ];
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.tradeExchangeTokens(
                        ...param
                    );
                    const authResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult, true);
                    commonAssertPb(transaction);

                    transaction.raw_data_hex = transaction.raw_data_hex + '00';
                    const authResult2 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult2, false);

                    transaction.txID = transaction.txID + '00'
                    const authResult3 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult3, false);

                    transaction.raw_data.ref_block_bytes = transaction.raw_data.ref_block_bytes + '00';
                    const tampResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(tampResult, false);
                }
            });
        });

        describe("#case UpdateSettingContract", function () {
            let transaction;
            before(async function () {
                this.timeout(20000);

                transaction = await tronWeb.transactionBuilder.createSmartContract({
                    abi: testConstant.abi,
                    bytecode: testConstant.bytecode
                }, accounts.hex[3]);
                await broadcaster(null, accounts.pks[3], transaction);
                while (true) {
                    const tx = await tronWeb.trx.getTransactionInfo(transaction.txID);
                    if (Object.keys(tx).length === 0) {
                        await wait(3);
                        continue;
                    } else {
                        break;
                    }
                }
            })
            it(`it should return true`, async function () {
                const params = [
                    [transaction.contract_address, 10, accounts.b58[3], { permissionId: 2 }],
                    [transaction.contract_address, 20, accounts.b58[3]]
                ];
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.updateSetting(
                        ...param
                    );
                    const authResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult, true);
                    commonAssertPb(transaction);

                    transaction.raw_data_hex = transaction.raw_data_hex + '00';
                    const authResult2 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult2, false);

                    transaction.txID = transaction.txID + '00'
                    const authResult3 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult3, false);

                    transaction.raw_data.ref_block_bytes = transaction.raw_data.ref_block_bytes + '00';
                    const tampResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(tampResult, false);
                }
            });
        });

        describe("#case UpdateEnergyLimitContract", function () {
            let transaction;
            before(async function () {
                this.timeout(20000);

                transaction = await tronWeb.transactionBuilder.createSmartContract({
                    abi: testConstant.abi,
                    bytecode: testConstant.bytecode
                }, accounts.hex[3]);
                await broadcaster(null, accounts.pks[3], transaction);
                while (true) {
                    const tx = await tronWeb.trx.getTransactionInfo(transaction.txID);
                    if (Object.keys(tx).length === 0) {
                        await wait(3);
                        continue;
                    } else {
                        break;
                    }
                }
            })
            it(`it should return true`, async function () {
                const params = [
                    [transaction.contract_address, 10e6, accounts.b58[3], { permissionId: 2 }],
                    [transaction.contract_address, 10e6, accounts.b58[3]]
                ];
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.updateEnergyLimit(
                        ...param
                    );
                    const authResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult, true);
                    commonAssertPb(transaction);

                    transaction.raw_data_hex = transaction.raw_data_hex + '00';
                    const authResult2 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult2, false);

                    transaction.txID = transaction.txID + '00'
                    const authResult3 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult3, false);

                    transaction.raw_data.ref_block_bytes = transaction.raw_data.ref_block_bytes + '00';
                    const tampResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(tampResult, false);
                }
            });
        });

        describe("#case AccountPermissionUpdateContract", function () {
            before(async () => {
                await broadcaster(tronWeb.transactionBuilder.sendTrx(accounts.b58[6], 10000e6), PRIVATE_KEY);
                const transaction = await tronWeb.transactionBuilder.applyForSR(accounts.b58[6], 'url.tron.network');
                await broadcaster(transaction, accounts.pks[6]);
                while (true) {
                    const tx = await tronWeb.trx.getTransactionInfo(transaction.txID);
                    if (Object.keys(tx).length === 0) {
                        await wait(3);
                        continue;
                    } else {
                        break;
                    }
                }
            });
            it(`it should return true`, async function () {
                const permissionData = {
                    "owner": {
                      "type": 0,
                      "keys": [
                        {
                          "address": accounts.hex[6],
                          "weight": 1
                        }
                      ],
                      "threshold": 1,
                      "permission_name": "owner"
                    },
                    "witness": {
                      "keys": [
                        {
                          "address": accounts.hex[6],
                          "weight": 1
                        }
                      ],
                      "threshold": 1,
                      "id": 1,
                      "type": 1,
                      "permission_name": "witness"
                    },
                    "owner_address": accounts.hex[6],
                    "actives": [
                      {
                        "operations": "7fff1fc0033e0000000000000000000000000000000000000000000000000000",
                        "keys": [
                          {
                            "address": accounts.hex[6],
                            "weight": 1
                          }
                        ],
                        "threshold": 1,
                        "id": 2,
                        "type": 2,
                        "permission_name": "active"
                      }
                    ]
                };
                const params = [
                    [accounts.hex[6], permissionData.owner, permissionData.witness, permissionData.actives] // No suppored for multiSign
                ];
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.updateAccountPermissions(
                        ...param
                    );
                    const authResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult, true);
                    commonAssertPb(transaction);

                    transaction.raw_data_hex = transaction.raw_data_hex + '00';
                    const authResult2 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult2, false);

                    transaction.txID = transaction.txID + '00'
                    const authResult3 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult3, false);

                    transaction.raw_data.timestamp = transaction.raw_data.timestamp + '00';
                    const tampResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(tampResult, false);
                }
            });
        });

    });

    describe('#txCheckWithArgs', function () {

        const commonAssertFalse = (methodName, generateData, params) => {
            it(`it should return false when transaction data is tampered`, async function () {
                for (const param of params) {
                    const transaction = await tronWeb.transactionBuilder[methodName](
                        ...param
                    );
                    transaction.raw_data_hex = transaction.raw_data_hex + '00';
                    const data = generateData(param);
                    const authResult =
                        TronWeb.utils.transaction.txCheckWithArgs(transaction, data, param[3] || {});
                    assert.equal(authResult, false);
                }
            });
            it(`it should return false when txID is tampered`, async function () {
                for (const param of params) {
                    const transaction = await tronWeb.transactionBuilder[methodName](
                        ...param
                    );
                    transaction.txID = transaction.txID + '00';
                    const data = generateData(param);
                    const authResult =
                        TronWeb.utils.transaction.txCheckWithArgs(transaction, data, param[3] || {});
                    assert.equal(authResult, false);
                }
            });
        };

        const commonAssertPbWithArgs = (transaction, args, options) => {
            const transactionPb = TronWeb.utils.transaction.txJsonToPbWithArgs(transaction, args, options);
            const rawDataBytes = transactionPb.getRawData().serializeBinary();
            const txID = TronWeb.utils.ethersUtils.sha256(rawDataBytes);

            assert.equal(txID.replace(/^0x/, ''), transaction.txID);
        };

        describe('#case TransferContract', function () {
            const params = [];
            const generateData = (param) => {
                return {
                    to_address: TronWeb.address.toHex(param[0]),
                    owner_address: tronWeb.defaultAddress.hex,
                    amount: param[1],
                    Permission_id: param[2]?.permissionId,
                  };
            }
            before(() => {
                params.push([accounts.b58[1], 10, { permissionId: 2 }]);
                params.push([accounts.b58[1], 10]);
            })
            it(`it should return true`, async function () {
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.sendTrx(
                        ...param
                    );
                    const data = generateData(param);
                    const authResult =
                        TronWeb.utils.transaction.txCheckWithArgs(transaction, data, param[3] || {});
                    assert.equal(authResult, true);
                    commonAssertPbWithArgs(transaction, data, param[3] || {});
                }
            });
            commonAssertFalse('sendTrx', generateData, params);
        });

        describe('#case TransferAssetContract', function () {

            let tokenOptions
            let tokenID
            const params = [];

            const generateData = (param) => {
                return {
                    to_address: tronWeb.address.toHex(param[0]),
                    owner_address: tronWeb.address.toHex(param[3]),
                    asset_name: tronWeb.fromUtf8(param[2]),
                    amount: parseInt(param[1]),
                    Permission_id: param[4]?.permissionId,
                };
            };

            before(async function () {
                
                tokenOptions = getTokenOptions();

                await broadcaster(tronWeb.transactionBuilder.createToken(tokenOptions, accounts.b58[13]), accounts.pks[13])

                let tokenList
                await waitChainData('token', accounts.b58[13]);
                tokenList = await tronWeb.trx.getTokensIssuedByAddress(accounts.b58[13]);
                if (isAllowSameTokenNameApproved) {
                    tokenID = tokenList[tokenOptions.name].id
                } else {
                    tokenID = tokenList[tokenOptions.name].name
                }

                params.push(...[
                    [accounts.b58[1], 5, tokenID, accounts.b58[13], { permissionId: 2 }],
                    [accounts.b58[1], 5, tokenID, accounts.b58[13]]
                ]);
            });

            it(`it should return true`, async function () {
                
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.sendToken(
                        ...param
                    );
                    const data = generateData(param);
                    const authResult =
                        TronWeb.utils.transaction.txCheckWithArgs(transaction, data);
                    assert.equal(authResult, true);
                    commonAssertPbWithArgs(transaction, data);
                }
            });

            commonAssertFalse('sendToken', generateData, params);
        });

        describe('#case ParticipateAssetIssueContract', function () {

            let tokenOptions
            let tokenID
            const params = [];

            const generateData = (param) => {
                return {
                    to_address: tronWeb.address.toHex(param[0]),
                    owner_address: tronWeb.address.toHex(param[3]),
                    asset_name: tronWeb.fromUtf8(param[1]),
                    amount: parseInt(param[2]),
                    Permission_id: param[4]?.permissionId,
                };
            };

            before(async function () {
                tokenOptions = getTokenOptions();
                tokenOptions.saleEnd += 60 * 60 * 1000;
                await broadcaster(tronWeb.transactionBuilder.createToken(tokenOptions, accounts.b58[12]), accounts.pks[12])
                await waitChainData('token', accounts.b58[12]);
                let tokenList = await tronWeb.trx.getTokensIssuedByAddress(accounts.b58[12]);
                if (isAllowSameTokenNameApproved) {
                    tokenID = tokenList[tokenOptions.name].id
                } else {
                    tokenID = tokenList[tokenOptions.name].name
                }
                assert.equal(tokenList[tokenOptions.name].abbr, tokenOptions.abbreviation)
                params.push(...[
                    [accounts.b58[12], tokenID, 20, accounts.b58[0], { permissionId: 2 }],
                    [accounts.b58[12], tokenID, 20, accounts.b58[0]]
                ]);
                await wait(4);
            });

            it(`it should return true`, async function () {
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.purchaseToken(
                        ...param
                    );
                    const data = generateData(param);
                    const authResult =
                        TronWeb.utils.transaction.txCheckWithArgs(transaction, data);
                    assert.equal(authResult, true);
                    commonAssertPbWithArgs(transaction, data);
                }
            });
            commonAssertFalse('purchaseToken', generateData, params);
        });

        describe('#case TriggerSmartContract', function () {

            let transaction;
            const params = [];

            const generateData = (param) => {
                const args = {
                    contract_address: tronWeb.address.toHex(param[0]),
                    owner_address: param[4],
                };

                let parameters = param[3];
                const abiCoder = new AbiCoder();
                let types = [];
                const values = [];
                for (let i = 0; i < parameters.length; i++) {
                    let {type, value} = parameters[i];
                    if (type === 'address')
                        value = tronWeb.address.toHex(value).replace(/^0x/, '');
                    else if (type.match(/^([^\x5b]*)(\x5b|$)/)[0] === 'address[')
                        value = value.map(v => tronWeb.address.toHex(v).replace(/^0x/, ''));

                    types.push(type);
                    values.push(value);
                }
                parameters = abiCoder.encode(types, values).replace(/^0x/, '');
                args.function_selector = param[1].replace('/\s+/g', '');
                args.parameter = parameters;
                args.Permission_id = param[2].permissionId;
                args.call_value = 0;
                args.fee_limit = tronWeb.feeLimit;
                return args;
            };

            before(async function () {
                transaction = await tronWeb.transactionBuilder.createSmartContract({
                    abi: testConstant.abi,
                    bytecode: testConstant.bytecode
                }, accounts.hex[1]);
                await broadcaster(null, accounts.pks[1], transaction);
                await waitChainData('tx', transaction.txID);

                params.push(...[
                    [
                        transaction.contract_address,
                        'testPure(uint256,uint256)',
                        {},
                        [
                            { type: 'uint256', value: 1 },
                            { type: 'uint256', value: 2 }
                        ],
                        accounts.hex[1],
                    ],
                    [
                        transaction.contract_address,
                        'testPure(uint256,uint256)',
                        {
                            permissionId: 2,
                        },
                        [
                            { type: 'uint256', value: 1 },
                            { type: 'uint256', value: 2 }
                        ],
                        accounts.hex[1],
                    ]
                ]);
            })

            it('should trigger smart contract successfully', async function () {
                for (const param of params) {
                    transaction = await tronWeb.transactionBuilder.triggerSmartContract(
                        ...param
                    );
                    const args = generateData(param);
                    const authResult =
                        TronWeb.utils.transaction.txCheckWithArgs(transaction.transaction, args);
                    assert.equal(authResult, true);
                    commonAssertPbWithArgs(transaction.transaction, args);
                }
            });

            it(`it should return false when transaction data is tampered`, async function () {
                for (const param of params) {
                    const { transaction } = await tronWeb.transactionBuilder['triggerSmartContract'](
                        ...param
                    );
                    transaction.raw_data_hex = transaction.raw_data_hex + '00';
                    const data = generateData(param);
                    const authResult =
                        TronWeb.utils.transaction.txCheckWithArgs(transaction, data, param[3] || {});
                    assert.equal(authResult, false);
                }
            });

            it(`it should return false when txID is tampered`, async function () {
                for (const param of params) {
                    const { transaction } = await tronWeb.transactionBuilder['triggerSmartContract'](
                        ...param
                    );
                    transaction.txID = transaction.txID + '00';
                    const data = generateData(param);
                    const authResult =
                        TronWeb.utils.transaction.txCheckWithArgs(transaction, data, param[3] || {});
                    assert.equal(authResult, false);
                }
            });
        });

        describe('#case FreezeBalanceContract', function () {
            const params = [];
            const generateData = (param) => {
                return {
                    owner_address: tronWeb.address.toHex(param[3]),
                    frozen_balance: parseInt(param[0]),
                    frozen_duration: parseInt(param[1]),
                    resource: param[2],
                    Permission_id: param[4]?.permissionId,
                };
            };

            before(() => {
                params.push(...[
                    [100e6, 3, 'BANDWIDTH', accounts.b58[1], { permissionId: 2 }],
                    [100e6, 3, 'BANDWIDTH', accounts.b58[1]]
                ]);
            })

            it('it should return true', async function () {
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.freezeBalance(...param);
                    const data = generateData(param);
                    const authResult =
                        TronWeb.utils.transaction.txCheckWithArgs(transaction, data);
                    assert.equal(authResult, true);
                    commonAssertPbWithArgs(transaction, data);
                }
            });
            commonAssertFalse('freezeBalance', generateData, params);
        });

        describe.skip('#case UnfreezeBalanceContract', function () {

            async function freezeBandWith() {
                const transaction = await tronWeb.transactionBuilder.freezeBalance(100e6, 3, 'BANDWIDTH', accounts.b58[1]);
                await broadcaster(transaction, accounts.pks[1]);
                await waitChainData('tx', transaction.txID);
            };

            it('it should return true', async function () {
                const params = [
                    ['BANDWIDTH', accounts.b58[1], { permissionId: 2 }],
                    ['BANDWIDTH', accounts.b58[1]]
                ];

                for (let param of params) {
                    await freezeBandWith();
                    const transaction = await tronWeb.transactionBuilder.unfreezeBalance(...param)
                    const data = {
                        owner_address: tronWeb.address.toHex(param[1]),
                        resource: param[0],
                        Permission_id: param[2]?.permissionId,
                    }
                    const authResult =
                        TronWeb.utils.transaction.txCheckWithArgs(transaction, data);
                    assert.equal(authResult, true);
                    commonAssertPbWithArgs(transaction, data);
                }
            })

        });

        describe.skip('#case WithdrawBalanceContract', function () {

            // todo, need check, new case for withdrawBlockRewards

            // before, todo

            it(`it should return true`, async function () {
                const params = [
                    [accounts.b58[1], { permissionId: 2 }],
                    [accounts.b58[1]]
                ];
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.withdrawBlockRewards(
                        ...param
                    );
                    const data = {
                        owner_address: tronWeb.address.toHex(param[0]),
                        Permission_id: param[1]?.permissionId,
                    };
                    const authResult =
                        TronWeb.utils.transaction.txCheckWithArgs(transaction, data);
                    assert.equal(authResult, true);
                    commonAssertPbWithArgs(transaction, data);
                }
            });
        });

        describe('#case FreezeBalanceV2Contract', function () {
            const params = [];

            const generateData = (param) => {
                return {
                    frozen_balance: parseInt(param[0]),
                    resource: param[1],
                    owner_address: tronWeb.address.toHex(param[2]),
                    Permission_id: param[3]?.permissionId,
                };
            };

            before(async () => {
                params.push(...[
                    [10e7, 'BANDWIDTH', accounts.b58[1], { permissionId: 2 }],
                    [10e7, 'BANDWIDTH', accounts.b58[1]]
                ]);
            });

            it('should return true', async function () {
                for (const param of params) {
                    const transaction = await tronWeb.transactionBuilder.freezeBalanceV2(...param);
                    const data = generateData(param);
                    const authResult =
                        TronWeb.utils.transaction.txCheckWithArgs(transaction, data);
                    assert.equal(authResult, true);
                    commonAssertPbWithArgs(transaction, data);
                }
            });
            commonAssertFalse('freezeBalanceV2', generateData, params);
        });

        describe('#case UnfreezeBalanceV2Contract', function () {
            const params = [];

            const generateData = (param) => {
                return {
                    unfreeze_balance: param[0],
                    resource: param[1],
                    owner_address: tronWeb.address.toHex(param[2]),
                    Permission_id: param[3]?.permissionId,
                };
            };

            before(async () => {
                params.push(...[
                    [10e6, 'BANDWIDTH', accounts.b58[1]],
                    [10e6, 'BANDWIDTH', accounts.b58[1], { permissionId: 2 }],
                ]);
            });

            it('should return true', async function () {
                for (const param of params) {
                    const freezeTx = await tronWeb.transactionBuilder.freezeBalanceV2(...param);
                    await broadcaster(null, accounts.pks[1], freezeTx);
                    await waitChainData('tx', freezeTx.txID);
                    const transaction = await tronWeb.transactionBuilder.unfreezeBalanceV2(...param);
                    const data = generateData(param);
                    const authResult =
                        TronWeb.utils.transaction.txCheckWithArgs(transaction, data);
                    assert.equal(authResult, true);
                    commonAssertPbWithArgs(transaction, data);
                }
            });
            commonAssertFalse('unfreezeBalanceV2', generateData, params);
        });

        describe('#case DelegateResourceContract', function () {
            const params = [];

            const generateData = (param) => {
                return {
                    balance: parseInt(param[0]),
                    resource: param[2],
                    owner_address: tronWeb.address.toHex(param[3]),
                    receiver_address: tronWeb.address.toHex(param[1]),
                    lock: param[4],
                    Permission_id: param[5]?.permissionId,
                };
            };

            before(async () => {
                params.push(...[
                    [10e6, accounts.b58[2], 'BANDWIDTH', accounts.b58[1], false, { permissionId: 2 }],
                    [10e6, accounts.b58[2], 'BANDWIDTH', accounts.b58[1], false]
                ]);
                const freezeTx = await tronWeb.transactionBuilder.freezeBalanceV2(10e8, 'BANDWIDTH', accounts.b58[1]);
                await broadcaster(null, accounts.pks[1], freezeTx);
                await waitChainData('tx', freezeTx.txID);
            });

            it('should return true', async function () {
                for (const param of params) {
                    const transaction = await tronWeb.transactionBuilder.delegateResource(...param);
                    const data = generateData(param);
                    const authResult =
                        TronWeb.utils.transaction.txCheckWithArgs(transaction, data);
                    assert.equal(authResult, true);
                    commonAssertPbWithArgs(transaction, data);
                }
            });
            commonAssertFalse('delegateResource', generateData, params);
        });

        describe('#case UnDelegateResourceContract', function () {
            const params = [];

            const generateData = (param) => {
                return {
                    balance: parseInt(param[0]),
                    resource: param[2],
                    owner_address: tronWeb.address.toHex(param[3]),
                    receiver_address: tronWeb.address.toHex(param[1]),
                    Permission_id: param[4]?.permissionId,
                };
            };

            before(async () => {
                params.push(...[
                    [10e6, accounts.b58[2], 'BANDWIDTH', accounts.b58[1], { permissionId: 2 }],
                    [10e6, accounts.b58[2], 'BANDWIDTH', accounts.b58[1]]
                ]);
            });

            it('should return true', async function () {
                for (const param of params) {
                    const delegateTx = await tronWeb.transactionBuilder.delegateResource(...param);
                    await broadcaster(null, accounts.pks[1], delegateTx);
                    await waitChainData('tx', delegateTx.txID);
                    const transaction = await tronWeb.transactionBuilder.undelegateResource(...param);
                    const data = generateData(param);
                    const authResult =
                        TronWeb.utils.transaction.txCheckWithArgs(transaction, data);
                    assert.equal(authResult, true);
                    commonAssertPbWithArgs(transaction, data);
                }
            });
            commonAssertFalse('undelegateResource', generateData, params);
        });

        describe('#case WithdrawExpireUnfreezeContract', function () {
            const params = [];

            const generateData = (param) => {
                return {
                    owner_address: tronWeb.address.toHex(param[0]),
                    Permission_id: param[1]?.permissionId,
                };
            };

            before(async () => {
                params.push([accounts.b58[1], { permissionId: 2 }]);
                params.push([accounts.b58[1]]);
                const freezeTx = await tronWeb.transactionBuilder.freezeBalanceV2(10e6, 'BANDWIDTH', ...params[1]);
                await broadcaster(null, accounts.pks[1], freezeTx);
                await waitChainData('tx', freezeTx.txID);
                const unfreezeTx = await tronWeb.transactionBuilder.unfreezeBalanceV2(10e6, 'BANDWIDTH', ...params[1]);
                await broadcaster(null, accounts.pks[1], unfreezeTx);
                await waitChainData('tx', unfreezeTx.txID);
                await wait(65); // freeze timeout in 60s in dev docker
            });

            it('should return true', async function () {
                for (const param of params) {
                    const transaction = await tronWeb.transactionBuilder.withdrawExpireUnfreeze(...param);
                    const data = generateData(param);
                    const authResult =
                        TronWeb.utils.transaction.txCheckWithArgs(transaction, data);
                    assert.equal(authResult, true);
                    commonAssertPbWithArgs(transaction, data);
                }
            });
            commonAssertFalse('withdrawExpireUnfreeze', generateData, params);
        });

        describe("#case WitnessCreateContract", async function () {

            let url = 'https://xtron.network';
            const params = [];

            const generateData = (param) => {
                return {
                    owner_address: tronWeb.address.toHex(param[0]),
                    url: tronWeb.fromUtf8(param[1]),
                    Permission_id: param[2]?.permissionId,
                };
            };

            before(() => {
                params.push(...[
                    [accounts.b58[13], url, { permissionId: 2 }],
                    [accounts.b58[13], url],
                ]);
            });

            it('should allow accounts[1] to apply for SR, it should return true', async function () {
                for (const param of params) {
                    const sendTrxTransaction = tronWeb.transactionBuilder.sendTrx(param[0], 11000e6);
                    await broadcaster(sendTrxTransaction, PRIVATE_KEY);
                    const transaction = await tronWeb.transactionBuilder.applyForSR(...param);
                    const data = generateData(param);
                    const authResult =
                        TronWeb.utils.transaction.txCheckWithArgs(transaction, data);
                    assert.equal(authResult, true);
                    commonAssertPbWithArgs(transaction, data);
                }
            });
            commonAssertFalse('applyForSR', generateData, params);
        });

        describe('#case VoteWitnessContract', function () {

            let url = 'https://xtron.network';
            const params = [];
            const generateData = (param) => {
                return {
                    owner_address: tronWeb.address.toHex(accounts.b58[1]),
                    votes: Object.entries(param[0]).map(([address, voteCount]) => {
                        return {
                            vote_address: TronWeb.address.toHex(address),
                            vote_count: parseInt(voteCount),
                        };
                    }),
                    Permission_id: param[2]?.permissionId,
                };
            };

            before(async function () {
                params.push(...[
                    [
                        {
                            [accounts.hex[12]]: 5,
                        },
                        accounts.b58[1],
                    ],
                    [
                        {
                            [accounts.hex[12]]: 5,
                        },
                        accounts.b58[1],
                        2,
                    ]
                ]);
                await broadcaster(tronWeb.transactionBuilder.sendTrx(accounts.b58[12], 10000e6), PRIVATE_KEY);
                await broadcaster(tronWeb.transactionBuilder.applyForSR(accounts.b58[12], url), accounts.pks[12])
                await broadcaster(tronWeb.transactionBuilder.freezeBalanceV2(100e6, 'BANDWIDTH', accounts.b58[1]), accounts.pks[1])
            })

            it('should allows accounts.b58[1] to vote for accounts[12] as SR, it should return true', async function () {
                for (const param of params) {
                    const transaction = await tronWeb.transactionBuilder.vote(
                        ...param
                    );
                    const data = generateData(param);
                    const authResult =
                        TronWeb.utils.transaction.txCheckWithArgs(transaction, data);
                    assert.equal(authResult, true);
                    commonAssertPbWithArgs(transaction, data);
                }
                
            });
            commonAssertFalse('vote', generateData, params);
        });

        describe("#case CreateSmartContract", function () {
            it('should create a smart contract with default parameters, it should return true', async function () {

                const options = {
                    abi: testRevert.abi,
                    bytecode: testRevert.bytecode,
                    feeLimit: 8e7
                };
                for (let i = 0; i < 2; i++) {
                    if (i === 1) options.permissionId = 2;
                    const transaction = await tronWeb.transactionBuilder.createSmartContract(options)
                    const args = {
                        owner_address: tronWeb.defaultAddress.hex,
                        fee_limit: parseInt(options.feeLimit),
                        call_value: 0,
                        consume_user_resource_percent: 100,
                        origin_energy_limit: 10_000_000,
                        abi: JSON.stringify(options.abi),
                        bytecode: options.bytecode,
                        parameter: '',
                        name: '',
                        Permission_id: options.permissionId,
                    };
                    const authResult =
                        TronWeb.utils.transaction.txCheckWithArgs(transaction, args, options);
                    assert.equal(authResult, true);
                    commonAssertPbWithArgs(transaction, args, options);
                }
            });
        });

        describe("#case ClearABIContract", function () {

            let transaction;
            let contract;
            const params = [];

            before(async function () {
                transaction = await tronWeb.transactionBuilder.createSmartContract({
                    abi: testConstant.abi,
                    bytecode: testConstant.bytecode
                }, accounts.hex[3]);
                await broadcaster(null, accounts.pks[3], transaction);
                await waitChainData('tx', transaction.txID);
                params.push(...[
                    // [transaction.contract_address, accounts.hex[3], { permissionId: 2 }],
                    [transaction.contract_address, accounts.hex[3]],
                ])
            })

            it('should clear contract abi, it should return true', async function () {
                const contractAddress = transaction.contract_address;
                // verify contract abi before
                contract = await tronWeb.trx.getContract(contractAddress);
                assert.isTrue(Object.keys(contract.abi).length > 0)

                for (const param of params) {
                    // clear abi
                    transaction = await tronWeb.transactionBuilder.clearABI(...param);
                    const data = {
                        contract_address: tronWeb.address.toHex(param[0]),
                        owner_address: param[1],
                        Permission_id: param[2]?.permissionId,
                    };
                    const authResult =
                            TronWeb.utils.transaction.txCheckWithArgs(transaction, data);
                    assert.equal(authResult, true);
                    commonAssertPbWithArgs(transaction, data);
                }
            });
        });

        describe("#case UpdateBrokerageContract", async function () {
            before(async () => {
                await broadcaster(tronWeb.transactionBuilder.sendTrx(accounts.b58[13], 10000e6), PRIVATE_KEY);
                const transaction = await tronWeb.transactionBuilder.applyForSR(accounts.b58[13], 'url.tron.network');
                await broadcaster(transaction, accounts.pks[13]);
                await waitChainData('tx', transaction.txID);
            });
            it('should auth sr brokerage successful', async function () {
                const transaction = await tronWeb.transactionBuilder.updateBrokerage(10, accounts.hex[13]);
                const data = {
                    brokerage: 10,
                    owner_address: accounts.hex[13],
                };
                const authResult =
                        TronWeb.utils.transaction.txCheckWithArgs(transaction, data);
                assert.equal(authResult, true);
                commonAssertPbWithArgs(transaction, data);
            });
        });

        describe("#case AssetIssueContract", function () {
            it(`should allow accounts[2] to create a TestToken`, async function () {

                const options = getTokenOptions();
                const createrAccountIdx = 11;
                for (let i = 0; i < 2; i++) {
                    if (i === 1) options.permissionId = 2;
                    const transaction = await tronWeb.transactionBuilder.createToken(options, accounts.b58[createrAccountIdx]);
                    const {
                        name = false,
                        abbreviation = false,
                        description = false,
                        url = false,
                        totalSupply = 0,
                        trxRatio = 1, // How much TRX will `tokenRatio` cost?
                        tokenRatio = 1, // How many tokens will `trxRatio` afford?
                        saleStart = Date.now(),
                        saleEnd = false,
                        freeBandwidth = 0, // The creator's "donated" bandwidth for use by token holders
                        freeBandwidthLimit = 0, // Out of `totalFreeBandwidth`, the amount each token holder get
                        frozenAmount = 0,
                        frozenDuration = 0,
                        // for now there is no default for the following values
                    } = options;
                    const data = {
                        owner_address: accounts.hex[createrAccountIdx],
                        name: tronWeb.fromUtf8(name),
                        abbr: tronWeb.fromUtf8(abbreviation),
                        description: tronWeb.fromUtf8(description),
                        url: tronWeb.fromUtf8(url),
                        total_supply: parseInt(totalSupply),
                        trx_num: parseInt(trxRatio),
                        num: parseInt(tokenRatio),
                        start_time: parseInt(saleStart),
                        end_time: parseInt(saleEnd),
                        free_asset_net_limit: parseInt(freeBandwidth),
                        public_free_asset_net_limit: parseInt(freeBandwidthLimit),
                        frozen_supply: {
                            frozen_amount: parseInt(frozenAmount),
                            frozen_days: parseInt(frozenDuration)
                        },
                        Permission_id: options.permissionId,
                    }
                    const authResult =
                        TronWeb.utils.transaction.txCheckWithArgs(transaction, data, options);
                    assert.equal(authResult, true);
                    commonAssertPbWithArgs(transaction, data, options);

                }
            });
        });

        describe("#case AccountCreateContract", function () {
            const params = [];
            const generateData = (param) => {
                return {
                    account_address: tronWeb.address.toHex(param[0]),
                    owner_address: tronWeb.address.toHex(param[1]),
                    Permission_id: param[2]?.permissionId
                };
            };

            it(`should create a new account`, async function () {
                const newAccount = await TronWeb.createAccount();
                params.push(...[
                    [newAccount.address.base58, accounts.b58[3], { permissionId: 2 }],
                    [newAccount.address.base58, accounts.b58[3]]
                ]);

                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.createAccount(...param);
                    const data = generateData(param);
                    const authResult =
                        TronWeb.utils.transaction.txCheckWithArgs(transaction, data);
                    assert.equal(authResult, true);
                    commonAssertPbWithArgs(transaction, data);
                }
            });
            commonAssertFalse('createAccount', generateData, params);
        });

        describe("#case AccountUpdateContract", function () {
            const params = [];
            const generateData = (param) => {
                return {
                    account_name: tronWeb.fromUtf8(param[0]),
                    owner_address: tronWeb.address.toHex(param[1]),
                    Permission_id: param[2]?.permissionId
                };
            };

            it(`should update accounts[3]`, async function () {
                const newName = 'New name'
                params.push(...[
                    [newName, accounts.b58[3], { permissionId: 2 }],
                    [newName, accounts.b58[3]]
                ]);

                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.updateAccount(...param);
                    const data = generateData(param);
                    const authResult =
                        TronWeb.utils.transaction.txCheckWithArgs(transaction, data);
                    assert.equal(authResult, true);
                    commonAssertPbWithArgs(transaction, data);
                }
            });
            commonAssertFalse('updateAccount', generateData, params);
        });

        describe("#case SetAccountIdContract", function () {
            it(`should set account id accounts[3]`, async function () {

                const ids = ['abcabc110', 'testtest', 'jackieshen110'];

                for (let id of ids) {
                    let accountId = TronWeb.toHex(id);
                    const transaction = await tronWeb.transactionBuilder.setAccountId(accountId, accounts.b58[3]);
                    const data = {
                        account_id: accountId,
                        owner_address: accounts.hex[3],
                    };
                    const authResult =
                        TronWeb.utils.transaction.txCheckWithArgs(transaction, data);
                    assert.equal(authResult, true);
                    commonAssertPbWithArgs(transaction, data);
                }

            });
        });

        describe("#case ProposalCreateContract", function () {
            let parameters = [{ "key": 0, "value": 100000 }, { "key": 1, "value": 2 }]
            const params = [];
            const generateData = (input) => {
                return {
                    owner_address: tronWeb.address.toHex(input[1]),
                    parameters: [input[0]],
                    Permission_id: input[2]?.permissionId,
                };
            };

            before(async () => {
                params.push(...[
                    [parameters[0], accounts.b58[14], { permissionId: 2 }],
                    [parameters[0], accounts.b58[14]]
                ]);
                await broadcaster(tronWeb.transactionBuilder.sendTrx(accounts.b58[14], 10000e6), PRIVATE_KEY);
                const transaction = await tronWeb.transactionBuilder.applyForSR(accounts.b58[14], 'url.tron.network');
                await broadcaster(transaction, accounts.pks[14]);
                await waitChainData('tx', transaction.txID);
            });

            it('should allow the SR account to create a new proposal as a single object', async function () {

                for (let input of params) {
                    const transaction = await tronWeb.transactionBuilder.createProposal(...input)
                    const data = generateData(input);
                    const authResult =
                        TronWeb.utils.transaction.txCheckWithArgs(transaction, data);
                    assert.equal(authResult, true);
                    commonAssertPbWithArgs(transaction, data);
                }

            });
            commonAssertFalse('createProposal', generateData, params);
        });

        describe("#case ProposalDeleteContract", function () {
            let proposals;
            const params = [];
            
            const generateData = (param) => {
                return {
                    owner_address: tronWeb.address.toHex(ADDRESS_BASE58),
                    proposal_id: param[0],
                    Permission_id: param[1]?.permissionId,
                };
            };

            before(async function () {
                // comments below should be uncomment when first run
                // const transaction = await tronWeb.transactionBuilder.applyForSR(ADDRESS_BASE58, 'url.tron.network');
                // await broadcaster(transaction, PRIVATE_KEY);
                // await waitChainData('tx', transaction.txID);

                let parameters = [{ "key": 0, "value": 100000 }, { "key": 1, "value": 2 }]

                await broadcaster(tronWeb.transactionBuilder.createProposal(parameters, ADDRESS_BASE58), PRIVATE_KEY)

                proposals = await tronWeb.trx.listProposals();

                params.push(...[
                    [proposals[0].proposal_id, { permissionId: 2 }],
                    [proposals[0].proposal_id]
                ]);
            })

            it('should allow the SR to delete its own proposal', async function () {
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.deleteProposal(...param)
                    const data = generateData(param);
                    const authResult =
                        TronWeb.utils.transaction.txCheckWithArgs(transaction, data);
                    assert.equal(authResult, true);
                    commonAssertPbWithArgs(transaction, data);
                }

            });
            commonAssertFalse('deleteProposal', generateData, params);
        });

        describe("#case ProposalApproveContract", function () {
            let proposals;
            const params = [];

            const generateData = (param) => {
                return {
                    owner_address: tronWeb.address.toHex(param[2]),
                    proposal_id: parseInt(param[0]),
                    is_add_approval: param[1],
                    Permission_id: param[3]?.permissionId,
                };
            };

            before(async function () {

                this.timeout(20000)

                const sendTrxTransaction = await tronWeb.transactionBuilder.sendTrx(accounts.b58[16], 10000e6);
                await broadcaster(sendTrxTransaction, PRIVATE_KEY);
                waitChainData('tx', sendTrxTransaction.txID);
                const applyForSrTransaction = await tronWeb.transactionBuilder.applyForSR(accounts.b58[16], 'url.tron.network');
                await broadcaster(applyForSrTransaction, accounts.pks[16]);
                waitChainData('tx', applyForSrTransaction.txID);
                let parameters = [{ "key": 0, "value": 100000 }, { "key": 1, "value": 2 }]

                await broadcaster(tronWeb.transactionBuilder.createProposal(parameters, ADDRESS_BASE58), PRIVATE_KEY)

                proposals = await tronWeb.trx.listProposals();

                params.push(...[
                    [proposals[0].proposal_id, true, accounts.b58[16], { permissionId: 2 }],
                    [proposals[0].proposal_id, true, accounts.b58[16]]
                ]);
            })

            it('should allow the SR to delete its own proposal', async function () {
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.voteProposal(...param)
                    const data = generateData(param);
                    const authResult =
                        TronWeb.utils.transaction.txCheckWithArgs(transaction, data);
                    assert.equal(authResult, true);
                    commonAssertPbWithArgs(transaction, data);
                }

            });
            commonAssertFalse('voteProposal', generateData, params);
            
        });

        describe("#case ExchangeCreateContract", function () {
            const idxS = 18;
            const idxE = 20;
            const toIdx1 = 2;
            const toIdx2 = 1;
            let tokenNames = [];

            before(async function () {
                this.timeout(20000);

                // create token
                for (let i = idxS; i < idxE; i++) {
                    const options = getTokenOptions();
                    const transaction = await tronWeb.transactionBuilder.createToken(options, accounts.hex[i]);
                    await broadcaster(null, accounts.pks[i], transaction);
                    await waitChainData('token', accounts.hex[i]);
                    const token = await tronWeb.trx.getTokensIssuedByAddress(accounts.hex[i]);
                    await waitChainData('tokenById', token[Object.keys(token)[0]]['id']);
                    await broadcaster(null, accounts.pks[i], await tronWeb.transactionBuilder.sendToken(
                        accounts.hex[toIdx1],
                        10e4,
                        token[Object.keys(token)[0]]['id'],
                        token[Object.keys(token)[0]]['owner_address']
                    ));
                    await waitChainData('sendToken', accounts.hex[toIdx1], 0);
                    await broadcaster(null, accounts.pks[i], await tronWeb.transactionBuilder.sendToken(
                        accounts.hex[toIdx2],
                        10e4,
                        token[Object.keys(token)[0]]['id'],
                        token[Object.keys(token)[0]]['owner_address']
                    ));
                    await waitChainData('sendToken', accounts.hex[toIdx2], 0);
                    tokenNames.push(token[Object.keys(token)[0]]['id']);
                }

            });

            it('should create token exchange', async function () {
                let transaction = await tronWeb.transactionBuilder.createTokenExchange(tokenNames[0], 10e3, tokenNames[1], 10e3, accounts.hex[toIdx1]);
                let data = {
                    owner_address: accounts.hex[toIdx1],
                    first_token_id: tronWeb.fromUtf8(tokenNames[0]),
                    first_token_balance: 10e3,
                    second_token_id: tronWeb.fromUtf8(tokenNames[1]),
                    second_token_balance: 10e3
                };
                const authResult =
                    TronWeb.utils.transaction.txCheckWithArgs(transaction, data);
                assert.equal(authResult, true);
                commonAssertPbWithArgs(transaction, data);

                transaction = await tronWeb.transactionBuilder.createTokenExchange(tokenNames[0], 10e3, tokenNames[1], 10e3, accounts.hex[toIdx1], { permissionId: 2 });
                data = {
                    owner_address: accounts.hex[toIdx1],
                    first_token_id: tronWeb.fromUtf8(tokenNames[0]),
                    first_token_balance: 10e3,
                    second_token_id: tronWeb.fromUtf8(tokenNames[1]),
                    second_token_balance: 10e3,
                    Permission_id: 2,
                };
                const authResult2 =
                    TronWeb.utils.transaction.txCheckWithArgs(transaction, data);
                assert.equal(authResult2, true);
                commonAssertPbWithArgs(transaction, data);
            });
        });

        describe("#case ExchangeInjectContract", function () {
            const idxS = 20;
            const idxE = 22;
            let tokenNames = [];
            let exchangeId = '';
            const params = [];

            const generateData = (param) => {
                return {
                    owner_address: tronWeb.defaultAddress.hex,
                    exchange_id: parseInt(param[0]),
                    token_id: tronWeb.fromUtf8(param[1]),
                    quant: parseInt(param[2]),
                    Permission_id: param[3]?.permissionId,
                };
            };

            before(async function () {
                this.timeout(20000);

                // create token
                for (let i = idxS; i < idxE; i++) {
                    const options = getTokenOptions();
                    const transaction = await tronWeb.transactionBuilder.createToken(options, accounts.hex[i]);
                    await broadcaster(null, accounts.pks[i], transaction);
                    await waitChainData('token', accounts.hex[i]);
                    const token = await tronWeb.trx.getTokensIssuedByAddress(accounts.hex[i]);
                    await waitChainData('tokenById', token[Object.keys(token)[0]]['id']);
                    await broadcaster(null, accounts.pks[i], await tronWeb.transactionBuilder.sendToken(
                        tronWeb.defaultAddress.hex,
                        10e4,
                        token[Object.keys(token)[0]]['id'],
                        token[Object.keys(token)[0]]['owner_address']
                    ));
                    tokenNames.push(token[Object.keys(token)[0]]['id']);
                }
                const transaction = await tronWeb.transactionBuilder.createTokenExchange(tokenNames[1], 10, tokenNames[0], 10);
                await broadcaster(null, PRIVATE_KEY, transaction);
                let receipt = await tronWeb.trx.getTransactionInfo(transaction.txID);
                while (!Object.keys(receipt).length) {
                    await wait(5);
                    receipt = await tronWeb.trx.getTransactionInfo(transaction.txID);
                }
                exchangeId = receipt.exchange_id;
                params.push(...[
                    [exchangeId, tokenNames[0], 10, { permissionId: 2 }],
                    [exchangeId, tokenNames[0], 10]
                ]);
            });
            // todo, need check, new case for injectExchangeTokens
            it(`it should return true`, async function () {
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.injectExchangeTokens(
                        ...param
                    );
                    const data = generateData(param);
                    const authResult =
                        TronWeb.utils.transaction.txCheckWithArgs(transaction, data);
                    assert.equal(authResult, true);
                    commonAssertPbWithArgs(transaction, data);
                }
            });
            commonAssertFalse('injectExchangeTokens', generateData, params);
        });

        describe("#case ExchangeWithdrawContract", function () {
            const idxS = 22;
            const idxE = 24;
            let tokenNames = [];
            let exchangeId = '';
            const params = [];

            const generateData = (param) => {
                return {
                    owner_address: tronWeb.defaultAddress.hex,
                    exchange_id: parseInt(param[0]),
                    token_id: tronWeb.fromUtf8(param[1]),
                    quant: parseInt(param[2]),
                    Permission_id: param[3]?.permissionId,
                };
            };

            before(async function () {
                this.timeout(20000);

                // create token
                for (let i = idxS; i < idxE; i++) {
                    const options = getTokenOptions();
                    const transaction = await tronWeb.transactionBuilder.createToken(options, accounts.hex[i]);
                    await broadcaster(null, accounts.pks[i], transaction);
                    await waitChainData('token', accounts.hex[i]);
                    const token = await tronWeb.trx.getTokensIssuedByAddress(accounts.hex[i]);
                    await waitChainData('tokenById', token[Object.keys(token)[0]]['id']);
                    await broadcaster(null, accounts.pks[i], await tronWeb.transactionBuilder.sendToken(
                        tronWeb.defaultAddress.hex,
                        10e4,
                        token[Object.keys(token)[0]]['id'],
                        token[Object.keys(token)[0]]['owner_address']
                    ));
                    tokenNames.push(token[Object.keys(token)[0]]['id']);
                }
                const transaction = await tronWeb.transactionBuilder.createTokenExchange(tokenNames[1], 10, tokenNames[0], 10);
                await broadcaster(transaction);
                let receipt = await tronWeb.trx.getTransactionInfo(transaction.txID);
                while (!Object.keys(receipt).length) {
                    await wait(5);
                    receipt = await tronWeb.trx.getTransactionInfo(transaction.txID);
                }
                exchangeId = receipt.exchange_id;
                params.push(...[
                    [exchangeId, tokenNames[0], 10, { permissionId: 2 }],
                    [exchangeId, tokenNames[0], 10]
                ]);
            });
            it(`it should return true`, async function () {
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.withdrawExchangeTokens(
                        ...param
                    );
                    const data = generateData(param);
                    const authResult =
                        TronWeb.utils.transaction.txCheckWithArgs(transaction, data);
                    assert.equal(authResult, true);
                    commonAssertPbWithArgs(transaction, data);
                }
            });
            commonAssertFalse('withdrawExchangeTokens', generateData, params);
        });

        describe("#case ExchangeTransactionContract", function () {
            const idxS = 24;
            const idxE = 26;
            let tokenNames = [];
            let exchangeId = '';
            const params = [];

            const generateData = (param) => {
                return {
                    owner_address: tronWeb.defaultAddress.hex,
                    exchange_id: parseInt(param[0]),
                    token_id: tronWeb.fromUtf8(param[1]),
                    quant: parseInt(param[2]),
                    expected: param[3],
                    Permission_id: param[4]?.permissionId,
                };
            };

            before(async function () {
                this.timeout(20000);

                // create token
                for (let i = idxS; i < idxE; i++) {
                    const options = getTokenOptions();
                    const transaction = await tronWeb.transactionBuilder.createToken(options, accounts.hex[i]);
                    await broadcaster(null, accounts.pks[i], transaction);
                    await waitChainData('token', accounts.hex[i]);
                    const token = await tronWeb.trx.getTokensIssuedByAddress(accounts.hex[i]);
                    await waitChainData('tokenById', token[Object.keys(token)[0]]['id']);
                    await broadcaster(null, accounts.pks[i], await tronWeb.transactionBuilder.sendToken(
                        tronWeb.defaultAddress.hex,
                        10e4,
                        token[Object.keys(token)[0]]['id'],
                        token[Object.keys(token)[0]]['owner_address']
                    ));
                    tokenNames.push(token[Object.keys(token)[0]]['id']);
                }
                const transaction = await tronWeb.transactionBuilder.createTokenExchange(tokenNames[1], 10, tokenNames[0], 10);
                await broadcaster(transaction);
                let receipt = await tronWeb.trx.getTransactionInfo(transaction.txID);
                while (!Object.keys(receipt).length) {
                    await wait(5);
                    receipt = await tronWeb.trx.getTransactionInfo(transaction.txID);
                }
                exchangeId = receipt.exchange_id;
                params.push(...[
                    [exchangeId, tokenNames[0], 10, 5, { permissionId: 2 }],
                    [exchangeId, tokenNames[0], 10, 5]
                ]);
            });
            // todo, need check, new case for tradeExchangeTokens
            it(`it should return true`, async function () {
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.tradeExchangeTokens(
                        ...param
                    );
                    const data = generateData(param);
                    const authResult =
                        TronWeb.utils.transaction.txCheckWithArgs(transaction, data);
                    assert.equal(authResult, true);
                    commonAssertPbWithArgs(transaction, data);
                }
            });
            commonAssertFalse('tradeExchangeTokens', generateData, params);
        });

        describe("#case UpdateSettingContract", function () {
            let transaction;
            let contract;
            const params = [];

            const generateData = (param) => {
                return {
                    owner_address: tronWeb.address.toHex(param[2]),
                    contract_address: tronWeb.address.toHex(param[0]),
                    consume_user_resource_percent: param[1],
                    Permission_id: param[3]?.permissionId,
                };
            };

            before(async function () {
                transaction = await tronWeb.transactionBuilder.createSmartContract({
                    abi: testConstant.abi,
                    bytecode: testConstant.bytecode
                }, accounts.hex[3]);
                await broadcaster(null, accounts.pks[3], transaction);
                await waitChainData('tx', transaction.txID);
                params.push(...[
                    [transaction.contract_address, 10, accounts.b58[3], { permissionId: 2 }],
                    [transaction.contract_address, 20, accounts.b58[3]]
                ]);
            })
            // todo, need check, new case for updateSetting
            it(`it should return true`, async function () {
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.updateSetting(
                        ...param
                    );
                    const data = generateData(param);
                    const authResult =
                        TronWeb.utils.transaction.txCheckWithArgs(transaction, data);
                    assert.equal(authResult, true);
                    commonAssertPbWithArgs(transaction, data);
                }
            });
            commonAssertFalse('updateSetting', generateData, params);
        });

        describe("#case UpdateEnergyLimitContract", function () {
            let transaction;
            let contract;
            const params = [];

            const generateData = (param) => {
                return {
                    owner_address: tronWeb.address.toHex(param[2]),
                    contract_address: tronWeb.address.toHex(param[0]),
                    origin_energy_limit: param[1],
                    Permission_id: param[3]?.permissionId
                };
            };

            before(async function () {
                this.timeout(20000);

                transaction = await tronWeb.transactionBuilder.createSmartContract({
                    abi: testConstant.abi,
                    bytecode: testConstant.bytecode
                }, accounts.hex[3]);
                await broadcaster(null, accounts.pks[3], transaction);
                await waitChainData('tx', transaction.txID);
                params.push(...[
                    [transaction.contract_address, 10e6, accounts.b58[3], { permissionId: 2 }],
                    [transaction.contract_address, 10e6, accounts.b58[3]]
                ]);
            })
            // todo, need check, new case for updateEnergyLimit
            it(`it should return true`, async function () {
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.updateEnergyLimit(
                        ...param
                    );
                    const data = generateData(param);
                    const authResult =
                        TronWeb.utils.transaction.txCheckWithArgs(transaction, data);
                    assert.equal(authResult, true);
                    commonAssertPbWithArgs(transaction, data);
                }
            });
            commonAssertFalse('updateEnergyLimit', generateData, params);
        });

        describe("#case AccountPermissionUpdateContract", function () {
            before(async () => {
                await broadcaster(tronWeb.transactionBuilder.sendTrx(accounts.b58[17], 10000e6), PRIVATE_KEY);
                const transaction = await tronWeb.transactionBuilder.applyForSR(accounts.b58[17], 'url.tron.network');
                await broadcaster(transaction, accounts.pks[17]);
                await waitChainData('tx', transaction.txID);
            });
            it(`it should return true`, async function () {
                const permissionData = {
                    "owner": {
                      "type": 0,
                      "keys": [
                        {
                          "address": accounts.hex[17],
                          "weight": 1
                        }
                      ],
                      "threshold": 1,
                      "permission_name": "owner"
                    },
                    "witness": {
                      "keys": [
                        {
                          "address": accounts.hex[17],
                          "weight": 1
                        }
                      ],
                      "threshold": 1,
                      "id": 1,
                      "type": 1,
                      "permission_name": "witness"
                    },
                    "owner_address": accounts.hex[17],
                    "actives": [
                      {
                        "operations": "7fff1fc0033e0000000000000000000000000000000000000000000000000000",
                        "keys": [
                          {
                            "address": accounts.hex[17],
                            "weight": 1
                          }
                        ],
                        "threshold": 1,
                        "id": 2,
                        "type": 2,
                        "permission_name": "active"
                      }
                    ]
                };
                const params = [
                    [accounts.hex[17], permissionData.owner, permissionData.witness, permissionData.actives]
                ];
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.updateAccountPermissions(
                        ...param
                    );
                    const data = {
                        owner_address: param[0],
                        owner: param[1],
                        witness: param[2],
                        actives: param[3][0],
                        Permission_id: param[4]?.permissionId,
                    };
                    const authResult =
                        TronWeb.utils.transaction.txCheckWithArgs(transaction, data);
                    assert.equal(authResult, true);
                    commonAssertPbWithArgs(transaction, data);
                }
            });
        });

        describe('#case commonOptions', function () {
            it('should include feeLimit and auth true', async function () {
                const data = {
                    abi: testRevert.abi,
                    bytecode: testRevert.bytecode,
                    feeLimit: 8e7
                };
                for (let i = 0; i < 2; i++) {
                    if (i === 1) data.permissionId = 2;
                    const transaction = await tronWeb.transactionBuilder.createSmartContract(data)
                    const args = {
                        owner_address: tronWeb.defaultAddress.hex,
                        call_value: 0,
                        consume_user_resource_percent: 100,
                        origin_energy_limit: 10_000_000,
                        abi: JSON.stringify(data.abi),
                        bytecode: data.bytecode,
                        parameter: '',
                        name: '',
                        Permission_id: data.permissionId,
                    };
                    const options = {
                        fee_limit: data.feeLimit,
                    };
                    const authResult =
                        TronWeb.utils.transaction.txCheckWithArgs(transaction, args, options);
                    assert.equal(authResult, true);
                    commonAssertPbWithArgs(transaction, args, options);
                }
            });
            it('should include data and auth true', async function () {
                const params = [
                    [accounts.b58[1], 10]
                ];
                const generateData = (param) => {
                    return {
                        to_address: TronWeb.address.toHex(param[0]),
                        owner_address: tronWeb.defaultAddress.hex,
                        amount: param[1],
                        Permission_id: param[2]?.permissionId,
                      };
                };
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.sendTrx(
                        ...param
                    );
                    const data = generateData(param);
                    const options = {
                        data: tronWeb.toHex('111'),
                    };
                    const transaction2 = await tronWeb.transactionBuilder.addUpdateData(
                        transaction,
                        options.data,
                        'hex',
                    );
                    const authResult =
                        TronWeb.utils.transaction.txCheckWithArgs(transaction2, data, options);
                    assert.equal(authResult, true);
                    commonAssertPbWithArgs(transaction2, data, options);
                }
            });
            it('should include expiration and auth true', async function () {
                const params = [
                    [accounts.b58[1], 10]
                ];
                const generateData = (param) => {
                    return {
                        to_address: TronWeb.address.toHex(param[0]),
                        owner_address: tronWeb.defaultAddress.hex,
                        amount: param[1],
                        Permission_id: param[2]?.permissionId,
                      };
                };
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.sendTrx(
                        ...param
                    );
                    const data = generateData(param);
                    const options = {
                        expiration: 60 * 60 * 1000 * 24 * 100,
                    };
                    const transaction2 = await tronWeb.transactionBuilder.extendExpiration(
                        transaction,
                        options.expiration / 1000,
                    );
                    const authResult =
                        TronWeb.utils.transaction.txCheckWithArgs(transaction2, data, options);
                    assert.equal(authResult, true);
                    commonAssertPbWithArgs(transaction2, data, options);
                }
            });
        });
    });
});