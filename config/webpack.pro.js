const common = require('./webpack.common').config;
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const { cssRule } = require('./common');
const smp = new SpeedMeasurePlugin();

module.exports = merge(common, {
  mode: 'production',
  devtool: 'none',
  output: {
    publicPath: '/static/'
  },
  module: {
    rules: [
      ...cssRule
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 244 * 1024,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [
      new ParallelUglifyPlugin({
        cacheDir: '.cache/',
        uglifyJS: {
          output: {
            beautify: false,
            comments: false
          },
          warnings: false,
          compress: {
            drop_console: true,
            collapse_vars: true,
            reduce_vars: true
          }
        }
      }),
      new OptimizeCssAssetsPlugin()//压缩css
    ]
  },
  plugins: [
    new AddAssetHtmlPlugin({ filepath: './static/dll.lib.js' }),
    new HtmlWebpackPlugin({
      title: 'Zoe',
      template: './index.html',
      favicon: path.resolve(__dirname, '../favicon.ico')
    }),
    // new BundleAnalyzerPlugin({ analyzerPort: 8081 })
  ]
}, smp.wrap({
  plugins: [
    // new ProgressBarPlugin({ format: 'build [:bar] :percent (:elapsed seconds)', clear: true }),
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: true,
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, '../static/*.bundle.js'), path.resolve(__dirname, '../static/*.css')]
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../static/manifest.json'),
    }),
  ]
}));