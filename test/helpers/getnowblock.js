
class GetNowBlock {

    constructor(tronWeb = false) {
        if (!tronWeb)
            throw new Error('Expected instance of TronWeb');

        this.tronWeb = tronWeb;
    }

    async getLatestBlock(callback = false) {

        if(!callback)
            return this.injectPromise(this.getCurrentBlock);

        this.tronWeb.fullNode.request('wallet/getnowblock').then(block => {
            block.fromPlugin = true
            callback(null, block);
        }).catch(err => callback(err));
    }

    pluginInterface() {
        return {
            supportedVersions: '^2.2.2',
            packages: {
                trx: {
                    getCurrentBlock: this.getLatestBlock
                }
            }
        }
    }
}

module.exports = GetNowBlock
