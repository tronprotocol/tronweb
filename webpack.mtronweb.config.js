const webpack = require('webpack');
const commonConfig = require('./webpack.common.config');
commonConfig[0].plugins[0] = new webpack.DefinePlugin({
    __MODE__: JSON.stringify('mTronWeb'),
})
module.exports = commonConfig;