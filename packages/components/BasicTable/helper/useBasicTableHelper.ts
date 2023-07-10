import {
	BasicTableProps,
	ElTableProps,
} from "@sample-vue-element/types/basicTable";
import { getProps } from "@sample-vue-element/utils/helper";
import { ref, ComponentPublicInstance, watch } from "vue";
import { keyOfBasicTableProps, keyOfTableProps } from "../props";

export const useBasicTableHelper = (props: BasicTableProps) => {
	// 表单实例
	const tableRef = ref<ComponentPublicInstance | Element | null>(null);
	const tableProps = ref<ElTableProps>({});
	const basicTableProps = ref({});
	const registerFormRef = (
		ref: Element | ComponentPublicInstance | null,
		refs: Record<string, any>
	) => {
		tableRef.value = ref;
	};
	watch(
		() => props,
		() => {
			tableProps.value = getProps(props, keyOfTableProps);
			basicTableProps.value = getProps(props, keyOfBasicTableProps);
		},
		{
			immediate: true,
		}
	);
	return {
		registerFormRef,
		tableProps,
		basicTableProps,
	};
};
