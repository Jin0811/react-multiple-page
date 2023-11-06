# 基于 webpack 的 react 多页面项目框架

在某个项目组里面，遇到了一个基于 webpack 的 react 多页面项目架构，这里进行复刻，自行搭建一个类似的框架，也顺便复习一下 webpack。接下来我将时间线的形式，一步一步地描述如何搭建这个框架

# 1 搭建过程

## 1.1 创建基础目录

参考项目代码中的目录

## 1.2 初始化 package.json

```shell
yarn init -y
```

## 1.3 安装 webpack 相关依赖

```shell
# 安装webpack依赖
yarn add webpack@5.72.0 -D
yarn add webpack-cli@4.10.0 -D
yarn add webpack-dev-server@4.8.1 -D

# 安装webpack插件，用于生成html文件和复制文件
yarn add html-webpack-plugin@5.5.0 -D
yarn add copy-webpack-plugin@10.2.4 -D

# 添加样式相关loader，支持CSS和less
yarn add css-loader@6.7.1 -D
yarn add style-loader@3.3.1 -D
yarn add less@4.1.2 -D
yarn add less-loader@10.2.0 -D

# 安装和配置babel，使得webpack支持解析jsx文件
yarn add @babel/core@7.17.10 -D
yarn add babel-loader@8.2.5 -D
yarn add babel-preset-react-app@10.0.1 -D

# 安装react相关库
yarn add react@^18.1.0
yarn add react-dom@^18.1.0
yarn add react-router-dom@^6.3.0
yarn add prop-types -D

# 在package.json当中配置browserslist字段，配置需要兼容的浏览器
"browserslist": [
    "last 2 version",
    "> 1%",
    "not dead"
],

# 安装cross-env，修改package.json当中scripts命名，添加环境变量
yarn add cross-env@7.0.3 -D

# 安装antd
yarn add antd@4.20.3

# 安装相关依赖处理React热更新
yarn add @pmmmwh/react-refresh-webpack-plugin@0.5.5 -D
yarn add react-refresh@0.13.0 -D

# 安装插件，修改CSS的引入方式为通过link标签引入
# 未处理的时候，CSS文件被打包进了JS当中，JS在运行的时候会动态创建style标签，可能会出现闪屏，体验不好
# 通过插件可以将CSS文件抽取为一个单独的文件，方便独立加载
yarn add mini-css-extract-plugin@^2.6.0 -D

# CSS兼容性处理
yarn add postcss-loader@^6.2.1 -D
yarn add postcss@^8.4.13 -D
yarn add postcss-preset-env@^7.5.0 -D

# CSS压缩
yarn add css-minimizer-webpack-plugin -D

# 集成husky和commitlint
yarn add @commitlint/cli -D
yarn add @commitlint/config-conventional -D
yarn add husky -D
yarn add cz-customizable -D

# 集成eslint和prettier
yarn add eslint@^7.32.0 -D
yarn add eslint-config-prettier@^8.8.0 -D
yarn add eslint-plugin-prettier@^4.0.0 -D
yarn add prettier@^2.4.1 -D
yarn add @babel/eslint-parser@^7.12.16 -D
yarn add eslint-plugin-react@^7.33.2 -D

# 配置lint-staged
yarn add lint-staged@^13.2.3 -D
```
