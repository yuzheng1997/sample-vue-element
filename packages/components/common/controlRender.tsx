import { Schema } from "@sample-vue-element/types/basicForm";
import type { Component } from "vue";
import { resolveComponent, toRaw, h } from "vue";

// 获取component

export const getComponent = (tag: string | Component) => {
	if (typeof tag === "string") {
		return resolveComponent(tag);
	}
	// 传入的tag可能是响应式的
	return toRaw(tag);
};

// 获取控件render
export const getContentRender = (
	schema: Schema,
	model: Record<string, any>
) => {
	const { field, tag } = schema;
	const ComponentTag = getComponent(tag);
	return h(ComponentTag, {});
};
