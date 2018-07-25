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
                use:  [  'style-loader', MiniCssExtractPlugin.loader, 'css-loader','sass-loader']
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
            /*{
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
            },*/
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.ttf$/, /\.eot$/, /\.woff$/, /\.woff2$/],
                loader: require.resolve('url-loader'),
                options: {
                    limit: 1000000000000,
                    name: '../img/[name].[hash:8].[ext]',
                },
            },
        ]
    },
    plugins: [

        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),

        new CopyWebpackPlugin([
            {from:'src/img', to:'img'},
            {from:'src/fonts', to:'fonts'}
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


