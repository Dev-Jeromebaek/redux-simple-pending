const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: ['./src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'pending.min.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        include: [path.resolve(__dirname, 'src')],
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.ts'],
  },
  plugins: [new CleanWebpackPlugin()],
};
