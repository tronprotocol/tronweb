import TronWeb from 'index';
import utils from 'utils';

export default class Plugin {

    constructor(tronWeb = false) {
        if(!tronWeb || !tronWeb instanceof TronWeb)
            throw new Error('Expected instance of TronWeb');

        this.tronWeb = tronWeb;
    }

    register(plugin) {
        let pluginInterface
        if (utils.isFunction(plugin.pluginInterface)) {
            pluginInterface = plugin.pluginInterface(this.tronWeb)
        }
        for (let i in pluginInterface) {
            if (!this.tronWeb[i]) {
                TronWeb[i] = {}

            }

        }
    }

};
