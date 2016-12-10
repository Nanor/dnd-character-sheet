var path = require('path');

module.exports = {
    entry: {
        app: [
            './src/index.html',
            './src/main.js',
            './src/main.sass',
            './node_modules/bootstrap/dist/css/bootstrap.css',
            './node_modules/select2/dist/css/select2.min.css',
            './node_modules/select2-bootstrap-theme/dist/select2-bootstrap.min.css'
        ]
    },
    output: {
        path: path.resolve(__dirname + '/out'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.sass$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
            { test: /\.json$/, loader: 'json-loader' },
            { test: /(index\.html)|\.(ico|woff2?|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader?name=[name].[ext]' }
        ]
    }
};