const path = require('path');

const uiRootPath = path.resolve(__dirname, 'src');
const buildPath = path.resolve(__dirname, 'dist');

module.exports = {
  context: uiRootPath,

  // entry point
  entry: {
    javascript: './index.js',
    html: './public/index.html',
  },

  output: {
    path: buildPath,
    filename: 'bundle.js',
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    modules: [
      path.resolve(uiRootPath),
      path.resolve('./node_modules'),
    ],
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel-loader'],
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  // sassLoader: {
  //   data: '@import "' + path.resolve(__dirname, 'theme/_theme.scss') + '";',
  // },
};
