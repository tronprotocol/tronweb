/* eslint-disable no-constant-condition */
import { assert } from 'chai';
import tronWebBuilder from '../helpers/tronWebBuilder.js';
import broadcaster from '../helpers/broadcaster.js';
import wait from '../helpers/wait.js';
import { Address } from '../../src/types/Trx.js';
import { TronWeb, Event, Contract } from '../setup/TronWeb.js';
import { CreateSmartContractTransaction } from '../../src/types/Transaction.js';

describe('TronWeb.lib.event', async function () {
    let accounts: {
        hex: Address[];
        b58: Address[];
        pks: string[];
    };
    let tronWeb: TronWeb;
    let contract: Contract;
    let eventLength = 0;
    let contractAddress: Address;

    before(async function () {
        tronWeb = tronWebBuilder.createInstance();
        accounts = await tronWebBuilder.getTestAccounts(-1);

        const result = await broadcaster<CreateSmartContractTransaction>(
            tronWeb.transactionBuilder.createSmartContract(
                {
                    abi: [
                        {
                            anonymous: false,
                            inputs: [
                                {
                                    indexed: true,
                                    name: '_sender',
                                    type: 'address',
                                },
                                {
                                    indexed: false,
                                    name: '_receiver',
                                    type: 'address',
                                },
                                {
                                    indexed: false,
                                    name: '_amount',
                                    type: 'uint256',
                                },
                            ],
                            name: 'SomeEvent',
                            type: 'event',
                        },
                        {
                            constant: false,
                            inputs: [
                                {
                                    name: '_receiver',
                                    type: 'address',
                                },
                                {
                                    name: '_someAmount',
                                    type: 'uint256',
                                },
                            ],
                            name: 'emitNow',
                            outputs: [],
                            payable: false,
                            stateMutability: 'nonpayable',
                            type: 'function',
                        },
                    ],
                    bytecode:
                        '0x608060405234801561001057600080fd5b50610145806100206000396000f300608060405260043610610041576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063bed7111f14610046575b600080fd5b34801561005257600080fd5b50610091600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610093565b005b3373ffffffffffffffffffffffffffffffffffffffff167f9f08738e168c835bbaf7483705fb1c0a04a1a3258dd9687f14d430948e04e3298383604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a250505600a165627a7a7230582033629e2b0bba53f7b5c49769e7e360f2803ae85ac80e69dd61c7bb48f9f401f30029',
                },
                accounts.hex[0]
            ),
            accounts.pks[0]
        );

        contractAddress = result.receipt.transaction.contract_address!;
        contract = await tronWeb.contract().at(contractAddress);
    });

    describe('#constructor()', function () {
        it('should have been set a full instance in tronWeb', function () {
            assert.instanceOf(tronWeb.event, Event);
        });
    });

    describe('#getEventsByTransactionID', async function () {
        it('should emit an unconfirmed event and get it', async function () {
            this.timeout(60000);
            tronWeb.setPrivateKey(accounts.pks[1]);
            const txId = await contract.methods.emitNow(accounts.hex[2], 2000).send({
                from: accounts.hex[1],
            });
            eventLength++;
            let events;
            while (true) {
                events = await tronWeb.event.getEventsByTransactionID(txId);
                if (events.data!.length) {
                    break;
                }
                await wait(0.5);
            }

            assert.equal(events.data![0].result._receiver.substring(2), accounts.hex[2].substring(2));
            assert.equal(events.data![0].result._sender.substring(2), accounts.hex[1].substring(2));
            // assert.equal(events.data![0].resourceNode, 'fullNode');
        });

        it('should emit an event, wait for confirmation and get it', async function () {
            this.timeout(60000);
            tronWeb.setPrivateKey(accounts.pks[1]);
            const output = await contract.methods.emitNow(accounts.hex[2], 2000).send({
                from: accounts.hex[1],
                shouldPollResponse: true,
                rawResponse: true,
            });
            eventLength++;

            const txId = output.id;
            let events;
            while (true) {
                events = await tronWeb.event.getEventsByTransactionID(txId);
                if (events.data!.length) {
                    break;
                }
                await wait(0.5);
            }

            assert.equal(events.data![0].result._receiver.substring(2), accounts.hex[2].substring(2));
            assert.equal(events.data![0].result._sender.substring(2), accounts.hex[1].substring(2));
            // assert.equal(events.data![0].resourceNode, 'solidityNode');
        });
    });

    // available on trongrid.
    describe.skip('#getEventsByContractAddress', async function () {
        let sender = '41d4d999298d6bea26bf2bbb32a254362d8b9f9e6b';
        let receiver = '41f00c9a48e6d6baca7c36134e7cad7d43a851e7b2';
        let tronWeb: TronWeb;
        let contractAddress: Address;
        let contract: Contract;
        let eventLength = 0;

        before(async function () {
            tronWeb = tronWebBuilder.createInstance();

            const result = await broadcaster<CreateSmartContractTransaction>(
                tronWeb.transactionBuilder.createSmartContract({
                    abi: [
                        {
                            anonymous: false,
                            inputs: [
                                {
                                    indexed: true,
                                    name: '_sender',
                                    type: 'address',
                                },
                                {
                                    indexed: false,
                                    name: '_receiver',
                                    type: 'address',
                                },
                                {
                                    indexed: false,
                                    name: '_amount',
                                    type: 'uint256',
                                },
                            ],
                            name: 'SomeEvent',
                            type: 'event',
                        },
                        {
                            constant: false,
                            inputs: [
                                {
                                    name: '_receiver',
                                    type: 'address',
                                },
                                {
                                    name: '_someAmount',
                                    type: 'uint256',
                                },
                            ],
                            name: 'emitNow',
                            outputs: [],
                            payable: false,
                            stateMutability: 'nonpayable',
                            type: 'function',
                        },
                    ],
                    bytecode:
                        '0x608060405234801561001057600080fd5b50610145806100206000396000f300608060405260043610610041576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063bed7111f14610046575b600080fd5b34801561005257600080fd5b50610091600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610093565b005b3373ffffffffffffffffffffffffffffffffffffffff167f9f08738e168c835bbaf7483705fb1c0a04a1a3258dd9687f14d430948e04e3298383604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a250505600a165627a7a7230582033629e2b0bba53f7b5c49769e7e360f2803ae85ac80e69dd61c7bb48f9f401f30029',
                })
            );

            contractAddress = result.receipt.transaction.contract_address!;
            contract = await tronWeb.contract().at(contractAddress);
        });

        it('should emit an event and wait for it', async function () {
            this.timeout(180000);
            await wait(120); // wait for abi syncing.
            await contract.methods.emitNow(receiver, 4000).send({
                from: sender,
            });
            eventLength++;
            let events;
            while (true) {
                events = await tronWeb.event.getEventsByContractAddress(contractAddress, {
                    eventName: 'SomeEvent',
                    orderBy: 'block_timestamp,asc',
                });
                if (events.data!.length === eventLength) {
                    break;
                }
                await wait(0.5);
            }

            const event = events.data![events.data!.length - 1];

            assert.equal(event.result._receiver.substring(2), receiver.substring(2));
            assert.equal(event.result._sender.substring(2), sender.substring(2));
        });
    });

    // todo: add or delete watch
    describe.skip('#contract.method.watch', async function () {
        it('should watch for an event', async function () {
            this.timeout(20000);
            tronWeb.setPrivateKey(accounts.pks[3]);

            // @ts-ignore
            let watchTest = await contract.SomeEvent().watch((_: any, res: any) => {
                if (res) {
                    assert.equal(res.result._sender, accounts.hex[3]);
                    assert.equal(res.result._receiver, accounts.hex[4]);
                    assert.equal(res.result._amount, 4000);

                    watchTest.stop(); // Calls stop on itself when successful
                }
            });

            contract.emitNow(accounts.hex[4], 4000).send({
                from: accounts.hex[3],
            });
        });

        it('should only watch for an event with given filters', async function () {
            this.timeout(20000);
            tronWeb.setPrivateKey(accounts.pks[3]);

            // @ts-ignore
            let watchTest = await contract.SomeEvent().watch({ filters: { _amount: '4000' } }, (_: any, res: any) => {
                if (res) {
                    assert.equal(res.result._sender, accounts.hex[3]);
                    assert.equal(res.result._receiver, accounts.hex[4]);
                    assert.equal(res.result._amount, 4000);

                    watchTest.stop(); // Calls stop on itself when successful
                }
            });

            contract.emitNow(accounts.hex[4], 4000).send({
                from: accounts.hex[3],
            });
        });
    });
});
