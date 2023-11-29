const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const dotenv = require('dotenv');
const Dotenv = require('dotenv-webpack');
//const publicPath = '/template/';
const publicPath = '/';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
//const runtime = require("serviceworker-webpack-plugin/lib/runtime");
const env = dotenv.config().parsed;

// reduce it to a nice object, the same as before
const envKeys = Object?.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  mode: 'development',
  //  externals: {
  //   // require("jquery") is external and available
  //   //  on the global var jQuery
  //   "jquery": "jQuery"
  // },
  entry: {
    app: './src/index.jsx',
  },
  node: {
    fs: 'empty',
    dns: 'mock', // or dns: true, depending on your needs
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, './'), // where dev server will look for static files, not compiled
    host: '0.0.0.0',
    compress: true,
    port: 3001, // port number
    historyApiFallback: true,
    quiet: true,
  },
  externals: {
    // global app config object
    config: JSON.stringify({
      apiUrl: '',
      imageapiUrl: '',
      publicPath: '/template',
    }),
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname || 'dist', 'dist'), // base path where to send compiled assets
    publicPath: publicPath,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      Assets: path.resolve(__dirname, 'src/assets/'),
    },
    modules: [path.join(__dirname, 'js/helpers'), 'node_modules'],
  },
  module: {
    rules: [
      {
        // config for es6 jsx
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        // config for sass compilation
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000',
      },
      //  { // config for fonts
      //    test: /\.(woff|woff2|eot|ttf|otf)$/,
      //    use: [
      //      {
      //        loader: 'file-loader',
      //        options: {
      //          outputPath: 'fonts',
      //        }
      //      }
      //    ],
      //  }
    ],
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html',
      // message: "./public/firebase-messaging-sw.js",
      favicon: './public/logo-small.png',
    }),
    // compression plugin
    new MiniCssExtractPlugin({
      // plugin for controlling how compiled css will be outputted and named
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css',
    }),

    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, './public/firebase-messaging-sw.js'),
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        'css/*.*',
        'js/*.*',
        'fonts/*.*',
        'images/*.*',
      ],
    }),
    new webpack.DefinePlugin(envKeys),
    new webpack.ProvidePlugin({
      //To automatically load jquery
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new webpack.SourceMapDevToolPlugin({
      test: /\.(js|css|jsx|ts|tsx)($|\?)/i,
      filename: '[name].[contenthash].js.map',
      exclude: ['vendor.js'],
      noSources: true,
    }),
    new Dotenv({
      path: './.env', //Path to env file
      systemvars: true,
    }),

    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './public/firebase-messaging-sw.js'),
          // to: config.dev.assetsSubDirectory,
        },
      ],
      options: {
        concurrency: 100,
      },
    }),
  ],
};
