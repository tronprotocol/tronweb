const fs = require('fs');
const path = require('path');
const externals = require('webpack-node-externals');

const { baseConfig, nodePlugins, basePlugins } = require('./webpack.base.config');

// ethers pins exact, older versions of @noble/curves and @noble/hashes, so npm installs them
// under node_modules/ethers/node_modules next to the top-level copies that ethereum-cryptography
// uses. Without intervention the browser bundle ships both copies (~30 KB minified, ~10 KB gzip).
// For the browser build only, point the subpaths ethers imports at the top-level ESM files so a
// single copy is bundled. The Node builds are untouched and keep ethers' pinned versions.
//
// The list below must match the `@noble/...` specifiers imported under node_modules/ethers/lib.esm.
// Re-check it, and let the major-version guard below run, whenever ethers or ethereum-cryptography
// is bumped.
const nobleSubpathsImportedByEthers = [
    '@noble/curves/secp256k1',
    '@noble/hashes/hmac',
    '@noble/hashes/pbkdf2',
    '@noble/hashes/ripemd160',
    '@noble/hashes/scrypt',
    '@noble/hashes/sha256',
    '@noble/hashes/sha3',
    '@noble/hashes/sha512',
];

function readPackageJson(relativeDir) {
    return JSON.parse(fs.readFileSync(path.resolve(__dirname, relativeDir, 'package.json'), 'utf8'));
}

function nobleBrowserAliases() {
    const ethersDependencies = readPackageJson('node_modules/ethers').dependencies;
    const aliases = {};

    for (const pkg of ['@noble/curves', '@noble/hashes']) {
        const pinnedByEthers = ethersDependencies[pkg];
        const topLevel = readPackageJson(`node_modules/${pkg}`).version;
        const major = (version) => version.replace(/^[^\d]*/, '').split('.')[0];
        if (!pinnedByEthers || major(pinnedByEthers) !== major(topLevel)) {
            throw new Error(
                `${pkg}: ethers depends on ${pinnedByEthers} but the top-level copy is ${topLevel}. ` +
                    'The major versions differ, so the browser bundle can no longer alias ethers onto the ' +
                    'top-level copy. Update nobleBrowserAliases() in webpack.config.js.'
            );
        }
    }

    for (const subpath of nobleSubpathsImportedByEthers) {
        const [scope, pkg, ...rest] = subpath.split('/');
        const file = path.resolve(__dirname, 'node_modules', scope, pkg, 'esm', `${rest.join('/')}.js`);
        if (!fs.existsSync(file)) {
            throw new Error(
                `${subpath}: expected ESM entry ${file} does not exist. Update nobleBrowserAliases() in webpack.config.js.`
            );
        }
        // Trailing `$` makes the alias an exact match, so the package's own relative imports are unaffected.
        aliases[`${subpath}$`] = file;
    }

    return aliases;
}

module.exports = [
    {
        ...baseConfig,
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'TronWeb.node.js',
            libraryTarget: 'commonjs2',
            libraryExport: 'default',
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        targets: {
                                            node: 14,
                                        },
                                        forceAllTransforms: true,
                                    },
                                ],
                            ],
                            plugins: nodePlugins,
                        },
                    },
                },
                {
                    test: /\.ts$/,
                    loader: 'ts-loader',
                    options: {
                        configFile: path.resolve(__dirname, 'tsconfig.cjs.json'),
                    },
                    exclude: ['/node_modules/', '/test/'],
                },
            ],
        },
        externals: [externals()],
        target: 'node',
    },
    {
        ...baseConfig,
        resolve: {
            ...baseConfig.resolve,
            alias: nobleBrowserAliases(),
        },
        module: {
            rules: [
                {
                    test: /\.[jt]s$/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                sourceType: 'unambiguous',
                                presets: [
                                    [
                                        '@babel/preset-env',
                                        {
                                            targets: {
                                                browsers: ['>0.25%', 'not dead'],
                                            },
                                        },
                                    ],
                                    '@babel/preset-typescript',
                                ],
                                plugins: basePlugins,
                            },
                        },
                    ],
                },
            ],
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'TronWeb.js',
            library: 'TronWeb',
            libraryTarget: 'umd',
            libraryExport: 'default',
            umdNamedDefine: true,
        },
    },
];
