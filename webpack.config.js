const path = require('path');
const externals = require('webpack-node-externals');

const basePlugins = [
    '@babel/plugin-transform-runtime',
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
        externals: [ externals({ allowlist: ['ethers'] }) ],
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