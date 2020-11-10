const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const {
  prod_Path,
  src_Path
} = require('./path');

module.exports = {
  entry: {
    main: './' + src_Path + '/js/index.js'
  },
  output: {
    path: path.resolve(__dirname, prod_Path),
    filename: '[name].[chunkhash].js'
  },
  devtool: 'source-map',
  devServer: {
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              [ '@babel/plugin-proposal-decorators', { legacy: true } ],
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-private-methods',
              '@babel/plugin-transform-destructuring'
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      hash: false,
      template: './' + src_Path + '/index.html',
      filename: 'index.html'
    })
  ]
};