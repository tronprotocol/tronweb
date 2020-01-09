const chai = require('chai');
const tronWebBuilder = require('../helpers/tronWebBuilder');
const TronWeb = tronWebBuilder.TronWeb;
const jlog = require('../helpers/jlog')
const broadcaster = require('../helpers/broadcaster');
const wait = require('../helpers/wait')
const {emitter} = require('../fixtures/contracts')

const assert = chai.assert;

describe('TronWeb.lib.event', async function () {

    describe('Legacy version', async function () {

        let accounts
        let tronWeb
        let contractAddress
        let contract
        let eventLength = 0

        before(async function () {
            tronWeb = tronWebBuilder.createInstance();
            accounts = await tronWebBuilder.getTestAccounts(-1);

            const result = await broadcaster(tronWeb.transactionBuilder.createSmartContract(emitter, accounts.hex[0]), accounts.pks[0])

            contractAddress = result.receipt.transaction.contract_address
            contract = await tronWeb.contract().at(contractAddress)
        });

        describe('#constructor()', function () {

            it('should have been set a full instance in tronWeb', function () {

                assert.instanceOf(tronWeb.event, TronWeb.Event);
            });

        });

        describe("#getEventsByTransactionID", async function () {


            it('should emit an unconfirmed event and get it', async function () {

                this.timeout(60000)
                tronWeb.setPrivateKey(accounts.pks[1])
                let txId = await contract.emitNow(accounts.hex[2], 2000).send({
                    from: accounts.hex[1]
                })
                eventLength++
                let events
                while (true) {
                    events = await tronWeb.event.getEventsByTransactionID(txId)
                    if (events.length) {
                        break
                    }
                    await wait(0.5)
                }

                assert.equal(events[0].result._receiver.substring(2), accounts.hex[2].substring(2))
                assert.equal(events[0].result._sender.substring(2), accounts.hex[1].substring(2))
                assert.equal(events[0].resourceNode, 'fullNode')

            })

            it('should emit an event, wait for confirmation and get it', async function () {

                this.timeout(60000)
                tronWeb.setPrivateKey(accounts.pks[1])
                let output = await contract.emitNow(accounts.hex[2], 2000).send({
                    from: accounts.hex[1],
                    shouldPollResponse: true,
                    rawResponse: true
                })
                eventLength++

                let txId = output.id
                let events
                while (true) {
                    events = await tronWeb.event.getEventsByTransactionID(txId)
                    if (events.length) {
                        break
                    }
                    await wait(0.5)
                }

                assert.equal(events[0].result._receiver.substring(2), accounts.hex[2].substring(2))
                assert.equal(events[0].result._sender.substring(2), accounts.hex[1].substring(2))
                assert.equal(events[0].resourceNode, 'solidityNode')

            })

        });

        describe("#getEventsByContractAddress", async function () {

            it('should emit an event and wait for it', async function () {

                this.timeout(60000)
                tronWeb.setPrivateKey(accounts.pks[3])
                await contract.emitNow(accounts.hex[4], 4000).send({
                    from: accounts.hex[3]
                })
                eventLength++
                let events
                while (true) {
                    events = await tronWeb.event.getEventsByContractAddress(contractAddress, {
                        eventName: 'SomeEvent',
                        sort: 'block_timestamp'
                    })
                    if (events.length === eventLength) {
                        break
                    }
                    await wait(0.5)
                }

                const event = events[events.length - 1]

                assert.equal(event.result._receiver.substring(2), accounts.hex[4].substring(2))
                assert.equal(event.result._sender.substring(2), accounts.hex[3].substring(2))
                assert.equal(event.resourceNode, 'fullNode')

            })

        });

        describe('#contract.method.watch', async function () {

            it('should watch for an event', async function () {

                this.timeout(20000)
                tronWeb.setPrivateKey(accounts.pks[3])

                let watchTest = await contract.SomeEvent().watch((err, res) => {
                    if (res) {
                        assert.equal(res.result._sender, accounts.hex[3])
                        assert.equal(res.result._receiver, accounts.hex[4])
                        assert.equal(res.result._amount, 4000)

                        watchTest.stop() // Calls stop on itself when successful
                    }
                })

                contract.emitNow(accounts.hex[4], 4000).send({
                    from: accounts.hex[3]
                })

            })

            it('should only watch for an event with given filters', async function () {

                this.timeout(20000)
                tronWeb.setPrivateKey(accounts.pks[3])

                let watchTest = await contract.SomeEvent().watch({filters: {"_amount": "4000"}}, (err, res) => {
                    if (res) {
                        assert.equal(res.result._sender, accounts.hex[3])
                        assert.equal(res.result._receiver, accounts.hex[4])
                        assert.equal(res.result._amount, 4000)

                        watchTest.stop() // Calls stop on itself when successful
                    }
                })

                contract.emitNow(accounts.hex[4], 4000).send({
                    from: accounts.hex[3]
                })
            })
        })
    });

    describe('Trongrid-compatible version', async function () {

        let accounts
        let tronWeb
        let contractAddress
        let contract
        let eventLength = 0

        beforeEach(async function () {
            tronWeb = tronWebBuilder.createInstance({
                useTronGridAPI: true
            });
            accounts = await tronWebBuilder.getTestAccounts(-1);

            const result = await broadcaster(tronWeb.transactionBuilder.createSmartContract(emitter, accounts.hex[0]), accounts.pks[0])

            contractAddress = result.receipt.transaction.contract_address
            contract = await tronWeb.contract().at(contractAddress)
        });

        describe("#getEventsByTransactionID", async function () {


            it('should emit an unconfirmed event and get it', async function () {

                this.timeout(60000)
                tronWeb.setPrivateKey(accounts.pks[5])


                let txId = await contract.emitNow(accounts.hex[6], 2000).send({
                    from: accounts.hex[5]
                })
                eventLength++
                let events
                while (true) {
                    events = await tronWeb.event.getEventsByTransactionID(txId)
                    if (events.data && events.data.length) {
                        break
                    }
                    await wait(0.5)
                }

                assert.isTrue(Math.abs(events.meta.at - Date.now()) < 100)
                assert.equal(events.meta.page_size, 1)

                events = events.data

                assert.equal(events[0].result._receiver.substring(2), accounts.hex[6].substring(2))
                assert.equal(events[0].result._sender.substring(2), accounts.hex[5].substring(2))
                assert.isTrue(events[0]._unconfirmed)

            })

            it('should emit an event, wait for confirmation and get it', async function () {

                this.timeout(60000)
                tronWeb.setPrivateKey(accounts.pks[7])

                let output = await contract.emitNow(accounts.hex[8], 2000).send({
                    from: accounts.hex[7],
                    shouldPollResponse: true,
                    rawResponse: true
                })

                eventLength++

                let txId = output.id
                let events
                while (true) {
                    events = await tronWeb.event.getEventsByTransactionID(txId)
                    if (events.data && events.data.length) {
                        break
                    }
                    await wait(0.5)
                }
                assert.isTrue(Math.abs(events.meta.at - Date.now()) < 15);

                events = events.data

                assert.equal(events[0].result._receiver.substring(2), accounts.hex[8].substring(2))
                assert.equal(events[0].result._sender.substring(2), accounts.hex[7].substring(2))
                assert.isUndefined(events[0]._unconfirmed)

            })

        });

        describe("#getEventsByContractAddress", async function () {

            it('should emit an event and wait for it', async function () {

                this.timeout(60000)
                tronWeb.setPrivateKey(accounts.pks[3])

                await contract.emitNow(accounts.hex[4], 4000).send({
                    from: accounts.hex[3]
                })

                eventLength++
                let events
                while (true) {
                    events = await tronWeb.event.getEventsByContractAddress(contractAddress, {
                        eventName: 'SomeEvent',
                        sort: 'block_timestamp'
                    })
                    if (events.data && events.data.length) {
                        break
                    }
                    await wait(0.5)
                }

                assert.equal(events.meta.page_size, 1);

                events = events.data

                const event = events[events.length - 1]

                assert.equal(event.result._receiver.substring(2), accounts.hex[4].substring(2))
                assert.equal(event.result._sender.substring(2), accounts.hex[3].substring(2))
                assert.isTrue(events[0]._unconfirmed)

            })

        });

        describe('#contract.method.watch', async function () {

            it('should watch for an event', async function () {

                this.timeout(20000)
                tronWeb.setPrivateKey(accounts.pks[3])

                let watchTest = await contract.SomeEvent().watch((err, res) => {
                    if (res) {
                        assert.equal(res.result._sender, accounts.hex[3])
                        assert.equal(res.result._receiver, accounts.hex[4])
                        assert.equal(res.result._amount, 5000)

                        watchTest.stop() // Calls stop on itself when successful
                    }
                })

                contract.emitNow(accounts.hex[4], 5000).send({
                    from: accounts.hex[3]
                })

            })

        })
    });
});
