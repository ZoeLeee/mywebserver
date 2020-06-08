const path = require('path');
const webpack=require('webpack');
const common=require('./webpack.common').config;
const merge=require('webpack-merge');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports =merge(common,{
  mode: 'development',
  devtool: 'eval',
  output: {
    publicPath: '/',
    pathinfo: false,
  },
    //https://www.webpackjs.com/configuration/stats/
    stats: {
      assets: false,
      timings: true,
  
      builtAt: false,
      cachedAssets: false,
      hash: false,
      modules: false,
      performance: false,
      entrypoints: false,
  
      // 添加 children 信息
      children: false,
      // 添加 chunk 信息（设置为 `false` 能允许较少的冗长输出）
      chunks: false,
      // 将构建模块信息添加到 chunk 信息
      chunkModules: false,
      // 添加 chunk 和 chunk merge 来源的信息
      chunkOrigins: false,
  
      reasons: false,
      source: false
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
  watch:true,
  watchOptions:{
    ignored: ['**/*.js', 'node_modules/**']
  },
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
  plugins: [
    new ProgressBarPlugin({ format: 'build [:bar] :percent (:elapsed seconds)',clear: false}),
    new webpack.NamedModulesPlugin(),//Hot
    new webpack.HotModuleReplacementPlugin(),//Hot
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