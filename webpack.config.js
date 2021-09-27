const path = require('path')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {

    entry: './src/scripts/main.js',
    output: {
        path: path.resolve(__dirname, '_site/assets'),
        filename: 'main.js'
    },
    plugins: [new miniCssExtractPlugin()],
    module : {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [miniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            }
        ]
    }
}