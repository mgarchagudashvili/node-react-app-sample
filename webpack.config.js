module.exports = {
    entry: [
        './public-client/src/index.js'
    ],
    output: {
        path: __dirname,
        publicPath: '/public-client/',
        filename: './public-client/bundle.js'
    },
    module: {
        loaders: [{
            exclude: '/node_modules/',
            loader: 'babel-loader',
            options: {
                presets: ['es2015', 'react', 'stage-1']
            },
            test: /\.js$|\.jsx$/,
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devServer: {
        historyApiFallback: true,
        contentBase: __dirname + '/public-client',
        port: 3333
    }
};
