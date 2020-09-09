var path = require('path');
var webpack = require('webpack');
var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpackConfig = require('./webpack.base.config');

var env = process.env.WEBPACK_BUILD || 'development';
var paths = [
  '/',
  '/components/',
  '/components/avform/',
  '/components/validators/',
  '/components/checkboxes/',
  '/404.html',
];

var basePath = (env === 'production') ? (process.env.BASEPATH || '/availity-reactstrap-validation/') : '/';

var config = [{
  devtool: 'source-map',
  devServer: {
    contentBase: './build',
    stats: { chunks: false },
    inline: false,
    historyApiFallback: true,
  },
  entry: {
    main: './docs/lib/app.js',
  },
  node: {
    fs: 'empty',
  },
  output: {
    filename: 'bundle.js',
    publicPath: basePath,
    path: path.join(__dirname, 'build'),
    libraryTarget: 'umd',
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new CopyWebpackPlugin([{ from: './docs/static', to: 'assets' }]),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
    new StaticSiteGeneratorPlugin('main', paths, { basename: basePath }),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin('assets/style.css'),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader?cacheDirectory',
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'bootstrap-css': path.join(__dirname, 'node_modules/bootstrap/dist/css/bootstrap.css'),
      'availity-reactstrap-validation': path.resolve('./src'),
    },
  },
}];

if (env === 'development') {
  config.push(webpackConfig('development'));
  config.push(webpackConfig('production'));
} else {
  config[0].plugins.push(
    new webpack.optimize.UglifyJsPlugin({ minimize: true, sourceMap: true, mangle: true })
  );
}

module.exports = config;
