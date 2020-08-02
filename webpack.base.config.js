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
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader?cacheDirectory',
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: ['node_modules', path.resolve('./src')],
    },
    plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env),
      }),
    ],
  };

  if (env === 'production') {
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin({ minimize: true, sourceMap: true, mangle: true })
    );
  }

  return config;
};
