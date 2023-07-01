const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const path = require('path');
const { dependencies: deps } = require('./package.json');
const dotenv = require('dotenv');
const webpack = require('webpack');

const resolveRoot = (...segments) => path.resolve(__dirname, ...segments);

const defaultEnvFile = dotenv.config();

module.exports = (env) => {
  const isDev = !!env.dev;

  const modeEnvFile = dotenv.config({
    path: resolveRoot(`.env.${isDev ? 'dev' : 'prod'}`),
  });
  const parsedEnv = { ...defaultEnvFile.parsed, ...modeEnvFile.parsed };

  const babelOptions = {
    presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
    plugins: ['@babel/plugin-transform-runtime', '@emotion', isDev && 'react-refresh/babel'].filter(Boolean),
  };

  return {
    mode: isDev ? 'development' : 'production',
    devtool: isDev && 'inline-source-map',
    output: {
      clean: true,
    },
    devServer: {
      historyApiFallback: true,
      port: parsedEnv.PORT,
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
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps['react'],
          },
          'react-dom': {
            singleton: true,
            requiredVersion: deps['react-dom'],
          },
        },
      }),
      new HtmlWebpackPlugin({
        template: resolveRoot('public/index.html'),
      }),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(parsedEnv),
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
