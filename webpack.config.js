const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const path = require('path');
const { dependencies } = require('./package.json');
const Dotenv = require('dotenv-webpack');

const resolveRoot = (...segments) => path.resolve(__dirname, ...segments);

module.exports = (env) => {
  const isDev = !!env.dev;

  const babelOptions = {
    presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
    plugins: ['@babel/plugin-transform-runtime', '@emotion', isDev && require.resolve('react-refresh/babel')].filter(Boolean),
  };

  return {
    mode: isDev ? 'development' : 'production',
    devtool: isDev && 'inline-source-map',
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
              loader: require.resolve('babel-loader'),
              options: babelOptions,
            },
          ],
        },
        {
          test: /\.(ts|tsx)?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: require.resolve('ts-loader'),
            },
          ],
        },
      ],
    },
    plugins: [
      new Dotenv({
        path: resolveRoot(`.env.${isDev ? 'dev' : 'prod'}`),
      }),
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
        template: resolveRoot('public/index.html'),
      }),
      isDev && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),
    resolve: {
      alias: {
        '~': resolveRoot('src'),
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
  };
};
