import { Address, TransactionInfo } from '../../../src/types/Trx';
import { ContractAbiInterface } from '../../../src/types/ABI';
import { ContractReadNamespace, ContractWriteNamespace } from '../../../src/lib/contract/readWrite';
import { TransactionWrapper } from '../../../src/types/Transaction';
import {
    ContractFunctionParameter,
    TriggerConstantContractOptions,
    TriggerSmartContractOptions,
} from '../../../src/types/TransactionBuilder';
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

interface CapturedSmartCall {
    address: string;
    functionSelector: string;
    options: TriggerSmartContractOptions;
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

// Minimal triggerSmartContract stub result: only the fields the write path consumes.
function smartCallResult(txID: string): TransactionWrapper {
    const wrapper: Partial<TransactionWrapper> = {
        result: { result: true },
        transaction: { txID } as TransactionWrapper['transaction'],
    };
    return wrapper as TransactionWrapper;
}

// Compile-time assertions: tsc fails the test build if the asserted type regresses.
type IsCallable<T> = T extends (...args: any[]) => any ? true : false;
// eslint-disable-next-line @typescript-eslint/no-empty-function
function expectTrue<T extends true>(): void {}
// eslint-disable-next-line @typescript-eslint/no-empty-function
function expectFalse<T extends false>(): void {}

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
    // `read` as a state-changing function: the flat call must survive, but the
    // function itself belongs to the write namespace.
    const writableReadAbi = [
        {
            type: 'function',
            name: 'read',
            stateMutability: 'nonpayable',
            inputs: [{ name: 'count', type: 'uint256' }],
            outputs: [],
        },
        {
            type: 'function',
            name: 'peek',
            stateMutability: 'view',
            inputs: [],
            outputs: [{ name: 'count', type: 'uint256' }],
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

        it('keeps an ABI function named read callable as the flat method and as a namespace entry', async function () {
            const tw = tronWebBuilder.createInstance();
            const contract = tw.contract(reservedAbi, contractAddress);

            // contract.read is the legacy flat call and still serves the namespace
            assert.isFunction(contract.read);
            assert.isFunction(contract.read.read);
            assert.isFunction(contract.methods.read);

            // legacy surface: contract.read().call() goes through triggerSmartContract
            let legacySelector: string | undefined;
            tw.transactionBuilder.triggerSmartContract = async (_address, functionSelector) => {
                legacySelector = functionSelector;
                return constantCallResult(`${'0'.repeat(62)}2a`);
            };
            const legacyResult = await contract.read().call();
            assert.equal(legacyResult[0], 42n);
            assert.equal(legacySelector, 'read()');

            // namespace surface: contract.read.read() goes through triggerConstantContract
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

        it('keeps an ABI function named write callable as the flat method and as a namespace entry', async function () {
            const tw = tronWebBuilder.createInstance();
            const contract = tw.contract(reservedAbi, contractAddress);

            assert.isFunction(contract.write);
            assert.isFunction(contract.write.write);
            assert.isFunction(contract.methods.write);

            let captured: CapturedSmartCall | undefined;
            tw.transactionBuilder.triggerSmartContract = async (
                address,
                functionSelector,
                options = {},
                parameters = [],
                issuerAddress = ''
            ) => {
                captured = { address, functionSelector, options, parameters, issuerAddress };
                return smartCallResult('cafe');
            };
            tw.trx.sign = async (transaction: any) => ({ ...transaction, signature: ['00'] });
            tw.trx.sendRawTransaction = (async (signedTransaction: any) => ({
                result: true,
                transaction: signedTransaction,
            })) as typeof tw.trx.sendRawTransaction;

            // legacy surface: contract.write(...).send() resolves to the txID
            assert.equal(await contract.write(5).send(), 'cafe');
            assert.equal(captured?.functionSelector, 'write(uint256)');

            // namespace surface: contract.write.write([args], options) resolves to the txID
            assert.equal(await contract.write.write([7], { feeLimit: 90_000_000 }), 'cafe');
            assert.equal(captured?.functionSelector, 'write(uint256)');
            assert.deepEqual(captured?.options.parametersV2, [7]);
            assert.equal(captured?.options.feeLimit, 90_000_000);

            // validation errors still surface as rejections through the proxy
            const widened = tw.contract<ContractAbiInterface>(reservedAbi, contractAddress);
            await assertThrow(
                widened.write.write([1, 2]),
                'Contract function "write" expects 1 argument(s) but received 2.'
            );
        });

        it('isolates the namespaces from each other for the reserved names', function () {
            const contract = tronWeb.contract(reservedAbi, contractAddress);

            assert.isUndefined((contract.read as any).write);
            assert.isUndefined((contract.write as any).read);
        });

        it('enumerates namespace entries when the ABI defines functions named read/write', function () {
            const contract = tronWeb.contract(reservedAbi, contractAddress);

            assert.isTrue('read' in contract.read);
            assert.isTrue('write' in contract.write);
            assert.isFalse('write' in contract.read);
            assert.isFalse('read' in contract.write);
            // each entry is enumerated under both its bare name and its selector
            assert.deepEqual(Object.keys(contract.read), ['read', 'read()']);
            assert.deepEqual(Object.keys(contract.write), ['write', 'write(uint256)']);
        });

        it('returns the same namespace object on repeated accesses', function () {
            const plain = tronWeb.contract(contractAbi, contractAddress);
            const reserved = tronWeb.contract(reservedAbi, contractAddress);

            assert.strictEqual(plain.read, plain.read);
            assert.strictEqual(plain.write, plain.write);
            assert.strictEqual(reserved.read, reserved.read);
            assert.strictEqual(reserved.write, reserved.write);
        });

        it('types reserved names as callable regardless of mutability (compile-time)', function () {
            // enforced by tsc when the test build compiles: a regression in
            // ContractRead/WriteNamespace breaks the build rather than an assertion
            expectTrue<IsCallable<ContractReadNamespace<typeof reservedAbi>>>();
            expectTrue<IsCallable<ContractWriteNamespace<typeof reservedAbi>>>();
            // a non-view function named read still gets the flat-call signature
            expectTrue<IsCallable<ContractReadNamespace<typeof writableReadAbi>>>();
            // namespaces without a matching function name stay plain objects
            expectFalse<IsCallable<ContractWriteNamespace<typeof writableReadAbi>>>();
            expectFalse<IsCallable<ContractReadNamespace<typeof contractAbi>>>();
            expectFalse<IsCallable<ContractWriteNamespace<typeof contractAbi>>>();
        });

        it('treats a non-view ABI function named read as a flat call and a write-namespace entry', async function () {
            const tw = tronWebBuilder.createInstance();
            const contract = tw.contract(writableReadAbi, contractAddress);

            // the flat call survives even though `read` is not read-only…
            assert.isFunction(contract.read);
            // …but the function itself lives in the write namespace only
            assert.isFunction(contract.write.read);
            assert.isUndefined((contract.read as any).read);
            // the read namespace still serves its own entries through the proxy
            assert.isFunction(contract.read.peek);

            let captured: CapturedSmartCall | undefined;
            tw.transactionBuilder.triggerSmartContract = async (
                address,
                functionSelector,
                options = {},
                parameters = [],
                issuerAddress = ''
            ) => {
                captured = { address, functionSelector, options, parameters, issuerAddress };
                return smartCallResult('cafe');
            };
            tw.trx.sign = async (transaction: any) => ({ ...transaction, signature: ['00'] });
            tw.trx.sendRawTransaction = (async (signedTransaction: any) => ({
                result: true,
                transaction: signedTransaction,
            })) as typeof tw.trx.sendRawTransaction;

            // legacy flat send through the proxy
            assert.equal(await contract.read(9).send(), 'cafe');
            assert.equal(captured?.functionSelector, 'read(uint256)');

            // write-namespace invocation of the function named read
            assert.equal(await contract.write.read([9]), 'cafe');
            assert.equal(captured?.functionSelector, 'read(uint256)');
            assert.deepEqual(captured?.options.parametersV2, [9]);
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

    describe('#selector keys', function () {
        it('exposes each read function under its full selector', async function () {
            const tw = tronWebBuilder.createInstance();
            const contract = tw.contract(contractAbi, contractAddress);

            // the selector key exists alongside the bare name
            assert.isFunction(contract.read['balanceOf(address)']);
            // write-only functions never appear in the read namespace, under any key
            assert.notProperty(contract.read, 'transfer(address,uint256)');

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

            // invoking through the selector key resolves this fragment
            const balance = await contract.read['balanceOf(address)']([accounts.b58[0]]);
            assert.equal(balance, 42n);
            assert.equal(captured?.functionSelector, 'balanceOf(address)');
            assert.deepEqual(captured?.options.parametersV2, [accounts.b58[0]]);
        });

        it('exposes each write function under its full selector', async function () {
            const tw = tronWebBuilder.createInstance();
            const contract = tw.contract(contractAbi, contractAddress);

            assert.isFunction(contract.write['transfer(address,uint256)']);
            assert.notProperty(contract.write, 'balanceOf(address)');

            let captured: CapturedSmartCall | undefined;
            tw.transactionBuilder.triggerSmartContract = async (
                address,
                functionSelector,
                options = {},
                parameters = [],
                issuerAddress = ''
            ) => {
                captured = { address, functionSelector, options, parameters, issuerAddress };
                return smartCallResult('cafe');
            };
            tw.trx.sign = async (transaction: any) => ({ ...transaction, signature: ['00'] });
            tw.trx.sendRawTransaction = (async (signedTransaction: any) => ({
                result: true,
                transaction: signedTransaction,
            })) as typeof tw.trx.sendRawTransaction;

            const txId = await contract.write['transfer(address,uint256)']([accounts.b58[0], 1], {
                feeLimit: 90_000_000,
            });
            assert.equal(txId, 'cafe');
            assert.equal(captured?.functionSelector, 'transfer(address,uint256)');
            assert.deepEqual(captured?.options.parametersV2, [accounts.b58[0], 1]);
        });

        it('expands tuple parameters in the selector key', function () {
            // funcABIV2_3 exposes setStruct((address,address,address)); the runtime
            // selector key must match the tuple-expanded signature, scoped to write.
            const contract = tronWeb.contract(contracts.funcABIV2_3.abi, contractAddress);

            assert.isFunction((contract.write as any)['setStruct((address,address,address))']);
            // the tuple read functions are keyed by their (empty/scalar) selectors too
            assert.isFunction((contract.read as any)['get1()']);
            assert.isFunction((contract.read as any)['s(uint256)']);
        });

        it('disambiguates same-arity overloads via the selector key', async function () {
            // two arity-1 overloads of getValue: by uint256 and by address. A bare
            // numeric-string arg matches BOTH (address accepts any string), so the
            // arg-based path is ambiguous — only the selector can pin the overload.
            const overloadedAbi = [
                {
                    type: 'function',
                    name: 'getValue',
                    stateMutability: 'view',
                    inputs: [{ name: 'id', type: 'uint256' }],
                    outputs: [{ name: '', type: 'uint256' }],
                },
                {
                    type: 'function',
                    name: 'getValue',
                    stateMutability: 'view',
                    inputs: [{ name: 'key', type: 'address' }],
                    outputs: [{ name: '', type: 'uint256' }],
                },
            ] as const;

            const tw = tronWebBuilder.createInstance();
            // widened to the untyped ABI so the ambiguous '5' arg reaches the runtime
            // resolver on every surface (the typed selector key would reject a string).
            const contract = tw.contract<ContractAbiInterface>(overloadedAbi, contractAddress);

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

            // the bare name with the ambiguous '5' arg cannot pick an overload
            await assertThrow(contract.read.getValue(['5']), undefined, 'Ambiguous overloaded function "getValue"');

            // each selector key pins its own fragment regardless of the arg heuristic
            await contract.read['getValue(uint256)'](['5']);
            assert.equal(captured?.functionSelector, 'getValue(uint256)');
            assert.equal((captured?.options.funcABIV2 as any)?.inputs?.[0]?.type, 'uint256');

            await contract.read['getValue(address)'](['5']);
            assert.equal(captured?.functionSelector, 'getValue(address)');
            assert.equal((captured?.options.funcABIV2 as any)?.inputs?.[0]?.type, 'address');
        });

        it('keys reserved-name functions by selector, scoped to their namespace', function () {
            const contract = tronWeb.contract(reservedAbi, contractAddress);

            assert.isFunction((contract.read as any)['read()']);
            assert.isFunction((contract.write as any)['write(uint256)']);
            // selectors stay isolated to the namespace that owns the function
            assert.isUndefined((contract.read as any)['write(uint256)']);
            assert.isUndefined((contract.write as any)['read()']);
        });

        it('types selector keys as callable (compile-time)', function () {
            // a regression in the selector-key mapped types breaks the test build
            expectTrue<IsCallable<ContractReadNamespace<typeof contractAbi>['balanceOf(address)']>>();
            expectTrue<IsCallable<ContractWriteNamespace<typeof contractAbi>['transfer(address,uint256)']>>();
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
