var webpack = require('webpack');  // eslint-disable-line
var path = require('path');  // eslint-disable-line

module.exports = {
  entry: './app/main.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/public/build',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      { test: /\.(html|png|jpg|jpeg|gif|eot|svg)$/,
          loader: "file?name=[path][name].[ext]&context=./app/static"
        },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
    ]
  }
};
