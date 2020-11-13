const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");


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
    chunkFilename: "[name].[contenthash].js",
    filename: "[name].[contenthash].js",
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_classnames: true,
          keep_fnames: true
        }
      })
    ]
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
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
    new CleanWebpackPlugin(path.resolve(__dirname, prod_Path), {
      root: process.cwd()
    }),
    new HtmlWebpackPlugin({
      inject: true,
      hash: true,
      template: './' + src_Path + '/index.html',
      filename: 'index.html',
      chunks: "all"
    })
  ]
};
