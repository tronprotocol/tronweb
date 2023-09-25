import { TronWeb } from '../tronweb.js';
import utils from '../utils/index.js';
import semver from 'semver';

interface PluginConstructorOptions {
    disablePlugins?: boolean;
}

interface PluginClassInterface {
    new (tronWeb: TronWeb): {
        pluginInterface?: (options: PluginOptions) => PluginInterfaceReturn;
    };
}

interface PluginInterfaceReturn {
    requires: string;
    components?: Record<string | number | symbol, any>;
    fullClass?: boolean;
}

type PluginOptions = any;

export class Plugin {
    tronWeb: TronWeb;
    pluginNoOverride: string[];
    disablePlugins: boolean;

    constructor(tronWeb: TronWeb, options: PluginConstructorOptions = {}) {
        if (!tronWeb || !(tronWeb instanceof TronWeb)) throw new Error('Expected instance of TronWeb');
        this.tronWeb = tronWeb;
        this.pluginNoOverride = ['register'];
        this.disablePlugins = !!options.disablePlugins;
    }

    register(Plugin: PluginClassInterface, options?: PluginOptions) {
        let pluginInterface: PluginInterfaceReturn = {
            requires: '0.0.0',
            components: {},
        };
        const result: {
            libs: any[];
            plugged: any[];
            skipped: any[];
            error?: string;
        } = {
            libs: [],
            plugged: [],
            skipped: [],
            error: undefined,
        };
        if (this.disablePlugins) {
            result.error = 'This instance of TronWeb has plugins disabled.';
            return result;
        }
        const plugin = new Plugin(this.tronWeb);
        if (utils.isFunction(plugin.pluginInterface)) {
            pluginInterface = plugin.pluginInterface(options);
        }
        if (semver.satisfies(TronWeb.version, pluginInterface.requires)) {
            if (pluginInterface.fullClass) {
                // plug the entire class at the same level of tronWeb.trx
                const className = plugin.constructor.name;
                const classInstanceName = className.substring(0, 1).toLowerCase() + className.substring(1);
                if (className !== classInstanceName) {
                    Object.assign(TronWeb, {
                        [className]: Plugin,
                    });
                    Object.assign(this.tronWeb, {
                        [classInstanceName]: plugin,
                    });
                    result.libs.push(className);
                }
            } else {
                // plug methods into a class, like trx
                for (const component in pluginInterface.components) {
                    // eslint-disable-next-line no-prototype-builtins
                    if (!this.tronWeb.hasOwnProperty(component)) {
                        continue;
                    }
                    const methods = pluginInterface.components[component];
                    const pluginNoOverride = (this.tronWeb as any)[component].pluginNoOverride || [];
                    for (const method in methods) {
                        if (
                            method === 'constructor' ||
                            ((this.tronWeb as any)[component][method] &&
                                (pluginNoOverride.includes(method) || // blacklisted methods
                                    /^_/.test(method))) // private methods
                        ) {
                            result.skipped.push(method);
                            continue;
                        }
                        (this.tronWeb as any)[component][method] = methods[method].bind((this.tronWeb as any)[component]);
                        result.plugged.push(method);
                    }
                }
            }
        } else {
            throw new Error('The plugin is not compatible with this version of TronWeb');
        }
        return result;
    }
}
