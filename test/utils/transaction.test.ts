import { assert, vi } from 'vitest';
import { TronWeb, utils } from '../setup/TronWeb.js';
import { txJsonToPb, txPbToTxID, txPbToRawDataHex, txCheckWithArgs, txCheck } from '../../src/utils/transaction.js';
import { ContractType } from '../../src/types/Contract.js';
import assertThrow from '../helpers/assertThrow.js';

const OWNER = '41e552f6487585c2b58bc2c9bb4492bc1f17132cd0';
const CONTRACT = '41a614f803b6fd780986a42c78ec9c7f77e6ded13c';
const HEADER = {
    ref_block_bytes: 'abcd',
    ref_block_hash: '0011223344556677',
    expiration: 1_700_000_060_000,
    timestamp: 1_700_000_000_000,
};

// A transaction whose txID / raw_data_hex are derived from its own JSON.
function selfConsistent(type: string, value: Record<string, unknown>, extra: Record<string, unknown> = {}) {
    const tx: any = {
        visible: false,
        txID: '',
        raw_data_hex: '',
        raw_data: {
            contract: [{ parameter: { value, type_url: `type.googleapis.com/protocol.${type}` }, type }],
            ...HEADER,
            ...extra,
        },
    };
    const pb = txJsonToPb(tx);
    tx.txID = txPbToTxID(pb).replace(/^0x/, '');
    tx.raw_data_hex = txPbToRawDataHex(pb).toLowerCase();
    return tx;
}

