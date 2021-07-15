const path = require('path');
const HtmlWebpackPlugin = require('webpackHtmlPlugin');

module.exports = {
  entry: './client/src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'client/dist'),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.jsx?/i,
        exclude: 'node_modules',
        use: {
          loader: 'babel-loader',
          options: [ '@babel/preset-env', '@babel/preset-react' ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/dist/index.html' })
  ],
};
