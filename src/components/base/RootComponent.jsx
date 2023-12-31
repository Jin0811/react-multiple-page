/**
 * 根节点组件，项目当中的每一个模块都需要引入此组件作为根节点组件
 * 在此组件内可以进行一些全局配置和拦截
 */

import { HashRouter } from "react-router-dom";
import PropTypes from "prop-types";

const RootComponent = (props) => {
	return <HashRouter>{props.children}</HashRouter>;
};

RootComponent.propTypes = {
	children: PropTypes.element,
};

export default RootComponent;
