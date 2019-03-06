import TronWeb from 'index';
import utils from 'utils';
import semver from 'semver';

export default class Plugin {

    constructor(tronWeb = false) {
        if (!tronWeb || !tronWeb instanceof TronWeb)
            throw new Error('Expected instance of TronWeb');
        this.tronWeb = tronWeb;
        this.pluginNoOverride = ['register'];
    }

    register(Plugin) {
        let pluginInterface = {
            requires: '0.0.0',
            components: {}
        }
        let result = {
            plugged: [],
            skipped: []
        }
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
                let pluginNoOverride = this.tronWeb[component].pluginNoOverride || []
                for (let method in methods) {
                    if (method === 'constructor' || (this.tronWeb[component][method] &&
                        (pluginNoOverride.includes(method) // blacklisted methods
                            || /^_/.test(method)) // private methods
                    )) {
                        result.skipped.push(method)
                        continue
                    }
                    this.tronWeb[component][method] = methods[method].bind(this.tronWeb[component])
                    result.plugged.push(method)
                }
            }
        } else {
            throw new Error('The plugin is not compatible with this version of TronWeb')
        }
        return result
    }
}

