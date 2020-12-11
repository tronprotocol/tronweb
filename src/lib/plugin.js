import AccWeb from 'index';
import utils from 'utils';
import semver from 'semver';

export default class Plugin {

    constructor(accWeb = false, options = {}) {
        if (!accWeb || !accWeb instanceof AccWeb)
            throw new Error('Expected instance of AccWeb');
        this.accWeb = accWeb;
        this.pluginNoOverride = ['register'];
        this.disablePlugins = options.disablePlugins;
    }

    register(Plugin, options) {
        let pluginInterface = {
            requires: '0.0.0',
            components: {}
        }
        let result = {
            libs: [],
            plugged: [],
            skipped: []
        }
        if (this.disablePlugins) {
            result.error = 'This instance of AccWeb has plugins disabled.'
            return result;
        }
        const plugin = new Plugin(this.accWeb)
        if (utils.isFunction(plugin.pluginInterface)) {
            pluginInterface = plugin.pluginInterface(options)
        }
        if (semver.satisfies(AccWeb.version, pluginInterface.requires)) {
            if (pluginInterface.fullClass) {
                // plug the entire class at the same level of accWeb.trx
                let className = plugin.constructor.name
                let classInstanceName = className.substring(0, 1).toLowerCase() + className.substring(1)
                if (className !== classInstanceName) {
                    AccWeb[className] = Plugin
                    this.accWeb[classInstanceName] = plugin
                    result.libs.push(className)
                }
            } else {
                // plug methods into a class, like trx
                for (let component in pluginInterface.components) {
                    if (!this.accWeb.hasOwnProperty(component)) {
                        continue
                    }
                    let methods = pluginInterface.components[component]
                    let pluginNoOverride = this.accWeb[component].pluginNoOverride || []
                    for (let method in methods) {
                        if (method === 'constructor' || (this.accWeb[component][method] &&
                            (pluginNoOverride.includes(method) // blacklisted methods
                                || /^_/.test(method)) // private methods
                        )) {
                            result.skipped.push(method)
                            continue
                        }
                        this.accWeb[component][method] = methods[method].bind(this.accWeb[component])
                        result.plugged.push(method)
                    }
                }
            }
        } else {
            throw new Error('The plugin is not compatible with this version of AccWeb')
        }
        return result
    }
}

