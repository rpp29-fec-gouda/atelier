const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: './app/client/src/index.jsx',
  devtool: 'inline-source-map',
  // devServer: {
  //   inline: true // false causes page to remain the same after changes until a manual refresh is done
  // },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  mode: 'development',
  resolve: {
    extensions: ['*', '.tsx', '.ts', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
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
      favicon: './app/client/assets/favicon-64x64.png',
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
