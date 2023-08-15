const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: "development",
  //指定入口文件
  entry: "./src/index.ts",
  //指定打包文件所在目录
  output: {
    //指定打包文件所在目录
    path: path.resolve(__dirname, "dist"),
    //指定打包后文件的名字
    filename: "bundle.js",


    environment: {
      arrowFunction: false,//告诉webpack不使用箭头
      const: false//兼容IE10 
    }
  },
  //指定webpack打包时要使用的模块
  module: {
    //指定要加载的规则
    rules: [
      {
        //test指定的是规则生效的文件
        test: /.ts$/,
        //要使用的loader
        use: [
          //配置babel
          {
            //指定加载器
            loader: "babel-loader",
            //设置babel
            options: {
              //设置预定义环境
              presets: [
                [
                  //指定环境插件
                  "@babel/preset-env",
                  //配置信息
                  {
                    //要兼容的目标浏览器版本
                    targets: {
                      "chrome": "88"
                    },
                    //指定corejs版本
                    "corejs": "3",
                    //使用corejs的方式 usage表示按需加载
                    "useBuiltIns": "usage"
                  }
                ]
              ]
            }
          },
          "ts-loader"
        ],

        //要排除的文件
        exclude: /node-modules/
      },

      //设置styl文件的处理
      {
        test: /\.styl$/,
        use: [
          "style-loader",
          "css-loader",
          //引入postcss
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      browsers: 'last 2 versions'
                    }
                  ]
                ]
              }
            }
          },
          "stylus-loader"
        ]
      }
    ]
  },

  //配置webpack插件
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      // title: "这是一个自定义title",
      template: "./src/index.html"
    })
  ],

  //用来设置引用模块
  resolve: {
    extensions: ['.ts', '.js']//这些文件可以作为模块使用
  }
}