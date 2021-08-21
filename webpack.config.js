const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: './client/src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'client/dist'),
    filename: 'bundle.js',
  },
  mode: 'development',
  resolve: { extensions: ['*', '.js', '.jsx'] },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: path.resolve(__dirname, 'node_modules', 'coverage'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ '@babel/preset-env', '@babel/preset-react' ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Atelier',
      'meta': {
        'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
        'theme-color': '#4285f4',
        'description': 'A cheese-inspired shopping website',
        'keywords': 'atelier, gouda, cheese, Hack Reactor, React, RPP29',
        'author': 'Team Gouda'
      },
      favicon: './client/assets/favicon-64x64.png',
      htmlAttributes: {
        lang: 'en'
      }
    }),
    new CompressionPlugin({
      filename: '[base].br',
      algorithm: 'brotliCompress',
      test: /\.(js|css|html|svg)$/,
      compressionOptions: {
        level: 11,
        threshold: 10240,
        minRatio: 0.8,
      },
    }),
  ],
};
