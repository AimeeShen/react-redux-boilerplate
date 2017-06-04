var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

var autoprefixer = require('autoprefixer');

// ENV
var __PROD__ = process.env.NODE_ENV === 'production';
var __DEV__ = process.env.NODE_ENV === 'development';

var webpackConfig = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                enforce: "pre",
                loader: 'eslint-loader',
                include: __dirname,
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader",
                    publicPath: "/dist"
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        "css-loader",
                        "less-loader"
                    ]
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        "css-loader",
                        "sass-loader"
                    ]
                })
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: __dirname,
                query: {
                    presets: ['es2015', 'stage-0', 'react']
                }
            },
            { test: /\.(png|jpg|gif)$/,  loader: 'url-loader?limit=8192' },
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=65000&mimetype=application/font-woff" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=65000&mimetype=application/octet-stream]" },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=65000&mimetype=application/vnd.ms-fontobject" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=65000&mimetype=image/svg+xml" }
        ]
    },
    resolve: {
        alias: {
            Components: path.resolve(__dirname, 'components')
        }
    },

};

// Plugins for different environment
if (__DEV__) {
    webpackConfig.plugins = [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin({
            filename: "styles.css",
            allChunks: true
        }),
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': '"development"'
          }
        })
    ];
} else if (__PROD__) {
    webpackConfig.plugins = [
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin({
            filename: "styles.css",
            allChunks: true
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: {removeAll: true } },
            canPrint: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                unused: true,
                dead_code: true,
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': '"production"'
          }
        })
    ];
}

module.exports = webpackConfig;
