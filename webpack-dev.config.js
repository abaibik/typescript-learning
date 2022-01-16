const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, "src", "index.ts"),
  devtool: "inline-source-map",
  devServer: { static: "public" },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new webpack.WatchIgnorePlugin({
      paths: [/\.js$/, /\.d\.ts$/],
    }),
    new HtmlWebpackPlugin({ template: "index.html" }),
  ],
  output: {
    filename: "public/index.js",
    path: path.resolve(__dirname, "scripts"),
  },
};
