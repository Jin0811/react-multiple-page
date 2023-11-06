export const count = (...args) => {
	return args.reduce((pre, cur) => pre + cur, 0);
};
