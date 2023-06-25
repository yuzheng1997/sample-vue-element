import { pickBy } from "lodash-es";

export const getProps = (
	source: Record<string, any>,
	keys: Array<string>
): Record<string, any> => {
	return pickBy(source, (value, key) => {
		if (!value) return false;
		if (keys.includes(key)) return true;
	});
};
