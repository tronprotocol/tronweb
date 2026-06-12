import { Address, TransactionInfo } from '../../../src/types/Trx';
import { ContractAbiInterface } from '../../../src/types/ABI';
import { TransactionWrapper } from '../../../src/types/Transaction';
import { ContractFunctionParameter, TriggerConstantContractOptions } from '../../../src/types/TransactionBuilder';
import { assert } from 'chai';
import assertThrow from '../../helpers/assertThrow.js';
import wait from '../../helpers/wait.js';
import broadcaster from '../../helpers/broadcaster.js';
import tronWebBuilder from '../../helpers/tronWebBuilder.js';
import config from '../../helpers/config.js';
import { TronWeb } from '../../setup/TronWeb.js';
import contracts from '../../fixtures/contracts';

const { FULL_NODE_API } = config;

interface CapturedConstantCall {
    address: string;
    functionSelector: string;
    options: TriggerConstantContractOptions;
    parameters: ContractFunctionParameter[];
    issuerAddress: string;
}

// Minimal triggerConstantContract stub result: only the fields the read path consumes.
function constantCallResult(resultHex: string): TransactionWrapper {
    const wrapper: Partial<TransactionWrapper> = {
        result: { result: true },
        constant_result: [resultHex],
    };
    return wrapper as TransactionWrapper;
}

