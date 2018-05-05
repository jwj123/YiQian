const devConfig = require('./webpack.dev.config');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = devConfig.plugins.push(new BundleAnalyzerPlugin());