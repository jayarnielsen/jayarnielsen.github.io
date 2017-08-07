const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, './src/_assets'),
  entry: {
    app: ['./js/app.js', './scss/app.scss'],
  },
  output: {
    path: path.resolve(__dirname, './src/assets'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: "css-loader"
          }, {
            loader: "resolve-url-loader"
          }, {
            loader: "sass-loader"
          }],
        }),
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        include: path.resolve(__dirname, './src/_assets'),
        loader: 'url-loader',
        options: {
          limit: 4096,
          name: '[path][name].[ext]',
        }
      }, // inline base64 URLs for <=30k images, direct URLs for the rest
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true,
    }),
    new CopyWebpackPlugin([{
      from: 'img/**/*',
      to: '[path][name].[ext]',
    },{
      from: 'pdf/**/*',
      to: '[path][name].[ext]',
    }],{
      copyUnmodified: true,
    }),
  ],
};