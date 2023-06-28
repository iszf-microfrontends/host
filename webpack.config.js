/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const path = require('path');
const { dependencies } = require('./package.json');

module.exports = (env) => {
  const isDev = !!env.dev;

  return {
    mode: isDev ? 'development' : 'production',
    devServer: {
      historyApiFallback: true,
      port: 5050,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
            },
          ],
        },
        {
          test: /\.(ts|tsx)?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
            },
          ],
        },
      ],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'HOST',
        remotes: {},
        shared: {
          ...dependencies,
          react: {
            eager: true,
            singleton: true,
            requiredVersion: dependencies['react'],
          },
          'react-dom': {
            eager: true,
            singleton: true,
            requiredVersion: dependencies['react-dom'],
          },
        },
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './public/index.html'),
      }),
      isDev && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),
    resolve: {
      alias: {
        '~': path.resolve(__dirname, 'src'),
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
  };
};
