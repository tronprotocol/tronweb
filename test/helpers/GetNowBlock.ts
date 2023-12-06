import { TronWeb } from '../setup/TronWeb.js';

let someParameter: any;

export default class GetNowBlock {
    tronWeb: TronWeb;
    constructor(tronWeb: TronWeb) {
        if (!tronWeb) throw new Error('Expected instance of TronWeb');

        this.tronWeb = tronWeb;
    }

    async someMethod() {
        const block: any = await this.tronWeb.fullNode.request('wallet/getnowblock');
        block.fromPlugin = true;
        return block;
    }

    getSomeParameter() {
        return someParameter;
    }

    pluginInterface(options: any) {
        if (options.someParameter) {
            someParameter = options.someParameter;
        }
        return {
            requires: '^6.0.0-beta.0',
            components: {
                trx: {
                    // will be overridden
                    getCurrentBlock: this.someMethod,

                    // will be added
                    getLatestBlock: this.someMethod,
                    getSomeParameter: this.getSomeParameter,

                    // will be skipped
                    _parseToken: function () {
                        //
                    },
                },
            },
        };
    }
}
