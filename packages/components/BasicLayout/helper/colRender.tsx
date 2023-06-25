import { Component, Slots, VNode, mergeProps } from "vue";
import { _isPlainObject, getProps, isIfShow, isShow } from "@sample-vue-element/utils/helper";
import { ElCol } from "element-plus";
import { colPropKeys } from "../props";
import type { BasicLayoutPorps } from "../types/index";
import { isNumber } from "lodash-es";

/**
 * 获取Col所需要的属性
 * 合并colProps
 * @param props VNode上的属性
 */
const colSize = ["xs", "sm", "sm", "lg", "xl"];
const getColProps = (
	props: NullableRecord,
	rowProps: BasicLayoutPorps
): Recordable => {
	let colSpan = rowProps.colSpan || {};
	// 格式化colSpan
	if (isNumber(colSpan)) {
		colSpan = { span: colSpan };
	} else if (Array.isArray(colSpan)) {
		const sizeMap: Recordable = {};
		colSize.forEach((size, index) => {
			sizeMap[size] = (colSpan as Array<unknown>)[index] || 24;
		});
		colSpan = sizeMap;
	}
	const colProps = props ? getProps(props, colPropKeys) : Object.create(null);
	return mergeProps(colSpan, colProps);
};
/**
 * 获取node，如果没有使用el-col，则包装
 * @param node
 */
const getColRender = (node: VNode, rowProps: BasicLayoutPorps): VNode => {
	const { props, type } = node;
	console.log(node, 'node')
	isIfShow(node)
	isShow(node)
	// 已经被el-col包裹，直接返回
	if (_isPlainObject(type) && (type as Component).name === "ElCol") {
		return node;
	}
	// 获取props
	const colProps = getColProps(props, rowProps);
	// 使用el-col包装
	return (
		<ElCol {...colProps}>
			{{
				default: () => node,
			}}
		</ElCol>
	);
};

export const createColRender = (slots: Slots, props: BasicLayoutPorps) => {
	const nodes = slots.default?.();
	if (!nodes) return [];
	return nodes.map((node) => getColRender(node, props));
};
