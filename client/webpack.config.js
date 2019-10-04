const HtmlWP = require("html-webpack-plugin");
const MiniCssEP =  require("mini-css-extract-plugin");

module.exports = {
    plugins: [
        new HtmlWP({
            filename: "index.html",
            template: "public/index.html"
        }),
        new MiniCssEP({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
    output: {
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{loader: "babel-loader"}]
            },
            {
                test: /\.module.scss$/,
                use: [
                    {loader: MiniCssEP.loader},
                    {loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName: "[name]__[local]__[hash:base64:5]"
                            }
                        }
                    },
                    {loader: "sass-loader"}
                ]
            },
            {
                test: /\.scss$/,
                exclude: /\.module.scss$/,
                use: [
                    {loader: MiniCssEP.loader},
                    {loader: "css-loader"},
                    {loader: "sass-loader"}
                ]
            },
            {
                test: /\.(svg|png)/,
                use: [{loader: "file-loader"}]
            }
        ]
    },
    devServer: {
        historyApiFallback: true
    }
};