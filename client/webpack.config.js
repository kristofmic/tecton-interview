const path = require('path');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const root = path.resolve(__dirname, '..');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: devMode ? 'development' : 'production',

  target: 'web',

  entry: {
    main: path.resolve(root, 'client/src/index.jsx'),
  },

  output: {
    filename: devMode ? '[name].js' : '[name].[chunkhash].min.js',
    chunkFilename: devMode ? '[name].js' : '[name].[chunkhash].min.js',
    path: path.resolve(root, 'public'),
    publicPath: devMode ? '/public/' : 'https://d1u48y8pqyl287.cloudfront.net/',
  },

  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },

  module: {
    rules: [
      {
        resource: {
          test: /\.jsx?$/,
          exclude: /node_modules/,
        },
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        resource: {
          test: /\.scss$/,
        },
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        resource: {
          test: /\.css$/,
        },
        use: [{ loader: MiniCssExtractPlugin.loader }, { loader: 'css-loader' }],
      },
      {
        resource: {
          test: /\.(woff(2)?|ttf|eot|svg|png|jpg|gif)$/,
        },
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },

  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 7,
          output: {
            beautify: false,
            comments: false,
          },
        },
      }),
    ],
    runtimeChunk: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'initial',
          priority: -10,
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        BROWSER: JSON.stringify(true),
      },
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), // ignore moment locales
    new ManifestPlugin(),
    new CaseSensitivePathsPlugin(),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[contenthash].css',
    }),
  ],
};
