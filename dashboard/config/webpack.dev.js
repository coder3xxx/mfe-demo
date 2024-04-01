const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

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
    port: 5001,
    historyApiFallback: {
      index: '/index.html'
    },
    hot: true,
    liveReload: true,
    // open: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'dashboard',
      filename: 'remoteEntry.js',
      exposes: {
        './DashboardApp': './src/main'
      },
      shared: packageJson.dependencies,
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}

module.exports = merge(commonConfig, devConfig);