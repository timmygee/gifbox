const path = require('path');

module.exports = {
  context: __dirname + '/src',

  // entry point
  entry: {
    javascript: "./index.js",
    html: "./index.html",
  },

  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    root: path.resolve(__dirname, '/src')
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
