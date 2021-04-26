const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const entry = {
  'index': path.resolve(__dirname, 'src/frontend/index.ts'),
};

module.exports = {
  target: 'web',
  entry: entry,
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin(),
  ],
  output: {
    path: path.resolve(__dirname, 'src/public'),
    filename: '[name].js'
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx']
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(ts|js)x?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          fix: true,
        },
      },
      {
        test: /\.(ts|js)x?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  externals: {}
}