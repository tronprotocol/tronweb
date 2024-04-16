import { assert } from 'chai';
import tronWebBuilder from '../helpers/tronWebBuilder.js';
import { TronWeb, Plugin, Trx } from '../setup/TronWeb.js';
import GetNowBlock from '../helpers/GetNowBlock.js';
import BlockLib from '../helpers/BlockLib.js';
import { Block } from '../../src/types/APIResponse';

declare namespace globalThis {
    interface MyTronWeb1 extends TronWeb {
        trx: {
            getCurrentBlock(): Promise<Block & { fromPlugin: true }>;
            getLatestBlock(): Promise<Block & { fromPlugin: true }>;
            getSomeParameter(): any;
        } & Trx;
    }

    interface MyTronWeb2 extends TronWeb {
        blockLib: {
            getCurrent(): Promise<Block & { fromPlugin: true }>;
        }
    }
}

describe('TronWeb.lib.plugin', async function () {
    let tronWeb: TronWeb;

    before(async function () {
        tronWeb = tronWebBuilder.createInstance();
    });

    describe('#constructor()', function () {
        it('should have been set a full instance in tronWeb', function () {
            assert.instanceOf(tronWeb.plugin, Plugin);
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

            const result2 = await (tronWeb as globalThis.MyTronWeb1).trx.getCurrentBlock();
            assert.isTrue(result2.fromPlugin);
            assert.equal(result2.blockID.length, 64);
            assert.isTrue(/^00000/.test(result2.blockID));

            const result3 = await (tronWeb as globalThis.MyTronWeb1).trx.getSomeParameter();
            assert.equal(result3, someParameter);
        });
    });

    describe('#plug BlockLib into tronWeb at first level', async function () {
        it('should register the plugin and call a method', async function () {
            const result = tronWeb.plugin.register(BlockLib);
            assert.equal(result.libs[0], 'BlockLib');
            const result2 = await (tronWeb as globalThis.MyTronWeb2).blockLib.getCurrent();
            assert.isTrue(result2.fromPlugin);
            assert.equal(result2.blockID.length, 64);
            assert.isTrue(/^00000/.test(result2.blockID));
        });

        it('should not register if tronWeb is instantiated with the disablePlugins option', async function () {
            let tronWeb2 = tronWebBuilder.createInstance({ disablePlugins: true });
            let result = tronWeb2.plugin.register(BlockLib);
            assert.isTrue(typeof result.error === 'string');
        });
    });
});
