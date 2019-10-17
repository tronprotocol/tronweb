
const injectPromise = require('injectpromise')

class BlockLib {

    constructor(tronWeb = false) {
        if (!tronWeb)
            throw new Error('Expected instances of TronWeb and utils');
        this.tronWeb = tronWeb;
        this.injectPromise = injectPromise(this);
    }

    async getCurrent(callback = false) {

        if (!callback)
            return this.injectPromise(this.getCurrent);

        this.tronWeb.fullNode.request('wallet/getnowblock').then(block => {
            block.fromPlugin = true
            callback(null, block);
        }).catch(err => callback(err));
    }

    pluginInterface() {
        return {
            requires: '^2.8.0',
            fullClass: true
        }
    }
}

module.exports = BlockLib
