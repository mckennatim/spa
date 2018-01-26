var path = require('path');
module.exports={
	entry: "./src/app.js",
	output: {
		path: path.join(__dirname, "dist"),
		filename: 'bundle.js'
	},
  module: {
    rules: [
      { test: /\.js$/, 
        exclude: /node_modules/,
        use: [
          "babel-loader",
          "eslint-loader"
        ]
      },
      { test: /\.html$/, use:[{loader: "html-loader" }]}
    ]
  },
	devtool: "source-map",    	
}