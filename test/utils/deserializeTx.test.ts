import { assert } from 'chai';
import { TronWeb, utils, TransactionBuilder } from '../setup/TronWeb.js';
import tronWebBuilder from '../helpers/tronWebBuilder.js';

const fromUtf8 = (str: string) => {
    return TronWeb.fromUtf8(str).replace(/^0x/, '').toUpperCase();
};

describe('#TronWeb.utils.deserializeTx', function () {
    let tronWeb: TronWeb;

    describe('DTriggerSmartContract', async () => {
        let tx: Awaited<ReturnType<TransactionBuilder['triggerSmartContract']>>['transaction'];
        let account: Awaited<ReturnType<TronWeb['createAccount']>>;
        let account2: Awaited<ReturnType<TronWeb['createAccount']>>;
        const contractAddress = 'TU1ntBzpGPp7GJkzxLTKwYsneJ9JKUmBCK'; // nile usdt address
        before(async () => {
            tronWeb = tronWebBuilder.createInstance();
            account = await tronWeb.createAccount();
            account2 = await tronWeb.createAccount();
            tx = (
                await tronWeb.transactionBuilder.triggerSmartContract(
                    contractAddress,
                    'transfer(address,uint256)',
                    {
                        txLocal: true,
                        tokenId: '1000008',
                        tokenValue: 100,
                        feeLimit: 100 * 10 ** 6,
                    },
                    [
                        { type: 'address', value: account2.address.base58 },
                        { type: 'uint256', value: 100000000 },
                    ],
                    account.address.base58
                )
            ).transaction;
        });
        it('should deserialize the right result', async () => {
            const dResult = utils.deserializeTx.deserializeTransaction('TriggerSmartContract', tx.raw_data_hex);
            const value = dResult.contract[0].parameter.value;
            assert.equal(value.owner_address, account.address.hex);
            assert.equal(value.contract_address, utils.address.toHex(contractAddress).toUpperCase());
            assert.equal(value.call_value, 0);
            assert.equal(value.call_token_value, 100);
            assert.equal(value.token_id, '1000008');

            const getFunctionSelectorHex = (functionSelector: string) => {
                return utils.ethersUtils.keccak256(Buffer.from(functionSelector, 'utf-8')).toString().substring(2, 10);
            };

            const encodeParameters = (parameters: { type: string; value: unknown }[]) => {
                const abiCoder = new utils.ethersUtils.AbiCoder();
                let types: string[] = [];
                const values: any[] = [];

                for (let i = 0; i < parameters.length; i++) {
                    let { value } = parameters[i];
                    const { type } = parameters[i];
                    const replaceAddressPrefix = (value: unknown): any => {
                        if (Array.isArray(value)) {
                            return value.map((v) => replaceAddressPrefix(v));
                        }
                        return utils.address.toHex(value as string).replace('41', '0x');
                    };
                    if (type === 'address') value = replaceAddressPrefix(value);
                    else if (type.match(/^([^\x5b]*)(\x5b|$)/)?.[0] === 'address[') value = replaceAddressPrefix(value);

                    types.push(type);
                    values.push(value);
                }

                types = types.map((type) => {
                    if (/trcToken/.test(type)) {
                        type = type.replace(/trcToken/, 'uint256');
                    }
                    return type;
                });

                return abiCoder.encode(types, values).replace(/^(0x)/, '');
            };

            const getData = (functionSelector: string, parameters: { type: string; value: unknown }[]) => {
                return getFunctionSelectorHex(functionSelector) + encodeParameters(parameters);
            };
            assert.equal(
                value.data,
                getData('transfer(address,uint256)', [
                    { type: 'address', value: account2.address.base58 },
                    { type: 'uint256', value: 100000000 },
                ]).toUpperCase()
            );
            const abiCoder = new utils.ethersUtils.AbiCoder();
            const functionSelector = getFunctionSelectorHex('transfer(address,uint256)');
            const data = abiCoder.decode(['address', 'uint256'], '0x' + value.data.slice(8));
            const address = tronWeb.address.fromHex(data[0].replace('0x', '41'));
            const amount = data[1];
            assert.equal(functionSelector, value.data.slice(0, 8).toLowerCase());
            assert.equal(address, account2.address.base58);
            assert.equal(amount, 100000000);

            assert.equal(dResult.contract[0].Permission_id, 0);
            assert.equal(dResult.contract[0].parameter.type_url, tx.raw_data.contract[0].parameter.type_url);
            assert.equal(dResult.contract[0].type, 'TriggerSmartContract');
            assert.equal(dResult.expiration, tx.raw_data.expiration);
            assert.equal(dResult.timestamp, tx.raw_data.timestamp);
            assert.equal(dResult.ref_block_bytes.toLowerCase(), tx.raw_data.ref_block_bytes);
            assert.equal(dResult.ref_block_hash.toLowerCase(), tx.raw_data.ref_block_hash);
            assert.equal(dResult.data, tx.raw_data.data || '');
            assert.equal(dResult.fee_limit, tx.raw_data.fee_limit);
        });

        it('should sign the transaction correctly after deserialization', async () => {
            const dResult = utils.deserializeTx.deserializeTransaction('TriggerSmartContract', tx.raw_data_hex);
            const dResultTx = {
                ...tx,
                raw_data: dResult,
            };
            const signedReconstructedTx = await tronWeb.trx.sign(dResultTx, account.privateKey);

            assert.equal(signedReconstructedTx.signature[0].length, 130);
        });
    });

    describe('DFreezeBalanceV2Contract', async () => {
        let tx: Awaited<ReturnType<TransactionBuilder['freezeBalanceV2']>>;
        let account: Awaited<ReturnType<TronWeb['createAccount']>>;
        const freezeBalance = 1e6;
        before(async () => {
            tronWeb = tronWebBuilder.createInstance();
            account = await tronWeb.createAccount();
            tx = await tronWeb.transactionBuilder.freezeBalanceV2(freezeBalance, 'ENERGY', account.address.base58);
        });

        it('should deserialize the right result', async () => {
            const dResult = utils.deserializeTx.deserializeTransaction('FreezeBalanceV2Contract', tx.raw_data_hex);
            const value = dResult.contract[0].parameter.value;

            assert.equal(value.owner_address, account.address.hex);
            assert.equal(value.frozen_balance, freezeBalance);
            assert.equal(value.resource, 'ENERGY');
        });

        it('should sign the transaction correctly after deserialization', async () => {
            const dResult = utils.deserializeTx.deserializeTransaction('FreezeBalanceV2Contract', tx.raw_data_hex);
            const dResultTx = {
                ...tx,
                raw_data: dResult,
            };
            const signedReconstructedTx = await tronWeb.trx.sign(dResultTx, account.privateKey);

            assert.equal(signedReconstructedTx.signature[0].length, 130);
        });
    });

    describe('DUnfreezeBalanceV2Contract', async () => {
        let tx: Awaited<ReturnType<TransactionBuilder['unfreezeBalanceV2']>>;
        let account: Awaited<ReturnType<TronWeb['createAccount']>>;
        const unfreezeBalance = 1e6;
        before(async () => {
            tronWeb = tronWebBuilder.createInstance();
            account = await tronWeb.createAccount();
            tx = await tronWeb.transactionBuilder.unfreezeBalanceV2(unfreezeBalance, 'ENERGY', account.address.base58);
        });

        it('should deserialize the right result', async () => {
            const dResult = utils.deserializeTx.deserializeTransaction('UnfreezeBalanceV2Contract', tx.raw_data_hex);
            const value = dResult.contract[0].parameter.value;

            assert.equal(value.owner_address, account.address.hex);
            assert.equal(value.unfreeze_balance, unfreezeBalance);
            assert.equal(value.resource, 'ENERGY');
        });

        it('should sign the transaction correctly after deserialization', async () => {
            const dResult = utils.deserializeTx.deserializeTransaction('UnfreezeBalanceV2Contract', tx.raw_data_hex);
            const dResultTx = {
                ...tx,
                raw_data: dResult,
            };
            const signedReconstructedTx = await tronWeb.trx.sign(dResultTx, account.privateKey);

            assert.equal(signedReconstructedTx.signature[0].length, 130);
        });
    });

    describe('DCancelAllUnfreezeV2Contract', async () => {
        let tx: Awaited<ReturnType<TransactionBuilder['cancelUnfreezeBalanceV2']>>;
        let account: Awaited<ReturnType<TronWeb['createAccount']>>;
        before(async () => {
            tronWeb = tronWebBuilder.createInstance();
            account = await tronWeb.createAccount();
            tx = await tronWeb.transactionBuilder.cancelUnfreezeBalanceV2(account.address.base58);
        });

        it('should deserialize the right result', async () => {
            const dResult = utils.deserializeTx.deserializeTransaction('CancelAllUnfreezeV2Contract', tx.raw_data_hex);
            const value = dResult.contract[0].parameter.value;

            assert.equal(value.owner_address, account.address.hex);
        });

        it('should sign the transaction correctly after deserialization', async () => {
            const dResult = utils.deserializeTx.deserializeTransaction('CancelAllUnfreezeV2Contract', tx.raw_data_hex);
            const dResultTx = {
                ...tx,
                raw_data: dResult,
            };
            const signedReconstructedTx = await tronWeb.trx.sign(dResultTx, account.privateKey);

            assert.equal(signedReconstructedTx.signature[0].length, 130);
        });
    });

    describe('DDelegateResourceContract', async () => {
        let tx: Awaited<ReturnType<TransactionBuilder['delegateResource']>>;
        let account: Awaited<ReturnType<TronWeb['createAccount']>>;
        let account2: Awaited<ReturnType<TronWeb['createAccount']>>;
        const delegateAmount = 1e6;
        const lock = true;
        const lockPeriod = 3;
        before(async () => {
            tronWeb = tronWebBuilder.createInstance();
            account = await tronWeb.createAccount();
            account2 = await tronWeb.createAccount();
            tx = await tronWeb.transactionBuilder.delegateResource(
                delegateAmount,
                account.address.base58,
                'ENERGY',
                account2.address.base58,
                lock,
                lockPeriod
            );
        });

        it('should deserialize the right result', async () => {
            const dResult = utils.deserializeTx.deserializeTransaction('DelegateResourceContract', tx.raw_data_hex);
            const value = dResult.contract[0].parameter.value;

            assert.equal(value.owner_address, account2.address.hex);
            assert.equal(value.balance, delegateAmount);
            assert.equal(value.lock, lock);
            assert.equal(value.lock_period, lockPeriod);
            assert.equal(value.receiver_address, account.address.hex);
            assert.equal(value.resource, 'ENERGY');
        });

        it('should sign the transaction correctly after deserialization', async () => {
            const dResult = utils.deserializeTx.deserializeTransaction('DelegateResourceContract', tx.raw_data_hex);
            const dResultTx = {
                ...tx,
                raw_data: dResult,
            };
            const signedReconstructedTx = await tronWeb.trx.sign(dResultTx, account2.privateKey);

            assert.equal(signedReconstructedTx.signature[0].length, 130);
        });
    });

    describe('DUnDelegateResourceContract', async () => {
        let tx: Awaited<ReturnType<TransactionBuilder['undelegateResource']>>;
        let account: Awaited<ReturnType<TronWeb['createAccount']>>;
        let account2: Awaited<ReturnType<TronWeb['createAccount']>>;
        const delegateAmount = 1e6;
        before(async () => {
            tronWeb = tronWebBuilder.createInstance();
            account = await tronWeb.createAccount();
            account2 = await tronWeb.createAccount();
            tx = await tronWeb.transactionBuilder.undelegateResource(
                delegateAmount,
                account.address.base58,
                'ENERGY',
                account2.address.base58
            );
        });

        it('should deserialize the right result', async () => {
            const dResult = utils.deserializeTx.deserializeTransaction('UnDelegateResourceContract', tx.raw_data_hex);
            const value = dResult.contract[0].parameter.value;

            assert.equal(value.owner_address, account2.address.hex);
            assert.equal(value.balance, delegateAmount);
            assert.equal(value.receiver_address, account.address.hex);
            assert.equal(value.resource, 'ENERGY');
        });

        it('should sign the transaction correctly after deserialization', async () => {
            const dResult = utils.deserializeTx.deserializeTransaction('UnDelegateResourceContract', tx.raw_data_hex);
            const dResultTx = {
                ...tx,
                raw_data: dResult,
            };
            const signedReconstructedTx = await tronWeb.trx.sign(dResultTx, account2.privateKey);

            assert.equal(signedReconstructedTx.signature[0].length, 130);
        });
    });

    describe('DWithdrawExpireUnfreezeContract', async () => {
        let tx: Awaited<ReturnType<TransactionBuilder['withdrawExpireUnfreeze']>>;
        let account: Awaited<ReturnType<TronWeb['createAccount']>>;
        before(async () => {
            tronWeb = tronWebBuilder.createInstance();
            account = await tronWeb.createAccount();
            tx = await tronWeb.transactionBuilder.withdrawExpireUnfreeze(account.address.base58);
        });

        it('should deserialize the right result', async () => {
            const dResult = utils.deserializeTx.deserializeTransaction('WithdrawExpireUnfreezeContract', tx.raw_data_hex);
            const value = dResult.contract[0].parameter.value;

            assert.equal(value.owner_address, account.address.hex);
        });

        it('should sign the transaction correctly after deserialization', async () => {
            const dResult = utils.deserializeTx.deserializeTransaction('WithdrawExpireUnfreezeContract', tx.raw_data_hex);
            const dResultTx = {
                ...tx,
                raw_data: dResult,
            };
            const signedReconstructedTx = await tronWeb.trx.sign(dResultTx, account.privateKey);

            assert.equal(signedReconstructedTx.signature[0].length, 130);
        });
    });

    describe('DTransferContract', async () => {
        let tx: Awaited<ReturnType<TransactionBuilder['sendTrx']>>;
        let account: Awaited<ReturnType<TronWeb['createAccount']>>;
        let account2: Awaited<ReturnType<TronWeb['createAccount']>>;
        const sendAmount = 1e6;
        before(async () => {
            tronWeb = tronWebBuilder.createInstance();
            account = await tronWeb.createAccount();
            account2 = await tronWeb.createAccount();
            tx = await tronWeb.transactionBuilder.sendTrx(account2.address.base58, sendAmount, account.address.base58);
        });
        it('should deserialize the right result', async () => {
            const dResult = utils.deserializeTx.deserializeTransaction('TransferContract', tx.raw_data_hex);
            const value = dResult.contract[0].parameter.value;

            assert.equal(dResult.contract[0].type, 'TransferContract');
            assert.equal(dResult.contract[0].Permission_id, 0);
            assert.equal(dResult.contract[0].parameter.type_url, tx.raw_data.contract[0].parameter.type_url);
            assert.equal(dResult.expiration, tx.raw_data.expiration);
            assert.equal(dResult.timestamp, tx.raw_data.timestamp);
            assert.equal(dResult.ref_block_bytes.toLowerCase(), tx.raw_data.ref_block_bytes);
            assert.equal(dResult.ref_block_hash.toLowerCase(), tx.raw_data.ref_block_hash);
            assert.equal(dResult.data, tx.raw_data.data || '');
            assert.equal(dResult.fee_limit, tx.raw_data.fee_limit || 0);
            assert.equal(value.owner_address, account.address.hex);
            assert.equal(value.to_address, account2.address.hex);
            assert.equal(value.amount, sendAmount);
        });

        it('should sign the transaction correctly after deserialization', async () => {
            const dResult = utils.deserializeTx.deserializeTransaction('TransferContract', tx.raw_data_hex);
            const dResultTx = {
                ...tx,
                raw_data: dResult,
            };
            const signedReconstructedTx = await tronWeb.trx.sign(dResultTx, account.privateKey);

            assert.equal(signedReconstructedTx.signature[0].length, 130);
        });

        it('should throw error if raw_data_hex is empty', async () => {
            assert.throws(() => {
                utils.deserializeTx.deserializeTransaction('TransferContract', undefined as unknown as string);
            }, 'rawDataHex cannot be empty');
        });

        it('should throw error if raw_data_hex is invalid', async () => {
            assert.throws(() => {
                utils.deserializeTx.deserializeTransaction('TransferContract', 'invalidRawDataHex');
            }, 'rawDataHex is not a valid hex string');
        });
    });

    describe('DWithdrawBalanceContract', async () => {
        let tx: Awaited<ReturnType<TransactionBuilder['withdrawBlockRewards']>>;
        let account: Awaited<ReturnType<TronWeb['createAccount']>>;
        before(async () => {
            tronWeb = tronWebBuilder.createInstance();
            account = await tronWeb.createAccount();
            tx = await tronWeb.transactionBuilder.withdrawBlockRewards(account.address.base58);
        });

        it('should deserialize the right result', async () => {
            const dResult = utils.deserializeTx.deserializeTransaction('WithdrawBalanceContract', tx.raw_data_hex);
            const value = dResult.contract[0].parameter.value;

            assert.equal(value.owner_address, account.address.hex);
        });

        it('should sign the transaction correctly after deserialization', async () => {
            const dResult = utils.deserializeTx.deserializeTransaction('WithdrawBalanceContract', tx.raw_data_hex);
            const dResultTx = {
                ...tx,
                raw_data: dResult,
            };
            const signedReconstructedTx = await tronWeb.trx.sign(dResultTx, account.privateKey);

            assert.equal(signedReconstructedTx.signature[0].length, 130);
        });

        it('should throw error if raw_data_hex is empty', async () => {
            assert.throws(() => {
                utils.deserializeTx.deserializeTransaction('WithdrawBalanceContract', undefined as unknown as string);
            }, 'rawDataHex cannot be empty');
        });

        it('should throw error if raw_data_hex is invalid', async () => {
            assert.throws(() => {
                utils.deserializeTx.deserializeTransaction('WithdrawBalanceContract', 'invalidRawDataHex');
            }, 'rawDataHex is not a valid hex string');
        });
    });

    describe('DWitnessCreateContract', async () => {
        let tx: Awaited<ReturnType<TransactionBuilder['applyForSR']>>;
        let account: Awaited<ReturnType<TronWeb['createAccount']>>;
        const url = 'https://example.com';
        before(async () => {
            tronWeb = tronWebBuilder.createInstance();
            account = await tronWeb.createAccount();
            tx = await tronWeb.transactionBuilder.applyForSR(account.address.base58, url);
        });

        it('should deserialize the right result', async () => {
            const dResult = utils.deserializeTx.deserializeTransaction('WitnessCreateContract', tx.raw_data_hex);
            const value = dResult.contract[0].parameter.value;

            assert.equal(value.owner_address, account.address.hex);
            assert.equal(value.url, fromUtf8(url));
        });

        it('should sign the transaction correctly after deserialization', async () => {
            const dResult = utils.deserializeTx.deserializeTransaction('WitnessCreateContract', tx.raw_data_hex);
            const dResultTx = {
                ...tx,
                raw_data: dResult,
            };
            const signedReconstructedTx = await tronWeb.trx.sign(dResultTx, account.privateKey);

            assert.equal(signedReconstructedTx.signature[0].length, 130);
        });

        it('should throw error if raw_data_hex is empty', async () => {
            assert.throws(() => {
                utils.deserializeTx.deserializeTransaction('WitnessCreateContract', undefined as unknown as string);
            }, 'rawDataHex cannot be empty');
        });

        it('should throw error if raw_data_hex is invalid', async () => {
            assert.throws(() => {
                utils.deserializeTx.deserializeTransaction('WitnessCreateContract', 'invalidRawDataHex');
            }, 'rawDataHex is not a valid hex string');
        });

        it('should throw error if type is invalid', async () => {
            assert.throws(() => {
                utils.deserializeTx.deserializeTransaction('InvalidType' as any, '0a020801120212034101');
            }, `trasaction InvalidType not supported`);
        });
    });

    describe('DTransferAssetContract', async () => {
        let tx: Awaited<ReturnType<TransactionBuilder['sendToken']>>;
        let account: Awaited<ReturnType<TronWeb['createAccount']>>;
        let account2: Awaited<ReturnType<TronWeb['createAccount']>>;
        const sendAmount = 1000;
        const tokenId = '1000001';
        before(async () => {
            tronWeb = tronWebBuilder.createInstance();
            account = await tronWeb.createAccount();
            account2 = await tronWeb.createAccount();
            tx = await tronWeb.transactionBuilder.sendToken(
                account2.address.base58,
                sendAmount,
                tokenId,
                account.address.base58
            );
        });
        it('should deserialize the right result', async () => {
            const dResult = utils.deserializeTx.deserializeTransaction('TransferAssetContract', tx.raw_data_hex);
            const value = dResult.contract[0].parameter.value;

            assert.equal(value.owner_address, account.address.hex.toUpperCase());
            assert.equal(value.to_address, account2.address.hex.toUpperCase());
            assert.equal(value.asset_name, fromUtf8(tokenId));
            assert.equal(value.amount, sendAmount);
        });

        it('should sign the transaction correctly after deserialization', async () => {
            const dResult = utils.deserializeTx.deserializeTransaction('TransferAssetContract', tx.raw_data_hex);
            const dResultTx = {
                ...tx,
                raw_data: dResult,
            };
            const signedReconstructedTx = await tronWeb.trx.sign(dResultTx, account.privateKey);

            assert.equal(signedReconstructedTx.signature[0].length, 130);
        });
    });

    describe('DParticipateAssetIssueContract', async () => {
        let tx: Awaited<ReturnType<TransactionBuilder['purchaseToken']>>;
        let account: Awaited<ReturnType<TronWeb['createAccount']>>;
        let account2: Awaited<ReturnType<TronWeb['createAccount']>>;
        const participateAmount = 5000;
        const tokenId = '1000001';
        before(async () => {
            tronWeb = tronWebBuilder.createInstance();
            account = await tronWeb.createAccount();
            account2 = await tronWeb.createAccount();
            tx = await tronWeb.transactionBuilder.purchaseToken(
                account2.address.base58,
                tokenId,
                participateAmount,
                account.address.base58
            );
        });
        it('should deserialize the right result', async () => {
            const dResult = utils.deserializeTx.deserializeTransaction('ParticipateAssetIssueContract', tx.raw_data_hex);
            const value = dResult.contract[0].parameter.value;

            assert.equal(value.owner_address, account.address.hex.toUpperCase());
            assert.equal(value.to_address, account2.address.hex.toUpperCase());
            assert.equal(value.asset_name, fromUtf8(tokenId));
            assert.equal(value.amount, participateAmount);
        });

        it('should sign the transaction correctly after deserialization', async () => {
            const dResult = utils.deserializeTx.deserializeTransaction('ParticipateAssetIssueContract', tx.raw_data_hex);
            const dResultTx = {
                ...tx,
                raw_data: dResult,
            };
            const signedReconstructedTx = await tronWeb.trx.sign(dResultTx, account.privateKey);

            assert.equal(signedReconstructedTx.signature[0].length, 130);
        });
    });

    describe('DAssetIssueContract', async () => {
        let tx: Awaited<ReturnType<TransactionBuilder['createToken']>>;
        let account: Awaited<ReturnType<TronWeb['createAccount']>>;
        const name = 'TestToken';
        const abbreviation = 'TTK';
        const totalSupply = 1e9;
        const trxRatio = 1000;
        const tokenRatio = 10;
        let saleStart = Date.now() + 60 * 1000;
        let saleEnd = saleStart + 30 * 24 * 60 * 60 * 1000;
        const description = 'This is a test token';
        const url = 'https://example.com';
        const freeBandwidth = 1e9;
        const freeBandwidthLimit = 1;
        const frozenAmount = 1e8;
        const frozenDuration = 3;
        const voteScore = 10;
        const precision = 6;
        before(async () => {
            tronWeb = tronWebBuilder.createInstance();
            account = await tronWeb.createAccount();
            saleStart = Date.now() + 60 * 1000;
            saleEnd = saleStart + 30 * 24 * 60 * 60 * 1000;
            tx = await tronWeb.transactionBuilder.createToken({
                name,
                abbreviation,
                description,
                url,
                totalSupply,
                trxRatio,
                tokenRatio,
                saleStart,
                saleEnd,
                freeBandwidth,
                freeBandwidthLimit,
                frozenAmount,
                frozenDuration,
                voteScore,
                precision,
            }, account.address.base58);
        });
        it('should deserialize the right result', async () => {
            const dResult = utils.deserializeTx.deserializeTransaction('AssetIssueContract', tx.raw_data_hex);
            const value = dResult.contract[0].parameter.value;

            assert.equal(value.owner_address, account.address.hex.toUpperCase());
            assert.equal(value.name, fromUtf8(name));
            assert.equal(value.abbr, fromUtf8(abbreviation));
            assert.equal(value.description, fromUtf8(description));
            assert.equal(value.url, fromUtf8(url));
            assert.equal(value.total_supply, totalSupply);
            assert.equal(value.trx_num, trxRatio);
            assert.equal(value.num, tokenRatio);
            assert.equal(value.start_time, saleStart);
            assert.equal(value.end_time, saleEnd);
            assert.equal(value.free_asset_net_limit, freeBandwidth);
            assert.equal(value.public_free_asset_net_limit, freeBandwidthLimit);
            assert.equal(value.frozen_supply[0].frozen_amount, frozenAmount);
            assert.equal(value.frozen_supply[0].frozen_days, frozenDuration);
            assert.equal(value.vote_score, voteScore);
            assert.equal(value.precision, precision);
        });

        it('should sign the transaction correctly after deserialization', async () => {
            const dResult = utils.deserializeTx.deserializeTransaction('AssetIssueContract', tx.raw_data_hex);
            const dResultTx = {
                ...tx,
                raw_data: dResult,
            };
            const signedReconstructedTx = await tronWeb.trx.sign(dResultTx, account.privateKey);

            assert.equal(signedReconstructedTx.signature[0].length, 130);
        });
    });

    describe('DUpdateAssetContract', async () => {
        let tx: Awaited<ReturnType<TransactionBuilder['updateToken']>>;
        let account: Awaited<ReturnType<TronWeb['createAccount']>>;
        const description = 'Updated description';
        const url = 'https://updated-example.com';
        const freeBandwidth = 2000000;
        const freeBandwidthLimit = 20000;
        before(async () => {
            tronWeb = tronWebBuilder.createInstance();
            account = await tronWeb.createAccount();
            tx = await tronWeb.transactionBuilder.updateToken({
                description,
                url,
                freeBandwidth,
                freeBandwidthLimit,
            }, account.address.base58);
        });
        it('should deserialize the right result', async () => {
            const dResult = utils.deserializeTx.deserializeTransaction('UpdateAssetContract', tx.raw_data_hex);
            const value = dResult.contract[0].parameter.value;

            assert.equal(value.owner_address, account.address.hex.toUpperCase());
            assert.equal(value.description, fromUtf8(description));
            assert.equal(value.url, fromUtf8(url));
            assert.equal(value.new_limit, freeBandwidth);
            assert.equal(value.new_public_limit, freeBandwidthLimit);
        });

        it('should sign the transaction correctly after deserialization', async () => {
            const dResult = utils.deserializeTx.deserializeTransaction('UpdateAssetContract', tx.raw_data_hex);
            const dResultTx = {
                ...tx,
                raw_data: dResult,
            };
            const signedReconstructedTx = await tronWeb.trx.sign(dResultTx, account.privateKey);

            assert.equal(signedReconstructedTx.signature[0].length, 130);
        });
    });
});
