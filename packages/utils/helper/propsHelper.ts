import { isFunction, isUndefined, pickBy } from "lodash-es";
import { _isPlainObject } from "./typeValide";
import { TableSchema } from "@sample-vue-element/types/basicTable";
import { Schema } from "@sample-vue-element/types/basicForm";

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

/**
 * 合并form上的rules配置和schema中的配置
 * @param schema
 * @param formRules
 * @returns
 */
export const resolveRules = (schema: Schema | TableSchema, formRules?: Recordable) => {
	return (model: Recordable) => {
		const { field, rules: itemRules, required } = schema;
		const resolvedRules = resolveFunctionAble(itemRules, [], model) as any[];
		let result;
		// 如果form上不存在对应的配置
		if (
			!formRules ||
			!_isPlainObject(formRules) ||
			!formRules[field as string]
		) {
			result = resolvedRules;
		} else {
			// 如果form上存在对应field的rules
			let formItemRules = formRules[field as string] || [];
			if (!Array.isArray(formItemRules)) {
				formItemRules = [formItemRules];
			}
			// 合并验证规则
			result = [...formItemRules, ...resolvedRules];
		}
		if (required) {

		}
		return result as any[];
	};
};