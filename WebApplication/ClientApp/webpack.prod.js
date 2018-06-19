// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const paths = require('./config/paths');
const appPackageJson = require(paths.appPackageJson);
const clientBundleOutputDir = appPackageJson.clientBundleOutputDir;

module.exports = merge(common, {
	mode: 'production',
	devtool: false,
	module: {
		rules: [
			// {
			// 	test: /\.html$/,
			// 	use: [
			// 		{
			// 			loader: 'html-loader',
			// 			options: { minimize: true }
			// 		}
			// 	]
			// }
		]
	},
	plugins: [
		new CleanWebpackPlugin(clientBundleOutputDir, { allowExternal: true }),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		})
	]
});
