var path = require('path')
var webpack = require('webpack')
var  ExtractTextPlugin =  require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	entry: {
		'toasted.min' : './src/sass/toast.scss'
	},
	output: {
		path: './dist',
		publicPath: '/dist/',
		filename: '[name].css',
		libraryTarget: 'umd'
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					//resolve-url-loader may be chained before sass-loader if necessary
					use: [{ loader: 'css-loader', options: { minimize: true }}, {
						loader: 'postcss-loader',
						options: {
							config: {
								path: './postcss.config.js'
							}
						}
					}, 'sass-loader']
				}),
				exclude: /node_modules/
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]?[hash]'
				}
			}
		]
	},
	performance: {
		hints: false
	}
}

if (process.env.NODE_ENV === 'production') {
	// http://vue-loader.vuejs.org/en/workflow/production.html
	module.exports.plugins = (module.exports.plugins || []).concat([
		new ExtractTextPlugin('[name].css')
	])
}
