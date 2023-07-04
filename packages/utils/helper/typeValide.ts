import { isPlainObject } from "lodash-es";

export const _isPlainObject = (val: any): val is object => {
	return isPlainObject(val);
};

export const _isBlock = (val: any): val is null | undefined | "" => {
	return val === null || val === undefined || val === "";
};
