import { getContentRender } from "@sample-vue-element/components/common/controlRender";
import { Schema } from "@sample-vue-element/types/basicForm";
import { ElFormItem } from "element-plus/es";
// 获取label render
export const getContentLabelRender = (schema: Schema, labelSuffix: string) => {
	const { label } = schema;
	return () => `${label}${labelSuffix}`;
};
// 获取formItem render
export const getFormItemRender = (
	schema: Schema,
	model: Recordable,
	props: Recordable
) => {
	const { colSpan, field } = schema;
	const { labelSuffix = ":" } = props;
	// 控件render
	const contentRender = getContentRender(schema, model.value);
	// label render
	const contentLabelRender = getContentLabelRender(schema, labelSuffix);
	return () => {
		console.log(123);
		return (
			<ElFormItem key={field} {...(colSpan as any)}>
				{{
					label: contentLabelRender,
					default: contentRender,
				}}
			</ElFormItem>
		);
	};
};
