const path = require('path');
const externals = require('webpack-node-externals');

const basePlugins = [
    ["@babel/plugin-proposal-private-methods", { "loose": true }],
    ["@babel/plugin-proposal-private-property-in-object", { "loose": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-object-rest-spread'
];

const mode = process.env.NODE_ENV || 'production'

const baseConfig = {
    entry: path.resolve(__dirname, 'src', 'index.js'),
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules\/(?!ethers)|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                targets: {
                                    browsers: [
                                        '>0.25%',
                                        'not dead'
                                    ]
                                }
                            }]
                        ],
                        plugins: basePlugins,
                    }
                }
            }
        ]
    },
    resolve: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'src')
        ],
        fallback: {
            'querystring-es3': require.resolve("querystring-es3"),
            'events': require.resolve("events/")
        },
    },
    devtool: 'source-map',
    mode
};

nodePlugins = [
    ...basePlugins
]

if (mode === 'development') {
    nodePlugins.push('source-map-support')
}

module.exports = [
    {
        ...baseConfig,
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'TronWeb.node.js',
            libraryTarget: 'commonjs2',
            libraryExport: 'default'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules\/(?!ethers)|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', {
                                    targets: {
                                        node: 6
                                    },
                                    forceAllTransforms: true
                                }]
                            ],
                            plugins: nodePlugins
                        }
                    }
                }
            ]
        },
        externals: [ externals({ allowlist: ['ethers', '@noble/hashes/scrypt', '@noble/hashes/ripemd160', '@noble/hashes/crypto', '@noble/hashes/sha3', '@noble/secp256k1'] }) ],
        target: 'node'
    },
    {
        ...baseConfig,
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'TronWeb.js',
            library: 'TronWeb',
            libraryTarget: 'umd',
            libraryExport: 'default',
            umdNamedDefine: true
        },
    }
];
