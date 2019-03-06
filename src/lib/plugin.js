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
        let pluginInterface = {
            requires: '0.0.0',
            components: {}
        }
        try {
            const plugin = new Plugin(this.tronWeb)
            if (utils.isFunction(plugin.pluginInterface)) {
                pluginInterface = plugin.pluginInterface()
            }
            if (semver.satisfies(TronWeb.version, pluginInterface.requires)) {
                for (let component in pluginInterface.components) {
                    if (!this.tronWeb.hasOwnProperty(component)) {
                        // TODO implement new sub-classes
                        continue
                    }
                    let methods = pluginInterface.components[component]
                    let methodBlacklist = this.tronWeb[component].methodBlacklist
                    for (let method in methods) {
                        if (this.tronWeb[component][method] &&
                        methodBlacklist.includes(method)) {
                            console.warn(`Method ${method} cannot be overridden`)
                        }
                        this.tronWeb[component][method] = methods[method].bind(this.tronWeb[component])
                    }
                }
            } else {
                console.warn('The plugin is not compatible with this version of TronWeb')
            }
        } catch (err) {
            console.error(err.message)
        }
    }
}

