const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = {

  context: path.join(__dirname, 'webpack'),

  entry: './entry.js',

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [ 'css-loader', 'postcss-loader' ]
        })
      }
    ]
  },

  output: {
    filename: path.join('js', 'bundle.js'),
    path: path.join(__dirname, 'src', 'assets'),
  },

  plugins: [
    new ExtractTextPlugin({
      filename: path.join('css', 'bundle.css')
    })
  ],

  resolve: {
    extensions: [ '.js', '.css' ]
  }

};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new UglifyJSPlugin());
}

module.exports = config;
