const path = require('path');

const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './assets/index.tsx',
  output: {
    path: path.resolve(__dirname, 'src', 'assets', 'resources'),
    filename: 'opening-hours.js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.styl'],
    alias: {
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat',
    },
  },
  externals: {
    jquery: 'jQuery',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'opening-hours.css',
    }),
  ],
  stats: 'minimal',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.styl$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { url: false } },
          { loader: 'stylus-loader' },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            semicolons: false,
          },
        },
      }),
    ],
  },
};
