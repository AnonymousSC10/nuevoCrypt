const path = require('path')

module.exports = {
    entry: {
        'main_front': './src/main_front.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public/_next/static/js'),
    },
};