import {
	getContentRender,
	getTipRender,
} from "@sample-vue-element/components/common/controlRender";
import {
	TableHelperArgs,
	TableSchema,
	TableSourceData,
} from "@sample-vue-element/types/basicTable";
import {
	resolveFunctionAble,
	resolveRules,
} from "@sample-vue-element/utils/helper";
import { ElForm, ElFormItem, ElTable, ElTableColumn } from "element-plus";
import { VNode } from "vue";

export const tableRenderHelper = ({
	props,
	ctx,
	tablePropsHelper,
	tableSourceData,
}: TableHelperArgs) => {
	const { editTable, showIndex, selection } = props;
	const { slots } = ctx;
	const { getSchemas, registerFormRef, registerTableRef } = tablePropsHelper;
	// 渲染单个列
	const tableContentRender = () => {
		return getSchemas.value.map((schema) => (
			<ElTableColumn>
				{{
					default: getColumnContentRender(schema),
					header: getColumnHeaderRender(schema),
				}}
			</ElTableColumn>
		));
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
		return [<ElTableColumn type="index" width="50"></ElTableColumn>, ...nodes];
	};
	const addSelectionColumn = (nodes: VNode[]) => {
		if (!selection) return nodes;
		return [<ElTableColumn type="index" width="50"></ElTableColumn>, ...nodes];
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
		const { dataRef } = tableSourceData as TableSourceData;
		return (
			<ElTable ref={registerTableRef} data={dataRef.value}>
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
			<ElForm ref={registerFormRef} model={formDataRef.value}>
				{{
					default: getTableRender,
				}}
			</ElForm>
		);
	};
	return {
		getTableRender,
		formTableRender,
	};
};
