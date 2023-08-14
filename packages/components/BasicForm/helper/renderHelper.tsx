import {
	getContentRender,
	getTipRender,
} from "@sample-vue-element/components/common";
import { Schema } from "@sample-vue-element/types/basicForm";
import {
	_isPlainObject,
	resolveFunctionAble,
	resolveRules,
} from "@sample-vue-element/utils";
import { ElCol, ElFormItem } from "element-plus";
import type { Slots } from "vue";
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

// 获取formItem render
export const getFormItemRender = (
	schema: Schema,
	ctx: Recordable,
	slots: Slots
) => {
	const { model, props } = ctx;
	const { colSpan, field, prop, filter, render } = schema;
	const { labelSuffix = ":", rules } = props;
	// 控件render, 支持传入render
	const contentRender = render ? render : getContentRender(schema, model.value);
	// label render
	const contentLabelRender = getContentLabelRender(schema, labelSuffix);
	const resolvedRules = resolveRules(schema, rules);

	return () => {
		if (filter && !resolveFunctionAble(filter, false, model.value)) return;
		return (
			<ElCol key={field} {...(colSpan as any)}>
				{slots[field as string] ? (
					slots[field as string]?.()
				) : (
					<ElFormItem
						rules={resolveFunctionAble(resolvedRules, [], model.value)}
						prop={prop}
					>
						{{
							label: contentLabelRender,
							default: contentRender,
						}}
					</ElFormItem>
				)}
			</ElCol>
		);
	};
};
