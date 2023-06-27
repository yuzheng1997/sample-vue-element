import { ColSpan } from "@sample-vue-element/types";
import { Schemas } from "@sample-vue-element/types/basicForm";
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
		type: Object as PropType<Schemas>,
	},
	colSpan: {
		type: [Object, Number, Array] as PropType<ColSpan>,
	},
};

export const formPropKeys = Object.keys(formProps);
