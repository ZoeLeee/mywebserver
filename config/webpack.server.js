const path=require("path");
const merge=require('webpack-merge');
const common=require('./webpack.common').config;
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const {cssRule}=require('./common');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports=merge(common,{
  target:"node",
  mode: 'development',
  entry:{
    app:path.join(__dirname,"../src/server-entry.tsx")
  },
  output:{
    filename:'server-entry.js',
    libraryTarget:"commonjs2"
  },
  externals: {
    react: 'commonjs react',
   'react-dom': 'commonjs react-dom',
 },
  node:{
    global:true,
  },
  module:{
    rules:[
      ...cssRule
    ]
  },
  plugins: [
    new ProgressBarPlugin({ format: 'build [:bar] :percent (:elapsed seconds)',clear:true}),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
  ]
})