const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
      inject: false,
      templateContent: ({htmlWebpackPlugin}) => `
        <html lang="en-US">
          <head>
            ${htmlWebpackPlugin.tags.headTags}
          </head>
          <body>
            <h1>Hello World</h1>
            ${htmlWebpackPlugin.tags.bodyTags}
          </body>
        </html>
      `,
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
  ],
};
