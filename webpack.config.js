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
        preLoaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'eslint-loader',
                include: __dirname,
                exclude: /node_modules/
            }
        ],
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(
                    'style-loader',
                    'css-loader')
            },

            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract(
                    'style-loader',
                    'css-loader!less-loader')
            },
            {
                test: /\.json$/,
                loader: 'json'
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
            { test: /\.(png|jpg|gif)$/,  loader: 'url?limit=8192' },
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=65000&mimetype=application/font-woff" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=65000&mimetype=application/octet-stream]" },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=65000&mimetype=application/vnd.ms-fontobject" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=65000&mimetype=image/svg+xml" }
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
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin("styles.css", { allChunks: true }),
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': '"development"'
          }
        })
    ];
} else if (__PROD__) {
    webpackConfig.plugins = [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new ExtractTextPlugin("styles.css", { allChunks: true }),
        new OptimizeCssAssetsPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: {removeAll: true } },
            canPrint: true
        }),
        new webpack.optimize.DedupePlugin(),
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
