const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: path.join(__dirname, '/client/src/routes.js'),
    plugins: [
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    }),
    new webpack.optimize.UglifyJsPlugin()
    ],
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
        },
        {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }]
    }
};
