const path = require('path');
const webpack=require('webpack');
const common=require('./webpack.common').config;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const merge=require('webpack-merge');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports =merge(common,{
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  output: {
    publicPath: '/'
  },
  module: {
    rules: [
      //样式加载 css
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      //样式加载 less
      {
        test: /\.less$/,
        use: [{
          loader: "style-loader"
        },
        { loader: 'css-loader', options: { sourceMap: false } },
        {
          loader: "less-loader",
          options: {
            modifyVars: {
              'primary-color': '#1DA57A',
              'link-color': '#1DA57A',
              'border-radius-base': '2px',
            },
            strictMath: true,
            noIeCompat: true,
            javascriptEnabled: true,
          },
        }
        ]
      },
    ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, "../static/"),
    compress: true,
    port: 8080,
    // host: '0.0.0.0',
    hot:true
  },
  plugins: [
    new ProgressBarPlugin({ format: 'build [:bar] :percent (:elapsed seconds)',clear: false}),
    new webpack.NamedModulesPlugin(),//Hot
    new webpack.HotModuleReplacementPlugin(),//Hot
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new AddAssetHtmlPlugin({ filepath: './static/dll.lib.js' }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../static/manifest.json'),
    }),
    new HtmlWebpackPlugin({
      title: 'Zoe',
      template: './index.html',
      favicon: path.resolve(__dirname, '../favicon.ico')
    }),
  ]
});