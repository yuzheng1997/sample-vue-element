import { getProps } from "@sample-vue-element/utils";
import { ref, ComponentPublicInstance, watch, computed } from "vue";
import { keyOfBasicTableProps, keyOfTableProps } from "../props";
import { BasicFormInstance } from "@sample-vue-element/types/basicForm";
import {
	BasicTableInstance,
	BasicTableProps,
	ElTableProps,
	TableSchema,
} from "@sample-vue-element/types/basicTable";
const normalizeSchemas = (
	schemas: TableSchema[] | undefined
): TableSchema[] => {
	if (!schemas) return [];
	return schemas.map((schema) => {
		// 保留form整个表单禁用的能力
		const {
			field,
			prop,
			disabled: itemDisabeld,
			align,
			headerAlign,
			...rest
		} = schema;
		return {
			align: align || "center",
			headerAlign: headerAlign || "center",
			field,
			prop: prop || field,
			...rest,
		};
	});
};

export const useBasicTableHelper = (props: BasicTableProps) => {
	// 表单实例
	const tableRef = ref<BasicTableInstance | null>(null);
	const formRef = ref<BasicFormInstance | null>(null);
	const tableProps = ref<ElTableProps>({});
	const basicTableProps = ref({});
	const registerTableRef = (
		ref: Element | ComponentPublicInstance | null,
		refs: Record<string, any>
	) => {
		tableRef.value = ref as BasicTableInstance;
	};
	const registerFormRef = (
		ref: Element | ComponentPublicInstance | null,
		refs: Record<string, any>
	) => {
		formRef.value = ref as BasicFormInstance;
	};
	const valideEditTable = () => {
		formRef.value
			?.validate()
			.then(() => {
				return {
					result: true,
				};
			})
			.catch((message: string) => {
				return {
					result: false,
					message,
				};
			});
	};
	// 表单重置
	const resetFields = () => {
		formRef.value?.resetFields();
	};
	const getSchemas = computed(() => {
		return normalizeSchemas(props.schemas);
	});
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
		tableRef,
		getSchemas,
		registerTableRef,
		tableProps,
		basicTableProps,
		registerFormRef,
		resetFields,
		valideEditTable,
	};
};
