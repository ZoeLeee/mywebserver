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
  plugins: [
    new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ["server-entry.js,*.server-entry.js.js,server.*.css"] }),
    new MiniCssExtractPlugin({
      filename: 'server.[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
  ]
});