var autoprefixer = require('autoprefixer')

module.exports = {
	plugins: [
		autoprefixer({browsers: ['last 7 versions']})
	]
}