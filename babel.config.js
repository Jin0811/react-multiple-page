/**
 * babel-loader配置文件
 * 这里安装了babel-preset-react-app的包，直接使用这个包提供的react-app预设
 * 无需配置core-js来处理JS兼容性问题，因为预设当中都包含了
 */

module.exports = {
	presets: ["react-app"],
};
