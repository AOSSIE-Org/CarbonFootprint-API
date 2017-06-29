const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: path.join(__dirname, '/client/src/routes.js'),
    output: {
        path:path.join(__dirname, '/client/public/js'),
        filename:'bundle.js'
    },
    resolve: {
        extensions:['.js','.jsx']
    },
    module: {
        loaders: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            exclude : '/node_modules/',
            include: path.join(__dirname,'/client/src')
        }]
    }
};
