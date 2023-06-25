import type { VNode } from "vue";

export * from "./propsHelper";
export * from "./typeValide";

export const isIfShow = (node: VNode) => {
	const { children, type } = node;
	return children === "v-if" && type.toString() === "Symbol(v-cmt)";
};
export const isShow = (node: VNode) => {
	const { el, dirs } = node;
	console.log(((dirs as any) || [])[0]?.updated, "el");
	if (!el) return false;
	return (el as HTMLElement).style.display;
};
