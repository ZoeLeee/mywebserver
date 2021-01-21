const path = require("path");
const merge = require('webpack-merge');
const common = require('./webpack.common').config;
const { cssRule } = require('./common');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {
  target: "node",
  mode: 'production',
  entry: {
    app: path.join(__dirname, "../src/server/server-entry.tsx")
  },
  output: {
    filename: 'server-entry.js',
    libraryTarget: "commonjs2"
  },
  externals: {
    react: 'commonjs react',
    'react-dom': 'commonjs react-dom',
  },
  node: {
    global: true,
  },
  module: {
    rules: [
      ...cssRule
    ]
  },
  optimization: {
    splitChunks: false
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, "../static/server.*.css"), path.resolve(__dirname, "../static/*.server-entry.js")],
    }),
    new MiniCssExtractPlugin({
      filename: 'server.[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
  ]
});