import { Schema } from "@sample-vue-element/types/basicForm";
import { getProps } from "@sample-vue-element/utils/helper";
import type { Component } from "vue";
import { resolveComponent, toRaw } from "vue";
import infoSvg from "./info.svg";

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
	const { field, tag } = schema;
	const ComponentTag = getComponent(tag) as any;
	const propKeys = getComponentAttrs(ComponentTag, schema);
	return () => (
		<ComponentTag v-model={model[field as string]} {...propKeys}></ComponentTag>
	);
};
// 获取控件render
export const getTipRender = (msg: string) => {
	const svgIcon = (
		<svg aria-hidden={true} xmlns="http://www.w3.org/2000/svg">
			<use xlinkHref={infoSvg} />
		</svg>
	);
	
};
