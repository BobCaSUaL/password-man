var webpack = require('webpack')
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin
var OccurenceOrderPlugin = webpack.optimize.OccurenceOrderPlugin
var WebpackDevServer = require('webpack-dev-server')
var path = require('path')
var env = process.env.WEBPACK_ENV

var appName = 'spa'

var host = '0.0.0.0'
var port = '9001'

var outputFile = appName + '.js'
var plugins = [
   new webpack.DefinePlugin({
      "global.GENTLY": false
   })
]

if (env === 'build') {
   plugins.push(new UglifyJsPlugin({
      minimize: true
   }))
   plugins.push(new OccurenceOrderPlugin())
   outputFile = appName + '.min.js'
} else {
   plugins.push(new webpack.HotModuleReplacementPlugin())
   outputFile = appName + '.js'
}

var config = {
   context: __dirname + "/src",
   entry: [
      'webpack-dev-server/client?http://' + host + ':' + port,
      'webpack/hot/only-dev-server',
      './index.jsx'
   ],
   devtool: 'source-map',
   output: {
      path: __dirname + '/dist/',
      filename: outputFile,
      publicPath: '/'
   },
   devServer: {
      contentBase: 'dist',
      inline: true
   },
   module: {
      loaders: [{
         test: /\.jsx?$/,
         loaders: ['react-hot-loader/webpack', 'babel-loader'],
         include: [
             path.join(__dirname, 'src'),
             path.join(__dirname, 'libs')
         ]
      }, {
         test: /(\.jsx|\.js)$/,
         loader: 'eslint-loader',
         exclude: /node_modules/,
         query: {
            parser: "babel-eslint"
         }
      }, {
         test: /\.css$/,
         loader: "style-loader!css-loader"
      }]
   },
   plugins: plugins,
   resolve: {
      root: [
          path.resolve('./src/spa'),
          path.resolve('./libs')
      ],
      extensions: ['', '.js', '.jsx']
   }
}

if (env === 'dev') {
   new WebpackDevServer(webpack(config), {
      contentBase: './dist/',
      hot: true,
      debug: true,
      historyApiFallback: true,
      stats: { colors: true },
   }).listen(port, host, function(err, result) {
      if (err) {
         console.log(err)
      }
   })
   console.log('-------------------------')
   console.log('Local webpack develop web server runs at http://' + host + ':' + port)
   console.log('-------------------------')
}

module.exports = config