describe('#contract.readWrite', function () {
    let accounts: {
        hex: Address[];
        b58: Address[];
        pks: string[];
    };
    let tronWeb: TronWeb;

    const contractAddress = config.ADDRESS_BASE58;
    const contractAbi = [
        {
            type: 'function',
            name: 'balanceOf',
            stateMutability: 'view',
            inputs: [{ name: 'owner', type: 'address' }],
            outputs: [{ name: 'balance', type: 'uint256' }],
        },
        {
            type: 'function',
            name: 'transfer',
            stateMutability: 'nonpayable',
            inputs: [
                { name: 'recipient', type: 'address' },
                { name: 'amount', type: 'uint256' },
            ],
            outputs: [],
        },
    ] as const;
    const reservedAbi = [
        {
            type: 'function',
            name: 'read',
            stateMutability: 'view',
            inputs: [],
            outputs: [{ name: 'count', type: 'uint256' }],
        },
        {
            type: 'function',
            name: 'write',
            stateMutability: 'nonpayable',
            inputs: [{ name: 'count', type: 'uint256' }],
            outputs: [],
        },
    ] as const;

    async function waitForReceipt(txId: string): Promise<TransactionInfo> {
        for (let i = 0; i < 20; i++) {
            try {
                const info = await tronWeb.trx.getTransactionInfo(txId);
                if (info && Object.keys(info).length) return info;
            } catch {
                // not indexed yet — keep polling
            }
            await wait(3);
        }
        throw new Error(`transaction not confirmed on chain: ${txId}`);
    }

    const addrBody = (a: string) =>
        (/^(0x)?(41)?[0-9a-f]{40}$/i.test(a) ? a : TronWeb.address.toHex(a)).toLowerCase().replace(/^0x/, '').replace(/^41/, '');

    before(async function () {
        tronWeb = tronWebBuilder.createInstance();
        // ALERT this works only with Tron Quickstart:
        accounts = await tronWebBuilder.getTestAccounts(-1);
    });

    describe('#namespaces', function () {
        it('exposes read and write namespaces with only the matching functions', function () {
            const contract = tronWeb.contract(contractAbi, contractAddress);

            assert.isFunction(contract.read.balanceOf);
            assert.notProperty(contract.read, 'transfer');
            assert.isFunction(contract.write.transfer);
            assert.notProperty(contract.write, 'balanceOf');

            // existing flat surface stays intact
            assert.isFunction(contract.balanceOf);
            assert.isFunction(contract.transfer);
            assert.isFunction(contract.methods.balanceOf);
        });

        it('rejects read calls with the wrong number of arguments', async function () {
            // widen to an untyped ABI so the invalid calls reach the runtime check
            const contract = tronWeb.contract<ContractAbiInterface>(contractAbi, contractAddress);

            await assertThrow(
                contract.read.balanceOf([accounts.b58[0], accounts.b58[0]]),
                'Contract function "balanceOf" expects 1 argument(s) but received 2.'
            );
            await assertThrow(
                contract.read.balanceOf(),
                'Contract function "balanceOf" expects 1 argument(s) but received 0.'
            );
            await assertThrow(
                contract.write.transfer([accounts.b58[0]]),
                'Contract function "transfer" expects 2 argument(s) but received 1.'
            );
        });

        it('keeps ABI functions named read/write callable through the namespaces', async function () {
            const tw = tronWebBuilder.createInstance();
            const contract = tw.contract(reservedAbi, contractAddress);

            // the namespaces win over flat assignment for the reserved names
            assert.isObject(contract.read);
            assert.isObject(contract.write);
            assert.isFunction(contract.read.read);
            assert.isFunction(contract.write.write);
            // both stay reachable through the legacy methods surface
            assert.isFunction(contract.methods.read);
            assert.isFunction(contract.methods.write);

            let captured: CapturedConstantCall | undefined;
            tw.transactionBuilder.triggerConstantContract = async (
                address,
                functionSelector,
                options = {},
                parameters = [],
                issuerAddress = ''
            ) => {
                captured = { address, functionSelector, options, parameters, issuerAddress };
                return constantCallResult(`${'0'.repeat(63)}1`);
            };

            assert.equal(await contract.read.read(), 1n);
            assert.equal(captured?.functionSelector, 'read()');
            assert.equal(captured?.address, contractAddress);
        });

        it('passes account and value options through to the constant call', async function () {
            const tw = tronWebBuilder.createInstance();
            const contract = tw.contract(contractAbi, contractAddress);

            let captured: CapturedConstantCall | undefined;
            tw.transactionBuilder.triggerConstantContract = async (
                address,
                functionSelector,
                options = {},
                parameters = [],
                issuerAddress = ''
            ) => {
                captured = { address, functionSelector, options, parameters, issuerAddress };
                return constantCallResult(`${'0'.repeat(62)}2a`);
            };

            const balance = await contract.read.balanceOf([accounts.b58[0]], {
                account: accounts.b58[1],
                value: 3n,
            });
            assert.equal(balance, 42n);
            assert.equal(captured?.functionSelector, 'balanceOf(address)');
            assert.equal(captured?.options.callValue, 3);
            assert.deepEqual(captured?.options.parametersV2, [accounts.b58[0]]);
            assert.equal(captured?.issuerAddress, accounts.b58[1]);
        });

        it('refuses writes when the TronWeb instance has no signer', async function () {
            const tw = new TronWeb({ fullHost: FULL_NODE_API });
            const contract = tw.contract(contractAbi, contractAddress);

            await assertThrow(
                contract.write.transfer([accounts.b58[0], 1]),
                'Method "transfer" modifies state and requires a signer. Set a private key or default address on the TronWeb instance.'
            );
        });

        it('refuses write account overrides that differ from the default address', async function () {
            const contract = tronWeb.contract(contractAbi, contractAddress);

            await assertThrow(
                contract.write.transfer([accounts.b58[0], 1], { account: accounts.b58[1] }),
                'Write account override must match the TronWeb default address.'
            );
        });
    });

    describe('against a contract deployed to the fullNode', function () {
        this.timeout(180000);

        // funcABIV2_3 exposes setStruct((address,address,address)) (a struct/tuple
        // parameter write) and get1()/s(uint256) (tuple reads), so one deploy covers
        // read, write and argument-validation against a real contract.
        const fixture = contracts.funcABIV2_3;
        let deployedAddress: string;
        let struct: [string, string, string];

        before(async function () {
            this.timeout(180000);

            struct = [accounts.b58[1], accounts.b58[2], accounts.b58[3]];

            const tx = await broadcaster(
                tronWeb.transactionBuilder.createSmartContract(
                    {
                        abi: fixture.abi,
                        bytecode: fixture.bytecode,
                        feeLimit: 1_000_000_000,
                    },
                    accounts.b58[0]
                ),
                accounts.pks[0]
            );
            deployedAddress = tx.transaction.contract_address;
            await waitForReceipt(tx.transaction.txID);
        });

        it('writes a tuple via write.setStruct and reads it back via read.get1', async function () {
            const contract = tronWeb.contract(fixture.abi, deployedAddress);

            assert.isFunction(contract.read.get1);
            assert.isFunction(contract.write.setStruct);

            const writeTxId = await contract.write.setStruct([struct], { feeLimit: 1_000_000_000 });
            assert.isString(writeTxId);
            const receipt = await waitForReceipt(writeTxId);
            assert.notEqual(receipt.result, 'FAILED', 'setStruct reverted on chain');

            // the tuple must round-trip through the real contract storage
            const raw = await contract.read.get1();
            const tuple: string[] = Array.isArray(raw[0]) ? raw[0] : raw;
            assert.equal(addrBody(tuple[0]), addrBody(struct[0]));
            assert.equal(addrBody(tuple[1]), addrBody(struct[1]));
            assert.equal(addrBody(tuple[2]), addrBody(struct[2]));
        });

        it('rejects calls with the wrong number of arguments', async function () {
            const contract = tronWeb.contract(fixture.abi, deployedAddress);

            // s(uint256) takes exactly one argument
            await assertThrow(
                contract.read.s([1, 2]),
                'Contract function "s" expects 1 argument(s) but received 2.'
            );
            await assertThrow(
                contract.read.s(),
                'Contract function "s" expects 1 argument(s) but received 0.'
            );
        });
    });
});
