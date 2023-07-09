import {
	getContentRender,
	getTipRender,
} from "@sample-vue-element/components/common/controlRender";
import { Schema } from "@sample-vue-element/types/basicForm";
import {
	_isPlainObject,
	resolveFunctionAble,
} from "@sample-vue-element/utils/helper";
import { ElCol, ElFormItem } from "element-plus/es";
// 获取label render
export const getContentLabelRender = (schema: Schema, labelSuffix: string) => {
	const { label, tip } = schema;
	if (tip) {
		const tipRender = getTipRender(tip);
		return () => (
			<>
				{`${label}`}
				{tipRender()}
			</>
		);
	}
	return () => `${label}${labelSuffix}`;
};
/**
 * 合并form上的rules配置和schema中的配置
 * @param schema
 * @param formRules
 * @returns
 */
const resolveRules = (schema: Schema, formRules: Recordable | undefined) => {
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
// 获取formItem render
export const getFormItemRender = (schema: Schema, ctx: Recordable) => {
	const { model, props } = ctx;
	const { colSpan, field, prop, filter } = schema;
	const { labelSuffix = ":", rules } = props;
	// 控件render
	const contentRender = getContentRender(schema, model.value);
	// label render
	const contentLabelRender = getContentLabelRender(schema, labelSuffix);
	const resolvedRules = resolveRules(schema, rules);
	return () => {
		if (filter && !resolveFunctionAble(filter, false, model.value)) return;
		return (
			<ElCol key={field} {...(colSpan as any)}>
				<ElFormItem
					rules={resolveFunctionAble(resolvedRules, [], model.value)}
					prop={prop}
				>
					{{
						label: contentLabelRender,
						default: contentRender,
					}}
				</ElFormItem>
			</ElCol>
		);
	};
};
