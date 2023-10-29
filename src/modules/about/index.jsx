import ReactDOM from "react-dom/client";
import RootComponent from "@/components/base/RootComponent.jsx"; // 公共根节点组件
import RouteConfig from "./RouteConfig.jsx"; // 当前模块的路由配置组件
import "@/assets/style/common.less"; // 全局公共样式
import "antd/dist/antd.css"; // antd样式

// 挂载根节点组件
const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <RootComponent>
    <RouteConfig />
  </RootComponent>
);
