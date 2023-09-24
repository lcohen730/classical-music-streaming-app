require('dotenv').config();
const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = env => {
	return {
		entry: {
			App: './src/index.js',
			main: './src/main.js'
		},
		output: {
			path: path.resolve(__dirname, 'public/js/dist'),
			filename: '[name].[contenthash].js', // '[name].[contenthash].js' put this if you want to get hashed files to cache bust
			sourceMapFilename: "[name].[contenthash].js.map"
		},
		devtool: "source-map",
		module: {
			rules: [
				{
					test: /\.m?js$/,
					enforce: 'pre',
					use: ['source-map-loader'],
				},
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: ['babel-loader']
				},
				{
					test: /\.scss$/,
					use: [
						'style-loader',
						MiniCssExtractPlugin.loader,
						'css-loader',
						'sass-loader',
						'postcss-loader'
					]
				}
			]
		},
		resolve: {
			modules: [
				'node_modules'
			],
			fallback: {
				"path": require.resolve("path-browserify"),
				"os": require.resolve("os-browserify/browser"),
				/* "crypto": require.resolve("crypto-browserify") */
				"crypto": false
			}
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: 'style.[contenthash].css' // 'style.[contenthash].css' put this if you want to get hashed files to cache bust
			}),
			new HtmlWebpackPlugin({
				inject: true,
				hash: true,
				template: './src/index.html',
				children: false,
				filename: '../../index.html'
			}),
			new CleanWebpackPlugin(),
			new webpack.ProvidePlugin({
				'React': 'react',
			}),
			new webpack.DefinePlugin({
				'process.env.MONGO_URI': JSON.stringify(process.env.MONGO_URI),
				'process.env.CLIENT_ID': JSON.stringify(process.env.CLIENT_ID),
				'process.env.SECRET': JSON.stringify(process.env.SECRET)
			})
		],
		optimization: {
			splitChunks: {
				chunks: 'all',
				minSize: 0
			},
			usedExports: true,
			sideEffects: true
		}
	};
};
