const webpack = require('webpack')
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin
const OccurenceOrderPlugin = webpack.optimize.OccurenceOrderPlugin
const WebpackDevServer = require('webpack-dev-server')
const path = require('path')
const env = process.env.WEBPACK_ENV

const appName = 'spa'

const host = '0.0.0.0'
const port = '9001'

const outputFile =  appName + (env === 'build' ? '.min.js' : '.js')
const plugins = [
   new webpack.DefinePlugin({
      "global.GENTLY": false
   })
]

if (env === 'build') {
   plugins.push(new UglifyJsPlugin({
      minimize: true
   }))
   plugins.push(new OccurenceOrderPlugin())
} else {
   plugins.push(new webpack.HotModuleReplacementPlugin())
}

const config = {
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
         loaders: ['babel-loader'],
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
