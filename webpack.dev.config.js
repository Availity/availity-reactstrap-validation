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
  '/components/validators/',
  '/components/checkboxes/',
  '/components/avform/',
  '/404.html',
];

var basePath = (env === 'production') ? (process.env.BASEPATH || '/availity-reactstrap-validation/') : '/';

var config = [{
  devtool: 'source-map',
  devServer: {
    contentBase: './build',
    stats: { chunks: false },
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
    path: './build',
    libraryTarget: 'umd',
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new CopyWebpackPlugin([{ from: './docs/static', to: 'assets' }]),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new StaticSiteGeneratorPlugin('main', paths, { basename: basePath }),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('/assets/style.css'),
  ],
  module: {
    loaders: [
      {
        test: /\.json$/,
        loaders: ['json-loader?cacheDirectory'],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader?cacheDirectory'],
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
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
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: { warnings: false },
      mangle: true,
    })
  );
}

module.exports = config;
