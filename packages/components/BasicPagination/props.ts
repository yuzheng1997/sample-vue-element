import { paginationProps } from "element-plus";
import { PropType } from "vue";

export const basicPaginationProps = {
	...paginationProps,
	small: {
		type: Boolean as PropType<boolean>,
		default: true,
	},
	total: {
		type: Number as PropType<number>,
		default: 0,
	},
	page: {
		type: Number as PropType<number>,
		default: 1,
	},
	limit: {
		type: Number as PropType<number>,
		default: 20,
	},
	pageSizes: {
		type: Array as PropType<Array<number>>,
		default() {
			return [10, 20, 30, 50];
		},
	},
	// 移动端页码按钮的数量端默认值5
	pagerCount: {
		type: Number as PropType<number>,
		default: document.body.clientWidth < 992 ? 5 : 7,
	},
	layout: {
		type: String as PropType<string>,
		default: "total, sizes, prev, pager, next, jumper",
	},
	background: {
		type: Boolean as PropType<boolean>,
		default: true,
	},
	autoScroll: {
		type: Boolean as PropType<boolean>,
		default: true,
	},
	hidden: {
		type: Boolean as PropType<boolean>,
		default: false,
	},
};

export const keyofBasicPaginationProps = Object.keys(basicPaginationProps);
