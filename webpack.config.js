let path = require('path');

module.exports = {
  entry: './src/index.js',
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      exclude: '/node_modules/'
    }]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'bundle.js'
  }
};
