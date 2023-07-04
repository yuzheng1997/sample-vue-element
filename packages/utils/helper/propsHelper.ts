import { isFunction, isUndefined, pickBy } from "lodash-es";

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
		const res = fn(...args);
		if (isUndefined(res)) return result;
		return res
	} else if (fn) {
		return fn as T;
	}
	return result;
};
