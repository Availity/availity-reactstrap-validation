var path = require('path');
var webpack = require('webpack');

var libraryName = 'AvailityReactstrapValidation';

module.exports = function (env) {
  var outputFile = libraryName.toLowerCase() + (env === 'production' ? '.min.js' : '.js');

  var config = {
    devtool: 'source-map',
    entry: [path.join(__dirname, 'src/index.js')],
    output: {
      path: path.join(__dirname, 'dist'),
      filename: outputFile,
      library: libraryName,
      libraryTarget: 'umd',
      umdNamedDefine: true,
    },
    externals: [
      {
        react: {
          root: 'React',
          commonjs2: 'react',
          commonjs: 'react',
          amd: 'react',
        },
      },
      {
        'react-dom': {
          root: 'ReactDOM',
          commonjs2: 'react-dom',
          commonjs: 'react-dom',
          amd: 'react-dom',
        },
      },
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
      ],
    },
    resolve: {
      extensions: ['', '.js', '.jsx', '.json'],
      root: [path.resolve('./src')],
    },
    plugins: [
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env),
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
    ],
  };

  if (env === 'production') {
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        compress: { warnings: false },
        mangle: true,
      })
    );
  }

  return config;
};
