const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const config = {
  context: path.join(__dirname, 'webpack'),
  entry: './entry.js',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  output: {
    filename: path.join('js', 'bundle.js'),
    path: path.join(__dirname, 'src', 'assets'),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: path.join('css', 'bundle.css')
    })
  ],
  resolve: {
    extensions: [ '.js', '.css' ]
  }
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new TerserPlugin());
}

module.exports = config;
