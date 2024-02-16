const HtmlWebPackPlugin = require(“html-webpack-plugin”);
const MiniCssExtractPlugin = require(“mini-css-extract-plugin”);
var server_port = process.env.YOUR_PORT || process.env.PORT || 5000;
var server_host = process.env.YOUR_HOST || ‘0.0.0.0’;

module.exports = {
module: {
rules: [
{
test: /.js$/,
exclude: /node_modules/,
use: {
loader: “babel-loader”
}
},
{
test: /.css$/,
use: [MiniCssExtractPlugin.loader, “css-loader”]
}
]
},
devServer: {
disableHostCheck: true,
contentBase: ‘./dist’,
compress: true,
inline: true,
port:server_port,
host:server_host

},
plugins: [
new HtmlWebPackPlugin({
template: “./src/index.html”,
filename: “index.html”
}),
new MiniCssExtractPlugin({
filename: “[name].css”,
chunkFilename: “[id].css”
})
]
};
