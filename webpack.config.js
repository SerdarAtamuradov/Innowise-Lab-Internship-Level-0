const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: __dirname + "/src/app/index.js",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/src/public/index.html",
      inject: "body",
    }),
  ],
  devServer: {
    contentBase: "./src/public",
    port: 7700,
    historyApiFallback: true,
  },
};
