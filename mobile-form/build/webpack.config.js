const webpack = require('webpack');
// css extensions for stylus
const nib = require('nib');

const path = require('path');

// make the css file not pack into js bundle file
const ExtractTextPlugin = require('extract-text-webpack-plugin');


// package.json config
const packageJSON = require('../package.json');
const { resolve }  = require('./utils');


function getBanner() {
  return `${packageJSON.name} v${packageJSON.version}
  author: ${packageJSON.author.name}`;
}

const config = {
    entry: {
      app: "./src/main.js",
      public: './src/public.js',
      vendor: ['vue', 'muse-ui', 'axios', 'vue-router', 'store', 'chart.js'],
    },
    output: {
      path: resolve('public'),
      filename: 'js/[name].[hash].js',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.styl$/,
          use: ExtractTextPlugin.extract([ 'css-loader', 'stylus-loader' ])
        },
        // {
        //   test: /\.less$/,
        //   use: ExtractTextPlugin.extract(['css-loader', 'less-loader'])
        // },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader'
          })
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: [resolve('src')],
          options: {
            plugins: ['transform-runtime'],
            presets: ['es2015', 'stage-2']
          }
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          include: [resolve('src')]
        },
        {
          test: /\.(woff|woff2|ttf|eot|svg)$/,
          loader: 'url-loader',
          options: {
            limit: 8000, // 限制为8k,小于8k转为base64
            name: 'fonts/[name].[hash:7].[ext]'
          }
        },
        {
          test: /\.(png|jpe?g|gif)$/,
          loader: 'url-loader',
          options: {
            limit: 8000, 
            name:'img/[name].[hash].[ext]'
          }
        }
      ]

    },
    plugins: [
      // 使用nib和stylus配合
      new webpack.LoaderOptionsPlugin({
        test: /\.styl$/,
        stylus: {
          default: {
            use: [nib()],
            import: ['~nib/lib/nib/index.styl'],
            preferPathResolver: 'webpack'
          }
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity,
      }),
      new ExtractTextPlugin('css/[name].css'),
      new webpack.BannerPlugin(getBanner()),
    ],
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': resolve('src'),
        'store': 'store/dist/store.modern.js',
        'chart.js': 'chart.js/dist/Chart.min.js'
      }
    }
  };

module.exports = config;