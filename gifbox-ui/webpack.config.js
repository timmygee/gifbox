const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
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
      path.resolve(uiRootPath),
      path.resolve(__dirname, './node_modules'),
    ],
  },

  module: {
    loaders: [
      {
        test: /(\.js|\.jsx)$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel-loader'],
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]',
      },
      {
        test: /(\.scss|\.css)$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!sass-loader',
        }),
      },
    ],
  },

  postcss: [autoprefixer],

  sassLoader: {
    data: '@import "theme/_config.scss";',
    includePaths: [uiRootPath],
  },

  plugins: [
    new ExtractTextPlugin({ filename: 'bundle.css', allChunks: true }),
  ],
};
