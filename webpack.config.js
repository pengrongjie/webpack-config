// 引入css分离包
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: __dirname,
    filename: './dist/bundle.js'
  },
  module: {
    loaders: [
      // js
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      },
      // css
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use:[
            {
              loader: 'css-loader',
              options: {importLoaders: 1}
            },
            {
              loader: 'postcss-loader',
              options:{
                plugins: function(){
                  return [
                    require('postcss-import')(),
                    require('autoprefixer')({
                      'browers': ['Android >= 4.1', 'ios >= 7.0', 'ie >= 8']
                    })
                  ]
                }
              }
            }
          ]
        })
      },
      // less
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use:[
            {
              loader: 'css-loader',
              options: {importLoaders: 1}
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: function(){
                  return [
                    require('postcss-import')(),
                    require('autoprefixer')({
                      'browsers': ['Android >= 4.1', 'ios >= 7.0', 'ie >= 8']
                    })
                  ]
                }
              }
            },
            'less-loader'
          ]
        })
      },
      // 图片
      {
          test: /\.(png|jpg|gif|svg)$/i,
          loaders: [
              //小于8k的图片编译为base64，大于10k的图片使用file-loader
              'url-loader?limit=8192&name:[name]-[hash:5].[ext]',
              //图片压缩
              'image-webpack-loader'
          ]

      }
    ]
  },
  plugins:[
    new ExtractTextPlugin('./dist/bundle.css')  //css输入路径
  ]
}
