const path = require('path');
const tsImportPluginFactory = require('ts-import-plugin');
const WebpackBar = require('webpackbar');


const resolve = dir => path.resolve(__dirname, dir);

exports.config = {
  entry: path.join(__dirname, '../src/client/index.tsx'),
  output: {
    filename: '[hash].bundle.js',
    path: path.resolve(__dirname, '../static/'),
    publicPath: '/static/'
  },
  stats: {
    assets: true,
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
      {
        test: /\.tsx?$/,
        include: [ // 表示只解析以下目录，减少loader处理范围
          resolve('../src/client'),
          resolve('../src/server/server-entry.tsx'),
        ],
        exclude: /node_modules/,
        use: [
          { loader: 'cache-loader', options: { cacheDirectory: "node_modules/.cache_loader" } },
          {
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
            },
          }
        ]
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
      resolve('../src/client'),
      resolve('../node_modules'),
    ],
    alias: {
      "@": resolve('../src/client'), // 缓存src目录为@符号，避免重复寻址
    }
  },
  plugins: [
    new WebpackBar()
  ]
};
