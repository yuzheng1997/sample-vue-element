import { isFunction, pickBy } from "lodash-es";

export const getProps = (
	source: Record<string, any>,
	keys: Array<string>
): Record<string, any> => {
	return pickBy(source, (value, key) => {
		if (!value) return false;
		if (keys.includes(key)) return true;
	});
};

export const resolveFunctionAble = <T>(
	fn: FunctionAble<T>,
	...args: any[]
): T => {
	if (isFunction(fn)) {
		return fn(...args);
	}
	return fn;
};
