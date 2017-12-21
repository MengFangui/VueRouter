//处理共用、通用的js
var webpack = require('webpack');
//处理html模板
var HtmlWebpackPlugin = require('html-webpack-plugin');
//css单独打包
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var merge = require('webpack-merge');
var webpackBaseConfig = require('./webpack.config.js');

// 清空基本配置的插件列表
webpackBaseConfig.plugins = [];

module.exports = merge(webpackBaseConfig, {
    output: {
    	//用于在生产模式下更新内嵌到css、html文件里的url值
        publicPath: 'dist/',
        // 将入口文件重命名为带有 20 位 hash 值的唯一文件
        filename: '[name].[hash].js'
    },
    plugins: [
        new ExtractTextPlugin({
            // 提取 css，并重命名为带有 20 位 hash 值的唯一文件
            filename: '[name].[hash].css',
            allChunks: true
        }),
        // 定义当前 node 环境为生产环境
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        // 压缩 js
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        // 提取模板，并保存入口 html 文件
        new HtmlWebpackPlugin({
        	//输出文件
            filename: '../index_prod.html',
            //模板文件
            template: './index.ejs',
            inject: false,
            //html压缩
//          minify:{
//              //删除注释
//              removeComments:true,
//              //删除空格
//              collapseWhitespace:true
//          }
        })
    ]
});