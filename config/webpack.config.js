const path = require("path");
const { generateOptionsByModuleConfig } = require("./config.util");

// 生成entry、htmlWebpackPlugin、copyWebpackPlugin的配置项
const { entrysObject, htmlWebpackPluginArray, copyWebpackPluginArray } = generateOptionsByModuleConfig();

module.exports = {
  // 模式
  mode: "production", // development 开发 | production 生产

  // 入口
  entry: entrysObject,

  // 输出
  output: {
    path: path.resolve(__dirname, "../dist"), // 打包文件目录
    filename: "[name]/[name].bundle.js", // 配置打包文件的命名规则
    assetModuleFilename: "static/media/[hash:8][ext][query]", // 资源文件目录
    clean: true, // 在生成新的打包文件之前清空上一次的打包目录
  },

  // loader
  module: {
    rules: [
      // 处理CSS
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      // 处理less
      {
        test: /\.less$/i,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      // 处理图片资源，针对小于20kb的图片进行base64处理，减少网络请求
      {
        test: /\.(png|jpe?g|webp|svg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 20 * 1024, // 
          },
        },
      },
      // 字体、音频、视频、Excel、Word等资源无需特殊处理，所以选择type=asset/resource
      // type=asset/resource会发送一个单独的文件并导出URL，即原封不动对文件进行输出
      // 处理iconfont、自定义字体包等资源，
      {
        test: /\.(ttf|woff2?)$/,
        type: "asset/resource",
      },
      // 处理其他资源，譬如：音频、视频、Excel、Word等
      {
        test: /\.(map3|map4|avi|xlsx|doc|docx)$/,
        type: "asset/resource",
      },
      // babel-loader编译和解析js和jsx文件
      {
        test: /\.jsx?$/,
        exclude: /node_modules/, // 排除node_modules下的文件
        use: {
          loader: "babel-loader",
        },
      },
      // 自动导入react的自定义loader，只针对jsx文件
      {
        test: /\.jsx$/,
        exclude: /node_modules/, // 排除node_modules下的文件
        use: {
          loader: path.resolve(__dirname, "./loaders/auto-import-react-loader.js"),
        },
      },
    ],
  },

  // 插件
  plugins: [
    ...htmlWebpackPluginArray,
    ...copyWebpackPluginArray,
  ],

  // 解析
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src/"),
      "@m": path.resolve(__dirname, "../src/modules/"),
    },
    extensions: [".jsx", ".js", ".json"], // 自动补全文件扩展名
  },

  // 优化：代码分割，代码压缩等
  optimization: {

  },

  // webpack-dev-server
  devServer: {},
};
