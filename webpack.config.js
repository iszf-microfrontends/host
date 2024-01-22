const dotenv = require('dotenv');
const path = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { DefinePlugin } = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { dependencies: deps } = require('./package.json');

const { NODE_ENV } = process.env;

const envConfig = { ...dotenv.config({ path: `.env.${NODE_ENV.split('-')[0]}` }).parsed };

const isDev = NODE_ENV === 'development';
const isAnalyze = NODE_ENV === 'production-analyze';

module.exports = () => {
  const devPlugins = [
    new ReactRefreshWebpackPlugin({
      exclude: [/node_modules/, /bootstrap\.tsx$/],
    }),
  ];

  const analyzePlugins = [new BundleAnalyzerPlugin()];

  const babelOptions = {
    plugins: [isDev && require.resolve('react-refresh/babel')].filter(Boolean),
    presets: [
      ['@babel/preset-react', { runtime: 'automatic' }],
      '@babel/preset-typescript',
      'atomic-router/babel-preset',
      'patronum/babel-preset',
    ],
  };

  return {
    target: 'web',
    entry: './src/index',
    mode: isDev ? 'development' : 'production',
    devtool: isDev ? 'inline-source-map' : 'source-map',
    devServer: {
      hot: true,
      static: path.join(__dirname, 'dist'),
      port: envConfig.PORT,
      liveReload: false,
      historyApiFallback: true,
    },
    output: {
      publicPath: 'auto',
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/,
          type: 'asset/resource',
        },
        {
          test: /\.json$/,
          type: 'json',
        },
        {
          test: /\.css$/,
          oneOf: [
            {
              test: /\.module\.css$/,
              use: [
                MiniCssExtractPlugin.loader,
                {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 1,
                    modules: true,
                  },
                },
                'postcss-loader',
              ],
            },
            {
              use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            },
          ],
        },
        {
          test: /\.(ts|tsx)$/,
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
      new MiniCssExtractPlugin(),
      new NodePolyfillPlugin(),
      new ModuleFederationPlugin({
        name: envConfig.APP_NAME,
        shared: {
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
        template: './public/index.html',
        templateParameters: {
          title: envConfig.APP_NAME,
        },
      }),
      new DefinePlugin({
        'process.env': JSON.stringify(envConfig),
        __DEV__: isDev,
      }),
    ]
      .concat(isDev && devPlugins)
      .concat(isAnalyze && analyzePlugins)
      .filter(Boolean),
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      plugins: [new TsconfigPathsPlugin()],
    },
  };
};
