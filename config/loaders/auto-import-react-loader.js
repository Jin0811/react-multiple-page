/**
 * @name auto-import-react-loader
 * @description
 * 自定义的react多页面应用中，每一个组件都需要引入react，比较麻烦
 * 这里使用loader来完成自动导入，配置了此插件之后，无需再在jsx当中引入react
 * 请注意不要再在页面自行引入react了，再次引入会导致react重复定义，编译报错
 */

module.exports = function (content) {
  const prefix = `import React from "react";`;
  return prefix + content;
};