/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

// For our css modules these will be locally scoped
const CSSModuleLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
    localIdentName: '[name]_[local]_[hash:base64:5]',
    importLoaders: 2,
    camelCase: true,
    sourceMap: false, // turned off as causes delay
  },
};

// For our normal CSS files we would like them globally scoped
const CSSLoader = {
  loader: 'css-loader',
  options: {
    modules: 'global',
    importLoaders: 2,
    camelCase: true,
    sourceMap: false, // turned off as causes delay
  },
};

// Standard style loader (prod and dev covered here));
const devMode = process.env.NODE_ENV !== 'production';
const styleLoader = devMode ? 'style-loader' : MiniCssExtractPlugin.loader;

module.exports = env => {
  const { PLATFORM } = env;
  return merge([
    {
      entry: ['@babel/polyfill', path.resolve(__dirname, '../src')],
      resolve: {
        modules: [path.resolve(__dirname, '../src'), 'node_modules'],
      },
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
            },
          },
          {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loader: 'file-loader',
            options: {
              outputPath: 'assets/images',
              name: '[name].[ext]',
            },
          },
          {
            test: /\.(woff(2)?|ttf|eot|otf)$/i,
            loader: 'file-loader',
            options: {
              outputPath: 'assets/fonts',
              name: '[name].[ext]',
            },
          },
          {
            enforce: 'pre',
            test: /\.(js|jsx|mjs)$/,
            exclude: /node_modules/,
            use: [
              {
                loader: require.resolve('eslint-loader'),
                options: {
                  eslintPath: require.resolve('eslint'),
                  emitWarning: true,
                },
              },
            ],
          },
          {
            test: /\.(sa|sc|c)ss$/,
            exclude: /\.module\.(sa|sc|c)ss$/,
            use: [styleLoader, CSSLoader, 'sass-loader'],
          },
          {
            test: /\.module\.(sa|sc|c)ss$/,
            use: [styleLoader, CSSModuleLoader, 'sass-loader'],
          },
        ],
      },
      plugins: [
        new CleanWebpackPlugin(),
        new Dotenv(),
        new MiniCssExtractPlugin({
          filename: 'assets/css/[name]_[hash].css',
        }),
        new HtmlWebpackPlugin({
          template: './src/index.html',
          fileName: './index.html',
          hash: true,
        }),
        new webpack.DefinePlugin({
          PLATFORM,
          WEB_APP_VERSION: JSON.stringify(require('../package.json').version),
        }),
        new CopyWebpackPlugin([{ from: './src/assets/favicon.png', to: 'assets/images' }]),
        new CopyWebpackPlugin([{ from: './src/assets/locales', to: 'locales' }]),
      ],
      output: {
        filename: 'assets/js/[name]_[hash].bundle.js',
        path: path.resolve(__dirname, '..', 'dist'),
        publicPath: '/',
      },
      mode: "development"
    },
  ]);
};
