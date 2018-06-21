const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const paths = require('./config/paths');
const appPackageJson = require(paths.appPackageJson);

const clientBundleOutputDir = appPackageJson.clientBundleOutputDir;
const entryPointsAppPackageJson = appPackageJson.entryPoints;

const devMode = process.env.NODE_ENV !== 'production';

var entries = {};
entryPointsAppPackageJson.forEach(
	obj => (entries[obj.chunkName] = obj.entryPoint)
);

function generateHtmlPlugins() {
	return entryPointsAppPackageJson.map(obj => {
		// Create new HTMLWebpackPlugin with options
		return new HtmlWebpackPlugin({
			inject: false, //Important! Make it False if you include placeholders inside the tempate
			hash: false,
			chunks: [obj.chunkName],
			template: path.join(__dirname, obj.htmlTemplateFile),
			//template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`)
			filename: path.join(__dirname, obj.htmlOutputFile)
		});
	});
}
const htmlPlugins = generateHtmlPlugins();

module.exports = {
	entry: entries,
	output: {
		// `path` is the folder where Webpack will place your bundles
		path: path.resolve(__dirname, clientBundleOutputDir),
		// `publicPath` is where Webpack will load your bundles from (optional)
		publicPath: appPackageJson.publicPath,
		filename: '[name].[hash:4].bundle.js',
		// `chunkFilename` provides a template for naming code-split bundles (optional)
		chunkFilename: '[name].[hash:4].bundle_dynamic.js'
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx']
	},
	optimization: {
		splitChunks: {
			chunks: 'all'
		}
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.(tsx)?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},

			{
				test: /\.(png|jpg|jpeg|gif|svg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'images/[name].[hash:4].[ext]'
							//outputPath: 'images/'
						}
					}
				]
			},
			{
				test: /\.css$/,
				use: [
					devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
					//'style-loader' , MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: require.resolve('postcss-loader'),
						options: {
							// Necessary for external CSS imports to work
							// https://github.com/facebookincubator/create-react-app/issues/2677
							ident: 'postcss',
							plugins: () => [
								//require('postcss-flexbugs-fixes'),
								autoprefixer({
									browsers: [
										'>1%',
										'last 4 versions',
										'Firefox ESR',
										'not ie < 9' // React doesn't support IE8 anyway
									],
									flexbox: 'no-2009'
								})
							]
						}
					}
				]
			}
		]
	},
	plugins: [
		//	new CleanWebpackPlugin(clientBundleOutputDir, { allowExternal: true }), //Moved to Prod
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: devMode ? '[name].css' : 'styles/[name].[contenthash:4].css',
			chunkFilename: devMode ? '[id].css' : 'styles/[id].[contenthash:4].css'
		})
	].concat(htmlPlugins)
};
