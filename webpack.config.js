var env = process.env.WEBPACK_BUILD || 'development';
var webpackConfig = require('./webpack.base.config');

module.exports = webpackConfig(env);
