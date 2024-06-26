const webpack = require('webpack');
const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');
const path = require('path');
require('dotenv').config({ path: './.env' });

const devConfig = {
  mode: 'development',
  // devtool: 'eval-source-map',
  // entry: {
  //   app: './src/index.js',
  // },
  // output: {
  //   publicPath: '/',
  //   clean: true,
  // },
  devServer: {
    port: 5000,
    historyApiFallback: {
      index: '/index.html'
    },
    hot: true,
    liveReload: true,
    contentBase: path.resolve(__dirname, '../public'),
    // open: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
      {
        test: /\.(ts|tsx?)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
                tsx: true,
                dynamicImport: true,
                decorators: false,
              },
            },
          },
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        dashboard: 'dashboard@http://localhost:5001/remoteEntry.js',
        auth: 'auth@http://localhost:5002/remoteEntry.js',
      },
      shared: packageJson.dependencies,
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
    new CleanWebpackPlugin(),
  ]
}

module.exports = merge(commonConfig, devConfig);