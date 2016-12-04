var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        app: [
            './src/index.html',
            './src/main.js',
            './src/main.sass',
            './node_modules/bootstrap/dist/css/bootstrap.css',
            ]
    },
    output: {
        path: path.resolve(__dirname + '/out'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.sass$/, loaders: ['style-loader', 'css-loader', 'sass-loader']},
            { test: /\.css$/, loaders: ['style-loader', 'css-loader']},
            { test: /\.json$/, loader: 'json-loader'},
            { test: /(index\.html)|\.(ico|woff2?|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader?name=[name].[ext]' }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            Tether: "tether",
            "window.Tether": "tether",
            Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
            Button: "exports-loader?Button!bootstrap/js/dist/button",
            Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
            Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
            Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
            Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
            Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
            Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
            Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
            Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
            Util: "exports-loader?Util!bootstrap/js/dist/util",
        })
    ]
};