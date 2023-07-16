import { Component, ExtractPropTypes, SetupContext } from "vue";
import { basicTableProps } from "@sample-vue-element/components/BasicTable/props";
import { TableColumnCtx, TableProps } from "element-plus/es/components";
import { useBasicTableHelper } from "../components/BasicTable/helper";
export type TableSchema = {
	tag?: string | Component;
	type?: string;
	label?: string;
	field: string;
	prop?: string;
	disabled?: FunctionAble<boolean>;
	rules?: FunctionAble<Array<any>>;
	tip?: string;
	required?: boolean;
};

export type TableRenderHelperArgs = {
	props: BasicTableProps;
	ctx: SetupContext;
	tablePropsCtx: ReturnType<typeof useBasicTableHelper>;
};

export type Layout = "fixed" | "auto";
export type BasicTableProps = ExtractPropTypes<typeof basicTableProps>;
export type ElTableProps = inferInstance<TableProps<Recordable>>;
export type TableColumnProps = inferInstance<TableColumnCtx<any>>;
