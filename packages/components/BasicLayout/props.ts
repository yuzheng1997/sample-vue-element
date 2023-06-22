import { rowProps } from "element-plus";
import { PropType } from "vue";
import { ColSpan } from "./types";

export const basicProps = {
	...rowProps,
	colSpan: {
		type: Object as PropType<ColSpan>,
	},
};

export const rowPropKeys = Object.keys(rowProps)

