// module.loaders section allows to specify transformations on specific files.
// module.plugins section is for declaring and configuring optimization plugins
// => DefinePlugin allows us to define the NODE_ENV variable as a global variable
//    in the bundling process as if it was defined in one of the scripts. Some modules
//    (e.g. React) relies on it to enable or disable specific features for the current
//    environment (production or development).
// => DedupePlugin removes all the duplicated files (modules imported in more than one module).
// => OccurenceOrderPlugin helps in reducing the file size of the resulting bundle.
// => UglifyJsPlugin minifies and obfuscates the resulting bundle using UglifyJS

const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'src', 'app-client.js'),
  output: {
    path: path.join(__dirname, 'src', 'static', 'js'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: path.join(__dirname, 'src'),
      loader: ['babel-loader'],
      query: {
        cacheDirectory: 'babel_cache',
        presets: ['react', 'es2015']
      }
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      mangle: true,
      sourcemap: false,
      beautify: false,
      dead_code: true
    })
  ]
};
