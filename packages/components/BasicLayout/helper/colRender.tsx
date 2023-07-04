import { Component, Slots, VNode, mergeProps } from "vue";
import {
	_isPlainObject,
	getProps,
	isIfShow,
	isShow,
	isVFor,
} from "@sample-vue-element/utils/helper";
import { ElCol } from "element-plus";
import type { ColProps } from "element-plus";
import { colPropKeys } from "../props";
import { isNumber, pickBy } from "lodash-es";
import { BasicLayoutPorps, ColSpan } from "@sample-vue-element/types";

/**
 * 获取Col所需要的属性
 * 合并colProps
 * @param props VNode上的属性
 */
const colSize = ["xs", "sm", "md", "lg", "xl"];
const getColProps = (
	props: NullableRecord,
	rowProps: BasicLayoutPorps
): Recordable => {
	let colSpan = normalizeColSpan(rowProps.colSpan);
	const colProps = props ? getProps(props, colPropKeys) : Object.create(null);
	return mergeProps(colSpan, colProps);
};
export const normalizeColSpan = (
	colSpan?: ColSpan
): inferInstance<ColProps> => {
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
	return pickBy(colSpan || {}, Boolean);
};
/**
 * 获取node，如果没有使用el-col，则包装
 * @param node
 */
const getColRender = (
	node: VNode,
	rowProps: BasicLayoutPorps
): VNode | (VNode | undefined)[] | undefined => {
	if (!isIfShow(node) || !isShow(node)) return;
	if (isVFor(node)) {
		return ((node.children as VNode[]) || []).map((node) =>
			createColNode(rowProps, node)
		);
	}
	// 使用el-col包装
	return createColNode(rowProps, node);
};
// 获取单个节点
const createColNode = (rowProps: BasicLayoutPorps, node: VNode) => {
	if (!node) return;
	// 已经被el-col包裹，直接返回
	if (_isPlainObject(node.type) && (node.type as Component).name === "ElCol") {
		return node;
	}
	const { props } = node;
	// 获取props
	const colProps = getColProps(props, rowProps);
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
	return () => {
		return nodes
			.map((node) => getColRender(node, props))
			.flat()
			.filter(Boolean);
	};
};
