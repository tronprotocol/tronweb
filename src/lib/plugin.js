import TronWeb from 'index';
import utils from 'utils';
import semver from 'semver';

export default class Plugin {

    constructor(tronWeb = false) {
        if (!tronWeb || !tronWeb instanceof TronWeb)
            throw new Error('Expected instance of TronWeb');
        this.tronWeb = tronWeb;
    }

    async register(Plugin) {
        let pluginInterface
        const plugin = new Plugin(this.tronWeb)
        if (utils.isFunction(plugin.pluginInterface)) {
            pluginInterface = plugin.pluginInterface()
        }
        if (semver.satisfies(TronWeb.version, pluginInterface.supportedVersions)) {
            for (let klass in pluginInterface.packages) {
                if (this.tronWeb.hasOwnProperty(klass)) {
                    // method override
                    let methods = pluginInterface.packages[klass]
                    for (let method in methods) {
                        this.tronWeb[klass][method] = methods[method].bind(this.tronWeb[klass])
                    }
                }
            }
        }
    }
}

