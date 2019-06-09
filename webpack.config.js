const webpack = require('webpack');
var path = require('path');
module.exports = {
    entry: './src/index.js', // use index.js as the entry point to bundle all files.
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
          }
        ]
      },
      resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
      path: __dirname + '/dist', // the bundled file will be generated in the /dist folder was this: path: __dirname + '/dist'
      publicPath: '/dist',  // is this the public path for serving static files ????
      filename: 'bundle.js' // the bundled file will be named “bundle.js"
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
      historyApiFallback: true,
      contentBase: './dist',
      hot: true
    }
  };