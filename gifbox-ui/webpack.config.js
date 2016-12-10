const path = require('path');
const uiRootPath = path.resolve(__dirname, 'src');
const buildPath = path.resolve(__dirname, 'dist');

module.exports = {
  context: uiRootPath,

  // entry point
  entry: {
    javascript: "./index.js",
    html: "./index.html",
  },

  output: {
    path: buildPath,
    filename: 'bundle.js',
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    root: uiRootPath,
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel-loader']
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]",
      }
    ]
  }
};
