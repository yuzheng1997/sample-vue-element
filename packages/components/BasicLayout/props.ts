import { colProps, rowProps } from "element-plus";
import { PropType } from "vue";
import { ColSpan } from "./types";

export const basicProps = {
	...rowProps,
	colSpan: {
		type: [
			Object as PropType<ColSpan>,
			Number,
			Array<number> as PropType<number[]>,
		],
	},
};

export const rowPropKeys = Object.keys(rowProps);
export const colPropKeys = Object.keys(colProps);
