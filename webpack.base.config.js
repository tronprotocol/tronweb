const path = require('path');

const basePlugins = [
    ['@babel/plugin-transform-private-methods', { loose: true }],
    ['@babel/plugin-transform-private-property-in-object', { loose: true }],
    ['@babel/plugin-transform-class-properties', { loose: true }],
    '@babel/plugin-transform-numeric-separator',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-transform-object-rest-spread',
];

const mode = process.env.NODE_ENV || 'production';

const baseConfig = {
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    resolve: {
        extensions: ['.ts', '.js', '.cjs'],
        extensionAlias: {
            '.js': ['.ts', '.js', 'cjs'],
        },
        modules: ['node_modules', path.resolve(__dirname, 'src')],
        fallback: {
            'querystring-es3': require.resolve('querystring-es3'),
            events: require.resolve('events/'),
        },
    },
    devtool: 'source-map',
    mode,
};

nodePlugins = [...basePlugins];

if (mode === 'development') {
    nodePlugins.push('source-map-support');
}

module.exports = {
    basePlugins,
    baseConfig,
    nodePlugins,
};
