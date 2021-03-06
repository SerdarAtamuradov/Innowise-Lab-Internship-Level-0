const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const jsLoaders = () => {
  const loaders = ['babel-loader']

  if (isDev) loaders.push('eslint-loader')

  return loaders
}

module.exports = {
  entry: __dirname + '/src/app/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/src/public/index.html',
      inject: 'body',
    }),
  ],
  devServer: {
    contentBase: './src/public',
    port: 7700,
    historyApiFallback: true,
  },
}
