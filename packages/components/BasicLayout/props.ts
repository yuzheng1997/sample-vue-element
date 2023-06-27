import { ColSpan } from "@sample-vue-element/types";
import { colProps, rowProps } from "element-plus/es";
import { PropType } from "vue";

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
