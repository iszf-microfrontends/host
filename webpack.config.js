const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const dotenv = require('dotenv');
const path = require('path');
const pkg = require('./package.json');

const config = { ...dotenv.config().parsed };

module.exports = (env) => {
  const isDev = !!env.dev;

  const babelOptions = {
    presets: ['@babel/preset-typescript', ['@babel/preset-react', { runtime: 'automatic' }]],
  };

  const devPlugins = [];
  if (isDev) {
    devPlugins.push(new ReactRefreshWebpackPlugin());
  }

  return {
    entry: path.resolve(__dirname, './src/index'),
    mode: isDev ? 'development' : 'production',
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'index.js',
      publicPath: 'auto',
      clean: true,
    },
    devServer: {
      port: config.PORT,
      historyApiFallback: true,
      hot: true,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: babelOptions,
            },
          ],
        },
      ],
    },
    plugins: [
      new NodePolyfillPlugin(),
      new ModuleFederationPlugin({
        name: 'HOST',
        shared: {
          ...pkg.dependencies,
          react: {
            singleton: true,
            requiredVersion: pkg.dependencies['react'],
          },
          'react-dom': {
            singleton: true,
            requiredVersion: pkg.dependencies['react-dom'],
          },
        },
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './public/index.html'),
      }),
      new DefinePlugin({
        'process.env': JSON.stringify(config),
        __DEV__: isDev,
      }),
      ...devPlugins,
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      plugins: [new TsconfigPathsPlugin()],
    },
  };
};
