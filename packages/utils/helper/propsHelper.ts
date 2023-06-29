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
	fn: FunctionAble<T> | undefined,
	defaultValue: T,
	...args: any[]
): T => {
	let result = defaultValue;
	if (isFunction(fn)) {
		console.log(fn(...args))
		result = fn(...args) || result;
	} else if (fn) {
		return fn as T;
	}
	return result;
};
