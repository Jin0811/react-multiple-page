/**
 * 根节点组件，项目当中的每一个模块都需要引入此组件作为根节点组件
 * 在此组件内可以进行一些全局配置和拦截
 */

import React from "react";
import { HashRouter } from "react-router-dom";

const RootComponent = (props) => {
  return <HashRouter>{props.children}</HashRouter>;
};

export default RootComponent;
