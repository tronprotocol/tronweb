const chai = require('chai');
const {FULL_NODE_API} = require('../helpers/config');
const assertThrow = require('../helpers/assertThrow');
const accWebBuilder = require('../helpers/accWebBuilder');
const AccWeb = accWebBuilder.AccWeb;
const GetNowBlock = require('../helpers/GetNowBlock');
const BlockLib = require('../helpers/BlockLib');
const jlog = require('../helpers/jlog')

const assert = chai.assert;

describe('AccWeb.lib.plugin', async function () {

    let accWeb;

    before(async function () {
        accWeb = accWebBuilder.createInstance();
    });

    describe('#constructor()', function () {

        it('should have been set a full instance in accWeb', function () {

            assert.instanceOf(accWeb.plugin, AccWeb.Plugin);
        });

    });

    describe("#plug GetNowBlock into accWeb.trx", async function () {

        it('should register the plugin GetNowBlock', async function () {

            const someParameter = 'someValue'

            let result = accWeb.plugin.register(GetNowBlock, {
                someParameter
            })
            assert.isTrue(result.skipped.includes('_parseToken'))
            assert.isTrue(result.plugged.includes('getCurrentBlock'))
            assert.isTrue(result.plugged.includes('getLatestBlock'))

            result = await accWeb.trx.getCurrentBlock()
            assert.isTrue(result.fromPlugin)
            assert.equal(result.blockID.length, 64)
            assert.isTrue(/^00000/.test(result.blockID))

            result = await accWeb.trx.getSomeParameter()
            assert.equal(result, someParameter)

        })

    });

    describe("#plug BlockLib into accWeb at first level", async function () {

        it('should register the plugin and call a method using a promise', async function () {

            let result = accWeb.plugin.register(BlockLib)
            assert.equal(result.libs[0], 'BlockLib')
            result = await accWeb.blockLib.getCurrent()
            assert.isTrue(result.fromPlugin)
            assert.equal(result.blockID.length, 64)
            assert.isTrue(/^00000/.test(result.blockID))

        })

        it('should register and call a method using callbacks', async function () {

            accWeb.plugin.register(BlockLib)
            return new Promise(resolve => {
                accWeb.blockLib.getCurrent((err, result) => {
                    assert.isTrue(result.fromPlugin)
                    assert.equal(result.blockID.length, 64)
                    assert.isTrue(/^00000/.test(result.blockID))
                    resolve()
                })
            })
        })

        it('should not register if accWeb is instantiated with the disablePlugins option', async function () {

            let accWeb2 = accWebBuilder.createInstance({disablePlugins: true});
            let result = accWeb2.plugin.register(BlockLib);
            assert.isTrue(typeof result.error === 'string');

        })


    });

});
