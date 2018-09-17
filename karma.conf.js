const webpack = require("webpack");
const externals = require('webpack-node-externals');

const basePlugins = [
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-runtime',
    'transform-object-rest-spread'
];

module.exports = function (config) {
    config.set({

        files: [
            // all files ending in "test"
            './node_modules/phantomjs-polyfill/bind-polyfill.js',
            'test/test.js'
            // each file acts as entry point for the webpack configuration
        ],

        // frameworks to use
        frameworks: ['mocha'],

        preprocessors: {
            // only specify one entry point
            // and require all tests in there
            'test/test.js': ['webpack']
        },

        reporters: ['spec', 'coverage'],

        coverageReporter: {

            dir: 'coverage/',
            reporters: [
                {type: 'html'},
                {type: 'text'},
                {type: 'text-summary'}
            ]
        },

        webpack: {
            // webpack configuration
            // output: {
            //     libraryTarget: 'commonjs2',
            //     libraryExport: 'default'
            // },
            module: {
                rules: [{
                    test: /\.js/,
                    exclude: /(test|node_modules|bower_components)/,
                    // loader: 'istanbul-instrumenter-loader',
                    use: {
                        loader: 'istanbul-instrumenter-loader',
                        options: {
                            esModules: true,
                            presets: [
                                // "es2017", "stage-0"
                                ['@babel/env', {
                                    targets: {
                                        node: 6
                                    },
                                    forceAllTransforms: true,
                                }]
                            ],
                            // plugins: [
                            //     ...basePlugins,
                            //     'source-map-support',
                            //     // "transform-optional-catch-binding",
                            //     // "transform-es2015-modules-commonjs",
                            // ]
                        }
                    },
                    // enforce: 'post',

                }],

            },
            resolve: {
                modules: [
                    'node_modules',
                    'src'
                ],
            },
            mode: process.env.NODE_ENV || 'development',
            externals: [ externals() ],
            target: 'node'
        },

        webpackMiddleware: {
            // webpack-dev-middleware configuration
            noInfo: true
        },

        plugins: [
            require('@babel/plugin-proposal-numeric-separator'),
            require('@babel/plugin-proposal-class-properties'),
            require('@babel/plugin-transform-runtime'),
            require('babel-plugin-transform-object-rest-spread'),
            require('babel-plugin-source-map-support'),
            require("karma-webpack"),
            require("istanbul-instrumenter-loader"),
            require("karma-mocha"),
            require("karma-coverage"),
            require("karma-phantomjs-launcher"),
            require("karma-spec-reporter"),
            require('karma-sourcemap-loader'),
            require('karma-coverage-istanbul-reporter')
        ],

        browsers: ['PhantomJS']
    });
};
