const chai = require('chai');
const {ADDRESS_HEX, ADDRESS_BASE58, FULL_NODE_API, SOLIDITY_NODE_API, EVENT_API, PRIVATE_KEY} = require('./helpers/config').constants;
const tronWebBuilder = require('./helpers/tronWebBuilder');
const TronWeb = tronWebBuilder.TronWeb;
const log = require('./helpers/log')
const BigNumber = require ('bignumber.js');

const assert = chai.assert;
const HttpProvider = TronWeb.providers.HttpProvider;

describe('TronWeb Instance', function () {

    describe('#constructor()', function () {
        it('should create a full instance', function () {
            const tronWeb = tronWebBuilder.createInstance();
            assert.instanceOf(tronWeb, TronWeb);
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
                tronWebBuilder.createInstance().setFullNode('test')
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
                tronWebBuilder.createInstance().setSolidityNode('test')
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
                tronWeb.setEventServer('test')
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

            assert.equal(providers.fullNode.host, FULL_NODE_API);
            assert.equal(providers.solidityNode.host, SOLIDITY_NODE_API);
            assert.equal(providers.eventServer.host, EVENT_API);
        });
    });

    describe('#currentProvider()', function () {
        it('should return the current providers', function () {
            const tronWeb = tronWebBuilder.createInstance();
            const providers = tronWeb.currentProvider();

            assert.equal(providers.fullNode.host, FULL_NODE_API);
            assert.equal(providers.solidityNode.host, SOLIDITY_NODE_API);
            assert.equal(providers.eventServer.host, EVENT_API);
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
            let input = { address: 'TTRjVyHu1Lv3DjBPTgzCwsjCvsQaHKQcmN'};
            let expected = '0x7b2261646472657373223a225454526a56794875314c7633446a425054677a4377736a4376735161484b51636d4e227d';
            assert.equal(TronWeb.toHex(input), expected);

            input = [1,2,3];
            expected = '0x5b312c322c335d';
            assert.equal(TronWeb.toHex(input), expected);
        });

        it('should convert a string to hex', function () {
            let input = 'salamon';
            let expected = '0x73616c616d6f6e';
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
            let result;
            try {
                result = TronWeb.toHex(TronWeb);
            } catch(err) {
                assert.equal(err.message, 'The passed value is not convertible to a hex string');
            }
            assert.isUndefined(result);
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

        it('should throw an error if the string is not a valid hex string', function () {
            let input = 'salamon';
            let result;
            try {
                result = TronWeb.toUtf8(input);
            } catch(err) {
                assert.equal(err.message, 'The passed value is not a valid hex string');
            }
            assert.isUndefined(result);
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
            let result;
            try {
                result = TronWeb.fromUtf8([]);
            } catch(err) {
                assert.equal(err.message, 'The passed value is not a valid utf-8 string');
            }
            assert.isUndefined(result);
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
            let result;
            try {
                result = TronWeb.toAscii(input);
            } catch(err) {
                assert.equal(err.message, 'The passed value is not a valid hex string');
            }
            assert.isUndefined(result);
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
            try {
                result = TronWeb.fromAscii([]);
            } catch(err) {
                assert.equal(err.message, 'The passed value is not a valid utf-8 string');
            }
            assert.isUndefined(result);
        });

    });

});
