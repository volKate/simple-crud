import { resolve as _resolve } from 'path';
import * as webpack from 'webpack';
import NodemonPlugin from 'nodemon-webpack-plugin';


const config: webpack.Configuration = {
  entry: './src/index.ts',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
  },
  output: {
    filename: 'bundle.js',
    path: _resolve(__dirname, './dist/'),
  },
  plugins: [
    new NodemonPlugin(),
  ]
};

export default config;
