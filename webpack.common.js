const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/index.ts'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[chunkhash:6].bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.js', '.css'],
    alias: {
      core: path.resolve(__dirname, './src/core'),
      components: path.resolve(__dirname, './src/components'),
      pages: path.resolve(__dirname, './src/pages'),
      services: path.resolve(__dirname, './src/services'),
      store: path.resolve(__dirname, './src/store'),
      partials: path.resolve(__dirname, './src/partials'),
      handlebars: 'handlebars/dist/handlebars.js',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
      favicon: path.resolve(__dirname, './public/favicon.ico'),
      minify: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.[chunkhash:6].css',
    }),
    new CssMinimizerPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './src/assets'),
          to: path.resolve(__dirname, 'dist/img'),
        },
      ],
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        parallel: true,
        extractComments: false,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          'css-loader',
          'postcss-loader',
        ],
      },
    ],
  },
};
