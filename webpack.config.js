var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var _productionBuild = !!JSON.parse(process.env.IsProd || 0);

var _plugins = [];

var _devPlugins = [
   // Avoid publishing files when compilation failed
   new webpack.NoErrorsPlugin(),
   new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"',
      'env_API_URL': '"http://draft/Branches/ProtoReactPortlet/api"'
   }),
   new webpack.ProvidePlugin({
      _: "lodash",
      "window._": "lodash"
   }),
   new webpack.ProvidePlugin({
      moment: "moment",
      "window.moment": "moment"
   })
];

var _prodPlugins = [
   new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      'env_API_URL': '"api"'
   }),
   new webpack.optimize.UglifyJsPlugin({
      compress: {
         warnings: false
      }
   })
];

_plugins = _devPlugins;

if (_productionBuild) {
   _plugins = _prodPlugins;
}

module.exports = {
   entry: {
      client: './Source/scripts/modules/index.jsx'
   },
   root: path.resolve('./'),
   output: {
      path: path.resolve(__dirname, './Public/build/'),
      filename: '[name].bundle.js'
   },
   module: {
      resolve: {
         extensions: ['', '.js', '.jsx', '.css']
      },
      loaders: [{
         test: /\.jsx?$/,
         exclude: /node_modules/,
         loaders: ["babel-loader"]
      }, {
         test: /\.html$/,
         loader: "file?name=[name].[ext]",
      }, {
         test: /\.css$/,
         loader: 'style!css'
      }, {
         test: /\.scss$/,
         loader: 'style!css!sass'
      }, {
         test: /\.png$/,
         loader: "url-loader?limit=10000&minetype=image/png"
      }, {
         test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
         loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
      }]
   },
   plugins: _plugins,
   stats: {
      // Nice colored output
      colors: true
   },
   // Create Sourcemaps for the bundle
   devtool: 'source-map'
};
