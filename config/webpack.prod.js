const path = require("path");
const { generateOptionsByModuleConfig } = require("./config.util");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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

    // contenthash根据文件内容生成 hash 值，只有文件内容变化了，hash 值才会变化。所有文件 hash 值是独享且不同的
    // 使用contenthash可以实现，在进行静态资源缓存的时候，我们发布了新的版本后，浏览器可以进行更新
    // 如果使用不使用contenthash，那每次的打包之后的入口文件都是main.js，浏览器每次都会去读取缓存
    filename: "[name]/[name].[contenthash:10].js",
    chunkFilename: "static/js/[name].[contenthash:10].chunk.js",
    assetModuleFilename: "static/media/[hash:8][ext][query]", // 资源文件目录

    clean: true, // 在生成新的打包文件之前清空上一次的打包目录
  },

  // loader
  module: {
    rules: [
      // 处理CSS
      {
        test: /\.css$/i,
        use: [
          // style-loader会将js中的css通过创建style标签的形式添加到页面当中
          // MiniCssExtractPlugin.loader会将CSS抽取成单独的文件，通过link标签的形式添加到页面上
          // 生产模式下，建议使用MiniCssExtractPlugin.loader
          MiniCssExtractPlugin.loader,
          "css-loader", // css-loader会将css资源编译成commonjs的一个模块到js当中
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  "postcss-preset-env", // 能解决大多数样式兼容性问题
                ],
              },
            },
          },
        ],
      },
      // 处理less
      {
        test: /\.less$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  "postcss-preset-env", // 能解决大多数样式兼容性问题
                ],
              },
            },
          },
          "less-loader",
        ],
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
        use: [
          {
            loader: "babel-loader",
            options: {
              // options.presets预设等配置项建议在babel.config.js文件当中进行配置，统一管理
              // presets: ["react-app"]
              cacheDirectory: true, // 开启babel缓存
              // cacheCompression 默认为 true，将缓存内容压缩为 gz 包以减⼩缓存⽬录的体积。在设为 false 的情况下将跳过压缩和解压的过程，从⽽提升这⼀阶段的速度
              // 即不对babel的文件进行压缩，这样虽然会占用多一点的电脑空间，但是提升了速度，以空间换时间
              cacheCompression: false,
            },
          },
        ],
      },
      // 自动导入react的自定义loader，只针对jsx文件
      {
        test: /\.jsx$/,
        exclude: /node_modules/, // 排除node_modules下的文件
        use: [
          {
            loader: path.resolve(__dirname, "./loaders/auto-import-react-loader.js"),
          },
        ],
      },
    ],
  },

  // 插件
  plugins: [
    ...htmlWebpackPluginArray, // 生成html文件
    ...copyWebpackPluginArray, // 复制public目录下的文件到打包目录
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash:10].css", // 对CSS文件进行命名
      chunkFilename: "static/css/[name].[contenthash:10].chunk.css", // 对动态导出的CSS文件进行命名
    }),
  ],

  // 解析
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src/"),
      "@m": path.resolve(__dirname, "../src/modules/"),
    },
    extensions: [".jsx", ".js", ".json"], // 自动补全文件扩展名
  },

  // SourceMap配置，开发模式和生产模式使用不同的配置
  devtool: "source-map",

  // 关闭性能分析，提升速度
  performance: false,

  // 优化：代码分割，代码压缩等
  optimization: {
    splitChunks: {
      cacheGroups: {
        // 拆分代码，对src/utils目录下的js文件进行单独打包
        utils: {
          test: /(src\\utils\\.*\.js)$/,
          name: "utils",
          chunks: "initial",
          priority: -10,
          minSize: 0, // 默认为20000B，即19.53KB
          minChunks: 2,
          filename: "static/js/[name].bundle.js",
        },
        // 拆分代码，对src/components目录下的jsx文件进行单独打包
        components: {
          test: /(src\\components\\.*\.jsx)$/,
          name: "components",
          chunks: "initial",
          priority: -10,
          minSize: 0, // 默认为20000B，即19.53KB
          minChunks: 2,
          filename: "static/js/[name].bundle.js",
        },
      },
    },
    // 提取runtime文件，目的是为了避免文件的频繁变更导致浏览器缓存失效，更好地利用缓存，提升用户体验
    runtimeChunk: {
      name: (entrypoint) => `${entrypoint.name}/runtime`,
    },
  },
};
