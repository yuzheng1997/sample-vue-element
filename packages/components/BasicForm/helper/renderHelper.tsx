import {
	getContentRender,
	getTipRender,
} from "@sample-vue-element/components/common/controlRender";
import { Schema } from "@sample-vue-element/types/basicForm";
import {
	_isPlainObject,
	resolveFunctionAble,
} from "@sample-vue-element/utils/helper";
import { ElFormItem } from "element-plus/es";
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
const resolveRules = (schema: Schema, formRules: any) => {
	const { field, rules: itemRules } = schema;
	let result;
	if (
		!formRules ||
		!_isPlainObject(formRules) ||
		!(formRules as Recordable)[field as string]
	)
		return itemRules;
};
// 获取formItem render
export const getFormItemRender = (schema: Schema, ctx: Recordable) => {
	const { model, props } = ctx;
	const { colSpan, field, prop, filter, rules: itemRules } = schema;
	const { labelSuffix = ":", rules } = props;
	// 控件render
	const contentRender = getContentRender(schema, model.value);
	// label render
	const contentLabelRender = getContentLabelRender(schema, labelSuffix);
	const resolvedRules = resolveRules(schema, rules);
	return () => {
		if (!(!filter || resolveFunctionAble(filter, model.value))) return;
		return (
			<ElFormItem
				key={field}
				prop={prop}
				rules={resolvedRules}
				{...(colSpan as any)}
			>
				{{
					label: contentLabelRender,
					default: contentRender,
				}}
			</ElFormItem>
		);
	};
};
