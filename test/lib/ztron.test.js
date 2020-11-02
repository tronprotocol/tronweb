const chai = require('chai');
const assert = chai.assert;

const assertThrow = require('../helpers/assertThrow');
const tronWebBuilder = require('../helpers/tronWebBuilder');
const wait = require('../helpers/wait');


const TronWeb = tronWebBuilder.TronWeb;

describe("Tronweb.ztron", function (){

    let tronWeb;
    const keysInfo = {};

    before(async function () {
        tronWeb = tronWebBuilder.createInstance({
            fullNode: 'https://api.nileex.io/',
            solidityNode: 'https://api.nileex.io/'
        });
    });

    describe('#constructor()', function () {

        it('should have been set a full instance in tronWeb', function () {

            assert.instanceOf(tronWeb.ztron, TronWeb.ZTron);
        });

    });

    describe('#getspendingkey', function (){
        it('should get a value', async function (){
            const spendingKeyInfo = await tronWeb.ztron.getSpendingKey();
            assert.ok(spendingKeyInfo.value);
            assert.strictEqual(spendingKeyInfo.value.length, 64);
            keysInfo.spendingKey = spendingKeyInfo.value
        })
    });

    describe("#getExpandedSpendingKey", function (){
        it('should get spending keys with the spendingKey', async function (){
            // const spendingKeyInfo = await tronWeb.ztron.getSpendingKey();
            const result  = await tronWeb.ztron.getExpandedSpendingKey(keysInfo.spendingKey);
            assert.ok(result.ask);
            assert.ok(result.nsk);
            assert.ok(result.ovk);
            assert.strictEqual(result.ask.length, 64);
            assert.strictEqual(result.nsk.length, 64);
            assert.strictEqual(result.ovk.length, 64);
            keysInfo.ask = result.ask;
            keysInfo.nsk = result.nsk;
            keysInfo.ovk = result.ovk;
        })

        it('should throw if The length of spendingKey is not equal to 64', async function (){
            const result = await tronWeb.ztron.getExpandedSpendingKey('0d1fd0aa0cca9f74eac4b542b62ec36ab84263534dae8814c69210180d3d49');
            assert.ok(result.Error.indexOf('string should be 64') !== -1)
            // await assertThrow(
            //     tronWeb.ztron.getExpandedSpendingKey('0d1fd0aa0cca9f74eac4b542b62ec36ab84263534dae8814c69210180d3d49'),
            //     null,
            //     'the length of spendingKey\'s hex string should be 64'
            // )
        })

        it('should throw if spendingKey is null.', async function (){
            await assertThrow(
                tronWeb.ztron.getExpandedSpendingKey(null),
                'Invalid spending key provided'
            )
        })

        it('should throw if spendingKey is undefined.', async function (){
            await assertThrow(
                tronWeb.ztron.getExpandedSpendingKey(undefined),
                'Invalid spending key provided'
            )
        })

        it('should throw if spendingKey is empty string.', async function (){
            await assertThrow(
                tronWeb.ztron.getExpandedSpendingKey(''),
                'Invalid spending key provided'
            )
        })

    })

    describe("#getAkFromAsk", function (){

        it('should get ak value with ask', async function (){
            const result = await tronWeb.ztron.getAkFromAsk(keysInfo.ask);
            assert.ok(result.value);
            assert.strictEqual(result.value.length, 64);
            keysInfo.ak = result.value;
        })

        it('should throw if The length of ask is not equal to 64', async function (){
            const result = await tronWeb.ztron.getAkFromAsk('f1549d4a039140b07d0400cd0442be994bd16b9269b225eb75d1b6d334');
            assert.ok(result.Error.indexOf('string should be 64') !== -1)
            // await assertThrow(
            //     tronWeb.ztron.getAkFromAsk('f1549d4a039140b07d0400cd0442be994bd16b9269b225eb75d1b6d334'),
            //     null,
            //     'the length of ask\'s hex string should be 64'
            // )
        })

        it('should throw if ask is null.', async function (){
            await assertThrow(
                tronWeb.ztron.getAkFromAsk(null),
                'Invalid ask provided'
            )
        })

        it('should throw if ask is undefined.', async function (){
            await assertThrow(
                tronWeb.ztron.getAkFromAsk(undefined),
                'Invalid ask provided'
            )
        })

        it('should throw if ask is empty string.', async function (){
            await assertThrow(
                tronWeb.ztron.getAkFromAsk(''),
                'Invalid ask provided'
            )
        })
    })

    describe("#getNkFromNsk", function (){

        it('should get nk value with nsk', async function (){
            const result = await tronWeb.ztron.getNkFromNsk(keysInfo.nsk);
            assert.ok(result.value);
            assert.strictEqual(result.value.length, 64);
            keysInfo.nk = result.value;
        })

        it('should throw if The length of nsk is not equal to 64', async function (){
            const result = await tronWeb.ztron.getNkFromNsk('ebaff02009978d74731bc81e08012927da1aaa6564f18d7');
            assert.ok(result.Error.indexOf('string should be 64') !== -1)
            // await assertThrow(
            //     tronWeb.ztron.getNkFromNsk('ebaff02009978d74731bc81e08012927da1aaa6564f18d7'),
            //     null,
            //     'the length of nsk\'s hex string should be 64'
            // )
        })

        it('should throw if nsk is null.', async function (){
            await assertThrow(
                tronWeb.ztron.getNkFromNsk(null),
                'Invalid nsk provided'
            )
        })

        it('should throw if nsk is undefined.', async function (){
            await assertThrow(
                tronWeb.ztron.getNkFromNsk(undefined),
                'Invalid nsk provided'
            )
        })

        it('should throw if nsk is empty string.', async function (){
            await assertThrow(
                tronWeb.ztron.getNkFromNsk(''),
                'Invalid nsk provided'
            )
        })
    })

    describe("#getDiversifier", function (){
        it('should get a value', async function (){
            const result = await tronWeb.ztron.getDiversifier();
            assert.ok(result.d);
            keysInfo.d = result.d
        })
    })

    describe("#getIncomingViewingKey", function (){
        it('should get ivk', async function (){
            const result = await tronWeb.ztron.getIncomingViewingKey(keysInfo.ak, keysInfo.nk);
            assert.ok(result.ivk);
            assert.strictEqual(result.ivk.length, 64);
            keysInfo.ivk = result.ivk;
        })

        it('should throw if ak is empty string', async function (){
            await assertThrow(
                tronWeb.ztron.getIncomingViewingKey('', keysInfo.nk),
                'Invalid ak provided'
            )
        })

        it('should throw if ak provides an irregular length', async function (){
            const result = await tronWeb.ztron.getIncomingViewingKey(keysInfo.ak.slice(0, 10), keysInfo.nk);
            assert.ok(result.Error.indexOf('param length must be 32') !== -1)
        })


        it('should throw if nk is empty string', async function (){
            await assertThrow(
                tronWeb.ztron.getIncomingViewingKey(keysInfo.ak, ''),
                'Invalid nk provided'
            )
        })

        it('should throw if nk provides an irregular length', async function (){
            const result = await tronWeb.ztron.getIncomingViewingKey(keysInfo.ak, keysInfo.nk.slice(0, 10));
            assert.ok(result.Error.indexOf('param length must be 32') !== -1)
        })
    })

    describe("#getZenPaymentAddress", function (){
        it('should get paymentAddress', async function (){
            const result = await tronWeb.ztron.getZenPaymentAddress(keysInfo.ivk, keysInfo.d);
            assert.ok(result.payment_address && result.pkD);
            keysInfo.pkD = result.pkD;
            keysInfo.payment_address = result.payment_address;
        })

        it('should throw if The length of ivk does not match the rules', async function (){
            const result = await tronWeb.ztron.getZenPaymentAddress(keysInfo.ivk.slice(0, 10), keysInfo.d);
            assert.ok(result.Error.indexOf('param length must be 32') !== -1);
        })

        it('should throw if an invalid d is passed', async function (){
            const result = await tronWeb.ztron.getZenPaymentAddress(keysInfo.ivk, '52a2416b346f416ed75049');
            assert.ok(result.Error.indexOf('d is not valid') !== -1);
        })

        it('should throw if ivk is an empty string', async function (){
            await assertThrow(
                tronWeb.ztron.getZenPaymentAddress('', keysInfo.d),
                'Invalid ivk provided'
            )
        })

        it('should throw if d is an empty string', async function (){
            await assertThrow(
                tronWeb.ztron.getZenPaymentAddress(keysInfo.ivk, ''),
                'Invalid d provided'
            )
        })
    })

    describe("#getRcm", function (){
        it('should get rcm value', async function (){
            const result = await tronWeb.ztron.getRcm();
            assert.ok(result.value);
            assert.strictEqual(result.value.length, 64);
            keysInfo.rcm = result.value
        })
    })

    describe("#getNewShieldedAddress", function (){
        it('should get shieldedAddress value', async function () {
            const result = await tronWeb.ztron.getNewShieldedAddress();
            assert.ok(result.ask && result.sk && result.nsk && result.ovk
                && result.ak && result.nk && result.ivk && result.d && result.pkD && result.payment_address);
        })
    })

    describe("#createSpendAuthSig", function (){

    })
})
