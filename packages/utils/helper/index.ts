import type { VNode } from "vue";

export * from "./propsHelper";
export * from "./typeValide";

export const isIfShow = (node: VNode) => {
	const { children, type } = node;
	return !(children === "v-if" && type.toString() === "Symbol(v-cmt)");
};
export const isShow = (node: VNode) => {
	const { dirs } = node;
	const vShowDir = (dirs || []).find(item => item.modifiers.isVshow)
	// 没有v-show 直接返回true
	if (!vShowDir) return true 
	const { value } = vShowDir
	return value
};
