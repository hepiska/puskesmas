const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  plugins: [
    new Dotenv({
      path: './dev.env',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: './public',
    hot: true,
    historyApiFallback: true,
    port: 8082,
  },
}