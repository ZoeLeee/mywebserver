const path = require('path');
const webpack = require('webpack');
const tsImportPluginFactory = require('ts-import-plugin');

const resolve = dir => path.join(__dirname, dir);

exports.config = {
  entry: path.join(__dirname, '../src/index.tsx'),
  output: {
    filename: '[hash].bundle.js',
    path: path.resolve(__dirname, '../static/'),
    publicPath: '/static/'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [ // 表示只解析以下目录，减少loader处理范围
          resolve('../src'),
        ],
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          experimentalWatchApi: true,
          getCustomTransformers: () => ({
            before: [tsImportPluginFactory({
              libraryName: 'antd',
              libraryDirectory: 'lib',
              style: 'css'
            })]
          }),
          compilerOptions: {
            module: 'es2015'
          }
        }
      },
      {
        test: /\.[(png)|(obj)|(json)|(jpg)]$/,
        loader: "file-loader",
        options: {
          // publicPath:'./src/images'
        }
      },
      //字体加载 blueprint
      {
        test: /\.(woff|woff2|jpg|png)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'images/[hash].[ext]',
            limit: 5000,
            mimetype: 'application/font-woff'
          }
        }
      },
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".less", ".css"],
    modules: [ // 指定以下目录寻找第三方模块，避免webpack往父级目录递归搜索
      resolve('../src'),
      resolve('../node_modules'),
    ],
    alias: {
      "@": resolve('../src'), // 缓存src目录为@符号，避免重复寻址
    }
  },
  devtool: 'eval',
  plugins: [
   
  ]
};
