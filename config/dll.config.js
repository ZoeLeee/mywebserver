const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const vendors = [
    'react',
    'react-dom',
    'react-router',
    'react-router-dom',
    // ...其它库
];

module.exports = {
    mode: "production",
    output: {
        path: path.resolve(__dirname, '../static'),
        filename: 'dll.[name].js',
        library: 'dll',
    },
    entry: {
        "lib": vendors,
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.resolve(__dirname, '../static/manifest.json'),
            name: 'dll',
            context: __dirname,
        }),
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: true,
            cleanOnceBeforeBuildPatterns: [
                `./static/dll.*.js`, `./static/*.json`,
            ],
        }),
    ]
}