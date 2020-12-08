const common = require('./webpack.common').config;
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const { cssRule } = require('./common');

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
      new OptimizeCssAssetsPlugin()//压缩css
    ]
  },
  plugins: [
    // new BundleAnalyzerPlugin({ analyzerPort: 8088 }),
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: true,
      cleanOnceBeforeBuildPatterns: [
        `*.bundle.js`, `*.css`,
      ],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
  ]
});