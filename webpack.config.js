const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
  entry: {
    demo: './src/demo.tsx',
    authoring: './src/components/authoring/authoring-app',
    plugin: './src/plugin.tsx'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',

            options: {
              modules: {
                mode: "local",
                localIdentName: '[name]--[local]--TETipsPluginV1'
              },
              sourceMap: true,
              importLoaders: 1,
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
    ]
  },
  devServer: {
    'static': {
      directory: './dist'
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  plugins: [
    // new CopyPlugin({
    //   patterns: [{
    //     from: 'src/public/',
    //     to: "dist/"
    //   }],
    // })
    new HtmlWebpackPlugin({
        template: './src/public/demo.html',
        filename: 'demo.html',
    }),
    // new CleanWebpackPlugin()
  ],
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    '@concord-consortium/lara-plugin-api': 'LARA.PluginAPI_V3'
  },
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.js'
    ],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  }
};

module.exports = config;