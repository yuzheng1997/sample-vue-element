import { isPlainObject } from "lodash-es";

export const _isPlainObject = (val: any): val is object => {
	return isPlainObject(val);
};
