// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add addional webpack configurations.
// For more information refer the docs: https://getstorybook.io/docs/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.
const mainConfig = require('../webpack.config.js');
// const path = require('path');

// const uiRootPath = path.resolve(__dirname, '../', 'src');
// console.log(uiRootPath)

module.exports = mainConfig;

// module.exports = {
//   plugins: [
//     // your custom plugins
//   ],
//   module: {
//     loaders: [
//       // add your custom loaders.
//     ],
//   },
//   resolve: {
//     extensions: ['', '.js', '.jsx', '.json'],
//     modules: [
//       path.resolve(uiRootPath),
//       path.resolve('./node_modules'),
//     ],
//   },
// };
