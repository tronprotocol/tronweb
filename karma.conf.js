const webpack = require("webpack");
const externals = require('webpack-node-externals');

const puppeteer = require('puppeteer');
process.env.CHROME_BIN = puppeteer.executablePath();

const basePlugins = [
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-runtime',
    'transform-object-rest-spread',
    // "transform-optional-catch-binding",
    // "transform-es2015-modules-commonjs",
    "source-map-support"
];

module.exports = function (config) {
    config.set({

        files: [
            // all files ending in "test"
            // './node_modules/phantomjs-polyfill/bind-polyfill.js',
            'test/test.js'
            // each file acts as entry point for the webpack configuration
        ],

        // frameworks to use
        frameworks: ['mocha'],

        preprocessors: {
            // only specify one entry point
            // and require all tests in there
            'test/test.js': ['webpack', 'sourcemap']
        },

        reporters: ['spec', 'coverage'],

        coverageReporter: {

            dir: 'coverage/',
            reporters: [
                {type: 'html'},
                {type: 'text'},
                {type: 'text-summary'}
            ],
            instrumenterOptions: {
                istanbul: {noCompact: true}
            }
        },

        webpack: {

            output: {
                libraryTarget: 'umd',
                libraryExport: 'default',
                umdNamedDefine: true
            },
            devtool: 'inline-source-map',
            module: {
                rules: [{
                    test: /\.js/,
                    exclude: /(test|node_modules|bower_components)/,
                    loader: 'istanbul-instrumenter-loader',
                    options: {
                        esModules: true,
                        presets: [
                            ['@babel/env', {
                                targets: {
                                    browsers: [
                                        '>0.25%',
                                        'not dead'
                                    ]
                                }
                            }]
                        ],
                        plugins: [
                            ...basePlugins
                        ]
                    },
                    enforce: 'post',
                }],
            },
            resolve: {
                modules: [
                    'node_modules',
                    'src'
                ],
            },
            mode: process.env.NODE_ENV || 'development',
            externals: [externals()],
            target: 'node'
        },

        webpackMiddleware: {
            // webpack-dev-middleware configuration
            noInfo: true
            // stats: 'errors-only'
        },

        plugins: [
            require("karma-webpack"),
            require("istanbul-instrumenter-loader"),
            require("karma-mocha"),
            require("karma-coverage"),
            require("karma-chrome-launcher"),
            require("karma-spec-reporter"),
            require('karma-sourcemap-loader'),
            require('karma-coverage-istanbul-reporter')
        ],

        browsers: ['ChromeHeadless']
    });
};
