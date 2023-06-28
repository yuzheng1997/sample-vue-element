import { ColSpan } from "@sample-vue-element/types";
import { Schema } from "@sample-vue-element/types/basicForm";
import { formProps } from "element-plus";
import { PropType } from "vue";

export const basicProps = {
	...formProps,
	labelWidth: {
		type: [String, Number],
		default: "120px",
	},
	labelSuffix: {
		type: String,
		default: ":",
	},
	schemas: {
		type: Array as PropType<Schema[]>,
	},
	colSpan: {
		type: [Object, Number, Array] as PropType<ColSpan>,
		default: [],
	},
};
const excludePropKeys = ['model']
export const formPropKeys = Object.keys(formProps).filter(item => !excludePropKeys.includes(item));
