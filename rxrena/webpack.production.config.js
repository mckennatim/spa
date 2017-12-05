var path = require('path');
var webpack = require('webpack');
//production config with vendor bundle
module.exports={
	entry:{
		app: "./src/app.js",
		vendors: ['react', 'react-dom', 'rxjs']
	},
	output: {
		path: path.join(__dirname, "dist2"),
		filename: '[name].bundle.js'
	},
  module: {
    rules: [
      { test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: "babel-loader"
        }]
      },
      { test: /\.html$/, loader: "html-loader" }
    ],
  },
	devtool: "source-map",
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
		new webpack.optimize.CommonsChunkPlugin({name: 'vendors', filename:'[name].bundle.js'})
  ]
}
