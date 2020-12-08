const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const vendors = [
    'react',
    'react-dom',
    'react-router',
    'react-router-dom',
];

module.exports = {
    mode: "production",
    output: {
        path: path.resolve(__dirname, '../static'),
        filename: 'dll.[name].js',
        library: 'dll_[name]',
    },
    entry: {
        "lib": vendors,
        // "editor": ['@toast-ui/react-editor',],
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: true,
            cleanOnceBeforeBuildPatterns: [
                `dll.*.js`, `*.json`,
            ],
        }),
        new webpack.DllPlugin({
            path: path.resolve(__dirname, '../static/manifest.json'),
            name: 'dll_[name]',
            context: __dirname,
        }),
    ]
};