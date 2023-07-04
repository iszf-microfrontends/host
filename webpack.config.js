const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const path = require('path');
const dotenv = require('dotenv');
const { dependencies } = require('./package.json');

const defaultEnvFile = dotenv.config();

module.exports = (env) => {
  const isDev = !!env.dev;

  const modeEnvFile = dotenv.config({ path: resolveRoot(`.env.${isDev ? 'dev' : 'prod'}`) });
  const parsedEnv = { ...defaultEnvFile.parsed, ...modeEnvFile.parsed };

  const babelOptions = {
    presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
    plugins: ['@babel/plugin-transform-runtime', '@emotion'],
  };

  const devPlugins = [];
  if (isDev) {
    devPlugins.push(new LiveReloadPlugin());
  }

  return {
    entry: resolveRoot('src/index'),
    mode: isDev ? 'development' : 'production',
    devtool: isDev && 'inline-source-map',
    output: {
      publicPath: 'auto',
      clean: true,
    },
    devServer: {
      port: parsedEnv.PORT,
      static: resolveRoot('dist'),
      historyApiFallback: {
        index: 'index.html',
      },
      hot: false,
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
      new NodePolyfillPlugin(),
      new ModuleFederationPlugin({
        name: 'HOST',
        remotes: {},
        shared: {
          ...dependencies,
          ...singletonDeps('react', 'react-dom', '@emotion/react', '@mantine/core', '@mantine/hooks'),
        },
      }),
      new HtmlWebpackPlugin({
        template: resolveRoot('public/index.html'),
      }),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(parsedEnv),
      }),
      ...devPlugins,
    ],
    resolve: {
      alias: {
        '~': resolveRoot('src'),
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
  };
};

function resolveRoot(...segments) {
  return path.resolve(__dirname, ...segments);
}

function singletonDeps(...deps) {
  return deps.reduce((depsObj, dep) => {
    depsObj[dep] = {
      singleton: true,
      requiredVersion: dependencies[dep],
    };
    return depsObj;
  }, {});
}
