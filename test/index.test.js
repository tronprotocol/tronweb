const chai = require('chai');
const jwt = require('jsonwebtoken');
const {
    ADDRESS_HEX,
    ADDRESS_BASE58,
    FULL_NODE_API,
    SOLIDITY_NODE_API,
    EVENT_API,
    PRIVATE_KEY,
    SIDE_CHAIN,
    SUN_NETWORK,
    TEST_TRON_GRID_API,
    TEST_TRON_HEADER_API_KEY,
    TEST_TRON_HEADER_API_JWT_KEY,
    TEST_TRON_HEADER_JWT_ID,
    TEST_TRON_HEADER_JWT_PRIVATE_KEY
    } = require('./helpers/config');
const tronWebBuilder = require('./helpers/tronWebBuilder');
const TronWeb = tronWebBuilder.TronWeb;
const log = require('./helpers/log')
const BigNumber = require('bignumber.js');
const broadcaster = require('./helpers/broadcaster');
const wait = require('./helpers/wait')


const assert = chai.assert;
const HttpProvider = TronWeb.providers.HttpProvider;

describe('TronWeb Instance', function () {

    describe('#constructor()', function () {
        it('should create a full instance', function () {
            const tronWeb = tronWebBuilder.createInstance();
            assert.instanceOf(tronWeb, TronWeb);
        });

        it('should create an instance using an options object without private key', function () {
            const fullNode = new HttpProvider(FULL_NODE_API);
            const solidityNode = new HttpProvider(SOLIDITY_NODE_API);
            const eventServer = EVENT_API;

            const tronWeb = new TronWeb({
                fullNode,
                solidityNode,
                eventServer
            });

            assert.equal(tronWeb.defaultPrivateKey, false);
        });

        it('should create an instance using a full options object', function () {
            const fullNode = FULL_NODE_API;
            const solidityNode = SOLIDITY_NODE_API;
            const eventServer = EVENT_API;
            const privateKey = PRIVATE_KEY;

            const tronWeb = new TronWeb({
                fullNode,
                solidityNode,
                eventServer,
                privateKey
            });

            assert.equal(tronWeb.defaultPrivateKey, privateKey);
        });

        it('should create an instance without a private key', function () {
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

        it('should create an instance without an event server', function () {
            const fullNode = new HttpProvider(FULL_NODE_API);
            const solidityNode = new HttpProvider(SOLIDITY_NODE_API);

            const tronWeb = new TronWeb(
                fullNode,
                solidityNode
            );

            assert.equal(tronWeb.eventServer, false);
        });

        it('should reject an invalid full node URL', function () {
            const solidityNode = new HttpProvider(SOLIDITY_NODE_API);

            assert.throws(() => new TronWeb(
                '$' + FULL_NODE_API,
                solidityNode
            ), 'Invalid URL provided to HttpProvider');
        });

        it('should reject an invalid solidity node URL', function () {
            const fullNode = new HttpProvider(FULL_NODE_API);

            assert.throws(() => new TronWeb(
                fullNode,
                '$' + SOLIDITY_NODE_API
            ), 'Invalid URL provided to HttpProvider');
        });

        it('should reject an invalid event server URL', function () {
            const fullNode = new HttpProvider(FULL_NODE_API);
            const solidityNode = new HttpProvider(SOLIDITY_NODE_API);

            assert.throws(() => new TronWeb(
                fullNode,
                solidityNode,
                '$' + EVENT_API
            ), 'Invalid URL provided to HttpProvider');
        });

        it('should create an instance using an options and sideOptions object without private key', function () {
            const fullNode = new HttpProvider(SIDE_CHAIN.fullNode);
            const solidityNode = new HttpProvider(SIDE_CHAIN.solidityNode);
            const eventServer = SIDE_CHAIN.eventServer;

            const tronWeb = new TronWeb({
                fullNode,
                solidityNode,
                eventServer
            }, SIDE_CHAIN.sideOptions);

            assert.equal(tronWeb.defaultPrivateKey, false);
        });

        it('should create an instance using a full options and a full sideOptions object', function () {

            const {fullNode, solidityNode, eventServer, sideOptions} = SIDE_CHAIN;
            const privateKey = PRIVATE_KEY;
            const tronWeb = new TronWeb({
                fullNode,
                solidityNode,
                eventServer,
                privateKey
            }, sideOptions);
            assert.equal(tronWeb.defaultPrivateKey, privateKey);
        });

        it('should create an instance with a full sideOptions without a private key', function () {
            const fullNode = new HttpProvider(SIDE_CHAIN.fullNode);
            const solidityNode = new HttpProvider(SIDE_CHAIN.solidityNode);
            const eventServer = SIDE_CHAIN.eventServer;

            const tronWeb = new TronWeb(
                fullNode,
                solidityNode,
                eventServer,
                {
                    fullNode: SIDE_CHAIN.sideOptions.fullNode,
                    solidityNode: SIDE_CHAIN.sideOptions.solidityNode,
                    eventServer: SIDE_CHAIN.sideOptions.eventServer,
                    mainGatewayAddress: SIDE_CHAIN.sideOptions.mainGatewayAddress,
                    sideGatewayAddress: SIDE_CHAIN.sideOptions.sideGatewayAddress,
                    sideChainId: SIDE_CHAIN.sideOptions.sideChainId
                }
            );

            assert.equal(tronWeb.defaultPrivateKey, false);
        });

        it('should create an instance with a fullhost in sideOptions without a private key', function () {
            const fullNode = new HttpProvider(SIDE_CHAIN.fullNode);
            const solidityNode = new HttpProvider(SIDE_CHAIN.solidityNode);
            const eventServer = SIDE_CHAIN.eventServer;

            const tronWeb = new TronWeb(
                fullNode,
                solidityNode,
                eventServer,
                {
                    fullHost: SIDE_CHAIN.sideOptions.fullNode,
                    mainGatewayAddress: SIDE_CHAIN.sideOptions.mainGatewayAddress,
                    sideGatewayAddress: SIDE_CHAIN.sideOptions.sideGatewayAddress,
                    sideChainId: SIDE_CHAIN.sideOptions.sideChainId
                }
            );

            assert.equal(tronWeb.defaultPrivateKey, false);
        });

        it('should create an instance with a full sideOptions without an event server', function () {
            const fullNode = new HttpProvider(SIDE_CHAIN.fullNode);
            const solidityNode = new HttpProvider(SIDE_CHAIN.solidityNode);

            const tronWeb = new TronWeb(
                fullNode,
                solidityNode,
                false,
                {
                    fullNode: SIDE_CHAIN.sideOptions.fullNode,
                    solidityNode: SIDE_CHAIN.sideOptions.solidityNode,
                    eventServer: SIDE_CHAIN.sideOptions.eventServer,
                    mainGatewayAddress: SIDE_CHAIN.sideOptions.mainGatewayAddress,
                    sideGatewayAddress: SIDE_CHAIN.sideOptions.sideGatewayAddress,
                    sideChainId: SIDE_CHAIN.sideOptions.sideChainId
                }
            );

            assert.equal(tronWeb.eventServer, false);
        });


        it('should create an instance with a full sideOptions without an event server in sideOptions', function () {
            const fullNode = new HttpProvider(SIDE_CHAIN.fullNode);
            const solidityNode = new HttpProvider(SIDE_CHAIN.solidityNode);

            const tronWeb = new TronWeb(
                fullNode,
                solidityNode,
                false,
                {
                    fullNode: SIDE_CHAIN.sideOptions.fullNode,
                    solidityNode: SIDE_CHAIN.sideOptions.solidityNode,
                    mainGatewayAddress: SIDE_CHAIN.sideOptions.mainGatewayAddress,
                    sideGatewayAddress: SIDE_CHAIN.sideOptions.sideGatewayAddress,
                    sideChainId: SIDE_CHAIN.sideOptions.sideChainId
                }
            );

            assert.equal(tronWeb.eventServer, false);
        });

        it('should reject an invalid full node URL in sideOptions', function () {
            const fullNode = new HttpProvider(SIDE_CHAIN.fullNode);
            const solidityNode = new HttpProvider(SIDE_CHAIN.solidityNode);
            assert.throws(() => new TronWeb(
                fullNode,
                solidityNode,
                false,
                {
                    fullNode: '$' + SIDE_CHAIN.sideOptions.fullNode,
                    mainGatewayAddress: SIDE_CHAIN.sideOptions.mainGatewayAddress,
                    sideGatewayAddress: SIDE_CHAIN.sideOptions.sideGatewayAddress,
                    sideChainId: SIDE_CHAIN.sideOptions.sideChainId
                }
            ), 'Invalid URL provided to HttpProvider');
        });

        it('should reject an invalid solidity node URL in sideOptions', function () {
            const fullNode = new HttpProvider(SIDE_CHAIN.fullNode);
            const solidityNode = new HttpProvider(SIDE_CHAIN.solidityNode);
            const eventServer = SIDE_CHAIN.eventServer;
            assert.throws(() => new TronWeb(
                fullNode,
                solidityNode,
                eventServer,
                {
                    fullNode: SIDE_CHAIN.sideOptions.fullNode,
                    solidityNode: '$' + SIDE_CHAIN.sideOptions.solidityNode,
                    mainGatewayAddress: SIDE_CHAIN.sideOptions.mainGatewayAddress,
                    sideGatewayAddress: SIDE_CHAIN.sideOptions.sideGatewayAddress,
                    sideChainId: SIDE_CHAIN.sideOptions.sideChainId
                }
            ), 'Invalid URL provided to HttpProvider');
        });

        it('should reject an invalid event server URL in sideOptions ', function () {

            const fullNode = new HttpProvider(SIDE_CHAIN.fullNode);
            const solidityNode = new HttpProvider(SIDE_CHAIN.solidityNode);
            const eventServer = SIDE_CHAIN.eventServer;
            assert.throws(() => new TronWeb(
                fullNode,
                solidityNode,
                eventServer,
                {
                    fullNode: SIDE_CHAIN.sideOptions.fullNode,
                    solidityNode: SIDE_CHAIN.sideOptions.solidityNode,
                    eventServer: '$' + SIDE_CHAIN.sideOptions.eventServer,
                    mainGatewayAddress: SIDE_CHAIN.sideOptions.mainGatewayAddress,
                    sideGatewayAddress: SIDE_CHAIN.sideOptions.sideGatewayAddress,
                    sideChainId: SIDE_CHAIN.sideOptions.sideChainId
                }
            ), 'Invalid URL provided to HttpProvider');
        });

    });

    describe('#version()', function () {
        it('should verify that the version is available as static and non-static property', function () {
            const tronWeb = tronWebBuilder.createInstance();

            assert.equal(typeof tronWeb.version, 'string');
            assert.equal(typeof TronWeb.version, 'string');
        });
    });


    describe('#fullnodeVersion()', function () {
        it('should verify that the version of the fullNode is available', function () {
            const tronWeb = tronWebBuilder.createInstance();
            // setTimeout(() => console.log(tronWeb.fullnodeVersion), 500)
            assert.equal(typeof tronWeb.fullnodeVersion, 'string');

        });
    });

    describe('#setDefaultBlock()', function () {
        it('should accept a positive integer', function () {
            const tronWeb = tronWebBuilder.createInstance();

            tronWeb.setDefaultBlock(1);

            assert.equal(tronWeb.defaultBlock, 1);
        });

        it('should correct a negative integer', function () {
            const tronWeb = tronWebBuilder.createInstance();

            tronWeb.setDefaultBlock(-2);

            assert.equal(tronWeb.defaultBlock, 2);
        });

        it('should accept 0', function () {
            const tronWeb = tronWebBuilder.createInstance();

            tronWeb.setDefaultBlock(0);

            assert.equal(tronWeb.defaultBlock, 0);
        });

        it('should be able to clear', function () {
            const tronWeb = tronWebBuilder.createInstance();

            tronWeb.setDefaultBlock();

            assert.equal(tronWeb.defaultBlock, false);
        });

        it('should accept "earliest"', function () {
            const tronWeb = tronWebBuilder.createInstance();

            tronWeb.setDefaultBlock('earliest');

            assert.equal(tronWeb.defaultBlock, 'earliest');
        });

        it('should accept "latest"', function () {
            const tronWeb = tronWebBuilder.createInstance();

            tronWeb.setDefaultBlock('latest');

            assert.equal(tronWeb.defaultBlock, 'latest');
        });

        it('should reject a decimal', function () {
            const tronWeb = tronWebBuilder.createInstance();

            assert.throws(() => tronWeb.setDefaultBlock(10.2), 'Invalid block ID provided');
        });

        it('should reject a string', function () {
            const tronWeb = tronWebBuilder.createInstance();

            assert.throws(() => tronWeb.setDefaultBlock('test'), 'Invalid block ID provided');
        });
    });

    describe('#setPrivateKey()', function () {
        it('should accept a private key', function () {
            const tronWeb = new TronWeb(FULL_NODE_API, SOLIDITY_NODE_API, EVENT_API);

            tronWeb.setPrivateKey(PRIVATE_KEY);

            assert.equal(tronWeb.defaultPrivateKey, PRIVATE_KEY);
        });

        it('should set the appropriate address for the private key', function () {
            const tronWeb = new TronWeb(FULL_NODE_API, SOLIDITY_NODE_API, EVENT_API);

            tronWeb.setPrivateKey(PRIVATE_KEY);

            assert.equal(tronWeb.defaultAddress.hex, ADDRESS_HEX);
            assert.equal(tronWeb.defaultAddress.base58, ADDRESS_BASE58);
        });

        it('should reject an invalid private key', function () {
            const tronWeb = new TronWeb(FULL_NODE_API, SOLIDITY_NODE_API, EVENT_API);

            assert.throws(() => tronWeb.setPrivateKey('test'), 'Invalid private key provided');
        });

        it('should emit a privateKeyChanged event', function (done) {
            this.timeout(1000);

            const tronWeb = tronWebBuilder.createInstance();

            tronWeb.on('privateKeyChanged', privateKey => {
                done(
                    assert.equal(privateKey, PRIVATE_KEY)
                );
            });

            tronWeb.setPrivateKey(PRIVATE_KEY);
        });
    });

    describe('#setAddress()', function () {
        it('should accept a hex address', function () {
            const tronWeb = tronWebBuilder.createInstance();

            tronWeb.setAddress(ADDRESS_HEX);

            assert.equal(tronWeb.defaultAddress.hex, ADDRESS_HEX);
            assert.equal(tronWeb.defaultAddress.base58, ADDRESS_BASE58);
        });

        it('should accept a base58 address', function () {
            const tronWeb = tronWebBuilder.createInstance();

            tronWeb.setAddress(ADDRESS_BASE58);

            assert.equal(tronWeb.defaultAddress.hex, ADDRESS_HEX);
            assert.equal(tronWeb.defaultAddress.base58, ADDRESS_BASE58);
        });

        it('should reset the private key if the address doesn\'t match', function () {
            const tronWeb = tronWebBuilder.createInstance();

            assert.equal(tronWeb.defaultPrivateKey, PRIVATE_KEY);

            tronWeb.setAddress(
                ADDRESS_HEX.substr(0, ADDRESS_HEX.length - 1) + '8'
            );

            assert.equal(tronWeb.defaultPrivateKey, false);
            assert.equal(tronWeb.defaultAddress.hex, '41928c9af0651632157ef27a2cf17ca72c575a4d28');
            assert.equal(tronWeb.defaultAddress.base58, 'TPL66VK2gCXNCD7EJg9pgJRfqcRbnn4zcp');
        });

        it('should not reset the private key if the address matches', function () {
            const tronWeb = tronWebBuilder.createInstance();

            tronWeb.setAddress(ADDRESS_BASE58);

            assert.equal(tronWeb.defaultPrivateKey, PRIVATE_KEY);
        });

        it('should emit an addressChanged event', function (done) {
            this.timeout(1000);

            const tronWeb = tronWebBuilder.createInstance();

            tronWeb.on('addressChanged', ({hex, base58}) => {
                done(
                    assert.equal(hex, ADDRESS_HEX) &&
                    assert.equal(base58, ADDRESS_BASE58)
                );
            });

            tronWeb.setAddress(ADDRESS_BASE58);
        });
    });

    describe('#isValidProvider()', function () {
        it('should accept a valid provider', function () {
            const tronWeb = tronWebBuilder.createInstance();
            const provider = new HttpProvider(FULL_NODE_API);

            assert.equal(tronWeb.isValidProvider(provider), true);
        });

        it('should accept an invalid provider', function () {
            const tronWeb = tronWebBuilder.createInstance();

            assert.equal(tronWeb.isValidProvider('test'), false);
        });
    });

    describe('#setFullNode()', function () {
        it('should accept a HttpProvider instance', function () {
            const tronWeb = tronWebBuilder.createInstance();
            const provider = new HttpProvider(FULL_NODE_API);

            tronWeb.setFullNode(provider);

            assert.equal(tronWeb.fullNode, provider);
        });

        it('should accept a valid URL string', function () {
            const tronWeb = tronWebBuilder.createInstance();
            const provider = FULL_NODE_API;

            tronWeb.setFullNode(provider);

            assert.equal(tronWeb.fullNode.host, provider);
        });

        it('should reject a non-string', function () {
            assert.throws(() => {
                tronWebBuilder.createInstance().setFullNode(true)
            }, 'Invalid full node provided');
        });

        it('should reject an invalid URL string', function () {
            assert.throws(() => {
                tronWebBuilder.createInstance().setFullNode('example.')
            }, 'Invalid URL provided to HttpProvider');
        });
    });

    describe('#setSolidityNode()', function () {
        it('should accept a HttpProvider instance', function () {
            const tronWeb = tronWebBuilder.createInstance();
            const provider = new HttpProvider(SOLIDITY_NODE_API);

            tronWeb.setSolidityNode(provider);

            assert.equal(tronWeb.solidityNode, provider);
        });

        it('should accept a valid URL string', function () {
            const tronWeb = tronWebBuilder.createInstance();
            const provider = SOLIDITY_NODE_API;

            tronWeb.setSolidityNode(provider);

            assert.equal(tronWeb.solidityNode.host, provider);
        });

        it('should reject a non-string', function () {
            assert.throws(() => {
                tronWebBuilder.createInstance().setSolidityNode(true)
            }, 'Invalid solidity node provided');
        });

        it('should reject an invalid URL string', function () {
            assert.throws(() => {
                tronWebBuilder.createInstance().setSolidityNode('_localhost')
            }, 'Invalid URL provided to HttpProvider');
        });
    });

    describe('#setEventServer()', function () {
        it('should accept a valid URL string', function () {
            const tronWeb = tronWebBuilder.createInstance();
            const eventServer = EVENT_API;

            tronWeb.setEventServer(eventServer);

            assert.equal(tronWeb.eventServer.host, eventServer);
        });

        it('should reset the event server property', function () {
            const tronWeb = tronWebBuilder.createInstance();

            tronWeb.setEventServer(false);

            assert.equal(tronWeb.eventServer, false);
        });

        it('should reject an invalid URL string', function () {
            const tronWeb = tronWebBuilder.createInstance();

            assert.throws(() => {
                tronWeb.setEventServer('test%20')
            }, 'Invalid URL provided to HttpProvider');
        });

        it('should reject an invalid URL parameter', function () {
            const tronWeb = tronWebBuilder.createInstance();

            assert.throws(() => {
                tronWeb.setEventServer({})
            }, 'Invalid event server provided');
        });
    });

    describe('#currentProviders()', function () {
        it('should return the current providers', function () {
            const tronWeb = tronWebBuilder.createInstance();
            const providers = tronWeb.currentProviders();

            const tronWebSide = tronWebBuilder.createInstanceSide();
            const providersSide = tronWebSide.currentProviders();

            assert.equal(providers.fullNode.host, FULL_NODE_API);
            assert.equal(providers.solidityNode.host, SOLIDITY_NODE_API);
            assert.equal(providers.eventServer.host, EVENT_API);

            assert.equal(providersSide.fullNode.host, SIDE_CHAIN.fullNode);
            assert.equal(providersSide.solidityNode.host, SIDE_CHAIN.solidityNode);
            assert.equal(providersSide.eventServer.host, SIDE_CHAIN.eventServer);
        });
    });

    describe('#currentProvider()', function () {
        it('should return the current providers', function () {
            const tronWeb = tronWebBuilder.createInstance();
            const providers = tronWeb.currentProvider();

            const tronWebSide = tronWebBuilder.createInstanceSide();
            const providersSide = tronWebSide.currentProviders();

            assert.equal(providers.fullNode.host, FULL_NODE_API);
            assert.equal(providers.solidityNode.host, SOLIDITY_NODE_API);
            assert.equal(providers.eventServer.host, EVENT_API);

            assert.equal(providersSide.fullNode.host, SIDE_CHAIN.fullNode);
            assert.equal(providersSide.solidityNode.host, SIDE_CHAIN.solidityNode);
            assert.equal(providersSide.eventServer.host, SIDE_CHAIN.eventServer);
        });
    });

    describe('#sha3()', function () {
        it('should match web3 sha function', function () {
            const input = 'casa';
            const expected = '0xc4388c0eaeca8d8b4f48786df8517bc8ca379e8cf9566af774448e46e816657d';

            assert.equal(TronWeb.sha3(input), expected);
        });
    });

    describe('#toHex()', function () {
        it('should convert a boolean to hex', function () {
            let input = true;
            let expected = '0x1';
            assert.equal(TronWeb.toHex(input), expected);

            input = false;
            expected = '0x0';
            assert.equal(TronWeb.toHex(input), expected);
        });

        it('should convert a BigNumber to hex', function () {
            let input = BigNumber('123456.7e-3');
            let expected = '0x7b.74ea4a8c154c985f06f7';
            assert.equal(TronWeb.toHex(input), expected);

            input = new BigNumber(89273674656);
            expected = '0x14c9202ba0';
            assert.equal(TronWeb.toHex(input), expected);

            input = BigNumber('23e89');
            expected = '0x1210c23ede2d38fed455e938516db71cfaf3ec4a1c8f3fa92f98a60000000000000000000000';
            assert.equal(TronWeb.toHex(input), expected);
        });

        it('should convert an object to an hex string', function () {
            let input = {address: 'TTRjVyHu1Lv3DjBPTgzCwsjCvsQaHKQcmN'};
            let expected = '0x7b2261646472657373223a225454526a56794875314c7633446a425054677a4377736a4376735161484b51636d4e227d';
            assert.equal(TronWeb.toHex(input), expected);

            input = [1, 2, 3];
            expected = '0x5b312c322c335d';
            assert.equal(TronWeb.toHex(input), expected);
        });

        it('should convert a string to hex', function () {
            let input = 'salamon';
            let expected = '0x73616c616d6f6e';
            assert.equal(TronWeb.toHex(input), expected);
            input = '';
            expected = '0x';
            assert.equal(TronWeb.toHex(input), expected);
            input = ' ';
            expected = '0x20';
            assert.equal(TronWeb.toHex(input), expected);
        });

        it('should leave an hex string as is', function () {
            let input = '0x73616c616d6f6e';
            let expected = '0x73616c616d6f6e';
            assert.equal(TronWeb.toHex(input), expected);
        });

        it('should convert a number to an hex string', function () {
            let input = 24354;
            let expected = '0x5f22';
            assert.equal(TronWeb.toHex(input), expected);

            input = -423e-2;
            expected = '-0x4.3ae147ae147ae147ae14';
            assert.equal(TronWeb.toHex(input), expected);
        });

        it('should throw an error if the value is not convertible', function () {

            assert.throws(() => {
                TronWeb.toHex(TronWeb)
            }, 'The passed value is not convertible to a hex string');
        });

    });

    describe("#toUtf8", function () {

        it("should convert an hex string to utf8", function () {

            let input = '0x73616c616d6f6e';
            let expected = 'salamon';
            assert.equal(TronWeb.toUtf8(input), expected);

        });

        it("should convert an hex string to utf8", function () {

            let input = '0xe69cbae6a2b0e58f8ae8a18ce4b89ae8aebee5a487';
            let expected = '机械及行业设备';
            assert.equal(TronWeb.toUtf8(input), expected);

        });

        it('should throw an error if the string is not a valid hex string in strict mode', function () {
            let input = 'salamon';

            assert.throws(() => {
                TronWeb.toUtf8(input, true)
            }, 'The passed value is not a valid hex string');
        });

    });

    describe("#fromUtf8", function () {

        it("should convert an utf-8 string to hex", function () {

            let input = 'salamon';
            let expected = '0x73616c616d6f6e';
            assert.equal(TronWeb.fromUtf8(input), expected);

            input = '机械及行业设备';
            expected = '0xe69cbae6a2b0e58f8ae8a18ce4b89ae8aebee5a487';
            assert.equal(TronWeb.fromUtf8(input), expected);

        });

        it('should throw an error if the utf-8 string is not a string', function () {
            assert.throws(() => {
                TronWeb.fromUtf8([])
            }, 'The passed value is not a valid utf-8 string');
        });

    });

    describe("#toAscii", function () {

        it("should convert a hex string to ascii", function () {

            let input = '0x73616c616d6f6e';
            let expected = 'salamon';
            assert.equal(TronWeb.toAscii(input), expected);

            input = '0xe69cbae6a2b0e58f8ae8a18ce4b89ae8aebee5a487';
            expected = 'æºæ¢°åè¡ä¸è®¾å¤';
            // 'f\u001c:f"0e\u000f\nh!\fd8\u001ah.>e$\u0007';
            assert.equal(TronWeb.toAscii(input), expected);
        });

        it('should throw an error if the string is not a valid hex string', function () {
            let input = 'salamon';
            assert.throws(() => {
                TronWeb.toAscii(input)
            }, 'The passed value is not a valid hex string');
        });

    });

    describe("#fromAscii", function () {

        it("should convert an ascii string to hex", function () {

            let input = 'salamon';
            let expected = '0x73616c616d6f6e';
            assert.equal(TronWeb.fromAscii(input), expected);

            input = 'æºæ¢°åè¡ä¸è®¾å¤';
            expected = '0xe69cbae6a2b0e58f8ae8a18ce4b89ae8aebee5a487';
            assert.equal(TronWeb.fromAscii(input), expected);
        });

        it('should throw an error if the utf-8 string is not a string', function () {
            let result;
            assert.throws(() => {
                TronWeb.fromAscii([])
            }, 'The passed value is not a valid utf-8 string');
        });

    });

    describe("#toBigNumber", function () {

        it("should convert a hex string to a bignumber", function () {

            let input = '0x73616c61';
            let expected = 1935764577;
            assert.equal(TronWeb.toBigNumber(input).toNumber(), expected);


        });

        it("should convert a number to a bignumber", function () {

            let input = 1935764577;
            let expected = 1935764577;

            assert.equal(TronWeb.toBigNumber(input).c[0], expected);
        });

        it("should convert a number string to a bignumber", function () {

            let input = '89384775883766237763193576457709388576373';
            let expected = [8938477588376, 62377631935764, 57709388576373];

            assert.equal(TronWeb.toBigNumber(input).c[0], expected[0]);
            assert.equal(TronWeb.toBigNumber(input).c[1], expected[1]);
            assert.equal(TronWeb.toBigNumber(input).c[2], expected[2]);
        });
    });

    describe("#toDecimal", function () {

        it("should convert a hex string to a number", function () {

            let input = '0x73616c61';
            let expected = 1935764577;
            assert.equal(TronWeb.toDecimal(input), expected);
        });

        it("should convert a number to a bignumber", function () {

            let input = 1935764577;
            let expected = 1935764577;

            assert.equal(TronWeb.toDecimal(input), expected);
        });

        it("should convert a number string to a bignumber", function () {

            let input = '89384775883766237763193576457709388576373';
            let expected = 8.938477588376623e+40;

            assert.equal(TronWeb.toDecimal(input), expected);
        });
    });

    describe("#fromDecimal", function () {

        it("should convert a number to an hex string to a number", function () {

            let input = 1935764577;
            let expected = '0x73616c61';
            assert.equal(TronWeb.fromDecimal(input), expected);
        });

        it("should convert a negative number to an hex string to a number", function () {

            let input = -1935764577;
            let expected = '-0x73616c61';
            assert.equal(TronWeb.fromDecimal(input), expected);
        });
    });


    describe("#toSun", function () {

        it("should convert some trx to sun", function () {

            let input = 324;
            let expected = 324e6;
            assert.equal(TronWeb.toSun(input), expected);
        });
    });


    describe("#fromSun", function () {
        it("should convert a negative number to an hex string to a number", function () {

            let input = 3245e6;
            let expected = 3245;
            assert.equal(TronWeb.fromSun(input), expected);
        });
    });

    describe("#isAddress", function () {
        it("should verify that a string is a valid base58 address", function () {

            let input = 'TYPG8VeuoVAh2hP7Vfw6ww7vK98nvXXXUG';
            assert.equal(TronWeb.isAddress(input), true);
        });

        it("should verify that a string is an invalid base58 address", function () {

            let input = 'TYPG8VeuoVAh2hP7Vfw6ww7vK98nvXXXUs';
            assert.equal(TronWeb.isAddress(input), false);

            input = 'TYPG8VeuoVAh2hP7Vfw6ww7vK98nvXXXUG89';
            assert.equal(TronWeb.isAddress(input), false);

            input = 'aYPG8VeuoVAh2hP7Vfw6ww7vK98nvXXXUG';
            assert.equal(TronWeb.isAddress(input), false);
        });

        it("should verify that a string is a valid hex address", function () {

            let input = '4165cfbd57fa4f20687b2c33f84c4f9017e5895d49';
            assert.equal(TronWeb.isAddress(input), true);
        });

        it("should verify that a string is an invalid base58 address", function () {

            let input = '0x65cfbd57fa4f20687b2c33f84c4f9017e5895d49';
            assert.equal(TronWeb.isAddress(input), false);

            input = '4165cfbd57fa4f20687b2c33f84c4f9017e589';
            assert.equal(TronWeb.isAddress(input), false);

            input = '4165cfbd57fa4f20687b2c33f84c4f9017e5895d4998';
            assert.equal(TronWeb.isAddress(input), false);
        });
    });

    describe("#createAccount", function () {
        it("should create a new account", async function () {
            const tronWeb = tronWebBuilder.createInstance();

            const newAccount = await TronWeb.createAccount();
            assert.equal(newAccount.privateKey.length, 64);
            assert.equal(newAccount.publicKey.length, 130);
            let address = tronWeb.address.fromPrivateKey(newAccount.privateKey);
            assert.equal(address, newAccount.address.base58);
            address = tronWeb.address.fromPrivateKey(newAccount.privateKey, true);
            assert.equal(address, newAccount.address.base58);
            // TODO The new accounts returns an uppercase address, while everywhere else we handle lowercase addresses. Maybe we should make it consistent and let createAccount returning a lowercase address
            assert.equal(tronWeb.address.toHex(address), newAccount.address.hex.toLowerCase());
        });
    });

    describe("#isConnected", function () {
        it("should verify that tronWeb is connected to nodes and event server", async function () {

            this.timeout(10000)

            const tronWeb = tronWebBuilder.createInstance();
            const isConnected = await tronWeb.isConnected();
            assert.isTrue(isConnected.fullNode);
            assert.isTrue(isConnected.solidityNode);
            if (!SUN_NETWORK) {  // As https://testhttpapi.tronex.io/healthcheck is 404
                assert.isTrue(isConnected.eventServer);
            }

        });
    });

    describe("#getEventsByTransactionID", async function () {

        let accounts
        let tronWeb
        let contractAddress
        let contract

        before(async function () {
            tronWeb = tronWebBuilder.createInstance();
            accounts = await tronWebBuilder.getTestAccounts(-1);

            const result = await broadcaster(tronWeb.transactionBuilder.createSmartContract({
                abi: [
                    {
                        "anonymous": false,
                        "inputs": [
                            {
                                "indexed": true,
                                "name": "_sender",
                                "type": "address"
                            },
                            {
                                "indexed": false,
                                "name": "_receiver",
                                "type": "address"
                            },
                            {
                                "indexed": false,
                                "name": "_amount",
                                "type": "uint256"
                            }
                        ],
                        "name": "SomeEvent",
                        "type": "event"
                    },
                    {
                        "constant": false,
                        "inputs": [
                            {
                                "name": "_receiver",
                                "type": "address"
                            },
                            {
                                "name": "_someAmount",
                                "type": "uint256"
                            }
                        ],
                        "name": "emitNow",
                        "outputs": [],
                        "payable": false,
                        "stateMutability": "nonpayable",
                        "type": "function"
                    }
                ],
                bytecode: "0x608060405234801561001057600080fd5b50610145806100206000396000f300608060405260043610610041576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063bed7111f14610046575b600080fd5b34801561005257600080fd5b50610091600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610093565b005b3373ffffffffffffffffffffffffffffffffffffffff167f9f08738e168c835bbaf7483705fb1c0a04a1a3258dd9687f14d430948e04e3298383604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a250505600a165627a7a7230582033629e2b0bba53f7b5c49769e7e360f2803ae85ac80e69dd61c7bb48f9f401f30029"
            }, accounts.hex[0]), accounts.pks[0])

            contractAddress = result.receipt.transaction.contract_address
            contract = await tronWeb.contract().at(contractAddress)

        });


        it('should emit an unconfirmed event and get it', async function () {

            this.timeout(60000)
            tronWeb.setPrivateKey(accounts.pks[1])
            let txId = await contract.emitNow(accounts.hex[2], 2000).send({
                from: accounts.hex[1]
            })
            let events
            while (true) {
                events = await tronWeb.getEventByTransactionID(txId)
                if (events.length) {
                    break
                }
                await wait(0.5)
            }

            assert.equal(events[0].result._receiver.substring(2), accounts.hex[2].substring(2))
            assert.equal(events[0].result._sender.substring(2), accounts.hex[1].substring(2))
            assert.equal(events[0].resourceNode, 'fullNode')

        })

    });

    describe("#getEventResult", async function () {

        let accounts
        let tronWeb
        let contractAddress
        let contract
        let eventLength = 0

        before(async function () {
            tronWeb = tronWebBuilder.createInstance();
            accounts = await tronWebBuilder.getTestAccounts(-1);

            const result = await broadcaster(tronWeb.transactionBuilder.createSmartContract({
                abi: [
                    {
                        "anonymous": false,
                        "inputs": [
                            {
                                "indexed": true,
                                "name": "_sender",
                                "type": "address"
                            },
                            {
                                "indexed": false,
                                "name": "_receiver",
                                "type": "address"
                            },
                            {
                                "indexed": false,
                                "name": "_amount",
                                "type": "uint256"
                            }
                        ],
                        "name": "SomeEvent",
                        "type": "event"
                    },
                    {
                        "constant": false,
                        "inputs": [
                            {
                                "name": "_receiver",
                                "type": "address"
                            },
                            {
                                "name": "_someAmount",
                                "type": "uint256"
                            }
                        ],
                        "name": "emitNow",
                        "outputs": [],
                        "payable": false,
                        "stateMutability": "nonpayable",
                        "type": "function"
                    }
                ],
                bytecode: "0x608060405234801561001057600080fd5b50610145806100206000396000f300608060405260043610610041576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063bed7111f14610046575b600080fd5b34801561005257600080fd5b50610091600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610093565b005b3373ffffffffffffffffffffffffffffffffffffffff167f9f08738e168c835bbaf7483705fb1c0a04a1a3258dd9687f14d430948e04e3298383604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a250505600a165627a7a7230582033629e2b0bba53f7b5c49769e7e360f2803ae85ac80e69dd61c7bb48f9f401f30029"
            }, accounts.hex[0]), accounts.pks[0])

            contractAddress = result.receipt.transaction.contract_address
            contract = await tronWeb.contract().at(contractAddress)

        });

        it('should emit an event and wait for it', async function () {

            this.timeout(60000)
            tronWeb.setPrivateKey(accounts.pks[3])
            await contract.emitNow(accounts.hex[4], 4000).send({
                from: accounts.hex[3]
            })
            eventLength++
            let events
            while (true) {
                events = await tronWeb.getEventResult(contractAddress, {
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

});

describe("#testTronGrid", function () {
    describe("#testTronGridApiKey", function () {
        it("should add the parameter TRON-PRO-API-KEY=Key to the header of the request", async function () {
            const tronWeb = tronWebBuilder.createInstance({
                fullHost: TEST_TRON_GRID_API,
                headers: { "TRON-PRO-API-KEY": TEST_TRON_HEADER_API_KEY },
            });

            assert.equal(
                tronWeb.fullNode.headers["TRON-PRO-API-KEY"],
                TEST_TRON_HEADER_API_KEY
            );
            assert.equal(
                tronWeb.eventServer.headers["TRON-PRO-API-KEY"],
                TEST_TRON_HEADER_API_KEY
            );

            const account = await tronWeb.trx.getAccount();
            assert.equal(typeof account, "object");

            const tx = await tronWeb.event.getEventsByContractAddress(
                tronWeb.defaultAddress.base58
            );
            assert.equal(typeof tx, "object");
        });

        it("should add the parameter TRON-PRO-API-KEY=Key to the header of the event request", async function () {
            const tronWeb = tronWebBuilder.createInstance({
                fullHost: TEST_TRON_GRID_API,
                headers: { "TRON-PRO-API-KEY": TEST_TRON_HEADER_API_KEY },
                eventHeaders: { "TRON-PRO-API-KEY": TEST_TRON_HEADER_API_KEY },
            });

            assert.equal(
                tronWeb.fullNode.headers["TRON-PRO-API-KEY"],
                TEST_TRON_HEADER_API_KEY
            );
            assert.equal(
                tronWeb.eventServer.headers["TRON-PRO-API-KEY"],
                TEST_TRON_HEADER_API_KEY
            );

            const account = await tronWeb.trx.getAccount();
            assert.equal(typeof account, "object");

            const tx = await tronWeb.event.getEventsByContractAddress(
                tronWeb.defaultAddress.base58
            );
            assert.equal(typeof tx, "object");
        });

        it("should set the parameter TRON-PRO-API-KEY=Key to the header of the request", async function () {
            const tronWeb = tronWebBuilder.createInstance({
                fullHost: TEST_TRON_GRID_API,
            });
            tronWeb.setHeader({ "TRON-PRO-API-KEY": TEST_TRON_HEADER_API_KEY });

            assert.equal(
                tronWeb.fullNode.headers["TRON-PRO-API-KEY"],
                TEST_TRON_HEADER_API_KEY
            );
            assert.equal(
                tronWeb.eventServer.headers["TRON-PRO-API-KEY"],
                TEST_TRON_HEADER_API_KEY
            );

            const account = await tronWeb.trx.getAccount();
            assert.equal(typeof account, "object");

            const tx = await tronWeb.event.getEventsByContractAddress(
                tronWeb.defaultAddress.base58
            );
            assert.equal(typeof tx, "object");
        });

        it("should set the parameter TRON-PRO-API-KEY=Key to the header of the fullNode request", async function () {
            const tronWeb = tronWebBuilder.createInstance({
                fullHost: TEST_TRON_GRID_API,
            });
            tronWeb.setFullNodeHeader({
                "TRON-PRO-API-KEY": TEST_TRON_HEADER_API_KEY,
            });

            assert.equal(
                tronWeb.fullNode.headers["TRON-PRO-API-KEY"],
                TEST_TRON_HEADER_API_KEY
            );
            assert.equal(
                tronWeb.eventServer.headers["TRON-PRO-API-KEY"],
                undefined
            );

            const account = await tronWeb.trx.getAccount();
            assert.equal(typeof account, "object");

            try {
                await tronWeb.event.getEventsByContractAddress(
                    tronWeb.defaultAddress.base58
                );
            } catch (error) {
                assert.equal(error.statusCode, 401);
            }
        });

        it("should set the parameter TRON-PRO-API-KEY=Key to the header of the event request", async function () {
            const tronWeb = tronWebBuilder.createInstance({
                fullHost: TEST_TRON_GRID_API,
            });
            tronWeb.setEventHeader({
                "TRON-PRO-API-KEY": TEST_TRON_HEADER_API_KEY,
            });

            assert.equal(
                tronWeb.fullNode.headers["TRON-PRO-API-KEY"],
                undefined
            );
            assert.equal(
                tronWeb.eventServer.headers["TRON-PRO-API-KEY"],
                TEST_TRON_HEADER_API_KEY
            );

            try {
                await tronWeb.trx.getAccount();
            } catch (error) {
                assert.equal(error.response.status, 401);
            }

            const tx = await tronWeb.event.getEventsByContractAddress(
                tronWeb.defaultAddress.base58
            );
            assert.equal(typeof tx, "object");
        });

        it("should set the valid key to the header of the request", async function () {
            const FAKE_KEY = "ABCEDF";
            const tronWeb = tronWebBuilder.createInstance({
                fullHost: TEST_TRON_GRID_API,
                headers: { "TRON-PRO-API-KEY": FAKE_KEY },
            });

            assert.equal(
                tronWeb.fullNode.headers["TRON-PRO-API-KEY"],
                FAKE_KEY
            );
            assert.equal(
                tronWeb.eventServer.headers["TRON-PRO-API-KEY"],
                FAKE_KEY
            );

            try {
                await tronWeb.trx.getAccount();
            } catch (error) {
                assert.equal(error.response.status, 401);
            }

            try {
                await tronWeb.event.getEventsByContractAddress(
                    tronWeb.defaultAddress.base58
                );
            } catch (error) {
                assert.equal(error.statusCode, 401);
            }
        });

        it("should set the valid key to the header of the fullnode request", async function () {
            const FAKE_KEY = "ABCEDF";
            const tronWeb = tronWebBuilder.createInstance({
                fullHost: TEST_TRON_GRID_API,
                headers: { "TRON-PRO-API-KEY": FAKE_KEY },
                eventHeaders: { "TRON-PRO-API-KEY": TEST_TRON_HEADER_API_KEY },
            });

            assert.equal(
                tronWeb.fullNode.headers["TRON-PRO-API-KEY"],
                FAKE_KEY
            );
            assert.equal(
                tronWeb.eventServer.headers["TRON-PRO-API-KEY"],
                TEST_TRON_HEADER_API_KEY
            );

            try {
                await tronWeb.trx.getAccount();
            } catch (error) {
                assert.equal(error.response.status, 401);
            }

            const tx = await tronWeb.event.getEventsByContractAddress(
                tronWeb.defaultAddress.base58
            );
            assert.equal(typeof tx, "object");
        });

        it("should set the valid key to the header of the event request", async function () {
            const FAKE_KEY = "ABCEDF";
            const tronWeb = tronWebBuilder.createInstance({
                fullHost: TEST_TRON_GRID_API,
                headers: { "TRON-PRO-API-KEY": TEST_TRON_HEADER_API_KEY },
                eventHeaders: { "TRON-PRO-API-KEY": FAKE_KEY },
            });

            assert.equal(
                tronWeb.fullNode.headers["TRON-PRO-API-KEY"],
                TEST_TRON_HEADER_API_KEY
            );
            assert.equal(
                tronWeb.eventServer.headers["TRON-PRO-API-KEY"],
                FAKE_KEY
            );

            const account = await tronWeb.trx.getAccount();
            assert.equal(typeof account, "object");

            try {
                await tronWeb.event.getEventsByContractAddress(
                    tronWeb.defaultAddress.base58
                );
            } catch (error) {
                assert.equal(error.statusCode, 401);
            }
        });
    });

    describe("#testTronGridJwtKey", function () {
        it("should add the parameter Authorization=Key to the header of the request", async function () {
            const token = jwt.sign(
                { aud: "trongrid.io" },
                TEST_TRON_HEADER_JWT_PRIVATE_KEY,
                {
                    header: {
                        alg: "RS256",
                        typ: "JWT",
                        kid: TEST_TRON_HEADER_JWT_ID,
                    },
                }
            );

            const tronWeb = tronWebBuilder.createInstance({
                fullHost: TEST_TRON_GRID_API,
                headers: {
                    "TRON-PRO-API-KEY": TEST_TRON_HEADER_API_JWT_KEY,
                    Authorization: `Bearer ${token}`,
                },
            });

            const account = await tronWeb.trx.getAccount();
            assert.equal(typeof account, "object");
        });

        it("should the valid exp to the payload of the sign", async function () {
            const token = jwt.sign(
                {
                    exp: 0,
                    aud: "trongrid.io",
                },
                TEST_TRON_HEADER_JWT_PRIVATE_KEY,
                {
                    header: {
                        alg: "RS256",
                        typ: "JWT",
                        kid: TEST_TRON_HEADER_JWT_ID,
                    },
                }
            );

            const tronWeb = tronWebBuilder.createInstance({
                fullHost: TEST_TRON_GRID_API,
                headers: {
                    "TRON-PRO-API-KEY": TEST_TRON_HEADER_API_JWT_KEY,
                    Authorization: `Bearer ${token}`,
                },
            });

            try {
                await tronWeb.trx.getAccount();
            } catch (error) {
                assert.equal(error.response.status, 401);
            }
        });
    });
});
