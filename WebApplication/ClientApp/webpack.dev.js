// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

var webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const WriteFilePlugin = require('write-file-webpack-plugin');
const path = require('path');
const paths = require('./config/paths');
const appPackageJson = require(paths.appPackageJson);

module.exports = merge(common, {
	mode: 'development',
	devtool: 'cheap-module-source-map', //'inline-source-map',
	devServer: {
		contentBase: path.join(__dirname, appPackageJson.clientBundleOutputDir), //Tell the server where to serve content from. This is only necessary if you want to serve static files.
		//compress: true,
		// If you use Docker, Vagrant or Cloud9, set
		// host: options.host || "0.0.0.0";
		//
		// 0.0.0.0 is available to all network devices
		// unlike default `localhost`.
		host: process.env.HOST, // Defaults to `localhost`
		port: process.env.PORT, // Defaults to 8080
		//	https: true,
		open: 'chrome', // Open the page in browser
		openPage: 'home/myapp1',
		hot: true,
		//Enable devServer.historyApiFallback if you are using HTML5 History API based routing.,
		proxy: [
			{
				context: ['/'],
				target: 'http://localhost:5000'
			}
		],
		overlay: {
			warnings: true,
			errors: true
		}
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new WriteFilePlugin() // Forces webpack-dev-server to write bundle files to the file system. https://github.com/gajus/write-file-webpack-plugin
	]
});
