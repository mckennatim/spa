var path = require('path');
module.exports={
	entry: "./app.js",
	output: {
		path: path.join(__dirname, "dist"),
		filename: 'bundle.js'
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
}
