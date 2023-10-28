/**
 * webpack配置当中用于到的一些工具和方法
 */

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const moduleConfig = require("../module.config");

/**
 * 因为项目是多页面的，因此需要入口、html、favicon.ico都需要有多个
 * 即需要多个入口，多个HtmlWebpackPlugin实例，多个CopyWebpackPlugin实例
 * - 多页面，即多个entry
 * - 多个html，即需要创建多个HtmlWebpackPlugin实例，由HtmlWebpackPlugin来生成html文件
 * - 多个favicon.ico，即需要创建多个CopyWebpackPlugin实例，由CopyWebpackPlugin复制favicon.ico到对应的目录
 * 这里通过一个方法，来遍历ModuleConfig，生成对应的配置项
 */
const generateOptionsByModuleConfig = () => {
  const entrysObject = {};
  const htmlWebpackPluginArray = [];
  const copyWebpackPluginArray = [];
  moduleConfig.forEach((item) => {
    entrysObject[item.name] = item.path;
    htmlWebpackPluginArray.push(
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "../public/index.html"),
        filename: `${item.name}/index.html`,
        title: item.name,
        chunks: [item.name],
      })
    );
    copyWebpackPluginArray.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "../public"),
            to: path.resolve(__dirname, `../dist/${item.name}`),
            globOptions: {
              ignore: ["**/index.html"], // 忽略文件，index.html不需要复制过去
            },
          },
        ],
      })
    );
  });
  return { entrysObject, htmlWebpackPluginArray, copyWebpackPluginArray };
};

module.exports = {
  generateOptionsByModuleConfig,
};
