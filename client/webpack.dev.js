const HTMLWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.config');

module.exports = merge(common, {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(sc|c)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        inline: true,
        publicPath: '/',
        port: 3000,
        proxy: {
            '/v1': 'http://0.0.0.0:10000/',
            secure: false
        }
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html'
        })
    ]
});