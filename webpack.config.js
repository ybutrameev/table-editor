const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => {
    return {
        entry: './src/index.js',
        resolve: {
            extensions: ['*', '.js', '.jsx', '.scss']
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/',
            filename: 'bundle.js'
        },
        module: {
            rules: [
                { test: /\.(js|jsx)$/, exclude: /node_modules/, use: 'babel-loader' },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        'css-hot-loader',
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-resources-loader',
                            options: {
                                resources: path.resolve(__dirname, 'src', 'app', 'style', 'abstract', '_abstract.scss')
                            }
                        }
                    ]
                }
            ]
        },
        node: {
            fs: 'empty'
        },
        mode: 'development',
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            publicPath: '/',
            compress: true,
            port: 8000,
            hot: true,
            historyApiFallback: true
          },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({
                template: 'src/public/index.html'
            }),
            new MiniCssExtractPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    REBEM_MOD_DELIM: JSON.stringify('_'),
                    REBEM_ELEM_DELIM: JSON.stringify('-')
                }
            })
        ]
    }
}