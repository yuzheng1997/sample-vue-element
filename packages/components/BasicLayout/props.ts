import { ColSpan } from "@sample-vue-element/types";
import { colProps, rowProps } from "element-plus/es";
import { PropType } from "vue";

export const basicProps = {
	...rowProps,
	colSpan: {
		type: [Object, Number, Array] as PropType<ColSpan>,
	},
	alwaysShowLine: {
		type: Number as PropType<number>,
		default: 2
	},
	modelValue: {
		type: Boolean as PropType<boolean>,
		default: false
	}
};

export const rowPropKeys = Object.keys(rowProps);
export const colPropKeys = Object.keys(colProps);
