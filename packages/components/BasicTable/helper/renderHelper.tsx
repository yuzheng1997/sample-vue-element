import {
	TableColumnProps,
	TableSchema,
} from "@sample-vue-element/types/basicTable";
import { ElTableColumn } from "element-plus";

const tableRenderHelper = (props: any, ctx: any) => {
	// 渲染单个列
	const renderColumn = (schema: TableSchema) => {
		const { label, tip } = schema;
		return (
			<ElTableColumn>
				{{
					default: () => "",
					header: getColumnHeaderRender(label, tip),
				}}
			</ElTableColumn>
		);
	};
	// 渲染表头
	const getColumnHeaderRender = (
		label: string | undefined,
		tip: string | undefined
	) => {};
	// 渲染列内容
	const getColumnContentRender = (label: string | undefined, tip: string) => {};

	// 获取表格渲染函数
	const getTableRender = () => {};
	// 编辑表格
	const formWrapper = () => {};
	return {
		getTableRender,
	};
};
