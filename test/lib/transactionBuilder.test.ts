/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-constant-condition */
import {
    CreateSmartContractOptions,
    CreateTokenOptions,
    TriggerConstantContractOptions,
    TransactionCommonOptions,
    Resource,
    TriggerSmartContractOptions,
    VoteInfo,
    ContractFunctionParameter,
} from '../../src/types/TransactionBuilder';
import { ContractParamterWrapper, CreateSmartContractTransaction, SignedTransaction } from '../../src/types/Transaction';

import { assert } from 'chai';
import txPars from '../helpers/txPars.js';
// const jlog = require('../helpers/jlog');
import assertThrow from '../helpers/assertThrow.js';
import wait from '../helpers/wait.js';
import broadcaster from '../helpers/broadcaster.js';
// const pollAccountFor = require('../helpers/pollAccountFor');
import _ from 'lodash';
import tronWebBuilder from '../helpers/tronWebBuilder';
import assertEqualHex from '../helpers/assertEqualHex';
import {
    AccountCreateContract,
    AccountUpdateContract,
    AssetIssueContract,
    ClearABIContract,
    DelegateResourceContract,
    ExchangeCreateContract,
    FreezeBalanceContract,
    FreezeBalanceV2Contract,
    ParticipateAssetIssueContract,
    ProposalCreateContract,
    ProposalDeleteContract,
    SetAccountIdContract,
    TransferContract,
    UnDelegateResourceContract,
    UnfreezeBalanceV2Contract,
    UpdateAssetContract,
    UpdateBrokerageContract,
    VoteWitnessContract,
    WitnessCreateContract,
} from '../../src/types/Contract.js';
import { TronWeb, utils } from '../setup/TronWeb.js';
import { TransactionBuilder } from '../../src/lib/TransactionBuilder/TransactionBuilder.js';
import Contracts from '../fixtures/contracts';
import waitChainData from '../helpers/waitChainData';
import testUtils from '../helpers/testUtils';
const { equals, getValues } = testUtils;
const {
    testRevert,
    testConstant,
    arrayParam,
    rawParam,
    funcABIV2,
    funcABIV2_2,
    funcABIV2_3,
    funcABIV2_4,
    testSetVal,
    testPayable,
} = Contracts;
import Config from '../helpers/config';
import { getHeaderInfo } from '../helpers/getBlockHeader';
const { ADDRESS_HEX, ADDRESS_BASE58, UPDATED_TEST_TOKEN_OPTIONS, PRIVATE_KEY, getTokenOptions, isProposalApproved } = Config;

/**
 * Following cases should be test in Nile testnet:
 * - should create a TestToken without freezing anything in 3.6.0
 * - #unfreezeBalance
 * - #withdrawBalance
 */

