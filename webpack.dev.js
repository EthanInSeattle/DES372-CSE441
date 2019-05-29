const webpack = require('webpack');
const common = require('./webpack.common');
const merge = require('webpack-merge');

module.exports = merge(common, {
    mode: 'development',
    entry: [
      'react-hot-loader/patch',
      './src/index.js'
    ],
    mode: 'development',
    devServer: {
        contentBase: './dist',
        hot: true,
        historyApiFallback: {
            index: 'index.html'
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],

})