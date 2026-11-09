import { Address } from '../../../src/types/Trx';
import { assert, vi } from 'vitest';
import assertThrow from '../../helpers/assertThrow.js';
import waitChainData from '../../helpers/waitChainData.js';
import wait from '../../helpers/wait.js';
import broadcaster from '../../helpers/broadcaster.js';
import tronWebBuilder from '../../helpers/tronWebBuilder.js';
import { TronWeb } from '../../setup/TronWeb.js';
import contracts from '../../fixtures/contracts';
import { Contract } from '../../../src/lib/contract';

const testCustomError = contracts.testCustomError;
const testSetVal = contracts.testSetVal;

describe('#contract.index', function () {
    let accounts: {
        hex: Address[];
        b58: Address[];
        pks: string[];
    };
    let tronWeb: TronWeb;

    beforeAll(async function () {
        tronWeb = tronWebBuilder.createInstance();
        // ALERT this works only with Tron Quickstart:
        accounts = await tronWebBuilder.getTestAccounts(-1);
    });

    describe('#customError', function () {
        let customError: Contract;

        beforeAll(async function () {
            const tx = await broadcaster(
                tronWeb.transactionBuilder.createSmartContract(
                    {
                        abi: testCustomError.abi,
                        bytecode: testCustomError.bytecode,
                    },
                    accounts.b58[0]
                ),
                accounts.pks[0]
            );
            customError = tronWeb.contract(testCustomError.abi, tx.transaction.contract_address);
        });

        it('should revert with custom error', async () => {
            const txid = await customError.test(111).send();
            let data;
            while (true) {
                data = await tronWeb.trx.getTransactionInfo(txid);
                if (Object.keys(data).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }
            const errorData = data.contractResult;
            const expectedErrorData =
                TronWeb.sha3('CustomError(uint256,uint256)', false).slice(0, 8) +
                '000000000000000000000000000000000000000000000000000000000000006f' + // 111
                '0000000000000000000000000000000000000000000000000000000000000001'; // 1
            assert.equal(errorData.join(''), expectedErrorData);
        });
    });

    describe('#at', function () {
        let local: TronWeb;
        let contractHex: string;
        let contractB58: string;
        let otherHex: string;

        beforeAll(async function () {
            local = tronWebBuilder.createInstance();
            const tx = await broadcaster(
                local.transactionBuilder.createSmartContract(
                    { abi: testSetVal.abi, bytecode: testSetVal.bytecode },
                    accounts.b58[1]
                ),
                accounts.pks[1]
            );
            assert.isTrue(tx.receipt.result, `deploy failed: ${JSON.stringify(tx.receipt)}`);
            contractHex = tx.transaction.contract_address.toLowerCase();
            contractB58 = TronWeb.address.fromHex(contractHex);
            await waitChainData('contract', contractHex);
            const other = await broadcaster(
                local.transactionBuilder.createSmartContract(
                    { abi: testSetVal.abi, bytecode: testSetVal.bytecode },
                    accounts.b58[1]
                ),
                accounts.pks[1]
            );
            assert.isTrue(other.receipt.result, `deploy failed: ${JSON.stringify(other.receipt)}`);
            otherHex = other.transaction.contract_address.toLowerCase();
            await waitChainData('contract', otherHex);
        });

        afterEach(function () {
            vi.restoreAllMocks();
        });

        it('should load the contract at the requested address given in hex', async function () {
            const contract = await local.contract().at(contractHex);
            assert.equal(contract.address, contractHex);
            assert.isTrue(contract.deployed);
            assert.isFunction(contract.set);
        });

        it('should load the contract at the requested address given in base58', async function () {
            const contract = await local.contract().at(contractB58);
            assert.equal(contract.address, contractHex);
            assert.isFunction(contract.set);
        });

        it('should load the contract at the requested address given in upper-case hex', async function () {
            const contract = await local.contract().at(contractHex.toUpperCase());
            assert.equal(contract.address, contractHex);
        });

        it('should accept the answer the node actually gives', async function () {
            const genuine = await local.trx.getContract(contractHex);
            vi.spyOn(local.trx, 'getContract').mockResolvedValue({ ...genuine });
            const contract = await local.contract().at(contractB58);
            assert.equal(contract.address, contractHex);
            assert.isFunction(contract.set);
        });

        it('should accept the answer when the node returns the address in base58', async function () {
            const genuine = await local.trx.getContract(contractHex);
            vi.spyOn(local.trx, 'getContract').mockResolvedValue({ ...genuine, contract_address: contractB58 });
            const contract = await local.contract().at(contractHex);
            assert.equal(contract.address, contractHex);
        });

        it('should reject an answer that describes another contract', async function () {
            const genuine = await local.trx.getContract(contractHex);
            vi.spyOn(local.trx, 'getContract').mockResolvedValue({ ...genuine, contract_address: otherHex });
            const contract = local.contract();
            await assertThrow(contract.at(contractHex), undefined, 'Invalid contract address provided');
            assert.isFalse(contract.address);
            assert.isFalse(contract.deployed);
            assert.isUndefined((contract as any).set);
        });

        it('should reject an answer that describes another contract given in base58', async function () {
            const genuine = await local.trx.getContract(contractHex);
            vi.spyOn(local.trx, 'getContract').mockResolvedValue({
                ...genuine,
                contract_address: TronWeb.address.fromHex(otherHex),
            });
            await assertThrow(local.contract().at(contractB58), undefined, 'Invalid contract address provided');
        });

        it('should keep rejecting an invalid address', async function () {
            await assertThrow(local.contract().at('notAnAddress'), undefined, 'Invalid contract address provided');
        });

        it('should keep reporting a contract that has not been deployed', async function () {
            vi.spyOn(local.trx, 'getContract').mockRejectedValue(new Error('Contract does not exist'));
            await assertThrow(local.contract().at(contractHex), 'Contract has not been deployed on the network');
        });
    });

    describe('#broadcast acknowledgement', function () {
        let local: TronWeb;
        let contractHex: string;
        const hexMessage = (text: string) => TronWeb.fromUtf8(text).replace(/^0x/, '');

        beforeAll(async function () {
            local = tronWebBuilder.createInstance();
            local.setPrivateKey(accounts.pks[4]);
            const tx = await broadcaster(
                local.transactionBuilder.createSmartContract(
                    { abi: testSetVal.abi, bytecode: testSetVal.bytecode },
                    accounts.b58[4]
                ),
                accounts.pks[4]
            );
            assert.isTrue(tx.receipt.result, `deploy failed: ${JSON.stringify(tx.receipt)}`);
            contractHex = tx.transaction.contract_address.toLowerCase();
            await waitChainData('contract', contractHex);
        });

        afterEach(function () {
            vi.restoreAllMocks();
        });

        function nodeAnswers(answer: unknown) {
            return vi.spyOn(local.trx, 'sendRawTransaction').mockImplementation(async (signed: any) => {
                const base = answer && typeof answer === 'object' ? answer : {};
                return { ...(base as object), transaction: signed } as any;
            });
        }

        function nodeAnswersRaw(answer: unknown) {
            return vi.spyOn(local.trx, 'sendRawTransaction').mockResolvedValue(answer as any);
        }

        const write = () => local.contract(testSetVal.abi as any, contractHex).write.set([1]);
        const send = () =>
            local
                .contract(testSetVal.abi as any, contractHex)
                .set(1)
                .send();
        const deploy = () => local.contract().new({ abi: testSetVal.abi, bytecode: testSetVal.bytecode } as any);

        const rejected: Array<[string, unknown, string]> = [
            ['an empty object', {}, 'Failed to broadcast transaction'],
            ['an empty string', '', 'Failed to broadcast transaction'],
            ['null', null, 'Failed to broadcast transaction'],
            ['undefined', undefined, 'Failed to broadcast transaction'],
            ['an Error body', { Error: 'class java.lang.NullPointerException' }, 'class java.lang.NullPointerException'],
            ['result as the string false', { result: 'false' }, 'Failed to broadcast transaction'],
            ['result 0', { result: 0 }, 'Failed to broadcast transaction'],
            ['result false without a code', { result: false }, 'Failed to broadcast transaction'],
            ['a code without result', { code: 'DUP_TRANSACTION_ERROR', txid: 'f'.repeat(64) }, 'DUP_TRANSACTION_ERROR'],
            [
                'a code with a message',
                { code: 'SIGERROR', message: hexMessage('Validate signature error') },
                'Validate signature error',
            ],
            ['result true next to a code', { result: true, code: 'SIGERROR' }, 'SIGERROR'],
            ['a plain-text message', { code: 'OTHER_ERROR', message: 'not hex at all' }, 'not hex at all'],
        ];

        for (const [label, answer, message] of rejected) {
            it(`should not report a send when the node answers ${label}`, async function () {
                nodeAnswersRaw(answer);
                await assertThrow(write(), message);

                nodeAnswersRaw(answer);
                let sendError: any;
                try {
                    await send();
                } catch (e) {
                    sendError = e;
                }
                assert.instanceOf(sendError, Error);
                assert.equal(sendError.message, message);
                assert.equal((sendError as any).error, (answer as any)?.code || message);

                nodeAnswersRaw(answer);
                let newError: any;
                try {
                    await deploy();
                } catch (e) {
                    newError = e;
                }
                assert.exists(newError, 'Contract.new did not throw');
                assert.isObject(newError);
                assert.equal(newError.message, message);
                assert.equal(newError.error, (answer as any)?.code || message);
            });
        }

        it('should report the send when the node answers result true with code SUCCESS', async function () {
            nodeAnswers({ result: true, code: 'SUCCESS', txid: 'd'.repeat(64) });
            assert.match(await write(), /^[0-9a-f]{64}$/);
            nodeAnswers({ result: true, code: 'SUCCESS', txid: 'd'.repeat(64) });
            assert.match(await send(), /^[0-9a-f]{64}$/);
        });

        it('should report the send when the node answers result true', async function () {
            const spy = nodeAnswers({ result: true, txid: 'd'.repeat(64) });
            const txid = await write();
            assert.match(txid, /^[0-9a-f]{64}$/);
            assert.equal(spy.mock.calls.length, 1);

            nodeAnswers({ result: true, txid: 'd'.repeat(64) });
            const sent = await send();
            assert.match(sent, /^[0-9a-f]{64}$/);

            nodeAnswers({ result: true, txid: 'd'.repeat(64) });
            const deployed = await deploy();
            assert.isString(deployed.address);
            assert.isFunction((deployed as any).set);
        });

        it('should still send when the node acknowledges the broadcast', async function () {
            const txid = await write();
            assert.match(txid, /^[0-9a-f]{64}$/);
            const sent = await send();
            assert.match(sent, /^[0-9a-f]{64}$/);
        });
    });
});
