const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'inline-source-map', // Should only be used for develop
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port <--dev server
        'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors <-- reloading server
        './src/index', // app entry point
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        preLoaders: [
            {
                test: /\.jsx?$/,
                loader: 'eslint-loader',
                include: path.join(__dirname, 'src'),
            },
            {
                test: /\.json$/,
                loader: 'json',
            },
        ],
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: [ 'react-hot', 'babel-loader'],
                include: path.join(__dirname, 'src'),
            },
            {
                test: /\.css?$/,
                loader: 'style!css!',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader?outputStyle=expanded&includePaths[]=./node_modules/foundation/scss/',
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000',
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader',
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'file-loader?name=images/[name].[ext]',
            },

        ],

    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.scss']
    },
};

