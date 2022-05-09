const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = (env, argv) => {
  const devMode = argv.mode !== 'production';
  return {
    entry: {
      demo: './src/demo.tsx',
      authoring: './src/components/authoring/authoring-app',
      plugin: './src/plugin.tsx'
    },
    devtool: devMode ? 'eval-cheap-module-source-map' : 'source-map',
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
      new HtmlWebpackPlugin({
        template: './src/public/authoring.html',
        filename: 'authoring.html',
        chunks: ['authoring']
      }),
      new HtmlWebpackPlugin({
        template: './src/public/demo.html',
        filename: 'demo.html',
        chunks: ['demo']
      })
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
  }
};

