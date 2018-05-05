/**
 * webpack的开发配置
 * 1. sourceMap
 * 2. 热部署
 * 3. devServer
 */

const webpack = require('webpack');
const merge = require('webpack-merge');
const baseOptions = require('./webpack.config');
const path = require('path');
// generate html
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { resolve }  = require('./utils');

const config = merge(baseOptions, {
  output: {
    path:  path.join(__dirname, '..', 'public'),
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': '"development"'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      chunks: ['vendor', 'app'],
      chunksSortMode: function(c1, c2) {
        const order = ['vendhashor', 'app'];
        const order1 = order.indexOf(c1.names[0]);
        const order2 = order.indexOf(c2.names[0]);
        return order1 - order2;
      },
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
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, '..', 'public'), //这个配置可以提供另外的内容
    compress: true,
    port: 3002,
    inline: true
  },
  // devtool: '#cheap-module-eval-source-map',
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    }
  },
});

module.exports = config;
