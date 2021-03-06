const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
const resolve = dir => path.join(__dirname, dir);
const webpack = require('webpack');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  cssRule: [
    //样式加载 css
    {
      test: /\.css$/,
      include: [ // 表示只解析以下目录，减少loader处理范围
        resolve('../node_modules/antd'),
        resolve('../node_modules/@toast-ui/editor'),
        resolve('../node_modules/codemirror'),
      ],
      use: [
        MiniCssExtractPlugin.loader,
        { loader: 'cache-loader', options: { cacheDirectory: "node_modules/.cache_loader" } },
        'css-loader']
    },
    //样式加载 less
    {
      test: /\.less$/,
      include: [ // 表示只解析以下目录，减少loader处理范围
        resolve('../src'),
      ],
      use: [
        MiniCssExtractPlugin.loader,
        { loader: 'cache-loader', options: { cacheDirectory: "node_modules/.cache_loader" } },
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
  ],
  plugin: {
    plugins: [
      new webpack.DllReferencePlugin({
        context: path.join(__dirname, ".."),
        manifest: require('../static/manifest.json'),
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new HtmlWebpackPlugin({
        template: './index.html',
        favicon: path.resolve(__dirname, '../favicon.ico')
      }),
      new AddAssetHtmlPlugin({ filepath: path.resolve(__dirname, '../static/dll.*.js'), }),
    ]
  }
};