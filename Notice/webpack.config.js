var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: {
        js: './app.js',
        vendor: ['react', 'react-router', 'react-dom', 'react-addons-css-transition-group']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './bundle.js'
    },
    module: {
        loaders:[
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                loader: 'babel'
            }, {
                test: /\.less$/,
                loader: 'style!css!postcss!less'
            }, {
                test: /\.css/,
                loader: ExtractTextPlugin.extract('style', 'css', 'postcss')
            }, {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=25000'
            }
        ]
    },
    postcss: [autoprefixer],
    plugins: [
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new ExtractTextPlugin('min.css'),
        //生成新的js文件
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
        //去除注释代码
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false,
            },
            sourceMap: false,
            mangle: false,
            compress:{
                warnings: false,
                drop_debugger: true,
                drop_console: false
            }
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.html'),//模板文件所在地址
            hash:true,
        }),
        new OpenBrowserPlugin({ url: 'http://localhost:8080' })
    ]
};
