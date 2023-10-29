/**
 * 此组件为路由配置组件，一般每个模块都需要一个此文件来配置模块内的路由
 */

import { useRoutes, Navigate } from "react-router-dom";
import List from "./views/List";
import Detail from "./views/Detail";

const RouteElement = () => {
  const RouteConfig = [
    {
      path: "/",
      element: <Navigate to="/List" replace />,
    },
    {
      path: "/List",
      element: <List />,
    },
    {
      path: "/Detail",
      element: <Detail />,
    },
  ];
  return useRoutes(RouteConfig);
};

export default RouteElement;
