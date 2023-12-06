import { TronWeb } from '../setup/TronWeb.js';

export default class BlockLib {
    tronWeb: TronWeb;
    constructor(tronWeb: TronWeb) {
        if (!tronWeb) throw new Error('Expected instances of TronWeb and utils');
        this.tronWeb = tronWeb;
    }

    async getCurrent() {
        const block: any = await this.tronWeb.fullNode.request('wallet/getnowblock');
        block.fromPlugin = true;
        return block;
    }

    pluginInterface() {
        return {
            requires: '^6.0.0-beta.0',
            fullClass: true,
        };
    }
}
