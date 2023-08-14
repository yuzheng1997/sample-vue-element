import { Schema } from "@sample-vue-element/types/basicForm";
import { getProps, resolveFunctionAble } from "@sample-vue-element/utils";
import type { Component } from "vue";
import { resolveComponent, toRaw } from "vue";
import infoSvg from "./info.svg";
import { ElTooltip } from "element-plus";

// 获取component

export const getComponent = (tag: string | Component) => {
	if (typeof tag === "string") {
		return resolveComponent(tag);
	}
	// 传入的tag可能是响应式的
	return toRaw(tag);
};

const getComponentAttrs = (tag: any, schema: Schema): Recordable => {
	const propKeys = Object.keys(tag?.props || {});
	const controlProps = getProps(schema, propKeys);
	return controlProps;
};
// 获取控件render
export const getContentRender = (
	schema: Schema,
	model: Record<string, any>
) => {
	const { field, tag, disabled } = schema;
	if (!tag) return () => "";
	const ComponentTag = getComponent(tag as string) as any;
	const propKeys = getComponentAttrs(ComponentTag, schema);
	return () => (
		<ComponentTag
			v-model={model[field as string]}
			{...propKeys}
			disabled={resolveFunctionAble(disabled, false, model)}
		></ComponentTag>
	);
};
const svgImgStyle = {
	alignSelf: "center",
	cursor: "pointer",
};
// 获取控件render
export const getTipRender = (msg: string) => {
	const svgIcon = <img width={14} src={infoSvg} style={svgImgStyle} />;
	return () => (
		<ElTooltip effect="dark" content={msg} placement="top">
			{{
				default: () => svgIcon,
			}}
		</ElTooltip>
	);
};
