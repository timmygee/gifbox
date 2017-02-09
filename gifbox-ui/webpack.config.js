const path = require('path');
const autoprefixer = require('autoprefixer');

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
    extensions: ['', '.scss', '.css', '.js', '.json'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
    ],
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.html$/,
        loader: 'file-loader?name=[name].[ext]',
      },
      {
        test: /\.(scss|css)$/,
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]&-autoprefix',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },

  postcss: [autoprefixer],
};
