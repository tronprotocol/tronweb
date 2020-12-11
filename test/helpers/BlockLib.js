
const injectPromise = require('injectpromise')

class BlockLib {

    constructor(accWeb = false) {
        if (!accWeb)
            throw new Error('Expected instances of AccWeb and utils');
        this.accWeb = accWeb;
        this.injectPromise = injectPromise(this);
    }

    async getCurrent(callback = false) {

        if (!callback)
            return this.injectPromise(this.getCurrent);

        this.accWeb.fullNode.request('wallet/getnowblock').then(block => {
            block.fromPlugin = true
            callback(null, block);
        }).catch(err => callback(err));
    }

    pluginInterface() {
        return {
            requires: '^3.0.0',
            fullClass: true
        }
    }
}

module.exports = BlockLib
