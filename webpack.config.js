const path = require('path');

const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');




module.exports = {
    entry: {
        main: './src/js/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.[name].js',
    },
    module: {
        rules: [
                        {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.scss$/,
                use:  [  'style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },

            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer({
                                    browsers:['ie >= 8', 'last 4 version']
                                })
                            ],
                            sourceMap: true
                        }
                    },

                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '../img/[name].[ext]'
                        },
                    },
                    'img-loader'
                ]
            }
         ]
    },
    plugins: [

        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),

        new CopyWebpackPlugin([
            {from:'src/img', to:'img'}
        ]),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/index.html',
            filename: 'index.html'
        }),

        new MiniCssExtractPlugin({
            filename: 'css/style.css',
        }),

        new CleanWebpackPlugin('dist', {} ),

    ],
};


