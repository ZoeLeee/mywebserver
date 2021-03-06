const path = require('path');
const webpack = require('webpack');
const common = require('./webpack.common').config;
const merge = require('webpack-merge');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
const commonConfig = require("./common");

const config = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  output: {
    publicPath: '/',
    pathinfo: false,
  },
  //https://www.webpackjs.com/configuration/stats/
  // stats: {
  //   assets: false,
  // },
  module: {
    rules: [
      //样式加载 css
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      //样式加载 less
      {
        test: /\.less$/,
        include: [
          path.resolve(__dirname, "../src/client/")
        ],
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
    port: 8081,
    hot: true
  },
  watch: true,
  watchOptions: {
    ignored: ['**/*.js', 'node_modules/**']
  },
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
    namedModules: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),//Hot
  ]
}, commonConfig.plugin);


if (false)
  module.exports = smp.wrap(config);
else
  module.exports = config;