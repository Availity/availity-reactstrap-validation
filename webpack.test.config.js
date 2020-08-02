var path = require('path');
var webpack = require('webpack');

var webpackConfig = {
  target: 'node',
  context: path.join(__dirname, 'src'),
  devtool: 'cheap-module-source-map',
  entry: {
    'availity-reactstrap-validation': ['./index.js'],
  },
  node: {
    fs: 'empty',
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader?cacheDirectory',
      },
    ],
  },
  resolve: {
    alias: {
      'availity-reactstrap-validation': path.resolve('./src'),
    },
    extensions: ['.js', '.jsx'],
  },
  externals: {
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
    'react/addons': true,
  },
  output: {
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]',
  },
};

module.exports = webpackConfig;
