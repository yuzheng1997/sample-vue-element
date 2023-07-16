import {
	BasicTableProps,
	ElTableProps,
	TableSchema,
} from "@sample-vue-element/types/basicTable";
import { getProps } from "@sample-vue-element/utils/helper";
import { ref, ComponentPublicInstance, computed } from "vue";
import { keyOfTableProps } from "../props";

const normalizeSchemas = (schemas: TableSchema[]): TableSchema[] => {
	return schemas;
};

export const useBasicTableHelper = (props: BasicTableProps) => {
	// 表单实例
	const tableRef = ref<ComponentPublicInstance | Element | null>(null);
	const registerFormRef = (
		ref: Element | ComponentPublicInstance | null,
		refs: Record<string, any>
	) => {
		tableRef.value = ref;
	};
	const getSchemas = computed(() => {
		return normalizeSchemas(props.schemas as TableSchema[]);
	});
	const tableProps = computed<ElTableProps>(() =>
		getProps(props, keyOfTableProps)
	);
	return {
		getSchemas,
		registerFormRef,
		tableProps,
	};
};
