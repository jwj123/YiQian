
/**
 * webpack 上线配置
 * 1. 代码压缩
 * 2. html压缩
 */

const webpack = require('webpack');
const path = require('path');

// generate html
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const baseOptions = require('./webpack.config');

const { resolve }  = require('./utils');

module.exports = merge(baseOptions, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': '"production"'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      chunks: ['vendor', 'app'],
      chunksSortMode: function(c1, c2) {
        const order = ['vendor', 'app'];
        const order1 = order.indexOf(c1.names[0]);
        const order2 = order.indexOf(c2.names[0]);
        return order1 - order2;
      },
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'public.html',
      template: 'public.html',
      inject: true,
      chunks: ['vendor', 'public'],
      chunksSortMode: function(c1, c2) {
        const order = ['vendor', 'public'];
        const order1 = order.indexOf(c1.names[0]);
        const order2 = order.indexOf(c2.names[0]);
        return order1 - order2;
      },
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.min.js',
    }
  }
});