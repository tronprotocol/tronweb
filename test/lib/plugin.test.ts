import { assert } from 'chai';
import tronWebBuilder from '../helpers/tronWebBuilder.js';
import { TronWeb } from '../setup/TronWeb.js';
import GetNowBlock from '../helpers/GetNowBlock.js';
import BlockLib from '../helpers/BlockLib.js';

describe('TronWeb.lib.plugin', async function () {
    let tronWeb: TronWeb;

    before(async function () {
        tronWeb = tronWebBuilder.createInstance();
    });

    describe('#constructor()', function () {
        it('should have been set a full instance in tronWeb', function () {
            assert.instanceOf(tronWeb.plugin, TronWeb.Plugin);
        });
    });

    describe('#plug GetNowBlock into tronWeb.trx', async function () {
        it('should register the plugin GetNowBlock', async function () {
            const someParameter = 'someValue';

            let result = tronWeb.plugin.register(GetNowBlock, {
                someParameter,
            });
            assert.isTrue(result.skipped.includes('_parseToken'));
            assert.isTrue(result.plugged.includes('getCurrentBlock'));
            assert.isTrue(result.plugged.includes('getLatestBlock'));

            const result2: any = await tronWeb.trx.getCurrentBlock();
            assert.isTrue(result2.fromPlugin);
            assert.equal(result2.blockID.length, 64);
            assert.isTrue(/^00000/.test(result2.blockID));

            // @ts-ignore
            const result3: any = await tronWeb.trx.getSomeParameter();
            assert.equal(result3, someParameter);
        });
    });

    describe('#plug BlockLib into tronWeb at first level', async function () {
        it('should register the plugin and call a method', async function () {
            let result: any = tronWeb.plugin.register(BlockLib);
            assert.equal(result.libs[0], 'BlockLib');
            // @ts-ignore
            result = await tronWeb.blockLib.getCurrent();
            assert.isTrue(result.fromPlugin);
            assert.equal(result.blockID.length, 64);
            assert.isTrue(/^00000/.test(result.blockID));
        });

        it('should not register if tronWeb is instantiated with the disablePlugins option', async function () {
            let tronWeb2 = tronWebBuilder.createInstance({ disablePlugins: true });
            let result = tronWeb2.plugin.register(BlockLib);
            assert.isTrue(typeof result.error === 'string');
        });
    });
});
