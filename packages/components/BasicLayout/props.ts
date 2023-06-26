import { colProps, rowProps } from "element-plus";
import { PropType } from "vue";
import { ColSpan } from "./types";

export const basicProps = {
	...rowProps,
	colSpan: {
		type: [
			Object,
			Number,
			Array,
		] as PropType<ColSpan>,
	},
};

export const rowPropKeys = Object.keys(rowProps);
export const colPropKeys = Object.keys(colProps);
