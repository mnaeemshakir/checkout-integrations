/* eslint-disable */
const path = require('path');
const merge = require('webpack-merge');
// Plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// const Visualizer = require('webpack-visualizer-plugin');
// Configs
const baseConfig = require('./webpack.base.config');

const appVersion = require('../package.json').version;
const prodConfiguration = () => {
  return merge([
    {
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            parallel: true,
            sourceMap: false,
          }),
        ],
      },
      plugins: [
        // new Visualizer({
        //   filename: './statistics.html'
        // }),
        new MiniCssExtractPlugin({
          filename: 'assets/css/[name]_[hash].css',
        }),
        new OptimizeCssAssetsPlugin(),
      ],
      resolve: {
        alias: {
          moment: 'moment/min/moment.min.js',
        },
      },
      output: {
        filename: 'assets/js/[name].[hash].bundle.js',
        path: path.resolve(__dirname, '..', `build-${appVersion}`),
        publicPath: '/',
      },
    },
  ]);
};

module.exports = env => {
  return merge(baseConfig(env), prodConfiguration(env));
};