describe('TronWeb.transactionBuilder', function () {
    let accounts: any;
    let tronWeb: TronWeb;
    let emptyAccount: any;
    let isAllowSameTokenNameApproved: boolean;

    before(async function () {
        tronWeb = tronWebBuilder.createInstance();
        // ALERT this works only with Tron Quickstart:
        accounts = await tronWebBuilder.getTestAccounts(-1);
        emptyAccount = await TronWeb.createAccount();
        isAllowSameTokenNameApproved = (await isProposalApproved(tronWeb, 'getAllowSameTokenName')) as boolean;
    });

    describe('#constructor()', function () {
        it('should have been set a full instance in tronWeb', function () {
            assert.instanceOf(tronWeb.transactionBuilder, TransactionBuilder);
        });
    });

    describe('#sendTrx()', function () {
        it(`should send 0.00001 trx from default address to accounts[1]`, async function () {
            const params: Parameters<TransactionBuilder['sendTrx']>[] = [
                [accounts.b58[1], 10, tronWeb.defaultAddress.hex as string, { permissionId: 2 }],
                [accounts.b58[1], 10],
                [
                    accounts.b58[1],
                    10,
                    tronWeb.defaultAddress.hex as string,
                    { blockHeader: await getHeaderInfo(tronWeb.fullNode) },
                ],
            ];
            for (const param of params) {
                const transaction = await tronWeb.transactionBuilder.sendTrx(...param);

                const parameter = txPars(transaction) as ContractParamterWrapper<TransferContract>;

                assert.equal(transaction.txID.length, 64);
                assert.equal(parameter.value.amount, 10);
                assert.equal(parameter.value.owner_address, ADDRESS_HEX);
                assert.equal(parameter.value.to_address, accounts.hex[1]);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.TransferContract');
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, param[3]?.['permissionId'] || 0);
            }
        });

        it(`should send 10 trx from default address to accounts[1] and broadcast`, async function () {
            const params: Parameters<TransactionBuilder['sendTrx']>[] = [[accounts.b58[1], 10]];
            for (const param of params) {
                const res = await broadcaster(tronWeb.transactionBuilder.sendTrx(...param));
                assert.isTrue(res.receipt.result);
            }
        });

        it(`should send 0.00001 trx from accounts[0] to accounts[1]`, async function () {
            const params: Parameters<TransactionBuilder['sendTrx']>[] = [
                [accounts.b58[1], 10, accounts.b58[0], { permissionId: 2 }],
                [accounts.b58[1], 10, accounts.b58[0]],
            ];
            for (const param of params) {
                const transaction = await tronWeb.transactionBuilder.sendTrx(...param);
                const parameter = txPars(transaction) as ContractParamterWrapper<TransferContract>;

                assert.equal(transaction.txID.length, 64);
                assert.equal(parameter.value.amount, 10);
                assert.equal(parameter.value.owner_address, accounts.hex[0]);
                assert.equal(parameter.value.to_address, accounts.hex[1]);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.TransferContract');
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, param[3] ? param[3]['permissionId'] : 0);
            }
        });

        it('should throw if an invalid address is passed', async function () {
            await assertThrow(
                tronWeb.transactionBuilder.sendTrx('40f0b27e3d16060a5b0e8e995120e00', 10),
                'Invalid recipient address provided'
            );
        });

        it('should throw if an invalid amount is passed', async function () {
            await assertThrow(tronWeb.transactionBuilder.sendTrx(accounts.hex[2], -10), 'Invalid amount provided');
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
            const params = [
                [options, accounts.b58[2]],
                [
                    {
                        ...options,
                        permissionId: 2,
                    },
                    accounts.b58[2],
                ],
                [
                    {
                        ...options,
                        blockHeader: await getHeaderInfo(tronWeb.fullNode),
                    },
                    accounts.b58[2],
                ],
            ];
            for (let param of params) {
                const transaction = await tronWeb.transactionBuilder.createToken(...param);
                const parameter = txPars(transaction) as ContractParamterWrapper<AssetIssueContract>;
                assert.equal(transaction.txID.length, 64);
                assert.equal(parameter.value.total_supply, options.totalSupply);
                await assertEqualHex(parameter.value.abbr, options.abbreviation);
                assert.equal(parameter.value.owner_address, accounts.hex[2]);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.AssetIssueContract');
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, param[0].permissionId || 0);
            }
        });

        it(`should allow accounts[2] to create a TestToken and broadcast`, async function () {
            const options = getTokenOptions();
            const transaction = await tronWeb.transactionBuilder.createToken(options, accounts.b58[2]);
            const res = await broadcaster(transaction, accounts.pks[2]);
            assert.isTrue(res.receipt.result);
        });

        it(`should allow accounts[8] to create a TestToken with voteScore and precision`, async function () {
            if (isAllowSameTokenNameApproved) {
                const options = getTokenOptions();
                options.voteScore = 5;
                options.precision = 4;

                for (let i = 0; i < 2; i++) {
                    if (i === 1) options.permissionId = 2;
                    const transaction = await tronWeb.transactionBuilder.createToken(options, accounts.b58[8 + i]);

                    const parameter = txPars(transaction) as ContractParamterWrapper<AssetIssueContract>;
                    assert.equal(transaction.txID.length, 64);
                    assert.equal(parameter.value.vote_score, options.voteScore);
                    assert.equal(parameter.value.precision, options.precision);
                    assert.equal(parameter.value.total_supply, options.totalSupply);
                    await assertEqualHex(parameter.value.abbr, options.abbreviation);
                    assert.equal(parameter.value.owner_address, accounts.hex[8 + i]);
                    assert.equal(parameter.type_url, 'type.googleapis.com/protocol.AssetIssueContract');
                    assert.equal(transaction.raw_data.contract[0].Permission_id || 0, options.permissionId || 0);

                    await broadcaster(null, accounts.pks[8 + i], transaction);

                    const tokenList = await tronWeb.trx.getTokensIssuedByAddress(accounts.b58[8 + i]);
                    const tokenID = tokenList[options.name].id;
                    const token = await tronWeb.trx.getTokenByID(tokenID);

                    assert.equal(token.vote_score, options.voteScore);
                    assert.equal(token.precision, options.precision);
                }
            } else {
                this.skip();
            }
        });

        it(`should create a TestToken passing any number as a string`, async function () {
            const options = getTokenOptions();
            options.totalSupply = '100';
            options.frozenAmount = '5';
            options.frozenDuration = '2';
            options.saleEnd = options.saleEnd.toString();
            for (let i = 0; i < 2; i++) {
                if (i === 1) options.permissionId = 2;
                const transaction = await tronWeb.transactionBuilder.createToken(options, accounts.b58[46]);
                const parameter = txPars(transaction) as ContractParamterWrapper<AssetIssueContract>;
                await assertEqualHex(parameter.value.abbr, options.abbreviation);
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, options.permissionId || 0);
            }
        });

        it(`should create a TestToken passing with precision is zero`, async function () {
            const options = getTokenOptions();
            options.precision = 0;
            for (let i = 0; i < 2; i++) {
                if (i === 1) options.permissionId = 2;
                const transaction = await tronWeb.transactionBuilder.createToken(options, accounts.b58[47]);
                const parameter = txPars(transaction) as ContractParamterWrapper<AssetIssueContract>;
                await assertEqualHex(parameter.value.abbr, options.abbreviation);
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, options.permissionId || 0);
            }
        });

        it(`should create a TestToken without freezing anything in 3.6.0`, async function () {
            if (tronWeb.fullnodeSatisfies('^3.6.0')) {
                const options = getTokenOptions();
                options.totalSupply = '100';
                options.frozenAmount = '0';
                options.frozenDuration = '0';
                options.saleEnd = options.saleEnd.toString();
                for (let i = 0; i < 2; i++) {
                    if (i === 1) options.permissionId = 2;
                    const transaction = await tronWeb.transactionBuilder.createToken(options);
                    const parameter = txPars(transaction) as ContractParamterWrapper<AssetIssueContract>;
                    await assertEqualHex(parameter.value.abbr, options.abbreviation);
                    assert.equal(transaction.raw_data.contract[0].Permission_id || 0, options.permissionId || 0);
                }
            } else {
                this.skip();
            }
        });

        it('should throw if an invalid name is passed', async function () {
            const options = getTokenOptions();
            options.name = 123;

            await assertThrow(tronWeb.transactionBuilder.createToken(options), 'Invalid token name provided');
        });

        it('should throw if an invalid abbrevation is passed', async function () {
            const options = getTokenOptions();
            options.abbreviation = 123;

            await assertThrow(tronWeb.transactionBuilder.createToken(options), 'Invalid token abbreviation provided');
        });

        it('should throw if an invalid supply amount is passed', async function () {
            const options = getTokenOptions();
            options.totalSupply = [];

            await assertThrow(tronWeb.transactionBuilder.createToken(options), 'Supply amount must be a positive integer');
        });

        it('should throw if TRX ratio is not a positive integer', async function () {
            const options = getTokenOptions();
            options.trxRatio = {};

            await assertThrow(tronWeb.transactionBuilder.createToken(options), 'TRX ratio must be a positive integer');
        });

        it('should throw if token ratio is not a positive integer', async function () {
            const options = getTokenOptions();
            options.tokenRatio = 'tokenRatio';

            await assertThrow(tronWeb.transactionBuilder.createToken(options), 'Token ratio must be a positive integer');
        });

        it('should throw if sale start is invalid', async function () {
            const options = getTokenOptions();
            options.saleStart = Date.now() - 1;

            await assertThrow(tronWeb.transactionBuilder.createToken(options), 'Invalid sale start timestamp provided');

            options.saleStart = 'something';

            await assertThrow(tronWeb.transactionBuilder.createToken(options), 'Invalid sale start timestamp provided');
        });

        it('should throw if sale end is invalid', async function () {
            const options = getTokenOptions();
            options.saleEnd = Date.now() - 1000;

            await assertThrow(tronWeb.transactionBuilder.createToken(options), 'Invalid sale end timestamp provided');

            options.saleEnd = 'something';

            await assertThrow(tronWeb.transactionBuilder.createToken(options), 'Invalid sale end timestamp provided');
        });

        it('should throw if an invalid description is passed', async function () {
            const options = getTokenOptions();
            options.description = 123;

            await assertThrow(tronWeb.transactionBuilder.createToken(options), 'Invalid token description provided');

            options.description = '';

            // should allow empty description
            await tronWeb.transactionBuilder.createToken(options);
        });

        it('should throw if an invalid url is passed', async function () {
            const options = getTokenOptions();
            options.url = 123;

            await assertThrow(tronWeb.transactionBuilder.createToken(options), 'Invalid token url provided');

            options.url = '';

            await assertThrow(tronWeb.transactionBuilder.createToken(options), 'Invalid token url provided');

            options.url = '//www.example.com';

            await assertThrow(tronWeb.transactionBuilder.createToken(options), 'Invalid token url provided');

            options.url = 'https://www.example.com/#' + 'a'.repeat(256);
            await assertThrow(tronWeb.transactionBuilder.createToken(options), 'Invalid token url provided');
        });

        it('should throw if freeBandwidth is invalid', async function () {
            const options = getTokenOptions();
            options.freeBandwidth = -1;

            await assertThrow(tronWeb.transactionBuilder.createToken(options), 'Invalid Free bandwidth amount provided');

            options.freeBandwidth = 'something';

            await assertThrow(tronWeb.transactionBuilder.createToken(options), 'Invalid Free bandwidth amount provided');

            // freeBandwidth is optional
            delete options.freeBandwidth;
            await tronWeb.transactionBuilder.createToken(options);
        });

        it('should throw if freeBandwidthLimit is invalid', async function () {
            const options = getTokenOptions();

            options.freeBandwidth = 10;
            delete options.freeBandwidthLimit;

            await assertThrow(
                tronWeb.transactionBuilder.createToken(options, accounts.b58[48]),
                'Invalid Free bandwidth limit provided'
            );

            options.freeBandwidthLimit = 'something';

            await assertThrow(tronWeb.transactionBuilder.createToken(options), 'Invalid Free bandwidth limit provided');

            // freeBandwidthLimit is optional
            delete options.freeBandwidthLimit;
            await tronWeb.transactionBuilder.createToken(options);
        });

        it('should throw if frozen supply is invalid', async function () {
            const options = getTokenOptions();
            options.frozenAmount = -1;

            await assertThrow(tronWeb.transactionBuilder.createToken(options), 'Invalid Frozen supply provided');

            options.frozenAmount = 'something';

            await assertThrow(tronWeb.transactionBuilder.createToken(options), 'Invalid Frozen supply provided');
        });

        it('should throw if frozen duration is invalid', async function () {
            const options = getTokenOptions();

            options.frozenDuration = 'something';

            await assertThrow(tronWeb.transactionBuilder.createToken(options), 'Invalid Frozen duration provided');
        });

        it('should throw if the issuer address is invalid', async function () {
            const options = getTokenOptions();

            await assertThrow(tronWeb.transactionBuilder.createToken(options, '0xzzzww'), 'Invalid issuer address provided');
        });

        describe('#createAsset()', function () {
            // This test passes only the first time because, in order to test updateToken, we broadcast the token creation

            it(`should allow accounts[2] to create a TestToken`, async function () {
                const options = getTokenOptions();
                const transaction = await tronWeb.transactionBuilder.createAsset(options, accounts.b58[2]);
                const parameter = txPars(transaction) as ContractParamterWrapper<AssetIssueContract>;
                assert.equal(transaction.txID.length, 64);
                assert.equal(parameter.value.total_supply, options.totalSupply);
                await assertEqualHex(parameter.value.abbr, options.abbreviation);
                assert.equal(parameter.value.owner_address, accounts.hex[2]);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.AssetIssueContract');
            });
        });
    });

    describe('#createAccount()', function () {
        it('should create an account by account[3]', async function () {
            const inactiveAccount = await TronWeb.createAccount();
            const inactiveAccountAddress = inactiveAccount.address.base58;
            const params: [string, string, TransactionCommonOptions?][] = [
                [inactiveAccountAddress, accounts.b58[3], { permissionId: 2 }],
                [inactiveAccountAddress, accounts.b58[3]],
                [inactiveAccountAddress, accounts.b58[3], { blockHeader: await getHeaderInfo(tronWeb.fullNode) }],
            ];

            for (const param of params) {
                const transaction = await tronWeb.transactionBuilder.createAccount(...param);
                const parameter = txPars(transaction) as ContractParamterWrapper<AccountCreateContract>;
                assert.equal(transaction.txID.length, 64);
                assert.equal(parameter.value.owner_address, accounts.hex[3]);
                assert.equal(parameter.value.account_address, tronWeb.address.toHex(inactiveAccountAddress).toLowerCase());
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.AccountCreateContract');
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, param[2]?.['permissionId'] || 0);
            }
        });

        it('should throw if an invalid accountAddress is passed', async function () {
            await assertThrow(
                tronWeb.transactionBuilder.createAccount('123', accounts.b58[4]),
                'Invalid account address provided'
            );
        });

        it('should throw if the issuer address is invalid', async function () {
            await assertThrow(
                tronWeb.transactionBuilder.createAccount(accounts.b58[4], '0xzzzww'),
                'Invalid origin address provided'
            );
        });
    });

    describe('#updateAccount()', function () {
        it(`should update accounts[3]`, async function () {
            const newName = 'New name';
            const params: Parameters<TransactionBuilder['updateAccount']>[] = [
                [newName, accounts.b58[3], { permissionId: 2 }],
                [newName, accounts.b58[3]],
                [newName, accounts.b58[3], { blockHeader: await getHeaderInfo(tronWeb.fullNode) }],
            ];

            for (const param of params) {
                const transaction = await tronWeb.transactionBuilder.updateAccount(...param);
                const parameter = txPars(transaction) as ContractParamterWrapper<AccountUpdateContract>;

                assert.equal(transaction.txID.length, 64);
                await assertEqualHex(parameter.value.account_name, newName);
                assert.equal(parameter.value.owner_address, accounts.hex[3]);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.AccountUpdateContract');
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, param[2]?.['permissionId'] || 0);
            }
        });

        it(`should update accounts[3] and broadcast`, async function () {
            const newName = 'New name2';
            const param: [string, string] = [newName, accounts.b58[3]];

            const transaction = await tronWeb.transactionBuilder.updateAccount(...param);
            const res = await broadcaster(transaction, accounts.pks[3]);
            assert.isTrue(res.receipt.result);
        });

        it('should throw if an invalid name is passed', async function () {
            await assertThrow(tronWeb.transactionBuilder.updateAccount('123', accounts.b58[4]), 'Invalid accountName');
        });

        it('should throw if the issuer address is invalid', async function () {
            await assertThrow(tronWeb.transactionBuilder.updateAccount('New name', '0xzzzww'), 'Invalid origin address provided');
        });
    });

    describe('#setAccountId()', function () {
        it(`should set account id accounts[4]`, async function () {
            const params: [string, string, TransactionCommonOptions?][] = [
                [TronWeb.toHex('abcabc110'), accounts.b58[4], { permissionId: 2 }],
                [TronWeb.toHex('testtest'), accounts.b58[4]],
                [TronWeb.toHex('abcabc110'), accounts.b58[4], { blockHeader: await getHeaderInfo(tronWeb.fullNode) }],
            ];

            for (const param of params) {
                const transaction = await tronWeb.transactionBuilder.setAccountId(...param);
                const parameter = txPars(transaction) as ContractParamterWrapper<SetAccountIdContract>;
                assert.equal(transaction.txID.length, 64);
                assert.equal(parameter.value.account_id, param[0].slice(2));
                assert.equal(parameter.value.owner_address, accounts.hex[4]);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.SetAccountIdContract');
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, param[2]?.['permissionId'] || 0);
            }
        });

        it(`should set account id accounts[4] and broadcast`, async function () {
            const param: Parameters<TransactionBuilder['setAccountId']> = [TronWeb.toHex('testtest2'), accounts.b58[4]];

            const transaction = await tronWeb.transactionBuilder.setAccountId(...param);
            const res = await broadcaster(transaction, accounts.pks[4]);
            assert.isTrue(res.receipt.result);
        });

        it('should throw invalid account id error', async function () {
            // account id length should be between 8 and 32
            const ids = ['', '12', '616161616262626231313131313131313131313131313131313131313131313131313131313131'];
            for (const id of ids) {
                await assertThrow(tronWeb.transactionBuilder.setAccountId(id, accounts.b58[4]), 'Invalid accountId provided');
            }
        });

        it('should throw invalid owner address error', async function () {
            await assertThrow(
                tronWeb.transactionBuilder.setAccountId(TronWeb.toHex('testtest001'), '0xzzzww'),
                'Invalid origin address provided'
            );
        });
    });

    describe('#updateToken()', function () {
        let tokenOptions;
        // let tokenID;

        before(async function () {
            this.timeout(10000);

            tokenOptions = getTokenOptions();
            await broadcaster(tronWeb.transactionBuilder.createToken(tokenOptions, accounts.b58[2]), accounts.pks[2]);

            let tokenList;
            while (!tokenList) {
                tokenList = await tronWeb.trx.getTokensIssuedByAddress(accounts.b58[2]);
            }
            // if (isAllowSameTokenNameApproved) {
            //     tokenID = tokenList[tokenOptions.name].id;
            // } else {
            //     tokenID = tokenList[tokenOptions.name].name;
            // }
        });

        it(`should allow accounts[2] to update a TestToken`, async function () {
            const params = [
                [UPDATED_TEST_TOKEN_OPTIONS, accounts.b58[2]],
                [
                    {
                        ...UPDATED_TEST_TOKEN_OPTIONS,
                        permissionId: 2,
                    },
                    accounts.b58[2],
                ],
                [
                    {
                        ...UPDATED_TEST_TOKEN_OPTIONS,
                        blockHeader: await getHeaderInfo(tronWeb.fullNode),
                    },
                    accounts.b58[2],
                ],
            ];
            for (let param of params) {
                const transaction = await tronWeb.transactionBuilder.updateToken(...param);
                const parameter = txPars(transaction) as ContractParamterWrapper<UpdateAssetContract>;
                assert.equal(transaction.txID.length, 64);
                await assertEqualHex(parameter.value.description, UPDATED_TEST_TOKEN_OPTIONS.description);
                await assertEqualHex(parameter.value.url, UPDATED_TEST_TOKEN_OPTIONS.url);
                assert.equal(parameter.value.owner_address, accounts.hex[2]);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.UpdateAssetContract');
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, param[0].permissionId || 0);
            }
        });

        it(`should allow accounts[2] to update a TestToken and broadcast`, async function () {
            const transaction = await tronWeb.transactionBuilder.updateToken(UPDATED_TEST_TOKEN_OPTIONS, accounts.b58[2]);
            const res = await broadcaster(transaction, accounts.pks[2]);
            assert.isTrue(res.receipt.result);
        });

        it('should throw if an invalid description is passed', async function () {
            const options = _.clone(UPDATED_TEST_TOKEN_OPTIONS);
            options.description = 123;

            await assertThrow(
                tronWeb.transactionBuilder.updateToken(options, accounts.hex[2]),
                'Invalid token description provided'
            );

            // should allow description to be empty
            options.description = '';
            await tronWeb.transactionBuilder.updateToken(options, accounts.hex[2]);
        });

        it('should throw if an invalid url is passed', async function () {
            const options = _.clone(UPDATED_TEST_TOKEN_OPTIONS);
            options.url = 123;

            await assertThrow(tronWeb.transactionBuilder.updateToken(options, accounts.hex[2]), 'Invalid token url provided');

            options.url = '';

            await assertThrow(tronWeb.transactionBuilder.updateToken(options, accounts.hex[2]), 'Invalid token url provided');

            options.url = '//www.example.com';

            await assertThrow(tronWeb.transactionBuilder.updateToken(options, accounts.hex[2]), 'Invalid token url provided');

            options.url = 'https://www.example.com/#' + 'a'.repeat(256);
            await assertThrow(tronWeb.transactionBuilder.updateToken(options, accounts.hex[2]), 'Invalid token url provided');
        });

        it('should throw if freeBandwidth is invalid', async function () {
            const options = _.clone(UPDATED_TEST_TOKEN_OPTIONS);
            options.freeBandwidth = -1;

            await assertThrow(
                tronWeb.transactionBuilder.updateToken(options, accounts.hex[2]),
                'Free bandwidth amount must be a positive integer'
            );

            options.freeBandwidth = 'something';

            await assertThrow(
                tronWeb.transactionBuilder.updateToken(options, accounts.hex[2]),
                'Free bandwidth amount must be a positive integer'
            );
        });

        it('should throw if freeBandwidthLimit is invalid', async function () {
            const options = _.clone(UPDATED_TEST_TOKEN_OPTIONS);

            options.freeBandwidth = 10;
            delete options.freeBandwidthLimit;

            await assertThrow(
                tronWeb.transactionBuilder.updateToken(options, accounts.hex[2]),
                'Free bandwidth limit must be a positive integer'
            );

            options.freeBandwidthLimit = 'something';

            await assertThrow(
                tronWeb.transactionBuilder.updateToken(options, accounts.hex[2]),
                'Free bandwidth limit must be a positive integer'
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
                const parameter = txPars(transaction) as ContractParamterWrapper<UpdateAssetContract>;
                assert.equal(transaction.txID.length, 64);
                await assertEqualHex(parameter.value.description, UPDATED_TEST_TOKEN_OPTIONS.description);
                await assertEqualHex(parameter.value.url, UPDATED_TEST_TOKEN_OPTIONS.url);
                assert.equal(parameter.value.owner_address, accounts.hex[2]);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.UpdateAssetContract');
            });
        });
    });

    describe('#purchaseToken()', function () {
        let tokenOptions: CreateTokenOptions;
        let tokenID: any;

        before(async function () {
            this.timeout(10000);

            tokenOptions = getTokenOptions();

            await broadcaster(tronWeb.transactionBuilder.createToken(tokenOptions, accounts.b58[5]), accounts.pks[5]);

            let tokenList;
            while (!tokenList) {
                tokenList = await tronWeb.trx.getTokensIssuedByAddress(accounts.b58[5]);
            }
            if (isAllowSameTokenNameApproved) {
                tokenID = tokenList[tokenOptions.name].id;
            } else {
                tokenID = tokenList[tokenOptions.name].name;
            }
            assert.equal(tokenList[tokenOptions.name].abbr, tokenOptions.abbreviation);
        });

        it('should verify that the asset has been created', async function () {
            let token;
            if (isAllowSameTokenNameApproved) {
                token = await tronWeb.trx.getTokenByID(tokenID);
                assert.equal(token.id, tokenID);
            } else {
                token = await tronWeb.trx.getTokenFromID(tokenID);
            }
            assert.equal(token.name, tokenOptions.name);
        });

        it(`should allow accounts[2] to purchase a token created by accounts[5]`, async function () {
            this.timeout(20000);

            const params: Parameters<TransactionBuilder['purchaseToken']>[] = [
                [accounts.b58[5], tokenID, 20, accounts.b58[2], { permissionId: 2 }],
                [accounts.b58[5], tokenID, 20, accounts.b58[2]],
                [accounts.b58[5], tokenID, 20, accounts.b58[2], { blockHeader: await getHeaderInfo(tronWeb.fullNode) }],
            ];

            for (const param of params) {
                await wait(4);

                const transaction = await tronWeb.transactionBuilder.purchaseToken(...param);
                const parameter = txPars(transaction) as ContractParamterWrapper<ParticipateAssetIssueContract>;
                assert.equal(transaction.txID.length, 64);
                assert.equal(parameter.value.amount, 20);
                assert.equal(parameter.value.owner_address, accounts.hex[2]);
                assert.equal(parameter.value.to_address, accounts.hex[5]);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.ParticipateAssetIssueContract');
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, param[4]?.['permissionId'] || 0);
            }
        });

        it(`should allow accounts[2] to purchase a token created by accounts[5] and broadcast`, async function () {
            await wait(50); // 60 will failed because broadcast error
            const param: Parameters<TransactionBuilder['purchaseToken']> = [accounts.b58[5], tokenID, 10, accounts.b58[2]];
            const transaction = await tronWeb.transactionBuilder.purchaseToken(...param);

            const res = await broadcaster(transaction, accounts.pks[2]);
            assert.isTrue(res.receipt.result);
        });

        it('should throw if issuerAddress is invalid', async function () {
            await assertThrow(
                tronWeb.transactionBuilder.purchaseToken('sasdsadasfa', tokenID, 20, accounts.b58[2]),
                'Invalid issuer address provided'
            );
        });

        it('should throw if issuerAddress is not the right one', async function () {
            await assertThrow(
                tronWeb.transactionBuilder.purchaseToken(accounts.b58[4], tokenID, 20, accounts.b58[2]),
                null,
                'The asset is not issued by'
            );
        });

        it('should throw if the token Id is invalid', async function () {
            await assertThrow(
                tronWeb.transactionBuilder.purchaseToken(accounts.b58[5], '123432', 20, accounts.b58[2]),
                'Invalid token ID provided'
            );
        });

        it('should throw if token does not exist', async function () {
            await assertThrow(
                tronWeb.transactionBuilder.purchaseToken(accounts.b58[5], '1110000', 20, accounts.b58[2]),
                null,
                'No asset named '
            );
        });

        it('should throw if buyer address is invalid', async function () {
            await assertThrow(
                tronWeb.transactionBuilder.purchaseToken(accounts.b58[5], tokenID, 20, 'sasdadasdas'),
                'Invalid buyer address provided'
            );
        });

        it('should throw if amount is invalid', async function () {
            await assertThrow(
                tronWeb.transactionBuilder.purchaseToken(accounts.b58[5], tokenID, -3, accounts.b58[2]),
                'Invalid amount provided'
            );

            await assertThrow(
                tronWeb.transactionBuilder.purchaseToken(
                    accounts.b58[5],
                    tokenID,
                    'some-amount' as unknown as number,
                    accounts.b58[2]
                ),
                'Invalid amount provided'
            );
        });
    });

    describe('#sendToken()', function () {
        let tokenOptions: CreateTokenOptions;
        let tokenID: any;

        before(async function () {
            this.timeout(30000);

            tokenOptions = getTokenOptions();

            await broadcaster(tronWeb.transactionBuilder.createToken(tokenOptions, accounts.b58[6]), accounts.pks[6]);

            let tokenList;
            while (!tokenList) {
                tokenList = await tronWeb.trx.getTokensIssuedByAddress(accounts.b58[6]);
            }

            if (isAllowSameTokenNameApproved) {
                tokenID = tokenList[tokenOptions.name].id;
            } else {
                tokenID = tokenList[tokenOptions.name].name;
            }
        });

        it('should verify that the asset has been created', async function () {
            let token;
            if (isAllowSameTokenNameApproved) {
                token = await tronWeb.trx.getTokenByID(tokenID);
                assert.equal(token.id, tokenID);
            } else {
                token = await tronWeb.trx.getTokenFromID(tokenID);
            }
            assert.equal(token.name, tokenOptions.name);
        });

        it('should allow accounts [7]  to send a token to accounts[1]', async function () {
            this.timeout(20000);

            const params: [string, number, string, string, TransactionCommonOptions?][] = [
                [accounts.b58[1], 5, tokenID, accounts.b58[7], { permissionId: 2 }],
                [accounts.b58[1], 5, tokenID, accounts.b58[7]],
                [accounts.b58[1], 5, tokenID, accounts.b58[7], { blockHeader: await getHeaderInfo(tronWeb.fullNode) }],
            ];

            for (const param of params) {
                await wait(4);

                await broadcaster(
                    tronWeb.transactionBuilder.purchaseToken(accounts.b58[6], tokenID, 50, accounts.b58[7]),
                    accounts.pks[7]
                );

                await wait(1);

                const transaction = await tronWeb.transactionBuilder.sendToken(...param);

                const parameter = txPars(transaction) as ContractParamterWrapper<TransferContract>;

                assert.equal(parameter.value.amount, 5);
                assert.equal(parameter.value.owner_address, accounts.hex[7]);
                assert.equal(parameter.value.to_address, accounts.hex[1]);
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, param[4]?.['permissionId'] || 0);
            }
        });

        it('should allow accounts [6]  to send a token to accounts[1]', async function () {
            const params: [string, number, string, string, TransactionCommonOptions?][] = [
                [accounts.b58[1], 5, tokenID, accounts.b58[6], { permissionId: 2 }],
                [accounts.b58[1], 5, tokenID, accounts.b58[6]],
            ];

            for (const param of params) {
                const transaction = await tronWeb.transactionBuilder.sendToken(...param);

                const parameter = txPars(transaction) as ContractParamterWrapper<TransferContract>;

                assert.equal(parameter.value.amount, 5);
                assert.equal(parameter.value.owner_address, accounts.hex[6]);
                assert.equal(parameter.value.to_address, accounts.hex[1]);
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, param[4] ? param[4]['permissionId'] : 0);
            }
        });

        it('should allow accounts [6]  to send a token to accounts[1] and broadcast', async function () {
            await wait(5);
            const param: [string, number, string, string, TransactionCommonOptions?] = [
                accounts.b58[1],
                5,
                tokenID,
                accounts.b58[6],
            ];
            const transaction = await tronWeb.transactionBuilder.sendToken(...param);
            const res = await broadcaster(transaction, accounts.pks[6]);
            // console.log(res);
            assert.isTrue(res.receipt.result);
        });

        it('should throw if recipient address is invalid', async function () {
            await assertThrow(
                tronWeb.transactionBuilder.sendToken('sadasfdfsgdfgssa', 5, tokenID, accounts.b58[7]),
                'Invalid recipient address provided'
            );
        });

        it('should throw if the token Id is invalid', async function () {
            await assertThrow(
                tronWeb.transactionBuilder.sendToken(accounts.b58[1], 5, '143234', accounts.b58[7]),
                'Invalid token ID provided'
            );
        });

        it('should throw if origin address is invalid', async function () {
            await assertThrow(
                tronWeb.transactionBuilder.sendToken(accounts.b58[1], 5, tokenID, '213253453453'),
                'Invalid origin address provided'
            );
        });

        it('should throw if amount is invalid', async function () {
            await assertThrow(
                tronWeb.transactionBuilder.sendToken(accounts.b58[1], -5, tokenID, accounts.b58[7]),
                'Invalid amount provided'
            );

            await assertThrow(
                tronWeb.transactionBuilder.sendToken(accounts.b58[1], 'amount' as unknown as number, tokenID, accounts.b58[7]),
                'Invalid amount provided'
            );
        });
    });

    describe('#createProposal', async function () {
        const parameters = [
            { key: 0, value: 100000 },
            { key: 1, value: 2 },
        ];

        it('should allow the SR account to create a new proposal as a single object', async function () {
            const inputs: [any, string, TransactionCommonOptions?][] = [
                [parameters[0], ADDRESS_BASE58, { permissionId: 2 }],
                [parameters[0], ADDRESS_BASE58],
                [parameters[0], ADDRESS_BASE58, { blockHeader: await getHeaderInfo(tronWeb.fullNode) }],
            ];
            for (const input of inputs) {
                const transaction = await tronWeb.transactionBuilder.createProposal(...input);

                const parameter = txPars(transaction) as ContractParamterWrapper<ProposalCreateContract>;

                assert.equal(parameter.value.owner_address, ADDRESS_HEX);
                assert.equal(parameter.value.parameters[0].value, parameters[0].value);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.ProposalCreateContract');
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, input[2]?.['permissionId'] || 0);
            }
        });

        it('should allow the SR account to create a new proposal as an array of objects', async function () {
            const inputs: Parameters<typeof tronWeb.transactionBuilder.createProposal>[] = [
                [parameters, ADDRESS_BASE58, { permissionId: 2 }],
                [parameters, ADDRESS_BASE58],
            ];

            for (const input of inputs) {
                const transaction = await tronWeb.transactionBuilder.createProposal(...input);

                const parameter = txPars(transaction) as ContractParamterWrapper<ProposalCreateContract>;

                assert.equal(parameter.value.owner_address, ADDRESS_HEX);
                assert.equal(parameter.value.parameters[0].value, parameters[0].value);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.ProposalCreateContract');
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, input[2] ? input[2]['permissionId'] : 0);
            }
        });

        it('should allow the SR account to create a new proposal as an array of objects and broadcast', async function () {
            const input: Parameters<typeof tronWeb.transactionBuilder.createProposal> = [parameters, ADDRESS_BASE58];
            const transaction = await tronWeb.transactionBuilder.createProposal(...input);
            const res = await broadcaster(transaction);
            assert.isTrue(res.receipt.result);
        });

        it('should throw if issuer address is invalid', async function () {
            await assertThrow(
                tronWeb.transactionBuilder.createProposal(parameters, 'sadasdsffdgdf'),
                'Invalid issuer address provided'
            );
        });

        it('should throw if the issuer address is not an SR', async function () {
            await assertThrow(
                tronWeb.transactionBuilder.createProposal(parameters, accounts.b58[0]),
                null,
                `Witness[${accounts.hex[0]}] not exists`
            );
        });

        // TODO Complete throws
    });

    describe('#deleteProposal', async function () {
        let proposals: { proposal_id: any }[];

        before(async function () {
            this.timeout(20000);

            const parameters = [
                { key: 0, value: 100000 },
                { key: 1, value: 2 },
            ];

            await broadcaster(tronWeb.transactionBuilder.createProposal(parameters, ADDRESS_BASE58), PRIVATE_KEY);

            proposals = await tronWeb.trx.listProposals();
        });

        it('should allow the SR to delete its own proposal', async function () {
            const params: Parameters<TransactionBuilder['deleteProposal']>[] = [
                [proposals[0].proposal_id, tronWeb.defaultAddress.hex as string, { permissionId: 2 }],
                [proposals[0].proposal_id],
                [
                    proposals[0].proposal_id,
                    tronWeb.defaultAddress.hex as string,
                    { blockHeader: await getHeaderInfo(tronWeb.fullNode) },
                ],
            ];
            for (const param of params) {
                const transaction = await tronWeb.transactionBuilder.deleteProposal(...param);
                const parameter = txPars(transaction) as ContractParamterWrapper<ProposalDeleteContract>;

                assert.equal(parameter.value.owner_address, ADDRESS_HEX);
                assert.equal(parameter.value.proposal_id, proposals[0].proposal_id);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.ProposalDeleteContract');
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, param[2]?.['permissionId'] || 0);
            }
        });

        it('should allow the SR to delete its own proposal and broadcast', async function () {
            const param: Parameters<typeof tronWeb.transactionBuilder.deleteProposal> = [proposals[0].proposal_id];
            const transaction = await tronWeb.transactionBuilder.deleteProposal(...param);
            const res = await broadcaster(transaction);
            assert.isTrue(res.receipt.result);
        });

        it('should throw trying to cancel an already canceled proposal', async function () {
            await broadcaster(await tronWeb.transactionBuilder.deleteProposal(proposals[0].proposal_id));

            await assertThrow(
                tronWeb.transactionBuilder.deleteProposal(proposals[0].proposal_id),
                null,
                `Proposal[${proposals[0].proposal_id}] canceled`
            );
        });

        // TODO add invalid params throws
    });

    describe('#applyForSR', async function () {
        const url = 'https://xtron.network';

        it('should allow accounts[0] to apply for SR', async function () {
            const params = [
                [accounts.b58[20], url],
                [accounts.b58[20], url, { blockHeader: await getHeaderInfo(tronWeb.fullNode) }],
            ];
            for (let param of params) {
                const transaction = await tronWeb.transactionBuilder.applyForSR(...param);
                const parameter = txPars(transaction) as ContractParamterWrapper<WitnessCreateContract>;

                assert.equal(parameter.value.owner_address, accounts.hex[20]);
                await assertEqualHex(parameter.value.url, url);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.WitnessCreateContract');
            }
        });

        it('should allow accounts[0] to apply for SR and broadcast', async function () {
            const transaction = await tronWeb.transactionBuilder.applyForSR(accounts.b58[20], url);
            const res = await broadcaster(transaction, accounts.pks[20]);
            assert.isTrue(res.receipt.result);
        });

        // TODO add invalid params throws
        it('should throw Invalid url provided error', async function () {
            assertThrow(
                tronWeb.transactionBuilder.applyForSR(accounts.b58[20], url + '#' + 'abc'.repeat(Math.ceil(256 / 3))),
                'Invalid url provided'
            );
        });
    });

    describe('#freezeBalance', async function () {
        it('should allows accounts[1] to freeze its balance', async function () {
            const params: Parameters<TransactionBuilder['freezeBalance']>[] = [
                [100e6, 3, 'BANDWIDTH', accounts.b58[1], undefined, { permissionId: 2 }],
                [100e6, 3, 'BANDWIDTH', accounts.b58[1]],
                [100e6, 3, 'BANDWIDTH', accounts.b58[1], undefined, { blockHeader: await getHeaderInfo(tronWeb.fullNode) }],
            ];

            for (const param of params) {
                const transaction = await tronWeb.transactionBuilder.freezeBalance(...param);

                const parameter = txPars(transaction) as ContractParamterWrapper<FreezeBalanceContract>;
                // jlog(parameter)
                assert.equal(parameter.value.owner_address, accounts.hex[1]);
                assert.equal(parameter.value.frozen_balance, 100e6);
                assert.equal(parameter.value.frozen_duration, 3);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.FreezeBalanceContract');
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, param[5]?.['permissionId'] || 0);
            }
        });

        // TODO add invalid params throws
    });

    describe.skip('#unfreezeBalance', async function () {
        // TODO this is not fully testable because the minimum time before unfreezing is 3 days
        async function freezeBandWith() {
            const transaction = await tronWeb.transactionBuilder.freezeBalance(100e6, 3, 'BANDWIDTH', accounts.b58[1]);
            await broadcaster(transaction, accounts.pks[1]);
            // eslint-disable-next-line no-constant-condition
            while (true) {
                const tx = await tronWeb.trx.getTransactionInfo(transaction.txID);
                if (Object.keys(tx).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }
        }

        it('should unfreeze balance', async function () {
            const params: Parameters<TransactionBuilder['unfreezeBalance']>[] = [
                ['BANDWIDTH', accounts.b58[1], undefined, { permissionId: 2 }],
                ['BANDWIDTH', accounts.b58[1]],
                ['BANDWIDTH', accounts.b58[1], undefined, { blockHeader: await getHeaderInfo(tronWeb.fullNode) }],
            ];

            for (const param of params) {
                await freezeBandWith();
                const transaction = await tronWeb.transactionBuilder.unfreezeBalance(...param);
                const authResult = utils.transaction.txCheck(transaction);
                assert.equal(authResult, true);
            }
        });
    });

    describe.skip('#withdrawBalance', function () {
        // this is not fully testable because the minimum time before withdrawBlockRewards is 1 days
        // witnessAccount does not have any reward

        it(`should withdraw balance`, async function () {
            const params: Parameters<TransactionBuilder['withdrawBlockRewards']>[] = [
                [accounts.b58[1], { permissionId: 2 }],
                [accounts.b58[1]],
                [accounts.b58[1], { blockHeader: await getHeaderInfo(tronWeb.fullNode) }],
            ];
            for (const param of params) {
                const transaction = await tronWeb.transactionBuilder.withdrawBlockRewards(...param);
                const authResult = utils.transaction.txCheck(transaction);
                assert.equal(authResult, true);
            }
        });
    });

    describe('#freezeBalanceV2', async function () {
        it('should allows accounts[1] to freeze its balance by freezeBalanceV2', async function () {
            const params: Parameters<TransactionBuilder['freezeBalanceV2']>[] = [
                [500e6, 'BANDWIDTH', accounts.b58[1], { permissionId: 2 }],
                [500e6, 'BANDWIDTH', accounts.b58[1]],
                [500e6, 'BANDWIDTH', accounts.b58[1], { blockHeader: await getHeaderInfo(tronWeb.fullNode) }],
            ];

            for (const param of params) {
                const transaction = await tronWeb.transactionBuilder.freezeBalanceV2(...param);
                await broadcaster(null, accounts.pks[1], transaction);

                const parameter = txPars(transaction) as ContractParamterWrapper<FreezeBalanceV2Contract>;
                // jlog(parameter)
                assert.equal(parameter.value.owner_address, accounts.hex[1]);
                assert.equal(parameter.value.frozen_balance, 500e6);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.FreezeBalanceV2Contract');
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, param[3]?.['permissionId'] || 0);
            }
        });

        it('should throw if owner address is invalid', async function () {
            const params: Parameters<TransactionBuilder['freezeBalanceV2']>[] = [
                [100e6, 'BANDWIDTH', 'ddssddd', { permissionId: 2 }],
                [100e6, 'BANDWIDTH', 'ddssddd'],
            ];

            for (const param of params) {
                await assertThrow(tronWeb.transactionBuilder.freezeBalanceV2(...param));
            }
        });

        it('should throw if frozen balance is invalid', async function () {
            const params: Parameters<TransactionBuilder['freezeBalanceV2']>[] = [
                [-100, 'BANDWIDTH', accounts.b58[1], { permissionId: 2 }],
                [-100, 'BANDWIDTH', accounts.b58[1]],
            ];

            for (const param of params) {
                await assertThrow(tronWeb.transactionBuilder.freezeBalanceV2(...param));
            }
        });

        it('should throw if resource is invalid', async function () {
            const params = [
                ['-100', 'aabbccdd', accounts.b58[1], { permissionId: 2 }],
                ['-100', 'aabbccdd', accounts.b58[1]],
            ];

            for (const param of params) {
                await assertThrow(tronWeb.transactionBuilder.freezeBalanceV2(...param));
            }
        });

        it('should allows accounts[1] to freeze its balance by freezeBalanceV2', async function () {
            const params = [
                [500e6, 'ENERGY', accounts.b58[1], { permissionId: 2 }],
                [500e6, 'ENERGY', accounts.b58[1]],
            ];

            for (const param of params) {
                const transaction = await tronWeb.transactionBuilder.freezeBalanceV2(...param);
                await broadcaster(null, accounts.pks[1], transaction);

                const parameter = txPars(transaction) as ContractParamterWrapper<FreezeBalanceV2Contract>;
                // jlog(parameter)
                assert.equal(parameter.value.owner_address, accounts.hex[1]);
                assert.equal(parameter.value.frozen_balance, 500e6);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.FreezeBalanceV2Contract');
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, param[3]?.['permissionId'] || 0);
            }
        });

        it('should throw if owner address is invalid', async function () {
            const params: Parameters<typeof tronWeb.transactionBuilder.freezeBalanceV2>[] = [
                [100e6, 'ENERGY', 'ddssddd', { permissionId: 2 }],
                [100e6, 'ENERGY', 'ddssddd'],
            ];

            for (const param of params) {
                await assertThrow(tronWeb.transactionBuilder.freezeBalanceV2(...param));
            }
        });

        it('should throw if frozen balance is invalid', async function () {
            const params = [
                ['-100', 'ENERGY', accounts.b58[1], { permissionId: 2 }],
                ['-100', 'ENERGY', accounts.b58[1]],
            ];

            for (const param of params) {
                await assertThrow(tronWeb.transactionBuilder.freezeBalanceV2(...param));
            }
        });
    });

    describe('#unfreezeBalanceV2', async function () {
        it('should allows accounts[1] to unfreeze its balance', async function () {
            const params: Parameters<TransactionBuilder['unfreezeBalanceV2']>[] = [
                [100e6, 'BANDWIDTH', accounts.b58[1], { permissionId: 2 }],
                [100e6, 'BANDWIDTH', accounts.b58[1]],
                [100e6, 'BANDWIDTH', accounts.b58[1], { blockHeader: await getHeaderInfo(tronWeb.fullNode) }],
            ];

            for (const param of params) {
                const transaction = await tronWeb.transactionBuilder.unfreezeBalanceV2(...param);
                await broadcaster(null, accounts.pks[1], transaction);

                const parameter = txPars(transaction) as ContractParamterWrapper<UnfreezeBalanceV2Contract>;
                // jlog(parameter)
                assert.equal(parameter.value.owner_address, accounts.hex[1]);
                assert.equal(parameter.value.unfreeze_balance, 100e6);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.UnfreezeBalanceV2Contract');
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, param[3]?.['permissionId'] || 0);
            }
        });

        it('should throw if owner address is invalid', async function () {
            const params: Parameters<typeof tronWeb.transactionBuilder.unfreezeBalanceV2>[] = [
                [100e6, 'BANDWIDTH', 'ddssddd', { permissionId: 2 }],
                [100e6, 'BANDWIDTH', 'ddssddd'],
            ];

            for (const param of params) {
                await assertThrow(tronWeb.transactionBuilder.unfreezeBalanceV2(...param));
            }
        });

        it('should throw if frozen balance is invalid', async function () {
            const params = [
                ['-100', 'BANDWIDTH', accounts.b58[1], { permissionId: 2 }],
                ['-100', 'BANDWIDTH', accounts.b58[1]],
            ];

            for (const param of params) {
                await assertThrow(tronWeb.transactionBuilder.unfreezeBalanceV2(...param));
            }
        });

        it('should throw if resource is invalid', async function () {
            const params = [
                [100e6, 'aabbccdd', accounts.b58[1], { permissionId: 2 }],
                [100e6, 'aabbccdd', accounts.b58[1]],
            ];

            for (const param of params) {
                await assertThrow(tronWeb.transactionBuilder.unfreezeBalanceV2(...param));
            }
        });

        it('should allows accounts[1] to unfreeze its balance', async function () {
            const params: Parameters<TransactionBuilder['unfreezeBalanceV2']>[] = [
                [100e6, 'ENERGY', accounts.b58[1], { permissionId: 2 }],
                [100e6, 'ENERGY', accounts.b58[1]],
            ];

            for (const param of params) {
                const transaction = await tronWeb.transactionBuilder.unfreezeBalanceV2(...param);
                await broadcaster(null, accounts.pks[1], transaction);

                const parameter = txPars(transaction) as ContractParamterWrapper<UnfreezeBalanceV2Contract>;
                // jlog(parameter)
                assert.equal(parameter.value.owner_address, accounts.hex[1]);
                assert.equal(parameter.value.unfreeze_balance, 100e6);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.UnfreezeBalanceV2Contract');
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, param[3] ? param[3]['permissionId'] : 0);
            }
        });

        it('should throw if owner address is invalid', async function () {
            const params: Parameters<typeof tronWeb.transactionBuilder.unfreezeBalanceV2>[] = [
                [100e6, 'ENERGY', 'ddssddd', { permissionId: 2 }],
                [100e6, 'ENERGY', 'ddssddd'],
            ];

            for (const param of params) {
                await assertThrow(tronWeb.transactionBuilder.unfreezeBalanceV2(...param));
            }
        });

        it('should throw if frozen balance is invalid', async function () {
            const params = [
                ['-100', 'ENERGY', accounts.b58[1], { permissionId: 2 }],
                ['-100', 'ENERGY', accounts.b58[1]],
            ];

            for (const param of params) {
                await assertThrow(tronWeb.transactionBuilder.unfreezeBalanceV2(...param));
            }
        });
    });

    describe('#cancelUnfreezeBalance', async function () {
        const idx = 1;
        const idx2 = 2;

        before(async () => {
            const transaction2 = await tronWeb.transactionBuilder.freezeBalanceV2(100e6, 'BANDWIDTH', accounts.hex[idx]);
            await broadcaster(null, accounts.pks[idx], transaction2);
            await waitChainData('tx', transaction2.txID);
            const transaction = await tronWeb.transactionBuilder.unfreezeBalanceV2(10e6, 'BANDWIDTH', accounts.hex[idx]);
            await broadcaster(null, accounts.pks[idx], transaction);
            await waitChainData('tx', transaction.txID);

            const transaction3 = await tronWeb.transactionBuilder.freezeBalanceV2(100e6, 'ENERGY', accounts.hex[idx2]);
            await broadcaster(null, accounts.pks[idx2], transaction3);
            await waitChainData('tx', transaction3.txID);
            const transaction4 = await tronWeb.transactionBuilder.unfreezeBalanceV2(10e6, 'ENERGY', accounts.hex[idx2]);
            await broadcaster(null, accounts.pks[idx2], transaction4);
            await waitChainData('tx', transaction4.txID);
            await wait(10);
        });

        it('should allow accounts[1] to cancel unfreezeBalanceV2', async function () {
            const params: Parameters<TransactionBuilder['cancelUnfreezeBalanceV2']>[] = [
                [accounts.b58[1], { permissionId: 2 }],
                [accounts.b58[2]],
                [accounts.b58[1], { blockHeader: await getHeaderInfo(tronWeb.fullNode) }],
            ];

            for (let i = 0; i < 2; i++) {
                const param = params[i];
                const transaction = await tronWeb.transactionBuilder.cancelUnfreezeBalanceV2(...param);

                const parameter = txPars(transaction);
                // jlog(parameter)
                assert.equal(parameter.value.owner_address, accounts.hex[1 + i]);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.CancelAllUnfreezeV2Contract');
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, param[1] ? param[1]['permissionId'] : 0);
                const tx = await broadcaster(null, accounts.pks[1 + i], transaction);
                assert.isTrue(tx.receipt.result);
            }
        });

        it('should throw if owner address is invalid', async function () {
            const params: Parameters<TransactionBuilder['cancelUnfreezeBalanceV2']>[] = [
                ['ddssddd', { permissionId: 2 }],
                ['ddssddd'],
            ];

            for (const param of params) {
                await assertThrow(tronWeb.transactionBuilder.cancelUnfreezeBalanceV2(...param));
            }
        });
    });

    describe('#delegateResource', async function () {
        before(async () => {
            const transaction = await tronWeb.transactionBuilder.freezeBalanceV2(500e6, 'BANDWIDTH');
            await broadcaster(null, PRIVATE_KEY, transaction);

            const transaction2 = await tronWeb.transactionBuilder.freezeBalanceV2(500e6, 'ENERGY');
            await broadcaster(null, PRIVATE_KEY, transaction2);
        });

        it('should allows accounts[1] to delegate its resource', async function () {
            const params: Parameters<typeof tronWeb.transactionBuilder.delegateResource>[] = [
                [100e6, accounts.b58[7], 'BANDWIDTH', accounts.b58[1], false, 0, { permissionId: 2 }],
                [100e6, accounts.b58[7], 'BANDWIDTH', accounts.b58[1]],
                [
                    100e6,
                    accounts.b58[7],
                    'BANDWIDTH',
                    accounts.b58[1],
                    false,
                    0,
                    { blockHeader: await getHeaderInfo(tronWeb.fullNode) },
                ],
            ];

            for (const param of params) {
                const transaction = await tronWeb.transactionBuilder.delegateResource(...param);
                await broadcaster(null, accounts.pks[1], transaction);

                const parameter = txPars(transaction) as ContractParamterWrapper<DelegateResourceContract>;
                // jlog(parameter)
                assert.equal(parameter.value.owner_address, accounts.hex[1]);
                assert.equal(parameter.value.receiver_address, accounts.hex[7]);
                assert.equal(parameter.value.balance, 100e6);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.DelegateResourceContract');
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, param[6]?.permissionId || 0);
            }
        });

        it('should allows accounts[1] to delegate its resource with lock', async function () {
            const params: Parameters<TransactionBuilder['delegateResource']>[] = [
                [100e6, accounts.b58[7], 'BANDWIDTH', accounts.b58[1], true, 10, { permissionId: 2 }],
                [100e6, accounts.b58[7], 'BANDWIDTH', accounts.b58[1], true, 10],
            ];

            for (const param of params) {
                const transaction = await tronWeb.transactionBuilder.delegateResource(...param);
                const tx = await broadcaster(null, accounts.pks[1], transaction);
                assert.isTrue(tx.receipt.result);

                const parameter = txPars(transaction) as ContractParamterWrapper<DelegateResourceContract>;
                // jlog(parameter)
                assert.equal(parameter.value.owner_address, accounts.hex[1]);
                assert.equal(parameter.value.receiver_address, accounts.hex[7]);
                assert.equal(parameter.value.balance, 100e6);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.DelegateResourceContract');
                assert.equal(parameter.value.lock, true);
                assert.equal(parameter.value.lock_period, 10);
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, param[6] ? param[6]['permissionId'] : 0);
            }
        });

        it('should throw if owner address is invalid', async function () {
            const params: Parameters<typeof tronWeb.transactionBuilder.delegateResource>[] = [
                [100e6, accounts.b58[7], 'BANDWIDTH', 'ddssddd', false, 0, { permissionId: 2 }],
                [100e6, accounts.b58[7], 'BANDWIDTH', 'ddssddd'],
            ];

            for (const param of params) {
                await assertThrow(tronWeb.transactionBuilder.delegateResource(...param), 'Invalid origin address provided');
            }
        });

        it('should throw if frozen balance is invalid', async function () {
            const params: Parameters<typeof tronWeb.transactionBuilder.delegateResource>[] = [
                [-100, accounts.b58[7], 'BANDWIDTH', accounts.b58[1], false, 0, { permissionId: 2 }],
                [-100, accounts.b58[7], 'BANDWIDTH', accounts.b58[1]],
            ];

            for (const param of params) {
                await assertThrow(tronWeb.transactionBuilder.delegateResource(...param), 'Invalid amount provided');
            }
        });

        it('should throw if resource is invalid', async function () {
            const params: Parameters<typeof tronWeb.transactionBuilder.delegateResource>[] = [
                [100e6, accounts.b58[7], 'aabbccdd' as Resource, accounts.b58[1], false, 0, { permissionId: 2 }],
                [100e6, accounts.b58[7], 'aabbccdd' as Resource, accounts.b58[1]],
            ];

            for (const param of params) {
                await assertThrow(
                    tronWeb.transactionBuilder.delegateResource(...param),
                    'Invalid resource provided: Expected "BANDWIDTH" or "ENERGY"'
                );
            }
        });

        it('should throw if receiver address is invalid', async function () {
            const params: Parameters<typeof tronWeb.transactionBuilder.delegateResource>[] = [
                [100e6, 'adskjkkk', 'BANDWIDTH', accounts.b58[1], false, 0, { permissionId: 2 }],
                [100e6, 'adskjkkk', 'BANDWIDTH', accounts.b58[1]],
            ];

            for (const param of params) {
                await assertThrow(tronWeb.transactionBuilder.delegateResource(...param), 'Invalid receiver address provided');
            }
        });

        it('should throw if receiver address is the same as from address', async function () {
            const params: Parameters<typeof tronWeb.transactionBuilder.delegateResource>[] = [
                [100e6, accounts.b58[1], 'BANDWIDTH', accounts.b58[1], false, 0, { permissionId: 2 }],
                [100e6, accounts.b58[1], 'BANDWIDTH', accounts.b58[1]],
            ];

            for (const param of params) {
                await assertThrow(
                    tronWeb.transactionBuilder.delegateResource(...param),
                    'Receiver address must not be the same as owner address'
                );
            }
        });

        it('should allow accounts[1] to delegate its resource if lock is true', async function () {
            const params: Parameters<typeof tronWeb.transactionBuilder.delegateResource>[] = [
                [100e6, accounts.b58[7], 'BANDWIDTH', accounts.b58[1], true, 0, { permissionId: 2 }],
                [100e6, accounts.b58[7], 'BANDWIDTH', accounts.b58[1], true],
            ];

            for (const param of params) {
                const transaction = await tronWeb.transactionBuilder.delegateResource(...param);

                const parameter = txPars(transaction) as ContractParamterWrapper<DelegateResourceContract>;
                // jlog(parameter)
                assert.equal(parameter.value.owner_address, accounts.hex[1]);
                assert.equal(parameter.value.receiver_address, accounts.hex[7]);
                assert.equal(parameter.value.balance, 100e6);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.DelegateResourceContract');
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, param[6] ? param[6]['permissionId'] : 0);
            }
        });

        it('should allow defaultAdress to delegate its resource if from address is omitted', async function () {
            const params: Parameters<typeof tronWeb.transactionBuilder.delegateResource>[] = [
                [100e6, accounts.b58[7], 'BANDWIDTH'],
            ];

            for (const param of params) {
                const transaction = await tronWeb.transactionBuilder.delegateResource(...param);

                const parameter = txPars(transaction) as ContractParamterWrapper<DelegateResourceContract>;
                // jlog(parameter)
                assert.equal(parameter.value.owner_address, tronWeb.defaultAddress.hex);
                assert.equal(parameter.value.receiver_address, accounts.hex[7]);
                assert.equal(parameter.value.balance, 100e6);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.DelegateResourceContract');
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, 0);
            }
        });

        it('should allow defaultAdress to delegate its resource if resource is omitted', async function () {
            const params: Parameters<typeof tronWeb.transactionBuilder.delegateResource>[] = [[100e6, accounts.b58[7]]];

            for (const param of params) {
                const transaction = await tronWeb.transactionBuilder.delegateResource(...param);

                const parameter = txPars(transaction) as ContractParamterWrapper<DelegateResourceContract>;
                // jlog(parameter)
                assert.equal(parameter.value.owner_address, tronWeb.defaultAddress.hex);
                assert.equal(parameter.value.receiver_address, accounts.hex[7]);
                assert.equal(parameter.value.balance, 100e6);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.DelegateResourceContract');
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, 0);
            }
        });

        it('should allow accounts[1] to delegate its resource', async function () {
            const params: Parameters<typeof tronWeb.transactionBuilder.delegateResource>[] = [
                [100e6, accounts.b58[7], 'ENERGY', accounts.b58[1], false, 0, { permissionId: 2 }],
                [100e6, accounts.b58[7], 'ENERGY', accounts.b58[1]],
            ];

            for (const param of params) {
                const transaction = await tronWeb.transactionBuilder.delegateResource(...param);
                await broadcaster(null, accounts.pks[1], transaction);

                const parameter = txPars(transaction) as ContractParamterWrapper<DelegateResourceContract>;
                // jlog(parameter)
                assert.equal(parameter.value.owner_address, accounts.hex[1]);
                assert.equal(parameter.value.receiver_address, accounts.hex[7]);
                assert.equal(parameter.value.balance, 100e6);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.DelegateResourceContract');
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, param[6] ? param[6]['permissionId'] : 0);
            }
        });

        it('should throw if owner address is invalid', async function () {
            const params: Parameters<typeof tronWeb.transactionBuilder.delegateResource>[] = [
                [100e6, accounts.b58[7], 'ENERGY', 'ddssddd', false, 0, { permissionId: 2 }],
                [100e6, accounts.b58[7], 'ENERGY', 'ddssddd'],
            ];

            for (const param of params) {
                await assertThrow(tronWeb.transactionBuilder.delegateResource(...param), 'Invalid origin address provided');
            }
        });

        it('should throw if frozen balance is invalid', async function () {
            const params: Parameters<typeof tronWeb.transactionBuilder.delegateResource>[] = [
                [-100, accounts.b58[7], 'ENERGY', accounts.b58[1], false, 0, { permissionId: 2 }],
                [-100, accounts.b58[7], 'ENERGY', accounts.b58[1]],
            ];

            for (const param of params) {
                await assertThrow(tronWeb.transactionBuilder.delegateResource(...param), 'Invalid amount provided');
            }
        });

        it('should throw if receiver address is invalid', async function () {
            const params: Parameters<typeof tronWeb.transactionBuilder.delegateResource>[] = [
                [100e6, 'adskjkkk', 'ENERGY', accounts.b58[1], false, 0, { permissionId: 2 }],
                [100e6, 'adskjkkk', 'ENERGY', accounts.b58[1]],
            ];

            for (const param of params) {
                await assertThrow(tronWeb.transactionBuilder.delegateResource(...param), 'Invalid receiver address provided');
            }
        });

        it('should throw if receiver address is the same as from address', async function () {
            const params: Parameters<typeof tronWeb.transactionBuilder.delegateResource>[] = [
                [100e6, accounts.b58[1], 'ENERGY', accounts.b58[1], false, 0, { permissionId: 2 }],
                [100e6, accounts.b58[1], 'ENERGY', accounts.b58[1]],
            ];

            for (const param of params) {
                await assertThrow(
                    tronWeb.transactionBuilder.delegateResource(...param),
                    'Receiver address must not be the same as owner address'
                );
            }
        });

        it('should allow accounts[1] to delegate its resource if lock is true', async function () {
            const params: Parameters<typeof tronWeb.transactionBuilder.delegateResource>[] = [
                [100e6, accounts.b58[7], 'ENERGY', accounts.b58[1], true, 0, { permissionId: 2 }],
                [100e6, accounts.b58[7], 'ENERGY', accounts.b58[1], true],
            ];

            for (const param of params) {
                const transaction = await tronWeb.transactionBuilder.delegateResource(...param);

                const parameter = txPars(transaction) as ContractParamterWrapper<DelegateResourceContract>;
                // jlog(parameter)
                assert.equal(parameter.value.owner_address, accounts.hex[1]);
                assert.equal(parameter.value.receiver_address, accounts.hex[7]);
                assert.equal(parameter.value.balance, 100e6);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.DelegateResourceContract');
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, param[6] ? param[6]['permissionId'] : 0);
            }
        });

        it('should allow defaultAdress to delegate its resource if from address is omitted', async function () {
            const params: Parameters<typeof tronWeb.transactionBuilder.delegateResource>[] = [[100e6, accounts.b58[7], 'ENERGY']];

            for (const param of params) {
                const transaction = await tronWeb.transactionBuilder.delegateResource(...param);

                const parameter = txPars(transaction) as ContractParamterWrapper<DelegateResourceContract>;
                // jlog(parameter)
                assert.equal(parameter.value.owner_address, tronWeb.defaultAddress.hex);
                assert.equal(parameter.value.receiver_address, accounts.hex[7]);
                assert.equal(parameter.value.balance, 100e6);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.DelegateResourceContract');
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, 0);
            }
        });
    });

    describe('#undelegateResource', async function () {
        before(async () => {
            const transaction = await tronWeb.transactionBuilder.delegateResource(100e6, accounts.b58[7], 'BANDWIDTH');
            await broadcaster(null, PRIVATE_KEY, transaction);
            const transaction2 = await tronWeb.transactionBuilder.delegateResource(100e6, accounts.b58[7], 'ENERGY');
            await broadcaster(null, PRIVATE_KEY, transaction2);
        });
        it('should allows accounts[1] to undelegate its resource', async function () {
            const params: Parameters<TransactionBuilder['undelegateResource']>[] = [
                [100e6, accounts.b58[7], 'BANDWIDTH', accounts.b58[1], { permissionId: 2 }],
                [100e6, accounts.b58[7], 'BANDWIDTH', accounts.b58[1]],
                [100e6, accounts.b58[7], 'BANDWIDTH', accounts.b58[1], { blockHeader: await getHeaderInfo(tronWeb.fullNode) }],
            ];

            for (const param of params) {
                const transaction = await tronWeb.transactionBuilder.undelegateResource(...param);
                await broadcaster(null, accounts.pks[1], transaction);

                const parameter = txPars(transaction) as ContractParamterWrapper<UnDelegateResourceContract>;
                // jlog(parameter)
                assert.equal(parameter.value.owner_address, accounts.hex[1]);
                assert.equal(parameter.value.receiver_address, accounts.hex[7]);
                assert.equal(parameter.value.balance, 100e6);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.UnDelegateResourceContract');
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, param[4]?.['permissionId'] || 0);
            }
        });

        it('should throw if owner address is invalid', async function () {
            const params: Parameters<TransactionBuilder['undelegateResource']>[] = [
                [100e6, accounts.b58[7], 'BANDWIDTH', 'ddssddd', { permissionId: 2 }],
                [100e6, accounts.b58[7], 'BANDWIDTH', 'ddssddd'],
            ];

            for (const param of params) {
                await assertThrow(tronWeb.transactionBuilder.undelegateResource(...param), 'Invalid origin address provided');
            }
        });

        it('should throw if frozen balance is invalid', async function () {
            const params: Parameters<TransactionBuilder['undelegateResource']>[] = [
                [-100, accounts.b58[7], 'BANDWIDTH', accounts.b58[1], { permissionId: 2 }],
                [-100, accounts.b58[7], 'BANDWIDTH', accounts.b58[1]],
            ];

            for (const param of params) {
                await assertThrow(tronWeb.transactionBuilder.undelegateResource(...param), 'Invalid amount provided');
            }
        });

        it('should throw if resource is invalid', async function () {
            const params: Parameters<TransactionBuilder['undelegateResource']>[] = [
                [100e6, accounts.b58[7], 'aabbccdd' as Resource, accounts.b58[1], { permissionId: 2 }],
                [100e6, accounts.b58[7], 'aabbccdd' as Resource, accounts.b58[1]],
            ];

            for (const param of params) {
                await assertThrow(
                    tronWeb.transactionBuilder.undelegateResource(...param),
                    'Invalid resource provided: Expected "BANDWIDTH" or "ENERGY"'
                );
            }
        });

        it('should throw if receiver address is invalid', async function () {
            const params: Parameters<TransactionBuilder['undelegateResource']>[] = [
                [100e6, 'adskjkkk', 'BANDWIDTH', accounts.b58[1], { permissionId: 2 }],
                [100e6, 'adskjkkk', 'BANDWIDTH', accounts.b58[1]],
            ];

            for (const param of params) {
                await assertThrow(tronWeb.transactionBuilder.undelegateResource(...param), 'Invalid receiver address provided');
            }
        });

        it('should throw if receiver address is the same as from address', async function () {
            const params: Parameters<TransactionBuilder['undelegateResource']>[] = [
                [100e6, accounts.b58[1], 'BANDWIDTH', accounts.b58[1], { permissionId: 2 }],
                [100e6, accounts.b58[1], 'BANDWIDTH', accounts.b58[1]],
            ];

            for (const param of params) {
                await assertThrow(
                    tronWeb.transactionBuilder.undelegateResource(...param),
                    'Receiver address must not be the same as owner address'
                );
            }
        });

        it('should allow defaultAdress to undelegate its resource if from address is omitted', async function () {
            const params: Parameters<TransactionBuilder['undelegateResource']>[] = [[100e6, accounts.b58[7], 'BANDWIDTH']];

            for (const param of params) {
                const transaction = await tronWeb.transactionBuilder.undelegateResource(...param);

                const parameter = txPars(transaction) as ContractParamterWrapper<UnDelegateResourceContract>;
                // jlog(parameter)
                assert.equal(parameter.value.owner_address, tronWeb.defaultAddress.hex);
                assert.equal(parameter.value.receiver_address, accounts.hex[7]);
                assert.equal(parameter.value.balance, 100e6);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.UnDelegateResourceContract');
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, 0);
            }
        });

        it('should allow defaultAdress to undelegate its resource if resource is omitted', async function () {
            const params: Parameters<TransactionBuilder['undelegateResource']>[] = [[100e6, accounts.b58[7]]];

            for (const param of params) {
                const transaction = await tronWeb.transactionBuilder.undelegateResource(...param);

                const parameter = txPars(transaction) as ContractParamterWrapper<UnDelegateResourceContract>;
                // jlog(parameter)
                assert.equal(parameter.value.owner_address, tronWeb.defaultAddress.hex);
                assert.equal(parameter.value.receiver_address, accounts.hex[7]);
                assert.equal(parameter.value.balance, 100e6);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.UnDelegateResourceContract');
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, 0);
            }
        });

        it('should allows accounts[1] to undelegate its resource', async function () {
            const params: Parameters<TransactionBuilder['undelegateResource']>[] = [
                [100e6, accounts.b58[7], 'ENERGY', accounts.b58[1], { permissionId: 2 }],
                [100e6, accounts.b58[7], 'ENERGY', accounts.b58[1]],
            ];

            for (const param of params) {
                const transaction = await tronWeb.transactionBuilder.undelegateResource(...param);
                await broadcaster(null, accounts.pks[1], transaction);

                const parameter = txPars(transaction) as ContractParamterWrapper<UnDelegateResourceContract>;
                // jlog(parameter)
                assert.equal(parameter.value.owner_address, accounts.hex[1]);
                assert.equal(parameter.value.receiver_address, accounts.hex[7]);
                assert.equal(parameter.value.balance, 100e6);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.UnDelegateResourceContract');
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, param[4] ? param[4]['permissionId'] : 0);
            }
        });

        it('should throw if owner address is invalid', async function () {
            const params: Parameters<TransactionBuilder['undelegateResource']>[] = [
                [100e6, accounts.b58[7], 'ENERGY', 'ddssddd', { permissionId: 2 }],
                [100e6, accounts.b58[7], 'ENERGY', 'ddssddd'],
            ];

            for (const param of params) {
                await assertThrow(tronWeb.transactionBuilder.undelegateResource(...param), 'Invalid origin address provided');
            }
        });

        it('should throw if frozen balance is invalid', async function () {
            const params: Parameters<TransactionBuilder['undelegateResource']>[] = [
                [-100, accounts.b58[7], 'ENERGY', accounts.b58[1], { permissionId: 2 }],
                [-100, accounts.b58[7], 'ENERGY', accounts.b58[1]],
            ];

            for (const param of params) {
                await assertThrow(tronWeb.transactionBuilder.undelegateResource(...param), 'Invalid amount provided');
            }
        });

        it('should throw if receiver address is invalid', async function () {
            const params: Parameters<TransactionBuilder['undelegateResource']>[] = [
                [100e6, 'adskjkkk', 'ENERGY', accounts.b58[1], { permissionId: 2 }],
                [100e6, 'adskjkkk', 'ENERGY', accounts.b58[1]],
            ];

            for (const param of params) {
                await assertThrow(tronWeb.transactionBuilder.undelegateResource(...param), 'Invalid receiver address provided');
            }
        });

        it('should throw if receiver address is the same as from address', async function () {
            const params: Parameters<TransactionBuilder['undelegateResource']>[] = [
                [100e6, accounts.b58[1], 'ENERGY', accounts.b58[1], { permissionId: 2 }],
                [100e6, accounts.b58[1], 'ENERGY', accounts.b58[1]],
            ];

            for (const param of params) {
                await assertThrow(
                    tronWeb.transactionBuilder.undelegateResource(...param),
                    'Receiver address must not be the same as owner address'
                );
            }
        });

        it('should allow defaultAdress to undelegate its resource if from address is omitted', async function () {
            const params: Parameters<TransactionBuilder['undelegateResource']>[] = [[100e6, accounts.b58[7], 'ENERGY']];

            for (const param of params) {
                const transaction = await tronWeb.transactionBuilder.undelegateResource(...param);

                const parameter = txPars(transaction) as ContractParamterWrapper<UnDelegateResourceContract>;
                // jlog(parameter)
                assert.equal(parameter.value.owner_address, tronWeb.defaultAddress.hex);
                assert.equal(parameter.value.receiver_address, accounts.hex[7]);
                assert.equal(parameter.value.balance, 100e6);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.UnDelegateResourceContract');
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, 0);
            }
        });
    });

    describe('#withdrawExpireUnfreeze', async function () {
        const idx = 1;

        before(async () => {
            const transaction2 = await tronWeb.transactionBuilder.freezeBalanceV2(100e6, 'BANDWIDTH', accounts.hex[idx]);
            await broadcaster(null, accounts.pks[idx], transaction2);
            await waitChainData('tx', transaction2.txID);
            const transaction = await tronWeb.transactionBuilder.unfreezeBalanceV2(10e6, 'BANDWIDTH', accounts.hex[idx]);
            await broadcaster(null, accounts.pks[idx], transaction);
            await waitChainData('tx', transaction.txID);

            const transaction3 = await tronWeb.transactionBuilder.freezeBalanceV2(100e6, 'ENERGY', accounts.hex[idx]);
            await broadcaster(null, accounts.pks[idx], transaction3);
            await waitChainData('tx', transaction3.txID);
            const transaction4 = await tronWeb.transactionBuilder.unfreezeBalanceV2(10e6, 'ENERGY', accounts.hex[idx]);
            await broadcaster(null, accounts.pks[idx], transaction4);
            await waitChainData('tx', transaction4.txID);
            await wait(65);
        });
        it('should allows accounts[1] to withdraw its undelegated resource', async function () {
            const params: Parameters<TransactionBuilder['withdrawExpireUnfreeze']>[] = [
                [accounts.b58[1], { permissionId: 2 }],
                [accounts.b58[1]],
                [accounts.b58[1], { blockHeader: await getHeaderInfo(tronWeb.fullNode) }],
            ];
            for (const param of params) {
                const transaction = await tronWeb.transactionBuilder.withdrawExpireUnfreeze(...param);

                const parameter = txPars(transaction);
                // jlog(parameter)
                assert.equal(parameter.value.owner_address, accounts.hex[1]);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.WithdrawExpireUnfreezeContract');
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, param[1]?.['permissionId'] || 0);
            }
        });

        it('should throw if owner address is invalid', async function () {
            const params: Parameters<typeof tronWeb.transactionBuilder.withdrawExpireUnfreeze>[] = [
                ['ddssddd', { permissionId: 2 }],
                ['ddssddd'],
            ];

            for (const param of params) {
                await assertThrow(tronWeb.transactionBuilder.withdrawExpireUnfreeze(...param));
            }
        });
    });

    describe('#vote', async function () {
        // this is not testable because on Tron Quickstart (like on Shasta) it is not possible to vote

        const url = 'https://xtron.network';
        // let witnesses;

        before(async function () {
            await broadcaster(tronWeb.transactionBuilder.applyForSR(accounts.b58[0], url), accounts.pks[0]);
            await broadcaster(tronWeb.transactionBuilder.freezeBalance(100e6, 3, 'BANDWIDTH', accounts.b58[1]), accounts.pks[1]);
        });

        it('should allows accounts[1] to vote for accounts[0] as SR', async function () {
            const votes: VoteInfo = {};
            votes[accounts.hex[0]] = 5;

            const params = [
                [votes, accounts.b58[1]],
                [votes, accounts.b58[1], { blockHeader: await getHeaderInfo(tronWeb.fullNode) }],
            ];
            for (let param of params) {
                const transaction = await tronWeb.transactionBuilder.vote(...param);
                const parameter = txPars(transaction) as ContractParamterWrapper<VoteWitnessContract>;

                assert.equal(parameter.value.owner_address, accounts.hex[1]);
                assert.equal(parameter.value.votes[0].vote_address, accounts.hex[0]);
                assert.equal(parameter.value.votes[0].vote_count, 5);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.VoteWitnessContract');
            }
        });
    });

    describe('#createSmartContract', async function () {
        it('should create a smart contract with default parameters', async function () {
            const options: CreateSmartContractOptions = {
                abi: testRevert.abi,
                bytecode: testRevert.bytecode,
                feeLimit: 8e7,
            };
            const params = [
                [options],
                [
                    {
                        ...options,
                        permissionId: 2,
                    },
                ],
                [
                    {
                        ...options,
                        blockHeader: await getHeaderInfo(tronWeb.fullNode),
                    },
                ],
            ];
            for (let param of params) {
                const tx = await tronWeb.transactionBuilder.createSmartContract(...param);
                assert.equal(tx.raw_data.contract[0].parameter.value.new_contract.consume_user_resource_percent, 100);
                assert.equal(tx.raw_data.contract[0].parameter.value.new_contract.origin_energy_limit, 1e7);
                assert.equal(tx.raw_data.fee_limit, 8e7);
                assert.equal(tx.raw_data.contract[0].Permission_id || 0, param[0].permissionId || 0);
            }
        });

        it('should create a smart contract with array parameters', async function () {
            this.timeout(20000);
            const bals = [1000, 2000, 3000, 4000];
            const options = {
                abi: arrayParam.abi,
                bytecode: arrayParam.bytecode,
                permissionId: 2,
                parameters: [
                    [accounts.hex[25], accounts.hex[26], accounts.hex[27], accounts.hex[28]],
                    [bals[0], bals[1], bals[2], bals[3]],
                ],
            } as unknown as CreateSmartContractOptions;
            const transaction = await tronWeb.transactionBuilder.createSmartContract(options, accounts.hex[10]);
            await broadcaster(null, accounts.pks[10], transaction);
            while (true) {
                const tx = await tronWeb.trx.getTransactionInfo(transaction.txID);
                if (Object.keys(tx).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }
            const deployed: any = await tronWeb.contract().at(transaction.contract_address);
            for (let j = 25; j <= 28; j++) {
                let bal = await deployed.balances(accounts.hex[j]).call();
                assert.equal(bal, bals[j - 25]);
            }
        });

        it('should create a smart contract and verify the parameters', async function () {
            const options: CreateSmartContractOptions = {
                abi: testRevert.abi,
                bytecode: testRevert.bytecode,
                userFeePercentage: 30,
                originEnergyLimit: 9e6,
                feeLimit: 9e8,
            };
            for (let i = 0; i < 2; i++) {
                if (i === 1) options.permissionId = 2;
                const tx = await tronWeb.transactionBuilder.createSmartContract(options);
                assert.equal(tx.raw_data.contract[0].parameter.value.new_contract.consume_user_resource_percent, 30);
                assert.equal(tx.raw_data.contract[0].parameter.value.new_contract.origin_energy_limit, 9e6);
                assert.equal(tx.raw_data.fee_limit, 9e8);
                assert.equal(tx.raw_data.contract[0].Permission_id || 0, options.permissionId || 0);
            }
        });

        it('should allow default account to create a payable contract with callvalue == 0', async function () {
            const options: CreateSmartContractOptions = {
                abi: testPayable.abi,
                bytecode: testPayable.bytecode,
                callValue: 0,
            };
            const tx = await tronWeb.transactionBuilder.createSmartContract(options);
            assert.equal(tx.raw_data.contract[0].parameter.value.new_contract.consume_user_resource_percent, 100);
            assert.equal(tx.raw_data.contract[0].parameter.value.new_contract.origin_energy_limit, 1e7);
            assert.equal(tx.raw_data.contract[0].Permission_id || 0, options.permissionId || 0);
        });
    });

    describe('#triggerConstantContract', async function () {
        let transaction;
        let contractAddress: any;
        before(async function () {
            this.timeout(20000);

            transaction = await tronWeb.transactionBuilder.createSmartContract(
                {
                    abi: testConstant.abi,
                    bytecode: testConstant.bytecode,
                },
                accounts.hex[6]
            );
            await broadcaster(null, accounts.pks[6], transaction);
            while (true) {
                const tx = await tronWeb.trx.getTransactionInfo(transaction.txID);
                if (Object.keys(tx).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }
            contractAddress = transaction.contract_address;
        });

        it('should trigger constant contract successfully', async function () {
            this.timeout(20000);

            const issuerAddress = accounts.hex[6];
            const functionSelector = 'testPure(uint256,uint256)';
            const parameter = [
                { type: 'uint256', value: 1 },
                { type: 'uint256', value: 2 },
            ];
            const options: TriggerSmartContractOptions = {};
            const params: Array<[string, string, TriggerConstantContractOptions, ContractFunctionParameter[], string]> = [
                [contractAddress, functionSelector, options, parameter, issuerAddress],
                [contractAddress, functionSelector, { ...options, permissionId: 2 }, parameter, issuerAddress],
                [
                    contractAddress,
                    functionSelector,
                    { ...options, blockHeader: await getHeaderInfo(tronWeb.fullNode) },
                    parameter,
                    issuerAddress,
                ],
            ];

            for (let param of params) {
                transaction = await tronWeb.transactionBuilder.triggerConstantContract(...param);
                assert.isTrue(
                    transaction.result.result &&
                        transaction.transaction.raw_data.contract[0].parameter.type_url ===
                            'type.googleapis.com/protocol.TriggerSmartContract'
                );
                assert.equal(transaction.constant_result, '0000000000000000000000000000000000000000000000000000000000000004');
                transaction = await broadcaster(null, accounts.pks[6], transaction.transaction);
                assert.isTrue(transaction.receipt.result);
                assert.equal(transaction.transaction.raw_data.contract[0].Permission_id || 0, param[2].permissionId || 0);
            }
        });

        it('should trigger constant contract with triggerSmartContract successfully', async function () {
            this.timeout(20000);

            const issuerAddress = accounts.hex[6];
            const functionSelector = 'testPure(uint256,uint256)';
            const parameter = [
                { type: 'uint256', value: 1 },
                { type: 'uint256', value: 2 },
            ];
            const options: TriggerSmartContractOptions = {};

            for (let i = 0; i < 2; i++) {
                if (i === 1) options.permissionId = 2;
                transaction = await tronWeb.transactionBuilder.triggerSmartContract(
                    contractAddress,
                    functionSelector,
                    options,
                    parameter,
                    issuerAddress
                );
                assert.isTrue(
                    transaction.result.result &&
                        transaction.transaction.raw_data.contract[0].parameter.type_url ===
                            'type.googleapis.com/protocol.TriggerSmartContract'
                );
                assert.equal(transaction.constant_result, '0000000000000000000000000000000000000000000000000000000000000004');
                transaction = await broadcaster(null, accounts.pks[6], transaction.transaction);
                assert.isTrue(transaction.receipt.result);
                assert.equal(transaction.transaction.raw_data.contract[0].Permission_id || 0, options.permissionId || 0);
            }
        });
    });

    describe('#triggerComfirmedConstantContract', async function () {
        let transaction: any;
        before(async function () {
            this.timeout(20000);

            transaction = await tronWeb.transactionBuilder.createSmartContract(
                {
                    abi: testConstant.abi,
                    bytecode: testConstant.bytecode,
                },
                accounts.hex[6]
            );
            await broadcaster(null, accounts.pks[6], transaction);
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

        it('should trigger confirmed constant contract successfully', async function () {
            this.timeout(20000);

            const contractAddress = transaction.contract_address;
            const issuerAddress = accounts.hex[6];
            const functionSelector = 'testPure(uint256,uint256)';
            const parameter = [
                { type: 'uint256', value: 1 },
                { type: 'uint256', value: 2 },
            ];
            const options: TriggerSmartContractOptions = {};

            for (let i = 0; i < 2; i++) {
                if (i === 1) options.permissionId = 2;
                transaction = await tronWeb.transactionBuilder.triggerConfirmedConstantContract(
                    contractAddress,
                    functionSelector,
                    options,
                    parameter,
                    issuerAddress
                );
                assert.isTrue(
                    transaction.result.result &&
                        transaction.transaction.raw_data.contract[0].parameter.type_url ===
                            'type.googleapis.com/protocol.TriggerSmartContract'
                );
                assert.equal(transaction.constant_result, '0000000000000000000000000000000000000000000000000000000000000004');
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                transaction = await broadcaster(null, accounts.pks[6], transaction.transaction);
                assert.isTrue(transaction.receipt.result);
                assert.equal(transaction.transaction.raw_data.contract[0].Permission_id || 0, options.permissionId || 0);
            }
        });
    });

    describe('#clearabi', async function () {
        const transactions: any[] = [];
        const contracts = [];
        before(async function () {
            this.timeout(20000);

            transactions.push(
                await tronWeb.transactionBuilder.createSmartContract(
                    {
                        abi: testConstant.abi,
                        bytecode: testConstant.bytecode,
                    },
                    accounts.hex[7]
                )
            );
            transactions.push(
                await tronWeb.transactionBuilder.createSmartContract(
                    {
                        abi: testConstant.abi,
                        bytecode: testConstant.bytecode,
                    },
                    accounts.hex[7]
                )
            );
            transactions.push(
                await tronWeb.transactionBuilder.createSmartContract(
                    {
                        abi: testConstant.abi,
                        bytecode: testConstant.bytecode,
                    },
                    accounts.hex[7]
                )
            );
            transactions.forEach(async (tx) => {
                contracts.push(await broadcaster(null, accounts.pks[7], tx));
            });

            while (true) {
                const tx1 = await tronWeb.trx.getTransactionInfo(transactions[0].txID);
                const tx2 = await tronWeb.trx.getTransactionInfo(transactions[1].txID);
                const tx3 = await tronWeb.trx.getTransactionInfo(transactions[2].txID);
                if (Object.keys(tx1).length === 0 || Object.keys(tx2).length === 0 || Object.keys(tx3).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }
        });

        it('should clear contract abi', async function () {
            this.timeout(10000);

            const params = [
                [transactions[0], accounts.hex[7], { permissionId: 2 }],
                [transactions[1], accounts.hex[7]],
                [transactions[2], accounts.hex[7], { blockHeader: await getHeaderInfo(tronWeb.fullNode) }],
            ];
            for (const param of params) {
                const contractAddress = param[0].contract_address;
                const ownerAddress = param[1];

                // verify contract abi before
                const contract = await tronWeb.trx.getContract(contractAddress);
                assert.isTrue(Object.keys(contract.abi).length > 0);

                // clear abi
                const transaction = await tronWeb.transactionBuilder.clearABI(contractAddress, ownerAddress, param[2]);
                const parameter = txPars(transaction) as ContractParamterWrapper<ClearABIContract>;
                assert.isTrue(
                    !transaction.visible &&
                        transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.ClearABIContract'
                );
                assert.equal(transaction.txID.length, 64);
                assert.equal(parameter.value.contract_address, tronWeb.address.toHex(contractAddress));
                assert.equal(parameter.value.owner_address, tronWeb.address.toHex(ownerAddress));
                assert.equal(transaction.raw_data.contract[0].Permission_id, param[2]?.permissionId);

                if (param.length === 2) {
                    const res = await broadcaster(null, accounts.pks[7], transaction);
                    assert.isTrue(res.receipt.result);

                    let contract;
                    // verify contract abi after
                    while (true) {
                        contract = await tronWeb.trx.getContract(contractAddress);
                        if (Object.keys(contract.abi).length > 0) {
                            await wait(3);
                            continue;
                        } else {
                            break;
                        }
                    }
                    assert.isTrue(Object.keys(contract.abi).length === 0);
                }
            }
        });

        it('should throw Invalid contract address provided', async function () {
            // @ts-ignore
            await assertThrow(tronWeb.transactionBuilder.clearABI(null, accounts.hex[1]), 'Invalid contract address provided');
        });

        it('should throw Invalid owner address provided', async function () {
            await assertThrow(
                // @ts-ignore
                tronWeb.transactionBuilder.clearABI(transactions[0].contract_address, null),
                'Invalid owner address provided'
            );
        });
    });

    describe('#updateBrokerage', async function () {
        before(async function () {
            await broadcaster(tronWeb.transactionBuilder.sendTrx(accounts.b58[1], 10000e6), PRIVATE_KEY);
            await broadcaster(tronWeb.transactionBuilder.applyForSR(accounts.b58[1], 'abc.tron.network'), accounts.pks[1]);
        });

        it('should update sr brokerage successfully', async function () {
            const params: Parameters<TransactionBuilder['updateBrokerage']>[] = [
                [10, accounts.hex[1], { permissionId: 2 }],
                [20, accounts.hex[1]],
                [10, accounts.hex[1], { blockHeader: await getHeaderInfo(tronWeb.fullNode) }],
            ];
            for (const param of params) {
                const transaction = await tronWeb.transactionBuilder.updateBrokerage(...param);
                const parameter = txPars(transaction) as ContractParamterWrapper<UpdateBrokerageContract>;
                assert.equal(transaction.txID.length, 64);
                assert.equal(parameter.value.brokerage, param[0]);
                assert.equal(parameter.value.owner_address, param[1]);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.UpdateBrokerageContract');
                assert.equal(transaction.raw_data.contract[0].Permission_id, param[2]?.permissionId);
            }
        });

        it('should throw invalid brokerage provided error', async function () {
            // @ts-ignore
            await assertThrow(tronWeb.transactionBuilder.updateBrokerage(null, accounts.hex[1]), 'Invalid brokerage provided');
        });

        it('should throw brokerage must be an integer between 0 and 100 error', async function () {
            const brokerages = [-1, 101];
            for (const brokerage of brokerages) {
                await assertThrow(
                    tronWeb.transactionBuilder.updateBrokerage(brokerage, accounts.hex[1]),
                    'Brokerage must be an integer between 0 and 100'
                );
            }
        });

        it('should throw invalid owner address provided error', async function () {
            await assertThrow(tronWeb.transactionBuilder.updateBrokerage(10, 'abcd'), 'Invalid owner address provided');
        });
    });

    describe('#withdrawBlockRewards', async function () {
        //
    });

    describe('#triggerSmartContract', async function () {
        let transaction: any;
        before(async function () {
            this.timeout(20000);

            transaction = await tronWeb.transactionBuilder.createSmartContract(
                {
                    abi: testConstant.abi,
                    bytecode: testConstant.bytecode,
                },
                accounts.hex[6]
            );
            await broadcaster(null, accounts.pks[6], transaction);
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

        it('should trigger smart contract successfully', async function () {
            this.timeout(20000);

            const contractAddress = transaction.contract_address;
            const issuerAddress = accounts.hex[6];
            const functionSelector = 'testPure(uint256,uint256)';
            const parameter = [
                { type: 'uint256', value: 1 },
                { type: 'uint256', value: 2 },
            ];
            const options: TriggerConstantContractOptions = {
                _isConstant: true,
            };

            for (let i = 0; i < 2; i++) {
                if (i === 1) options.permissionId = 2;
                transaction = await tronWeb.transactionBuilder.triggerSmartContract(
                    contractAddress,
                    functionSelector,
                    options,
                    parameter,
                    issuerAddress
                );
                assert.isTrue(
                    transaction.result.result &&
                        transaction.transaction.raw_data.contract[0].parameter.type_url ===
                            'type.googleapis.com/protocol.TriggerSmartContract'
                );
                assert.equal(transaction.constant_result, '0000000000000000000000000000000000000000000000000000000000000004');
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                transaction = await broadcaster(null, accounts.pks[6], transaction.transaction);
                assert.isTrue(transaction.receipt.result);
                assert.equal(transaction.transaction.raw_data.contract[0].Permission_id || 0, options.permissionId || 0);
            }
        });
    });

    describe('#createTokenExchange', async function () {
        const idxS = 12;
        const idxE = 14;
        const toIdx1 = 5;
        const toIdx2 = 6;
        const tokenNames: any[] = [];

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
                await broadcaster(
                    null,
                    accounts.pks[i],
                    await tronWeb.transactionBuilder.sendToken(
                        accounts.hex[toIdx1],
                        10e4,
                        token[Object.keys(token)[0]]['id'],
                        token[Object.keys(token)[0]]['owner_address']
                    )
                );
                await waitChainData('sendToken', accounts.hex[toIdx1], 0);
                await broadcaster(
                    null,
                    accounts.pks[i],
                    await tronWeb.transactionBuilder.sendToken(
                        accounts.hex[toIdx2],
                        10e4,
                        token[Object.keys(token)[0]]['id'],
                        token[Object.keys(token)[0]]['owner_address']
                    )
                );
                await waitChainData('sendToken', accounts.hex[toIdx2], 0);
                tokenNames.push(token[Object.keys(token)[0]]['id']);
            }
        });

        it('should create token exchange', async function () {
            const params: Array<[string, number, string, number, string, TransactionCommonOptions?]> = [
                [tokenNames[0], 10e3, tokenNames[1], 10e3, accounts.hex[toIdx1], { permissionId: 2 }],
                [tokenNames[0], 10e3, tokenNames[1], 10e3, accounts.hex[toIdx1]],
                [
                    tokenNames[0],
                    10e3,
                    tokenNames[1],
                    10e3,
                    accounts.hex[toIdx1],
                    { blockHeader: await getHeaderInfo(tronWeb.fullNode) },
                ],
            ];
            for (let param of params) {
                let transaction = await tronWeb.transactionBuilder.createTokenExchange(...param);
                let parameter = txPars(transaction) as ContractParamterWrapper<ExchangeCreateContract>;

                assert.equal(transaction.txID.length, 64);
                assert.equal(TronWeb.toUtf8(parameter.value.first_token_id), tokenNames[0]);
                assert.equal(TronWeb.toUtf8(parameter.value.second_token_id), tokenNames[1]);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.ExchangeCreateContract');
                assert.equal(transaction.raw_data.contract[0].Permission_id, param[5]?.permissionId);
            }
        });
    });

    describe('#createTRXExchange', async function () {
        //
    });

    describe('#injectExchangeTokens', async function () {
        const idxS = 14;
        const idxE = 16;
        const tokenNames: any[] = [];
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
                await broadcaster(
                    null,
                    accounts.pks[i],
                    await tronWeb.transactionBuilder.sendToken(
                        tronWeb.defaultAddress.hex as string,
                        10e4,
                        token[Object.keys(token)[0]]['id'],
                        token[Object.keys(token)[0]]['owner_address']
                    )
                );
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
        it(`should inject exchange tokens`, async function () {
            const params: Parameters<TransactionBuilder['injectExchangeTokens']>[] = [
                [exchangeId as unknown as number, tokenNames[0], 10, tronWeb.defaultAddress.hex as string, { permissionId: 2 }],
                [exchangeId as unknown as number, tokenNames[0], 10],
                [
                    exchangeId as unknown as number,
                    tokenNames[0],
                    10,
                    tronWeb.defaultAddress.hex as string,
                    { blockHeader: await getHeaderInfo(tronWeb.fullNode) },
                ],
            ];
            for (const param of params) {
                const transaction = await tronWeb.transactionBuilder.injectExchangeTokens(...param);
                const authResult = utils.transaction.txCheck(transaction);
                assert.equal(authResult, true);
            }
        });
    });

    describe('#withdrawExchangeTokens', async function () {
        const idxS = 30;
        const idxE = 32;
        const tokenNames: any[] = [];
        let exchangeId = 0;

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
                await broadcaster(
                    null,
                    accounts.pks[i],
                    await tronWeb.transactionBuilder.sendToken(
                        tronWeb.defaultAddress.hex as string,
                        10e4,
                        token[Object.keys(token)[0]]['id'],
                        token[Object.keys(token)[0]]['owner_address']
                    )
                );
                tokenNames.push(token[Object.keys(token)[0]]['id']);
            }
            const transaction = await tronWeb.transactionBuilder.createTokenExchange(tokenNames[1], 10, tokenNames[0], 10);
            await broadcaster(transaction);
            let receipt = await tronWeb.trx.getTransactionInfo(transaction.txID);
            while (!Object.keys(receipt).length) {
                await wait(5);
                receipt = await tronWeb.trx.getTransactionInfo(transaction.txID);
            }
            exchangeId = receipt.exchange_id as unknown as number;

            transaction.raw_data_hex = transaction.raw_data_hex + '00';
            const authResult2 = utils.transaction.txCheck(transaction);
            assert.equal(authResult2, false);
        });
        it(`should withdraw exchange tokens`, async function () {
            const params: Parameters<TransactionBuilder['withdrawExchangeTokens']>[] = [
                [exchangeId, tokenNames[0], 10, tronWeb.defaultAddress.hex as string, { permissionId: 2 }],
                [exchangeId, tokenNames[0], 10],
                [
                    exchangeId,
                    tokenNames[0],
                    10,
                    tronWeb.defaultAddress.hex as string,
                    { blockHeader: await getHeaderInfo(tronWeb.fullNode) },
                ],
            ];
            for (const param of params) {
                const transaction = await tronWeb.transactionBuilder.withdrawExchangeTokens(...param);
                const authResult = utils.transaction.txCheck(transaction);
                assert.equal(authResult, true);
            }
        });
    });

    describe('#tradeExchangeTokens', async function () {
        const idxS = 31;
        const idxE = 33;
        const tokenNames: string[] = [];
        let exchangeId = 0;

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
                await broadcaster(
                    null,
                    accounts.pks[i],
                    await tronWeb.transactionBuilder.sendToken(
                        tronWeb.defaultAddress.hex as string,
                        10e4,
                        token[Object.keys(token)[0]]['id'],
                        token[Object.keys(token)[0]]['owner_address']
                    )
                );
                tokenNames.push(token[Object.keys(token)[0]]['id']);
            }
            const transaction = await tronWeb.transactionBuilder.createTokenExchange(tokenNames[1], 10, tokenNames[0], 10);
            await broadcaster(transaction);
            let receipt = await tronWeb.trx.getTransactionInfo(transaction.txID);
            while (!Object.keys(receipt).length) {
                await wait(5);
                receipt = await tronWeb.trx.getTransactionInfo(transaction.txID);
            }
            exchangeId = receipt.exchange_id as unknown as number;
        });
        it(`should trade exchange tokens`, async function () {
            const params: Parameters<TransactionBuilder['tradeExchangeTokens']>[] = [
                [exchangeId, tokenNames[0], 10, 5, tronWeb.defaultAddress.hex as string, { permissionId: 2 }],
                [exchangeId, tokenNames[0], 10, 5],
                [
                    exchangeId,
                    tokenNames[0],
                    10,
                    5,
                    tronWeb.defaultAddress.hex as string,
                    { blockHeader: await getHeaderInfo(tronWeb.fullNode) },
                ],
            ];
            for (const param of params) {
                const transaction = await tronWeb.transactionBuilder.tradeExchangeTokens(...param);
                const authResult = utils.transaction.txCheck(transaction);
                assert.equal(authResult, true);

                transaction.raw_data_hex = transaction.raw_data_hex + '00';
                const authResult2 = utils.transaction.txCheck(transaction);
                assert.equal(authResult2, false);

                transaction.txID = transaction.txID + '00';
                const authResult3 = utils.transaction.txCheck(transaction);
                assert.equal(authResult3, false);
            }
        });
    });

    describe('#updateSetting', function () {
        let transaction: CreateSmartContractTransaction;
        before(async function () {
            this.timeout(20000);

            transaction = await tronWeb.transactionBuilder.createSmartContract(
                {
                    abi: testConstant.abi,
                    bytecode: testConstant.bytecode,
                },
                accounts.hex[3]
            );
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
        });
        it(`should update setting`, async function () {
            const params: Parameters<typeof tronWeb.transactionBuilder.updateSetting>[] = [
                [transaction.contract_address, 10, accounts.b58[3], { permissionId: 2 }],
                [transaction.contract_address, 20, accounts.b58[3]],
                [transaction.contract_address, 10, accounts.b58[3], { blockHeader: await getHeaderInfo(tronWeb.fullNode) }],
            ];
            for (const param of params) {
                const transaction = await tronWeb.transactionBuilder.updateSetting(...param);
                const authResult = utils.transaction.txCheck(transaction);
                assert.equal(authResult, true);
            }
        });
    });

    describe('#updateEnergyLimit', function () {
        let transaction: CreateSmartContractTransaction;
        before(async function () {
            this.timeout(20000);

            transaction = await tronWeb.transactionBuilder.createSmartContract(
                {
                    abi: testConstant.abi,
                    bytecode: testConstant.bytecode,
                },
                accounts.hex[3]
            );
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
        });
        it(`should update energy limit`, async function () {
            const params: Parameters<TransactionBuilder['updateSetting']>[] = [
                [transaction.contract_address, 10e6, accounts.b58[3], { permissionId: 2 }],
                [transaction.contract_address, 10e6, accounts.b58[3]],
                [transaction.contract_address, 10e6, accounts.b58[3], { blockHeader: await getHeaderInfo(tronWeb.fullNode) }],
            ];
            for (const param of params) {
                const transaction = await tronWeb.transactionBuilder.updateEnergyLimit(...param);
                const authResult = utils.transaction.txCheck(transaction);
                assert.equal(authResult, true);
            }
        });
    });

    describe('#accountPermissionUpdate', function () {
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
        it(`should update account permissions`, async function () {
            const permissionData = {
                owner: {
                    type: 0,
                    keys: [
                        {
                            address: accounts.hex[6],
                            weight: 1,
                        },
                    ],
                    threshold: 1,
                    permission_name: 'owner',
                },
                witness: {
                    keys: [
                        {
                            address: accounts.hex[6],
                            weight: 1,
                        },
                    ],
                    threshold: 1,
                    id: 1,
                    type: 1,
                    permission_name: 'witness',
                },
                owner_address: accounts.hex[6],
                actives: [
                    {
                        operations: '7fff1fc0033e0000000000000000000000000000000000000000000000000000',
                        keys: [
                            {
                                address: accounts.hex[6],
                                weight: 1,
                            },
                        ],
                        threshold: 1,
                        id: 2,
                        type: 2,
                        permission_name: 'active',
                    },
                ],
            };
            const permissionData2 = {
                "owner": {
                    "type": 0,
                    "keys": [
                    {
                        "address": accounts.b58[6],
                        "weight": 1
                    }
                    ],
                    "threshold": 1,
                    "permission_name": "owner"
                },
                "witness": {
                    "keys": [
                    {
                        "address": accounts.b58[6],
                        "weight": 1
                    }
                    ],
                    "threshold": 1,
                    "id": 1,
                    "type": 1,
                    "permission_name": "witness"
                },
                "owner_address": accounts.b58[6],
                "actives": [
                    {
                    "operations": "7fff1fc0033e0000000000000000000000000000000000000000000000000000",
                    "keys": [
                        {
                        "address": accounts.b58[6],
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
            const params: Parameters<TransactionBuilder['updateAccountPermissions']>[] = [
                [accounts.hex[6], permissionData.owner, permissionData.witness, permissionData.actives, { permissionId: 2 }],
                [accounts.hex[6], permissionData.owner, permissionData.witness, permissionData.actives],
                [
                    accounts.hex[6],
                    permissionData.owner,
                    permissionData.witness,
                    permissionData.actives,
                    { blockHeader: await getHeaderInfo(tronWeb.fullNode) },
                ],
                [accounts.hex[6], permissionData2.owner, permissionData2.witness, permissionData2.actives],
            ];
            for (const param of params) {
                const transaction = await tronWeb.transactionBuilder.updateAccountPermissions(...param);
                const parameter = txPars(transaction);
                assert.equal(transaction.txID.length, 64);
                assert.equal(parameter.value.owner_address, param[0]);
                // assert.deepEqual(parameter.value.owner, param[1]);
                // assert.deepEqual(parameter.value.witness, param[2]);
                // assert.deepEqual(parameter.value.actives, param[3]);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.AccountPermissionUpdateContract');
                assert.equal(transaction.raw_data.contract[0].Permission_id, param[4]?.permissionId);
                await tronWeb.trx.sign(transaction, accounts.pks[6]);
            }
        });
    });

    describe('Alter existent transactions', async function () {
        describe('#newTxID', async function () {
            it('should keep txID unchanged when txLocal is true', async function () {
                const receiver = accounts.b58[42];
                const sender = accounts.hex[43];
                const transaction = await tronWeb.transactionBuilder.sendTrx(receiver, 10, sender);
                const previousId = transaction.txID;
                const transactionLater = (await tronWeb.transactionBuilder.newTxID(transaction as SignedTransaction, {
                    txLocal: true,
                })) as any;
                assert.equal(previousId, transactionLater.txID);
            });

            it('should keep txID unchanged when txLocal is unset', async function () {
                const receiver = accounts.b58[42];
                const sender = accounts.hex[43];
                const transaction = await tronWeb.transactionBuilder.sendTrx(receiver, 10, sender);
                const previousId = transaction.txID;
                const transactionLater = (await tronWeb.transactionBuilder.newTxID(transaction as SignedTransaction)) as any;
                assert.equal(previousId, transactionLater.txID);
            });
        });

        describe('#extendExpiration', async function () {
            it('should extend the expiration', async function () {
                const receiver = accounts.b58[42];
                const sender = accounts.hex[43];
                const privateKey = accounts.pks[43];
                const balance = await tronWeb.trx.getUnconfirmedBalance(sender);

                let transaction = await tronWeb.transactionBuilder.sendTrx(receiver, 10, sender);
                const previousId = transaction.txID;
                transaction = (await tronWeb.transactionBuilder.extendExpiration(transaction as any, 3600)) as any;
                await broadcaster(null, privateKey, transaction);

                assert.notEqual(transaction.txID, previousId);
                assert.equal(balance - (await tronWeb.trx.getUnconfirmedBalance(sender)), 10);
            });

            it('should extend the expiration when txLocal is ture', async function () {
                await wait(3);
                const receiver = accounts.b58[42];
                const sender = accounts.hex[43];
                const privateKey = accounts.pks[43];
                const balance = await tronWeb.trx.getUnconfirmedBalance(sender);

                let transaction: any = await tronWeb.transactionBuilder.sendTrx(receiver, 10, sender);
                const previousId = transaction.txID;
                transaction = await tronWeb.transactionBuilder.extendExpiration(transaction, 3600, { txLocal: true });
                await broadcaster(null, privateKey, transaction);

                assert.notEqual(transaction.txID, previousId);
                assert.equal(balance - (await tronWeb.trx.getUnconfirmedBalance(sender)), 10);
            });
        });

        describe('#addUpdateData', async function () {
            it('should add a data field', async function () {
                this.timeout(20000);

                const receiver = accounts.b58[44];
                const sender = accounts.hex[45];
                const privateKey = accounts.pks[45];
                const balance = await tronWeb.trx.getUnconfirmedBalance(sender);

                let transaction = await tronWeb.transactionBuilder.sendTrx(receiver, 10, sender);
                const data = 'Sending money to Bill.';
                transaction = (await tronWeb.transactionBuilder.addUpdateData(transaction, data)) as any;
                const id = transaction.txID;
                await broadcaster(null, privateKey, transaction);
                await waitChainData('tx', id);
                assert.equal(balance - (await tronWeb.trx.getUnconfirmedBalance(sender)), 10 + 1e6); // change chain data at a cost of 1e6
                const unconfirmedTx = (await tronWeb.trx.getTransaction(id)) as any;
                assert.equal(tronWeb.toUtf8(unconfirmedTx.raw_data.data), data);
            });

            it('should add a data field when txLocal is true', async function () {
                this.timeout(20000);
                await wait(3);
                const receiver = accounts.b58[44];
                const sender = accounts.hex[45];
                const privateKey = accounts.pks[45];
                const balance = await tronWeb.trx.getUnconfirmedBalance(sender);

                let transaction = await tronWeb.transactionBuilder.sendTrx(receiver, 10, sender);
                const data = 'Sending money to Bill.';
                transaction = (await tronWeb.transactionBuilder.addUpdateData(transaction, data, 'utf8', {
                    txLocal: true,
                })) as any;
                const id = transaction.txID;
                await broadcaster(null, privateKey, transaction);
                await waitChainData('tx', id);
                assert.equal(balance - (await tronWeb.trx.getUnconfirmedBalance(sender)), 10 + 1e6); // change chain data at a cost of 1e6
                const unconfirmedTx = (await tronWeb.trx.getTransaction(id)) as any;
                assert.equal(tronWeb.toUtf8(unconfirmedTx.raw_data.data), data);
            });
        });

        describe('#alterTransaction', async function () {
            // before(async function() {
            //     await wait(4);
            // })

            it('should alter the transaction adding a data field', async function () {
                const receiver = accounts.b58[40];
                const sender = accounts.hex[41];
                const privateKey = accounts.pks[41];
                // const balance = await tronWeb.trx.getUnconfirmedBalance(sender);

                let transaction = await tronWeb.transactionBuilder.sendTrx(receiver, 10, sender);
                const previousId = transaction.txID;
                const data = 'Sending money to Bill.';
                transaction = (await tronWeb.transactionBuilder.alterTransaction(transaction, { data })) as any;
                const id = transaction.txID;
                assert.notEqual(id, previousId);
                await broadcaster(null, privateKey, transaction);
                await waitChainData('tx', id);
                const unconfirmedTx = (await tronWeb.trx.getTransaction(id)) as any;
                assert.equal(tronWeb.toUtf8(unconfirmedTx.raw_data.data), data);
            });

            it('should alter the transaction adding a data field when txLocal is true', async function () {
                const receiver = accounts.b58[40];
                const sender = accounts.hex[41];
                const privateKey = accounts.pks[41];
                // const balance = await tronWeb.trx.getUnconfirmedBalance(sender);

                let transaction = await tronWeb.transactionBuilder.sendTrx(receiver, 10, sender);
                const previousId = transaction.txID;
                const data = 'Sending money to Bill.';
                transaction = (await tronWeb.transactionBuilder.alterTransaction(transaction, { data, txLocal: true })) as any;
                const id = transaction.txID;
                assert.notEqual(id, previousId);
                await broadcaster(null, privateKey, transaction);
                await waitChainData('tx', id);
                const unconfirmedTx = (await tronWeb.trx.getTransaction(id)) as any;
                assert.equal(tronWeb.toUtf8(unconfirmedTx.raw_data.data), data);
            });
        });
    });

    describe('#triggerSmartContractWithRawParam', async function () {
        let transaction: CreateSmartContractTransaction;
        let issuerAddress: string;
        let issuerPk: string;

        before(async () => {
            issuerAddress = accounts.hex[40];
            issuerPk = accounts.pks[40];
            transaction = await tronWeb.transactionBuilder.createSmartContract(
                {
                    abi: rawParam.abi,
                    bytecode: rawParam.bytecode,
                    rawParameter: '0x0000000000000000000000000000000000000000000000000000000000000001',
                },
                issuerAddress
            );
            await broadcaster(null, issuerPk, transaction);
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

        it('should trigger a smart contract with rawParameter', async function () {
            const deployed: any = await tronWeb.contract().at(transaction.contract_address);
            let check = await deployed.check().call();
            assert.equal(check, 1);

            const setTransaction = await tronWeb.transactionBuilder.triggerSmartContract(
                transaction.contract_address,
                'setCheck(uint256)',
                {
                    rawParameter: '0x0000000000000000000000000000000000000000000000000000000000000002',
                },
                [],
                issuerAddress
            );
            await broadcaster(null, issuerPk, setTransaction.transaction);

            check = await deployed.check().call();
            assert.equal(check, 2);
        });

        it('should trigger a smart contract locally with rawParameter', async function () {
            const deployed: any = await tronWeb.contract().at(transaction.contract_address);

            const setTransaction = await tronWeb.transactionBuilder.triggerSmartContract(
                transaction.contract_address,
                'setCheck(uint256)',
                {
                    rawParameter: '0x0000000000000000000000000000000000000000000000000000000000000003',
                    txLocal: true,
                },
                [],
                issuerAddress
            );
            await broadcaster(null, issuerPk, setTransaction.transaction);

            const check = await deployed.check().call();
            assert.equal(check, 3);
        });
    });

    describe('#triggerSmartContractWithFuncABIV2 (V1 input)', async function () {
        it('should create or trigger a smart contract with funcABIV2 (V1 input)', async function () {
            const issuerAddress = accounts.hex[40];
            const issuerPk = accounts.pks[40];

            const transaction = await tronWeb.transactionBuilder.createSmartContract(
                {
                    abi: funcABIV2.abi,
                    bytecode: funcABIV2.bytecode,
                    funcABIV2: funcABIV2.abi[0],
                    parametersV2: [1],
                },
                issuerAddress
            );
            await broadcaster(null, issuerPk, transaction);
            while (true) {
                const tx = await tronWeb.trx.getTransactionInfo(transaction.txID);
                if (Object.keys(tx).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }

            const deployed: any = await tronWeb.contract().at(transaction.contract_address);
            let check = await deployed.check().call();
            assert.equal(check, 1);

            /* test send method */
            const sendTxId = await deployed.setCheck(8).send({}, issuerPk);
            while (true) {
                const tx = await tronWeb.trx.getTransactionInfo(sendTxId);
                if (Object.keys(tx).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }
            const check1 = await deployed.check().call();
            assert.equal(check1, 8);

            /* test triggersmartcontract */
            const setTransaction = await tronWeb.transactionBuilder.triggerSmartContract(
                transaction.contract_address,
                'setCheck(uint256)',
                {
                    funcABIV2: funcABIV2.abi[2],
                    parametersV2: [16],
                },
                [],
                issuerAddress
            );
            await broadcaster(null, issuerPk, setTransaction.transaction);

            check = await deployed.check().call();
            assert.equal(check, 16);

            const setTransaction2 = await tronWeb.transactionBuilder.triggerSmartContract(
                transaction.contract_address,
                'setCheck(uint256)',
                {
                    funcABIV2: funcABIV2.abi[2],
                    parametersV2: [15],
                    txLocal: true,
                },
                [],
                issuerAddress
            );
            await broadcaster(null, issuerPk, setTransaction2.transaction);

            check = await deployed.check().call();
            assert.equal(check, 15);
        });
    });

    describe('#triggerSmartContractWithFuncABIV2 (V2 input)', async function () {
        it('should create or trigger a smart contract with funcABIV2 (V2 input)', async function () {
            // const coder = tronWeb.utils.abi;
            const issuerAddress = accounts.hex[40];
            const issuerPk = accounts.pks[40];
            const abi = JSON.parse(funcABIV2_2.interface);
            const bytecode = funcABIV2_2.bytecode;
            const outputValues = getValues(JSON.parse(funcABIV2_2.values));
            const transaction = await tronWeb.transactionBuilder.createSmartContract(
                {
                    abi,
                    bytecode,
                },
                issuerAddress
            );
            await broadcaster(null, issuerPk, transaction);
            while (true) {
                const tx = await tronWeb.trx.getTransactionInfo(transaction.txID);
                if (Object.keys(tx).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }

            const deployed: any = await tronWeb.contract(abi, transaction.contract_address);
            const check = await deployed.test().call();

            assert.ok(equals(check[0], outputValues[0]));
        });

        it('should create or trigger a smart contract with funcABIV2 (V2 input test send )', async function () {
            const issuerAddress = accounts.hex[40];
            const issuerPk = accounts.pks[40];

            const transaction = await tronWeb.transactionBuilder.createSmartContract(
                {
                    abi: funcABIV2_3.abi,
                    bytecode: funcABIV2_3.bytecode,
                },
                issuerAddress
            );
            await broadcaster(null, issuerPk, transaction);
            while (true) {
                const tx = await tronWeb.trx.getTransactionInfo(transaction.txID);
                if (Object.keys(tx).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }

            const deployed = tronWeb.contract(funcABIV2_3.abi, transaction.contract_address);
            const txID = await deployed
                .setStruct([
                    'TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY',
                    'TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY',
                    'TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY',
                ])
                .send();
            while (true) {
                const tx = await tronWeb.trx.getTransactionInfo(txID);
                if (Object.keys(tx).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }

            const check = await deployed.s(0).call();
            assert.ok(
                equals(check, [
                    'TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY',
                    'TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY',
                    'TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY',
                ])
            );
        });

        it('should create or trigger a smart contract with funcABIV2 (V2 input trcToken )', async function () {
            const issuerAddress = accounts.hex[40];
            const issuerPk = accounts.pks[40];

            const transaction = await tronWeb.transactionBuilder.createSmartContract(
                {
                    abi: funcABIV2_4.abi,
                    bytecode: funcABIV2_4.bytecode,
                },
                issuerAddress
            );
            await broadcaster(null, issuerPk, transaction);
            while (true) {
                const tx = await tronWeb.trx.getTransactionInfo(transaction.txID);
                if (Object.keys(tx).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }

            const deployed = tronWeb.contract(funcABIV2_4.abi, transaction.contract_address);
            const txID = await deployed
                .setStruct(['TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY', 1000100, 'TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY'])
                .send();
            while (true) {
                const tx = await tronWeb.trx.getTransactionInfo(txID);
                if (Object.keys(tx).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }

            const check = await deployed.s(0).call();
            assert.ok(equals(check, ['TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY', 1000100, 'TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY']));
        });
    });

    describe('#estimateEnergy', async function () {
        let transaction: CreateSmartContractTransaction;
        before(async function () {
            this.timeout(20000);
            transaction = await tronWeb.transactionBuilder.createSmartContract(
                {
                    abi: testSetVal.abi,
                    bytecode: testSetVal.bytecode,
                },
                accounts.hex[5]
            );
            await broadcaster(null, accounts.pks[5], transaction);
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

        it('should estimate energy successfully', async function () {
            this.timeout(20000);
            const contractAddress = transaction.contract_address;
            const issuerAddress = accounts.hex[5];
            const functionSelector = 'set(uint256)';
            const parameter = [{ type: 'uint256', value: 1 }];
            const options: TriggerConstantContractOptions = { estimateEnergy: true };

            for (let i = 0; i < 2; i++) {
                if (i === 1) options.permissionId = 2;
                const result = await tronWeb.transactionBuilder.estimateEnergy(
                    contractAddress,
                    functionSelector,
                    options,
                    parameter,
                    issuerAddress
                );
                assert.isTrue(result.result.result);
                assert.isDefined(result.energy_required);
                assert.isNumber(result.energy_required);
            }
        });

        it('should estimate confirmed energy successfully', async function () {
            this.timeout(20000);
            const contractAddress = transaction.contract_address;
            const issuerAddress = accounts.hex[5];
            const functionSelector = 'set(uint256)';
            const parameter = [{ type: 'uint256', value: 2 }];
            const options: TriggerConstantContractOptions = { estimateEnergy: true, confirmed: true };

            for (let i = 0; i < 2; i++) {
                if (i === 1) options.permissionId = 2;
                const result = await tronWeb.transactionBuilder.estimateEnergy(
                    contractAddress,
                    functionSelector,
                    options,
                    parameter,
                    issuerAddress
                );
                assert.isTrue(result.result.result);
                assert.isDefined(result.energy_required);
                assert.isNumber(result.energy_required);
            }
        });
    });
    describe('#deployConstantContract', async function () {
        it('should get the estimated energy of deploying a contract', async function () {
            const receipt = await tronWeb.transactionBuilder.deployConstantContract({
                input: testSetVal.bytecode,
                ownerAddress: accounts.hex[1],
            });
            assert.isTrue(receipt.result.result);
            assert.isDefined(receipt.energy_required);
            assert.isNumber(receipt.energy_required);
        });
    });
});
