import { Component, ExtractPropTypes, SetupContext, VNode } from "vue";
import { basicTableProps } from "@sample-vue-element/components/BasicTable/props";
import {
	ElTable,
	TableColumnCtx,
	TableProps,
} from "element-plus";
import {
	useBasicTableHelper,
	usePagination,
	useSourceData,
} from "../components/BasicTable/helper";
export type TableSchema = {
	tag?: string | Component;
	type?: string;
	label?: string;
	field: string;
	align?: "left" | "center" | "right";
	render?: FunctionAble<JSX.Element | VNode>;
	headerAlign?: "left" | "center" | "right";
	prop?: string;
	disabled?: FunctionAble<boolean>;
	rules?: FunctionAble<Array<any>>;
	tip?: string;
	required?: boolean;
	[others: string]: any;
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
export type BasicTableInstance = InstanceType<typeof ElTable>;
export type TableSourceData = ReturnType<typeof useSourceData>;
export type PaginationHelper = ReturnType<typeof usePagination>;
export type TableHelperArgs = {
	props: BasicTableProps;
	ctx: SetupContext;
	tablePropsHelper: ReturnType<typeof useBasicTableHelper>;
	tableSourceData?: TableSourceData;
	paginationHelper?: PaginationHelper | undefined;
};
