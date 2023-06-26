const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const path = require("path");
const { dependencies } = require("./package.json");

module.exports = (env) => {
  const isDev = !!env.dev;

  return {
    mode: isDev ? "development" : "production",
    devServer: {
      compress: true,
      port: 9000,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
            },
          ],
        },
        {
          test: /\.(ts|tsx)?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "ts-loader",
            },
          ],
        },
      ],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "Host",
        remotes: {},
        shared: {
          ...dependencies,
          react: { singleton: true },
          "react-dom": { singleton: true },
        },
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "./public/index.html"),
      }),
      isDev && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
  };
};
