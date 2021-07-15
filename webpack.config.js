const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
        exclude: path.resolve(__dirname, 'node_modules'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ '@babel/preset-env', '@babel/preset-react' ],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ title: 'Atelier' }),
  ],
};
