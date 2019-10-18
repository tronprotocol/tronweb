const chai = require('chai');
const {FULL_NODE_API} = require('../helpers/config');
const assertThrow = require('../helpers/assertThrow');
const tronWebBuilder = require('../helpers/tronWebBuilder');
const TronWeb = tronWebBuilder.TronWeb;
const GetNowBlock = require('../helpers/GetNowBlock');
const BlockLib = require('../helpers/BlockLib');
const jlog = require('../helpers/jlog')

const assert = chai.assert;

describe('TronWeb.lib.plugin', async function () {

    let tronWeb;

    before(async function () {
        tronWeb = tronWebBuilder.createInstance();
    });

    describe('#constructor()', function () {

        it('should have been set a full instance in tronWeb', function () {

            assert.instanceOf(tronWeb.plugin, TronWeb.Plugin);
        });

    });

    describe("#plug GetNowBlock into tronWeb.trx", async function () {

        it('should register the plugin GetNowBlock', async function () {

            const someParameter = 'someValue'

            let result = tronWeb.plugin.register(GetNowBlock, {
                someParameter
            })
            assert.isTrue(result.skipped.includes('_parseToken'))
            assert.isTrue(result.plugged.includes('getCurrentBlock'))
            assert.isTrue(result.plugged.includes('getLatestBlock'))

            result = await tronWeb.trx.getCurrentBlock()
            assert.isTrue(result.fromPlugin)
            assert.equal(result.blockID.length, 64)
            assert.isTrue(/^00000/.test(result.blockID))

            result = await tronWeb.trx.getSomeParameter()
            assert.equal(result, someParameter)

        })

    });

    describe("#plug BlockLib into tronWeb at first level", async function () {

        it('should register the plugin and call a method using a promise', async function () {

            let result = tronWeb.plugin.register(BlockLib)
            assert.equal(result.libs[0], 'BlockLib')
            result = await tronWeb.blockLib.getCurrent()
            assert.isTrue(result.fromPlugin)
            assert.equal(result.blockID.length, 64)
            assert.isTrue(/^00000/.test(result.blockID))

        })

        it('should register and call a method using callbacks', async function () {

            tronWeb.plugin.register(BlockLib)
            return new Promise(resolve => {
                tronWeb.blockLib.getCurrent((err, result) => {
                    assert.isTrue(result.fromPlugin)
                    assert.equal(result.blockID.length, 64)
                    assert.isTrue(/^00000/.test(result.blockID))
                    resolve()
                })
            })
        })

        it('should not register if tronWeb is instantiated with the disablePlugins option', async function () {

            let tronWeb2 = tronWebBuilder.createInstance({disablePlugins: true});
            let result = tronWeb2.plugin.register(BlockLib);
            assert.isTrue(typeof result.error === 'string');

        })


    });

});
