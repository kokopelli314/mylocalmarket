// Define API's host URL - dev or production
var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

module.exports = {
    context: __dirname,

    entry: {
        farmer: './assets/js/markets/farmer.js',
        interactions: './assets/js/markets/interactions.js',
    },

    output: {
        path: path.resolve('./assets/bundles/'),
        filename: '[name]-[hash].js',
    },

    devtool: 'source-map',

    mode: process.env.NODE_ENV === 'develop' ? 'development' : 'production',

    plugins: [
        new BundleTracker({filename: './webpack-stats.json'}),
        new webpack.DefinePlugin({
            __API_URL__: hostAPI(process.env.NODE_ENV)
        }),
        new webpack.ProvidePlugin({
            'Promise': 'es6-promise'
        })
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
        ],
    },

    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    }

}

function hostAPI(environment) {
    switch (environment) {
        case 'production':
            return "'https://nathanclonts.com/mylocalmarket/'";
        case 'develop':
            return "'http://127.0.0.1:8000/'";
    }
};
