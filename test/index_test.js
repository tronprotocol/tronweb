const chai = require('chai');
const assert = chai.assert;
const TronWeb = require('../src');
const HttpProvider = TronWeb.providers.HttpProvider;

const FULL_NODE_API = 'https://api.trongrid.io:8090';
const SOLIDITY_NODE_API = 'https://api.trongrid.io:8091';
const EVENT_API = 'https://api.trongrid.io/';
const PRIVATE_KEY = 'da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0';
const ADDRESS_HEX = '41928c9af0651632157ef27a2cf17ca72c575a4d21';
const ADDRESS_BASE58 = 'TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY';

const createInstance = () => {
    return new TronWeb(FULL_NODE_API, SOLIDITY_NODE_API, EVENT_API, PRIVATE_KEY);
}

describe('TronWeb Instance', () => {
    describe('#constructor()', () => {
        it('should create a full instance', () => {
            const tronWeb = createInstance();
            assert.instanceOf(tronWeb, TronWeb);
        });

        it('should create an instance without a private key', () => {
            const fullNode = new HttpProvider(FULL_NODE_API);
            const solidityNode = new HttpProvider(SOLIDITY_NODE_API);
            const eventServer = EVENT_API;

            const tronWeb = new TronWeb(
                fullNode,
                solidityNode,
                eventServer
            );

            assert.equal(tronWeb.defaultPrivateKey, false);
        });

        it('should create an instance without an event server', () => {
            const fullNode = new HttpProvider(FULL_NODE_API);
            const solidityNode = new HttpProvider(SOLIDITY_NODE_API);

            const tronWeb = new TronWeb(
                fullNode,
                solidityNode
            );

            assert.equal(tronWeb.eventServer, false);
        });

        it('should reject an invalid full node URL', () => {
            const solidityNode = new HttpProvider(SOLIDITY_NODE_API);

            assert.throws(() => new TronWeb(
                '$' + FULL_NODE_API,
                solidityNode
            ), 'Invalid URL provided to HttpProvider');
        });

        it('should reject an invalid solidity node URL', () => {
            const fullNode = new HttpProvider(FULL_NODE_API);

            assert.throws(() => new TronWeb(
                fullNode,
                '$' + SOLIDITY_NODE_API
            ), 'Invalid URL provided to HttpProvider');
        });

        it('should reject an invalid event server URL', () => {
            const fullNode = new HttpProvider(FULL_NODE_API);
            const solidityNode = new HttpProvider(SOLIDITY_NODE_API);

            assert.throws(() => new TronWeb(
                fullNode,
                solidityNode,
                '$' + EVENT_API
            ), 'Invalid URL provided for event server');
        });
    });

    describe('#setDefaultBlock()', () => {
        it('should accept a positive integer', () => {
            const tronWeb = createInstance();

            tronWeb.setDefaultBlock(1);

            assert.equal(tronWeb.defaultBlock, 1);
        });

        it('should correct a negative integer', () => {
            const tronWeb = createInstance();

            tronWeb.setDefaultBlock(-2);

            assert.equal(tronWeb.defaultBlock, 2);
        });

        it('should accept 0', () => {
            const tronWeb = createInstance();

            tronWeb.setDefaultBlock(0);

            assert.equal(tronWeb.defaultBlock, 0);
        });

        it('should be able to clear', () => {
            const tronWeb = createInstance();

            tronWeb.setDefaultBlock();

            assert.equal(tronWeb.defaultBlock, false);
        });

        it('should accept "earliest"', () => {
            const tronWeb = createInstance();

            tronWeb.setDefaultBlock('earliest');

            assert.equal(tronWeb.defaultBlock, 'earliest');
        });

        it('should accept "latest"', () => {
            const tronWeb = createInstance();

            tronWeb.setDefaultBlock('latest');

            assert.equal(tronWeb.defaultBlock, 'latest');
        });

        it('should reject a decimal', () => {
            const tronWeb = createInstance();

            assert.throws(() => tronWeb.setDefaultBlock(10.2), 'Invalid block ID provided');
        });

        it('should reject a string', () => {
            const tronWeb = createInstance();

            assert.throws(() => tronWeb.setDefaultBlock('test'), 'Invalid block ID provided');
        });
    });

    describe('#setPrivateKey()', () => {
        it('should accept a private key', () => {
            const tronWeb = new TronWeb(FULL_NODE_API, SOLIDITY_NODE_API, EVENT_API);

            tronWeb.setPrivateKey(PRIVATE_KEY);

            assert.equal(tronWeb.defaultPrivateKey, PRIVATE_KEY);
        });

        it('should set the appropriate address for the private key', () => {
            const tronWeb = new TronWeb(FULL_NODE_API, SOLIDITY_NODE_API, EVENT_API);

            tronWeb.setPrivateKey(PRIVATE_KEY);

            assert.equal(tronWeb.defaultAddress.hex, ADDRESS_HEX);
            assert.equal(tronWeb.defaultAddress.base58, ADDRESS_BASE58);
        });

        it('should reject an invalid private key', () => {
            const tronWeb = new TronWeb(FULL_NODE_API, SOLIDITY_NODE_API, EVENT_API);

            assert.throws(() => tronWeb.setPrivateKey('test'), 'Invalid private key provided');
        });
    });

    describe('#setAddress()', () => {
        it('should accept a hex address', () => {
            const tronWeb = createInstance();

            tronWeb.setAddress(ADDRESS_HEX);

            assert.equal(tronWeb.defaultAddress.hex, ADDRESS_HEX);
            assert.equal(tronWeb.defaultAddress.base58, ADDRESS_BASE58);
        });

        it('should accept a base58 address', () => {
            const tronWeb = createInstance();

            tronWeb.setAddress(ADDRESS_BASE58);

            assert.equal(tronWeb.defaultAddress.hex, ADDRESS_HEX);
            assert.equal(tronWeb.defaultAddress.base58, ADDRESS_BASE58);
        });

        it('should reset the private key if the address doesn\'t match', () => {
            const tronWeb = createInstance();

            assert.equal(tronWeb.defaultPrivateKey, PRIVATE_KEY);

            tronWeb.setAddress(
                ADDRESS_HEX.substr(0, ADDRESS_HEX.length - 1) + '8'
            );

            assert.equal(tronWeb.defaultPrivateKey, false);
            assert.equal(tronWeb.defaultAddress.hex, '41928c9af0651632157ef27a2cf17ca72c575a4d28');
            assert.equal(tronWeb.defaultAddress.base58, 'TPL66VK2gCXNCD7EJg9pgJRfqcRbnn4zcp');
        });

        it('should not reset the private key if the address matches', () => {
            const tronWeb = createInstance();

            tronWeb.setAddress(ADDRESS_BASE58);

            assert.equal(tronWeb.defaultPrivateKey, PRIVATE_KEY);
        });
    });

    describe('#isValidProvider()', () => {
        it('should accept a valid provider', () => {
            const tronWeb = createInstance();
            const provider = new HttpProvider(FULL_NODE_API);

            assert.equal(tronWeb.isValidProvider(provider), true);
        });

        it('should accept an invalid provider', () => {
            const tronWeb = createInstance();

            assert.equal(tronWeb.isValidProvider('test'), false);
        });
    });

    describe('#isEventServerConnected()', () => {
        it('should return true for valid event server', async () => {
            const tronWeb = createInstance();
            const isConnected = await tronWeb.isEventServerConnected();

            assert.equal(isConnected, true);
        });

        it('should return false for invalid event server', async () => {
            const tronWeb = createInstance();

            tronWeb.setEventServer('https://google.co.uk');

            const isConnected = await tronWeb.isEventServerConnected();

            assert.equal(isConnected, false);
        });
    });

    describe('#setFullNode()', () => {
        it('should accept a HttpProvider instance', () => {
            const tronWeb = createInstance();
            const provider = new HttpProvider(FULL_NODE_API);

            tronWeb.setFullNode(provider);

            assert.equal(tronWeb.fullNode, provider);
        });

        it('should accept a valid URL string', () => {
            const tronWeb = createInstance();
            const provider = FULL_NODE_API;

            tronWeb.setFullNode(provider);

            assert.equal(tronWeb.fullNode.host, provider);
        });

        it('should reject a non-string', () => {
            assert.throws(() => {
                createInstance().setFullNode(true)
            }, 'Invalid full node provided');
        });

        it('should reject an invalid URL string', () => {
            assert.throws(() => {
                createInstance().setFullNode('test')
            }, 'Invalid URL provided to HttpProvider');
        });
    });

    describe('#setSolidityNode()', () => {
        it('should accept a HttpProvider instance', () => {
            const tronWeb = createInstance();
            const provider = new HttpProvider(SOLIDITY_NODE_API);

            tronWeb.setSolidityNode(provider);

            assert.equal(tronWeb.solidityNode, provider);
        });

        it('should accept a valid URL string', () => {
            const tronWeb = createInstance();
            const provider = SOLIDITY_NODE_API;

            tronWeb.setSolidityNode(provider);

            assert.equal(tronWeb.solidityNode.host, provider);
        });

        it('should reject a non-string', () => {
            assert.throws(() => {
                createInstance().setSolidityNode(true)
            }, 'Invalid solidity node provided');
        });

        it('should reject an invalid URL string', () => {
            assert.throws(() => {
                createInstance().setSolidityNode('test')
            }, 'Invalid URL provided to HttpProvider');
        });
    });

    describe('#setEventServer()', () => {
        it('should accept a valid URL string', () => {
            const tronWeb = createInstance();
            const eventServer = EVENT_API;

            tronWeb.setEventServer(eventServer);

            assert.equal(tronWeb.eventServer, eventServer);
        });

        it('should reset the event server property', () => {
            const tronWeb = createInstance();

            tronWeb.setEventServer(false);

            assert.equal(tronWeb.eventServer, false);
        });

        it('should reject an invalid URL string', () => {
            const tronWeb = createInstance();

            assert.throws(() => {
                tronWeb.setEventServer('test')
            }, 'Invalid URL provided for event server');
        });

        it('should reject an invalid URL parameter', () => {
            const tronWeb = createInstance();

            assert.throws(() => {
                tronWeb.setEventServer({})
            }, 'Invalid URL provided for event server');
        });
    });

    describe('#currentProviders()', () => {
        it('should return the current providers', () => {
            const tronWeb = createInstance();
            const providers = tronWeb.currentProviders();

            assert.equal(providers.fullNode.host, FULL_NODE_API);
            assert.equal(providers.solidityNode.host, SOLIDITY_NODE_API);
            assert.equal(providers.eventServer, EVENT_API);
        });
    });
});
