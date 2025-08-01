import { assert } from 'chai';
import tronWebBuilder from '../helpers/tronWebBuilder.js';
import { BigNumber } from 'bignumber.js';

describe('TronWeb.utils', function () {
    describe('#isValidURL()', function () {
        it('should verify good urls', function () {
            const tronWeb = tronWebBuilder.createInstance();

            assert.isTrue(tronWeb.utils.isValidURL('https://some.example.com:9090/casa?qe=3'));
            assert.isTrue(tronWeb.utils.isValidURL('www.example.com/welcome'));

            assert.isTrue(tronWeb.utils.isValidURL('http:/some.example.com'));
        });
    });

    describe('#isArray()', function () {
        it('should verify that a value is an array', function () {
            const tronWeb = tronWebBuilder.createInstance();

            assert.isTrue(tronWeb.utils.isArray([]));
            assert.isTrue(tronWeb.utils.isArray([[2], { a: 3 }]));

            assert.isFalse(tronWeb.utils.isArray({}));
            assert.isFalse(tronWeb.utils.isArray('Array'));
        });
    });

    describe('#isJson()', function () {
        it('should verify that a value is a JSON string', function () {
            const tronWeb = tronWebBuilder.createInstance();

            assert.isTrue(tronWeb.utils.isJson('[]'));
            assert.isTrue(tronWeb.utils.isJson('{"key":"value"}'));
            assert.isTrue(tronWeb.utils.isJson('"json"'));

            assert.isFalse(tronWeb.utils.isJson('json'));
        });
    });

    describe('#isBoolean()', function () {
        it('should verify that a value is a JSON string', function () {
            const tronWeb = tronWebBuilder.createInstance();

            assert.isTrue(tronWeb.utils.isBoolean(true));
            // @ts-ignore
            assert.isTrue(tronWeb.utils.isBoolean('a' == []));

            assert.isFalse(tronWeb.utils.isBoolean({}));
            assert.isFalse(tronWeb.utils.isBoolean('json'));
        });
    });

    describe('#isBigNumber()', function () {
        it('should verify that a value is a JSON string', function () {
            const tronWeb = tronWebBuilder.createInstance();

            const bigNumber = new BigNumber('1234565432123456778765434456777');

            assert.isTrue(tronWeb.utils.isBigNumber(bigNumber));

            assert.isFalse(tronWeb.utils.isBigNumber('0x09e80f665949b63b39f3850127eb29b55267306b69e2104c41c882e076524a1c'));
            assert.isFalse(tronWeb.utils.isBigNumber({}));
            assert.isFalse(tronWeb.utils.isBigNumber('json'));
        });
    });

    describe('#isString()', function () {
        it('should verify that a valyue is a string', function () {
            const tronWeb = tronWebBuilder.createInstance();

            assert.isTrue(tronWeb.utils.isString('str'));
            assert.isTrue(tronWeb.utils.isString((13).toString()));

            assert.isFalse(tronWeb.utils.isString(2));
        });
    });

    describe('#isFunction()', function () {
        it('should verify that a value is a function', function () {
            const tronWeb = tronWebBuilder.createInstance();

            assert.isTrue(tronWeb.utils.isFunction(new Function()));
            assert.isTrue(tronWeb.utils.isFunction(() => {}));
            assert.isTrue(tronWeb.utils.isFunction(tronWeb.utils.isFunction));

            assert.isFalse(tronWeb.utils.isFunction({ function: new Function() }));
        });
    });

    describe('#isHex()', function () {
        it('should verify that a string is an hex string', function () {
            const tronWeb = tronWebBuilder.createInstance();

            let input = '0x1';
            let expected = true;
            assert.equal(tronWeb.utils.isHex(input), expected);

            input = '0x0';
            expected = true;
            assert.equal(tronWeb.utils.isHex(input), expected);

            input = '0x73616c616d6f6e';
            expected = true;
            assert.equal(tronWeb.utils.isHex(input), expected);

            input = '73616c616d6f';
            expected = true;
            assert.equal(tronWeb.utils.isHex(input), expected);

            input = '0x73616c616d6fsz';
            expected = false;
            assert.equal(tronWeb.utils.isHex(input), expected);

            input = 'x898989';
            expected = false;
            assert.equal(tronWeb.utils.isHex(input), expected);
        });
    });

    describe('#isInteger()', function () {
        it('should verify that a value is an integer', function () {
            const tronWeb = tronWebBuilder.createInstance();

            assert.isTrue(tronWeb.utils.isInteger(2345434));
            assert.isTrue(tronWeb.utils.isInteger(-234e4));

            assert.isFalse(tronWeb.utils.isInteger(3.4));
            assert.isFalse(tronWeb.utils.isInteger('integer'));
        });
    });

    describe('#hasProperty()', function () {
        it('should verify that an object has a specific property', function () {
            const tronWeb = tronWebBuilder.createInstance();

            assert.isTrue(tronWeb.utils.hasProperty({ p: 2 }, 'p'));
            assert.isFalse(tronWeb.utils.hasProperty([{ p: 2 }], 'p'));

            assert.isFalse(tronWeb.utils.hasProperty({ a: 2 }, 'p'));
        });
    });

    describe('#hasProperties()', function () {
        it('should verify that an object has some specific properties', function () {
            const tronWeb = tronWebBuilder.createInstance();

            assert.isTrue(tronWeb.utils.hasProperties({ p: 2, s: 2 }, 'p', 's'));

            assert.isFalse(tronWeb.utils.hasProperties({ p: 2, s: 2 }, 'p', 'q'));
        });
    });

    describe.skip('#mapEvent()', function () {
        it('should map an event result', function () {
            const tronWeb = tronWebBuilder.createInstance();

            const event = {
                block_number: 'blockNumber',
                block_timestamp: 'blockTimestamp',
                contract_address: 'contractAddress',
                event_name: 'eventName',
                transaction_id: 'transactionId',
                result: 'result',
                resource_Node: 'resourceNode',
            };

            const expected = {
                block: 'blockNumber',
                timestamp: 'blockTimestamp',
                contract: 'contractAddress',
                name: 'eventName',
                transaction: 'transactionId',
                result: 'result',
                resourceNode: 'resourceNode',
            };

            // @ts-ignore
            const mapped = tronWeb.utils.mapEvent(event);
            for (let key in mapped) {
                // @ts-ignore
                assert.equal(mapped[key], expected[key]);
            }
        });
    });

    describe('#parseEvent', function () {
        // TODO
    });

    describe('#padLeft()', function () {
        it('should return the pad left of a string', function () {
            const tronWeb = tronWebBuilder.createInstance();

            assert.equal(tronWeb.utils.padLeft('09e80f', '0', 12), '00000009e80f');
            // assert.equal(tronWeb.utils.padLeft(new Function, '0', 32), '0000000function anonymous() {\n\n}');
            assert.equal(tronWeb.utils.padLeft(3.4e3, '0', 12), '000000003400');
        });
    });

    describe('#ethersUtils()', function () {
        it('should import sha256 from ethers and has a string', function () {
            const tronWeb = tronWebBuilder.createInstance();

            const string = '0x' + Buffer.from('some string').toString('hex');
            const hash = tronWeb.utils.ethersUtils.sha256(string);

            assert.equal(hash, '0x61d034473102d7dac305902770471fd50f4c5b26f6831a56dd90b5184b3c30fc');
        });

        it('should import sha512 from ethers and has a string', function () {
            const tronWeb = tronWebBuilder.createInstance();

            const string = '0x' + Buffer.from('some string').toString('hex');
            const hash = tronWeb.utils.ethersUtils.sha512(string);

            assert.equal(hash, '0x14925e01a7a0cf0801aa95fe52d542b578af58ae7997ada66db3a6eae68a329d50600a5b7b442eabf4ea77ea8ef5fe40acf2ab31d47311b2a232c4f64009aac1');
        });

        it('should import pbkdf2 from ethers and has a string', function () {
            const tronWeb = tronWebBuilder.createInstance();

            const password = tronWeb.fromUtf8('123456');
            const salt = tronWeb.fromUtf8('test pbkdf2');
            const iterations = 10;
            const keylen = 10;
            const hash = tronWeb.utils.ethersUtils.pbkdf2(password, salt, iterations, keylen, 'sha512');

            assert.equal(hash, '0xac05a525426c7ae8385f');
        });
    });
});
