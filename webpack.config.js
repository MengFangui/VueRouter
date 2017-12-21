var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
	entry: {
		//入口文件
		main: './main'
	},
	output: {
		//打包后文件存放的地方
		//path.join方法用于连接路径。该方法的主要用途在于，会正确使用当前系统的路径分隔符，Unix系统是"/"，Windows系统是"\"。
		path: path.join(__dirname, './dist'),
		//配置线上地址，用于在生产模式下更新内嵌到css、html文件里的url值
		publicPath: 'dist/',
		//打包后的文件名
		filename: 'main.js'
	},
	module: {
		rules: [
			//处理vue单文件
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						css: ExtractTextPlugin.extract({
							use: ['css-loader','less-loader'],
							fallback: 'vue-style-loader'
						})
					}
				}
			},
			//处理js文件
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			//编译ES6
			{
				test: /\.js$/,
				//以下目录不处理
				exclude: /node_modules/,
				//处理以下目录
				//include: /src/,
				loader: "babel-loader?cacheDirectory",
				//配置的目标运行环境自动启用需要的 babel 插件
				query: {
					presets: ['latest']
				}
			},
			{
				test: /\.css$/,
				//css单独打包
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [{
							loader: 'css-loader',
							options: {
								//支持@important引入css
								importLoaders: 1
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								plugins: function() {
									return [
										//一定要写在require("autoprefixer")前面，否则require("autoprefixer")无效
										require('postcss-import')(),
										require("autoprefixer")({
											"browsers": ["Android >= 4.1", "iOS >= 7.0", "ie >= 8"]
										})
									]
								}
							}
						}
					]
				})
			},			
			//处理图片
			{
				test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/i,
				loaders: [
					//小于8k的图片编译为base64，大于10k的图片使用file-loader            
					'url-loader?limit=8192'
					
				]
			}
		]
	},
	plugins: [
		//css单独打
		new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        })
	]
};

module.exports = config;