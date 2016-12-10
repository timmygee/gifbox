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



// var path = require('path');
// var webpack = require('webpack');
// var BundleTracker = require('webpack-bundle-tracker');

// module.exports = {
//   // base path
//   context: __dirname,


//   output: {
//     // Where complete bundle should be built to
//     path: path.resolve('./build/'),

//     // file naming convention
//     filename: 'bundle.js',
//   },

//   // Dev server - hot reloading
//   devServer: {
//     contentBase: './dist',
//     hot: true,
//     historyApiFallback: true
//   },

//   // linting config
//   eslint: {
//     configFile: './.eslintrc'
//   },  

//   plugins: [
//     // bundle tracking info
//     new BundleTracker({ filename: './webpack-stats.json' }),

//     // Make jquery available in every bundle - TODO: Do I really need jquery?
//     new webpack.ProvidePlugin({
//       $: 'jquery',
//       jQuery: 'jquery',
//       'window.jQuery': 'jquery',
//     }),
//   ],

//   module: {
//     loaders: [
//       // .js and .jsx files
//       {
//         test: /\.jsx?$/,
//         exclude: /node_modules/,
//         loader: 'react-hot!babel'
//       },
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         loader: 'eslint-loader'
//       }      
//     ]
//   },

//   resolve: {
//     // tells webpack where to look for modules
//     modulesDirectories: ['node_modules'],

//     // extensions that should be used to resolve modules
//     extensions: ['', '.js', '.jsx']
//   }
// }
