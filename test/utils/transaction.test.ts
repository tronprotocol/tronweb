import { assert } from 'chai';
import { TronWeb, utils, TransactionBuilder } from '../setup/TronWeb.js';
import tronWebBuilder from '../helpers/tronWebBuilder.js';
// @ts-ignore
import { decodeRlp } from 'ethers/utils';

describe.only('#TronWeb.utils.transaction', function() {
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
            assert.equal(dResult.owner_address, account.address.hex);
            assert.equal(dResult.contract_address, utils.address.toHex(contractAddress).toUpperCase());
            assert.equal(dResult.call_value, 0);
            assert.equal(dResult.call_token_value, 100);
            assert.equal(dResult.token_id, '1000008');

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
            assert.equal(dResult.data, getData(
                'transfer(address,uint256)',
                [
                    { type: "address", value: account2.address.base58 },
                    { type: "uint256", value: 100000000 }
                ]
            ).toUpperCase());
            const abiCoder = new utils.ethersUtils.AbiCoder();
            const functionSelector = getFunctionSelectorHex('transfer(address,uint256)');
            const data = abiCoder.decode(['address', 'uint256'], '0x' + dResult.data.slice(8));
            const address = tronWeb.address.fromHex(data[0].replace('0x', '41'));
            const amount = data[1];
            assert.equal(functionSelector, dResult.data.slice(0, 8).toLowerCase());
            assert.equal(address, account2.address.base58);
            assert.equal(amount, 100000000);
        });
    });
})