const path = require('path');

module.exports = {
	watch: true,
	entry: './src/client.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
};
