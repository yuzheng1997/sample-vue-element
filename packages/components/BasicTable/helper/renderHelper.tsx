import {
	getContentRender,
	getTipRender,
} from "@sample-vue-element/components/common/controlRender";
import {
	getProps,
	resolveFunctionAble,
	resolveRules,
} from "@sample-vue-element/utils/helper";
import { ElForm, ElFormItem, ElTable, ElTableColumn } from "element-plus";
import { VNode } from "vue";

import { keyOfTableColumnProps } from "../props";
import { clone } from "lodash-es";
import BasicPagination from "@sample-vue-element/components/BasicPagination/index.vue";
import type {
	TableHelperArgs,
	TableSchema,
	TableSourceData,
	PaginationHelper,
} from "@sample-vue-element/types/basicTable";
export const tableRenderHelper = ({
	props,
	ctx,
	tablePropsHelper,
	tableSourceData,
	paginationHelper,
}: TableHelperArgs) => {
	const { editTable, showIndex, selection } = props;
	const { slots } = ctx;
	const { getSchemas, registerFormRef, registerTableRef, tableProps } =
		tablePropsHelper;
	// 渲染单个列
	const tableContentRender = () => {
		const nodes = getSchemas.value.map((schema) => {
			const columnProps = getProps(schema, keyOfTableColumnProps);
			return (
				<ElTableColumn {...columnProps}>
					{{
						default: getColumnContentRender(schema),
						header: getColumnHeaderRender(schema),
					}}
				</ElTableColumn>
			);
		});
		return addSelectionColumn(addIndexColumn(nodes));
	};
	// 渲染表头
	const getColumnHeaderRender = (schema: TableSchema) => {
		const { label, tip } = schema;
		return () => (
			<>
				{tip && getTipRender(tip)}
				{label}
			</>
		);
	};
	const addIndexColumn = (nodes: VNode[]) => {
		if (!showIndex) return nodes;
		const indexColumn = (
			<ElTableColumn
				type="index"
				width="55"
				align="center"
				label="序号"
			></ElTableColumn>
		);
		nodes.unshift(indexColumn);
		return nodes;
	};
	const addSelectionColumn = (nodes: VNode[]) => {
		if (!selection) return nodes;
		const selectionColumn = (
			<ElTableColumn
				type="selection"
				align="center"
				reserveSelection={true}
				width="55"
			></ElTableColumn>
		);
		nodes.unshift(selectionColumn);
		return nodes;
	};
	// 渲染列内容
	const getColumnContentRender = (schema: TableSchema) => {
		const { field } = schema;
		// 如果有插槽，则使用插槽
		if (schema.field && slots[schema.field]) {
			return slots[schema.field];
		}
		if (editTable) {
			return getTableFormItemRender(schema);
		}
		return ({ row }: Recordable) => row[field as string];
	};
	const getEmptyRender = () => {
		if (slots.empty) return slots.empty;
		return () => "暂无数据";
	};
	// 编辑表格列渲染函数
	const getTableFormItemRender = (schema: TableSchema) => {
		const { tag, field } = schema;
		const resolvedRules = resolveRules(schema);
		// 没有提供组件
		if (!tag) {
			return ({ row }: Recordable) => row[field as string];
		}
		return ({ row, $index }: Recordable) => {
			// 控件render
			const contentRender = getContentRender(schema, row);
			return (
				<ElFormItem
					prop={`formData.${$index}.${field}`}
					rules={resolveFunctionAble(resolvedRules, [], row)}
				>
					{{
						default: contentRender,
					}}
				</ElFormItem>
			);
		};
	};
	// 获取表格渲染函数
	const getTableRender = () => {
		const { dataRef, onSelect, onSelectAll, onSingleSelect } =
			tableSourceData as TableSourceData;
		const tablePropsComputed = clone(tableProps.value) as Recordable;
		// 表格选择
		if (selection === "multiple") {
			tablePropsComputed.onSelect = onSelect;
			tablePropsComputed.onSelectAll = onSelectAll;
		} else if (selection === "single") {
			tablePropsComputed.onSelect = onSingleSelect;
		}
		return (
			<ElTable
				{...tablePropsComputed}
				ref={registerTableRef}
				data={dataRef.value}
			>
				{{
					default: tableContentRender,
					append: slots.append,
					empty: getEmptyRender(),
				}}
			</ElTable>
		);
	};
	// 编辑表格
	const formTableRender = () => {
		const { formDataRef } = tableSourceData as TableSourceData;
		return (
			<ElForm
				inlineMessage={true}
				ref={registerFormRef}
				model={formDataRef.value}
			>
				{{
					default: getTableRender,
				}}
			</ElForm>
		);
	};
	const cratePagination = () => {
		const { paginationParams } = paginationHelper as PaginationHelper;
		return () => <BasicPagination {...paginationParams}></BasicPagination>;
	};
	return {
		getTableRender,
		formTableRender,
		cratePagination: cratePagination(),
	};
};
