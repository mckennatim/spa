# Webpack for production javascript
by Kent Dodds
https://github.com/kentcdodds/es6-todomvc

What I learned I put in /spa/rxasrena/webpack.production.js


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
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({minimize: true}),
    		new webpack.optimize.CommonsChunkPlugin({name: 'vendors', filename:'vendors.js'})
      ]
    }
