import { assert } from 'chai';
import { TronWeb, utils, TransactionBuilder } from '../setup/TronWeb.js';
import tronWebBuilder from '../helpers/tronWebBuilder.js';
// @ts-ignore
import { decodeRlp } from 'ethers/utils';

describe('#TronWeb.utils.transaction', function() {
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
            tx = (await tronWeb.transactionBuilder.triggerSmartContract(
                contractAddress,
                'transfer(address,uint256)',
                {
                    txLocal: true,
                    tokenId: '1000008',
                    tokenValue: 100,
                    feeLimit: 100 * (10 ** 6),
                },
                [
                    { type: "address", value: account2.address.base58 },
                    { type: "uint256", value: 100000000 }
                ],
                account.address.base58,
            )).transaction;
        });
        it('should deserialize the right result', async () => {
            const dResult = utils.transaction.DTriggerSmartContract(tx.raw_data_hex);
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
            assert.equal(value.data, getData(
                'transfer(address,uint256)',
                [
                    { type: "address", value: account2.address.base58 },
                    { type: "uint256", value: 100000000 }
                ]
            ).toUpperCase());
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
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            assert.equal(dResult.contract[0].type, TronWebProto.Transaction.Contract.ContractType.TRIGGERSMARTCONTRACT);
            assert.equal(dResult.expiration, tx.raw_data.expiration);
            assert.equal(dResult.timestamp, tx.raw_data.timestamp);
            assert.equal(dResult.ref_block_bytes.toLowerCase(), tx.raw_data.ref_block_bytes);
            assert.equal(dResult.ref_block_hash.toLowerCase(), tx.raw_data.ref_block_hash);
            assert.equal(dResult.data, tx.raw_data.data || '');
            assert.equal(dResult.fee_limit, tx.raw_data.fee_limit);
        });
    });
})