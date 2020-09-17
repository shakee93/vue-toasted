var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	entry: {
		'vue-toasted' : './src/index.js',
		'vue-toasted.min' : './src/index.js'
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		publicPath: '/dist/',
		filename: '[name].js',
		libraryTarget: 'umd'
	},
	externals: {
		hammerjs: 'hammerjs',
		animejs: 'animejs'
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						'scss': 'vue-style-loader!css-loader!postcss-loader!sass-loader',
						'sass': 'vue-style-loader!css-loader!postcss-loader!sass-loader?indentedSyntax'
					}
					// other vue-loader options go here
				}
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
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
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js'
		}
	},
	devServer: {
		historyApiFallback: true,
		noInfo: true
	},
	performance: {
		hints: false
	},
	devtool: '#source-map'
}

if (process.env.NODE_ENV === 'production') {
	module.exports.devtool = '#source-map'
	// http://vue-loader.vuejs.org/en/workflow/production.html
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			include: /\.min\.js$/,
			sourceMap: false,
			compress: { warnings: false },
			comments: false,
		}),
		new webpack.ProvidePlugin({}),
		// new BundleAnalyzerPlugin(),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
	])
}