describe('utils.transaction', function () {
    describe('#txCheckWithArgs', function () {
        const withdrawArgs = { owner_address: OWNER };
        const triggerArgs = {
            owner_address: OWNER,
            contract_address: CONTRACT,
            function_selector: 'store(uint256)',
            parameter: '0'.repeat(63) + '5',
            fee_limit: 100_000_000,
        };

        it('is exported through utils.transaction', function () {
            assert.strictEqual(utils.transaction.txCheckWithArgs, txCheckWithArgs);
        });

        describe('without expectedType (existing three-argument behaviour)', function () {
            it('accepts a transaction rebuilt from the same args', function () {
                const tx = selfConsistent('WithdrawBalanceContract', withdrawArgs);
                assert.isTrue(txCheckWithArgs(tx, withdrawArgs, {}));
            });

            it('accepts a TriggerSmartContract rebuilt from the caller args', function () {
                const tx = selfConsistent(
                    'TriggerSmartContract',
                    { owner_address: OWNER, contract_address: CONTRACT, data: 'dead' },
                    { fee_limit: triggerArgs.fee_limit }
                );
                const { function_selector, parameter, ...rest } = triggerArgs;
                assert.isTrue(txCheckWithArgs(tx, { ...rest, data: 'dead' }, {}));
            });

            it('rejects a transaction whose parameter value differs from the args', function () {
                const tx = selfConsistent('WithdrawBalanceContract', withdrawArgs);
                assert.isFalse(txCheckWithArgs(tx, { owner_address: CONTRACT }, {}));
            });

            it('rejects a transaction whose raw_data_hex was modified', function () {
                const tx = selfConsistent('WithdrawBalanceContract', withdrawArgs);
                tx.raw_data_hex = tx.raw_data_hex.replace(/.$/, (c: string) => (c === '0' ? '1' : '0'));
                assert.isFalse(txCheckWithArgs(tx, withdrawArgs, {}));
            });

            it('still accepts the same transaction when expectedType is undefined', function () {
                const tx = selfConsistent('WithdrawBalanceContract', withdrawArgs);
                assert.isTrue(txCheckWithArgs(tx, withdrawArgs, {}, undefined));
            });
        });

        describe('with expectedType', function () {
            it('accepts a transaction of the expected type', function () {
                const tx = selfConsistent('WithdrawBalanceContract', withdrawArgs);
                assert.isTrue(txCheckWithArgs(tx, withdrawArgs, {}, ContractType.WithdrawBalanceContract));
                assert.isTrue(txCheckWithArgs(tx, withdrawArgs, {}, 'WithdrawBalanceContract'));
            });

            it('rejects a self-consistent transaction of another type built from the same args', function () {
                // Both contract types carry only { owner_address }: the byte comparison alone passes.
                const swapped = selfConsistent('CancelAllUnfreezeV2Contract', withdrawArgs);
                assert.isTrue(txCheckWithArgs(swapped, withdrawArgs, {}), 'byte comparison alone passes');
                assert.isFalse(txCheckWithArgs(swapped, withdrawArgs, {}, ContractType.WithdrawBalanceContract));
            });

            it('rejects a ClearABIContract returned for a TriggerSmartContract request', function () {
                const swapped = selfConsistent(
                    'ClearABIContract',
                    { owner_address: OWNER, contract_address: CONTRACT },
                    { fee_limit: triggerArgs.fee_limit }
                );
                assert.isTrue(txCheckWithArgs(swapped, triggerArgs, {}), 'byte comparison alone passes');
                assert.isFalse(txCheckWithArgs(swapped, triggerArgs, {}, ContractType.TriggerSmartContract));
            });

            it('rejects an UpdateSettingContract returned for a TriggerSmartContract request', function () {
                const swapped = selfConsistent(
                    'UpdateSettingContract',
                    { owner_address: OWNER, contract_address: CONTRACT },
                    { fee_limit: triggerArgs.fee_limit }
                );
                assert.isTrue(txCheckWithArgs(swapped, triggerArgs, {}), 'byte comparison alone passes');
                assert.isFalse(txCheckWithArgs(swapped, triggerArgs, {}, ContractType.TriggerSmartContract));
            });

            it('rejects a TransferContract returned for a TransferAssetContract (token amount read as sun)', function () {
                const assetArgs = {
                    owner_address: OWNER,
                    to_address: CONTRACT,
                    amount: 1000,
                    asset_name: TronWeb.fromUtf8('1000001').replace(/^0x/, ''),
                };
                const swapped = selfConsistent('TransferContract', {
                    owner_address: OWNER,
                    to_address: CONTRACT,
                    amount: 1000,
                });
                assert.isTrue(txCheckWithArgs(swapped, assetArgs, {}), 'byte comparison alone passes');
                assert.isFalse(txCheckWithArgs(swapped, assetArgs, {}, ContractType.TransferAssetContract));
            });

            it('compares the type exactly (case and whitespace matter)', function () {
                const tx = selfConsistent('WithdrawBalanceContract', withdrawArgs);
                assert.isFalse(txCheckWithArgs(tx, withdrawArgs, {}, 'withdrawbalancecontract'));
                assert.isFalse(txCheckWithArgs(tx, withdrawArgs, {}, 'WithdrawBalanceContract '));
            });
        });

        describe('contract count', function () {
            it('rejects a transaction with no contract', function () {
                const tx = selfConsistent('WithdrawBalanceContract', withdrawArgs);
                tx.raw_data.contract = [];
                assert.isFalse(txCheckWithArgs(tx, withdrawArgs, {}));
                assert.isFalse(txCheckWithArgs(tx, withdrawArgs, {}, ContractType.WithdrawBalanceContract));
            });

            it('rejects a transaction carrying a second contract, even if the first one matches', function () {
                const tx = selfConsistent('WithdrawBalanceContract', withdrawArgs);
                tx.raw_data.contract.push({
                    parameter: {
                        value: { owner_address: OWNER, to_address: CONTRACT, amount: 1 },
                        type_url: 'type.googleapis.com/protocol.TransferContract',
                    },
                    type: 'TransferContract',
                });
                assert.isFalse(txCheckWithArgs(tx, withdrawArgs, {}));
                assert.isFalse(txCheckWithArgs(tx, withdrawArgs, {}, ContractType.WithdrawBalanceContract));
            });

            it('rejects a transaction whose contract field is not an array', function () {
                const tx = selfConsistent('WithdrawBalanceContract', withdrawArgs);
                tx.raw_data.contract = tx.raw_data.contract[0];
                assert.isFalse(txCheckWithArgs(tx, withdrawArgs, {}));
            });

            it('returns false instead of throwing for a transaction without raw_data', function () {
                assert.isFalse(txCheckWithArgs({ txID: 'ab', raw_data_hex: 'ab' }, withdrawArgs, {}));
                assert.isFalse(txCheckWithArgs(undefined, withdrawArgs, {}));
                assert.isFalse(txCheckWithArgs(null, withdrawArgs, {}));
            });
        });
    });

    describe('remote update of a TRC10 transfer (wallet/getsignweight)', function () {
        // newTxID / extendExpiration / addUpdateData check the contract type of the node's copy.
        const assetValue = {
            owner_address: OWNER,
            to_address: CONTRACT,
            amount: 1000,
            asset_name: TronWeb.fromUtf8('1000001').replace(/^0x/, ''),
        };
        const tronWeb = new TronWeb({ fullHost: 'http://127.0.0.1:1' });

        function original() {
            return selfConsistent('TransferAssetContract', assetValue, { expiration: Date.now() + 60_000 });
        }

        // Answers wallet/getsignweight with the submitted transaction, optionally as a TransferContract.
        function stubSignWeight(asTrx: boolean) {
            return vi.spyOn(tronWeb.fullNode, 'request').mockImplementation(async (url: string, payload: any) => {
                if (url !== 'wallet/getsignweight') throw new Error(`unexpected request ${url}`);
                const { asset_name, ...trxValue } = payload.raw_data.contract[0].parameter.value;
                const { contract, ...header } = payload.raw_data;
                const tx = asTrx
                    ? selfConsistent('TransferContract', trxValue, header)
                    : selfConsistent('TransferAssetContract', { ...trxValue, asset_name }, header);
                return { transaction: { transaction: tx } } as any;
            });
        }

        afterEach(function () {
            vi.restoreAllMocks();
        });

        it('accepts a matching answer', async function () {
            stubSignWeight(false);
            const later = await tronWeb.transactionBuilder.newTxID(original());
            assert.equal(later.raw_data.contract[0].type, 'TransferAssetContract');
        });

        const entries: [string, (tx: any) => Promise<unknown>][] = [
            ['newTxID', (tx) => tronWeb.transactionBuilder.newTxID(tx)],
            ['extendExpiration', (tx) => tronWeb.transactionBuilder.extendExpiration(tx, 3600)],
            ['addUpdateData', (tx) => tronWeb.transactionBuilder.addUpdateData(tx, 'memo')],
        ];
        for (const [name, call] of entries) {
            it(`${name} rejects a TransferContract returned for a TransferAssetContract`, async function () {
                stubSignWeight(true);
                await assertThrow(call(original()), 'Error generating a new transaction id.');
            });
        }
    });

    describe('TriggerSmartContract data / function_selector / parameter', function () {
        const SELECTOR = 'transfer(address,uint256)';
        const PARAMETER = '0'.repeat(63) + '5';
        const DATA = '095ea7b3' + '0'.repeat(63) + '5';
        const ERROR = 'Invalid TriggerSmartContract: data cannot be combined with function_selector or parameter';

        function triggerTx(owner: string, value: Record<string, unknown>) {
            return selfConsistent(
                'TriggerSmartContract',
                { owner_address: owner, contract_address: CONTRACT, ...value },
                { fee_limit: 100_000_000 }
            );
        }

        // A transaction carrying DATA plus the given extra fields.
        function withExtra(owner: string, extra: Record<string, unknown>) {
            const tx = triggerTx(owner, { data: DATA });
            Object.assign(tx.raw_data.contract[0].parameter.value, extra);
            return tx;
        }

        it('accepts data alone', function () {
            assert.isTrue(txCheck(triggerTx(OWNER, { data: DATA })));
        });

        it('accepts function_selector and parameter without data, encoding them as before', function () {
            const tx = triggerTx(OWNER, { function_selector: SELECTOR, parameter: PARAMETER });
            assert.isTrue(txCheck(tx));
            const expected = triggerTx(OWNER, {
                data: utils.ethersUtils.keccak256(utils.ethersUtils.toUtf8Bytes(SELECTOR)).substring(2, 10) + PARAMETER,
            });
            assert.strictEqual(tx.raw_data_hex, expected.raw_data_hex);
        });

        it('ignores empty function_selector / parameter next to data', function () {
            assert.isTrue(txCheck(withExtra(OWNER, { function_selector: '', parameter: '' })));
        });

        it('rejects data combined with function_selector', function () {
            const tx = withExtra(OWNER, { function_selector: SELECTOR, parameter: PARAMETER });
            assert.throws(() => txCheck(tx), ERROR);
        });

        it('rejects data combined with function_selector alone', function () {
            assert.throws(() => txCheck(withExtra(OWNER, { function_selector: SELECTOR })), ERROR);
        });

        it('rejects data combined with parameter alone', function () {
            assert.throws(() => txCheck(withExtra(OWNER, { parameter: PARAMETER })), ERROR);
        });

        it('rejects the combination when rebuilding from args', function () {
            const tx = triggerTx(OWNER, { data: DATA });
            const args = {
                owner_address: OWNER,
                contract_address: CONTRACT,
                data: DATA,
                function_selector: SELECTOR,
                fee_limit: 100_000_000,
            };
            assert.throws(() => txCheckWithArgs(tx, args, {}, 'TriggerSmartContract'), ERROR);
        });

        it('refuses to sign or recover such a transaction', async function () {
            const tronWeb = new TronWeb({ fullHost: 'http://127.0.0.1:1' });
            const account = await tronWeb.utils.accounts.generateAccount();
            const owner = account.address.hex.toLowerCase();

            const valid = triggerTx(owner, { data: DATA });
            const signed = await tronWeb.trx.sign(valid, account.privateKey);
            assert.strictEqual(tronWeb.trx.ecRecover(signed), account.address.base58);

            const tx = withExtra(owner, { function_selector: SELECTOR, parameter: PARAMETER });
            await assertThrow(tronWeb.trx.sign(tx, account.privateKey), ERROR);

            const combined = { ...signed, raw_data: tx.raw_data };
            assert.throws(() => tronWeb.trx.ecRecover(combined), ERROR);
        });
    });

    describe('CreateSmartContract outer fields', function () {
        const OTHER_OWNER = '41a614f803b6fd780986a42c78ec9c7f77e6ded13c';
        const NEW_CONTRACT = {
            origin_address: OWNER,
            abi: {},
            bytecode: '6080',
            consume_user_resource_percent: 100,
            origin_energy_limit: 10_000_000,
        };

        function createTx(owner: string, value: Record<string, unknown> = {}) {
            return selfConsistent(
                'CreateSmartContract',
                { owner_address: owner, new_contract: { ...NEW_CONTRACT }, ...value },
                { fee_limit: 100_000_000 }
            );
        }

        // call_token_value / token_id moved from the top level into new_contract.
        function nestedTokenFields(owner: string) {
            const tx = createTx(owner, { call_token_value: 5_000_000, token_id: '1000001' });
            const value = tx.raw_data.contract[0].parameter.value;
            value.new_contract = { ...value.new_contract, call_token_value: 5_000_000, token_id: '1000001' };
            delete value.call_token_value;
            delete value.token_id;
            return tx;
        }

        it('builds owner_address / call_token_value / token_id from the top level only', function () {
            const plain = createTx(OWNER);
            const tx = createTx(OWNER);
            tx.raw_data.contract[0].parameter.value.new_contract = {
                ...NEW_CONTRACT,
                owner_address: OTHER_OWNER,
                call_token_value: 5_000_000,
                token_id: '1000001',
            };
            assert.strictEqual(txPbToRawDataHex(txJsonToPb(tx)).toLowerCase(), plain.raw_data_hex);
        });

        it('rejects a transaction whose call_token_value / token_id are inside new_contract', function () {
            assert.isFalse(txCheck(nestedTokenFields(OWNER)));
        });

        it('refuses to sign such a transaction', async function () {
            const tronWeb = new TronWeb({ fullHost: 'http://127.0.0.1:1' });
            const account = await tronWeb.utils.accounts.generateAccount();
            const owner = account.address.hex.toLowerCase();
            await assertThrow(tronWeb.trx.sign(nestedTokenFields(owner), account.privateKey), 'Invalid transaction');
        });
    });
});
