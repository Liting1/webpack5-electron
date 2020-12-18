const path = require('path');
const webpack = require('webpack');
const { dependencies } = require('../package.json');
const ElectronDevWebpackPlugin = require('electron-dev-webpack-plugin');

module.exports = {
	// 配置开发模式
	mode: 'development',
	entry: {
		// 配置入口文件
		main: path.join(__dirname, '../src/main.js')
	},
	// 配置出口文件
	output: {
		path: path.join(__dirname, '../app/'),
		libraryTarget: 'commonjs2',
		filename: '[name].js'
	},
	// 监听文件改变
	watch: true,
	optimization: {
		minimize: true,
	},
	module: {
		rules: [{
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: /node_modules/
		}, {
			test: /\.node$/,
			loader: 'node-loader'
		}]
	},
	externals: [
		...Object.keys(dependencies || {})
	],
	node: {
		__dirname: true,
		__filename: true
	},
	plugins: [
		new webpack.DefinePlugin({}),
		new ElectronDevWebpackPlugin()
	],
	target: 'electron-main'
}