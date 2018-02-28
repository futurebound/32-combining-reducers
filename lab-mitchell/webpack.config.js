'use strict';

require('dotenv').config({path: `${__dirname}/.dev.env`}); //rely on ENV variables on machine, webpack can read those in, and make them available as variables in code
let production = process.env.NODE_ENV === 'production'; //GET ME THE BOOLEAN VALUE OF WHETHER THE NODE_ENV VARIABLE, LOL THIS SO COOL

const HtmlPlugin = require('html-webpack-plugin'); //helps when using the [hash] things
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //for the CSS things
const CleanPlugin = require('clean-webpack-plugin');
const UglifyPlugin = require('uglifyjs-webpack-plugin');
const {DefinePlugin, EnvironmentPlugin} = require('webpack');

let plugins = [
  new HtmlPlugin({ template: `${__dirname}/src/index.html` }),
  new ExtractTextPlugin('bundle-[hash].css'),
  new EnvironmentPlugin(['NODE_ENV']), //grabs process.env.NODE_ENV and set taht value in the environment
  new DefinePlugin({ //make global variables available throughout application, sets up default array for plugins
    __DEBUG__: JSON.stringify(!production),
  }),
];

if(production) {
  plugins = plugins.concant([
    new CleanPlugin(),
    new UglifyPlugin(),
  ]);
}

module.exports = {
  plugins,
  devServer: {
    historyApiFallback: true,
  },
  devtool: production ? undefined : 'source-map', //if we in production, WE DON'T WANT SOURCE MAPS. DON'T LET THEM READ CODE BASE
  entry: `${__dirname}/src/main.js`,
  output: {
    filename: 'bundle-[hash].js',
    path: `${__dirname}/build`,
    publicPath: '/',
  },
  module: {
    rules: [ //which files do we want to process
      {
        test: /\.js$/, // the $ means THE END of the thing, not every. the regex is already the every part
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader']),
      },
      { //THIS FOR SVG FONT ICONS N STTUFF, builds static asset stored in directory under NAME in OPTIONS below
        test: /\.(woff|woff2|ttf|eot|glyph|svg)$/,
        use: [
          {
            loader: 'url-loader', //SET MAX LIMIT ON URL LOADER SO WILL PASS TO FILE LOADER
            options: {
              limit: 10000,
              name: 'font/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(jpg|jpeg|gif|png|tiff)$/,
        // exclude: /\.(glyph|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 60000,
              name: 'image/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(mp3|mp4|wav|flac|ogg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'audio/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
};