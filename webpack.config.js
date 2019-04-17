const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const cssnano = require('cssnano');
const path = require('path');
const postcssCustomMedia = require('postcss-custom-media');
const postcssInitial = require('postcss-initial');
const postcssMediaMinmax = require('postcss-media-minmax');
const postcssNested = require('postcss-nested');

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
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                postcssNested(),
                postcssCustomMedia({
                  importFrom: {
                    customMedia: {
                      '--desktop': 'screen and (width > 768px)',
                      '--mobileL': 'screen and (width <= 425px)',
                      '--mobileM': 'screen and (width <= 375px)',
                      '--mobileS': 'screen and (width <= 320px)',
                      '--tablet': 'screen and (width <= 768px)'
                    }
                  }
                }),
                postcssMediaMinmax(),
                postcssInitial(),
              ]
            }
          }
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

module.exports = (env, argv) => {
  if (argv.mode === 'production') {
    config.plugins.push(new TerserPlugin());
    config.module.rules[0].use[2].options.plugins.push(
      cssnano({
        'autoprefixer': {
          add: true,
          browsers: [
            /* ref: http://browserl.ist/?q=last+2+versions */
            'last 2 versions',
            '> 1%'
          ],
        },
        'normalizeCharset': {
          add: true
        }
      })
    );
  }

  return config;
};
