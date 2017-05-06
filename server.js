var path = require('path');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');

var express = require('express');
var app = express();
var port = 8000;

var webpackConfig = Object.create(config);
webpackConfig.entry = [
    './index.js',
    'webpack-hot-middleware/client?reload=true'
];
webpackConfig.output = {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:8000/static/'
};

var compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
    quiet: false,
    noInfo: false,
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: true
    }
}));
app.use(webpackHotMiddleware(compiler));

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, function(error) {
    if (error) {
        console.error(error);
    } else {
        console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
    }
});
