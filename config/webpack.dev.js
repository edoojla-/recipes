var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var cwd = process.cwd();
const path = require('path');
const rootDir = path.resolve(__dirname, '..');
module.exports = webpackMerge(commonConfig, {

    devtool: 'cheap-module-eval-source-map',
    output: {
        path: path.resolve(rootDir, 'dist'),
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },
    plugins: [
        new ExtractTextPlugin('[name].css')
    ],
    devServer: {
//        host: '0.0.0.0',
        host: '192.168.178.24',
        historyApiFallback: true,
        stats: 'minimal',
        inline: true,
        colors: true,
        contentBase: path.resolve(cwd, 'build'),
        publicPath: '/',
        headers: {"Access-Control-Allow-Origin": "*"},
        proxy: {
            '/api/**': {
                target: 'http://192.168.178.48:8080',
//                secure: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
});