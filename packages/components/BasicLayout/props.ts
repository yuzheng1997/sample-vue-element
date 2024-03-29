import { ColSpan } from "@sample-vue-element/types/colSpan";
import { colProps, rowProps } from "element-plus";
import { PropType } from "vue";

export const basicProps = {
	...rowProps,
	colSpan: {
		type: [Object, Number, Array] as PropType<ColSpan>,
	},
	collapsable: {
		type: Boolean as PropType<boolean>,
		default: false,
	},
	alwaysShowLine: {
		type: Number as PropType<number>,
		default: 2,
	},
	collapsed: {
		type: Boolean as PropType<boolean>,
		default: false,
	},
};

export const rowPropKeys = Object.keys(rowProps);
export const colPropKeys = Object.keys(colProps);
