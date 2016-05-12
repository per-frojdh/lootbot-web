/*
 * Devserver setup
 * https://webpack.github.io/docs/webpack-dev-server.html
* */

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
	noInfo: true,
	quiet: false,
	publicPath: config.output.publicPath,
	hot: true,
	historyApiFallback: true,
	stats: { colors: true },

}).listen(3000, 'localhost', function (err, result) {
	if (err) {
		console.log(err);
	}
	console.info('==> Server listening at localhost:3000');
});
