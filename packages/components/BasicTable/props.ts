import { CSSProperties, PropType } from "vue";
import {
	DefaultRow,
	TableProps,
} from "element-plus/es/components/table/src/table/defaults";
import { Layout, TableSchema } from "@sample-vue-element/types/basicTable";

const tableProps = {
	data: {
		type: Array as PropType<DefaultRow[]>,
		default: () => [],
	},
	size: String,
	width: [String, Number],
	height: [String, Number],
	maxHeight: [String, Number],
	fit: {
		type: Boolean,
		default: true,
	},
	stripe: Boolean,
	border: Boolean,
	rowKey: [String, Function] as PropType<TableProps<DefaultRow>["rowKey"]>,
	showHeader: {
		type: Boolean,
		default: true,
	},
	showSummary: Boolean,
	sumText: String,
	summaryMethod: Function as PropType<TableProps<DefaultRow>["summaryMethod"]>,
	rowClassName: [String, Function] as PropType<
		TableProps<DefaultRow>["rowClassName"]
	>,
	rowStyle: [Object, Function] as PropType<TableProps<DefaultRow>["rowStyle"]>,
	cellClassName: [String, Function] as PropType<
		TableProps<DefaultRow>["cellClassName"]
	>,
	cellStyle: [Object, Function] as PropType<
		TableProps<DefaultRow>["cellStyle"]
	>,
	headerRowClassName: [String, Function] as PropType<
		TableProps<DefaultRow>["headerRowClassName"]
	>,
	headerRowStyle: [Object, Function] as PropType<
		TableProps<DefaultRow>["headerRowStyle"]
	>,
	headerCellClassName: [String, Function] as PropType<
		TableProps<DefaultRow>["headerCellClassName"]
	>,
	headerCellStyle: [Object, Function] as PropType<
		TableProps<DefaultRow>["headerCellStyle"]
	>,
	highlightCurrentRow: Boolean,
	currentRowKey: [String, Number],
	emptyText: String,
	expandRowKeys: Array as PropType<TableProps<DefaultRow>["expandRowKeys"]>,
	defaultExpandAll: Boolean,
	defaultSort: Object as PropType<TableProps<DefaultRow>["defaultSort"]>,
	tooltipEffect: String,
	spanMethod: Function as PropType<TableProps<DefaultRow>["spanMethod"]>,
	selectOnIndeterminate: {
		type: Boolean,
		default: true,
	},
	indent: {
		type: Number,
		default: 16,
	},
	treeProps: {
		type: Object as PropType<TableProps<DefaultRow>["treeProps"]>,
		default: () => {
			return {
				hasChildren: "hasChildren",
				children: "children",
			};
		},
	},
	lazy: Boolean,
	load: Function as PropType<TableProps<DefaultRow>["load"]>,
	style: {
		type: Object as PropType<CSSProperties>,
		default: () => ({}),
	},
	className: {
		type: String,
		default: "",
	},
	tableLayout: {
		type: String as PropType<Layout>,
		default: "fixed",
	},
	scrollbarAlwaysOn: {
		type: Boolean,
		default: false,
	},
	flexible: Boolean,
};

export const basicTableProps = {
	...tableProps,
	// 显示序号
	showIndex: Boolean as PropType<boolean>,
	selection: {
		type: String as PropType<'multiple' | 'single'>
	},
	// 显示分页
	pagination: {
		type: Boolean as PropType<boolean>,
		default: true,
	},
	// 接口
	api: Function,
	schemas: {
		type: Array as PropType<TableSchema[]>,
		required: true,
	},
	actionWidth: {
		type: [String, Number],
		default: "200px",
	},
	editTable: {
		type: Boolean,
		default: false,
	},
	autoHeight: {
		type: Boolean as PropType<boolean>,
		default: false,
	},
	afterFetch: {
		type: Function,
	},
	extraParams: {
		type: [Object, Function],
		default: () => ({}),
	},
	// 加载后自动获取数据
	autoFetch: {
		type: Boolean as PropType<boolean>,
		default: true,
	},
};

export const keyOfTableColumnProps = [
	"type",
	"label",
	"className",
	"labelClassName",
	"property",
	"prop",
	"width",
	"minWidth",
	"renderHeader",
	"sortMethod",
	"resizable",
	"columnKey",
	"align",
	"headerAlign",
	"showTooltipWhenOverflow",
	"showOverflowTooltip",
	"fixed",
	"formatter",
	"selectable",
	"reserveSelection",
	"filteredValue",
	"filters",
	"filterPlacement",
	"filterMultiple",
	"index",
	"sortOrders",
];

export const keyOfTableProps = Object.keys(tableProps);
export const keyOfBasicTableProps = Object.keys(basicTableProps);
