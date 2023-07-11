import { getTipRender } from "@sample-vue-element/components/common/controlRender";
import {
	TableRenderHelperArgs,
	TableSchema,
} from "@sample-vue-element/types/basicTable";
import { ElTable, ElTableColumn } from "element-plus";

const tableRenderHelper = ({props, ctx, tablePropsHelper}: TableRenderHelperArgs) => {
	const { editTable } = props;
	const { slots } = ctx;
	// 渲染单个列
	const renderColumn = (schema: TableSchema) => {
		return (
			<ElTableColumn>
				{{
					default: getColumnContentRender(schema),
					header: getColumnHeaderRender(schema),
				}}
			</ElTableColumn>
		);
	};
	// 渲染表头
	const getColumnHeaderRender = (schema: TableSchema) => {
		const { label, tip } = schema;
		return (
			<>
				{tip && getTipRender(tip)}
				{label}
			</>
		);
	};
	// 渲染列内容
	const getColumnContentRender = (schema: TableSchema) => {
		const { field } = schema;
		// 如果有插槽，则使用插槽
		if (schema.field && slots[schema.field]) {
			return slots[schema.field];
		}
		// todo
		if (editTable) {
		}

		return ({ row }: Recordable) => row[field as string];
	};
	const getEmptyRender = () => {
		if (slots.empty) return slots.empty
		return () => '暂无数据'
	}
	// 获取表格渲染函数
	const getTableRender = (schemas: TableSchema[]) => {
		return <ElTable>
			{{
				default: () => schemas.,
				append: slots.append,
				empty: getEmptyRender()
			}}
		</ElTable>
	};
	// 编辑表格
	const formWrapper = () => {};
	return {
		getTableRender,
	};
};
