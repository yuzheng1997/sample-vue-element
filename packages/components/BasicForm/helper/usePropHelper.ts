import type {
	BasicFormProps,
	Schema,
} from "@sample-vue-element/types/basicForm";
import { getProps } from "@sample-vue-element/utils/helper";
import { formPropKeys } from "../props";
import { computed, ref, ComponentPublicInstance } from "vue";
import { normalizeColSpan } from "@sample-vue-element/components/BasicLayout/helper/colRender";

const normalizeScheams = (schemas: Schema[]): Schema[] => {
	return schemas.map((schema) => {
		const { colSpan, ...rest } = schema;
		return {
			colSpan: normalizeColSpan(colSpan),
			...rest,
		};
	});
};

export const usePropHelper = (props: BasicFormProps) => {
	// 表单实例
	const formRef = ref<ComponentPublicInstance | Element | null>(null);
	// model
	const model = ref({});
	const registerFormRef = (
		ref: Element | ComponentPublicInstance | null,
		refs: Record<string, any>
	) => {
		formRef.value = ref;
	};

	// 获取表单配置
	const formProps = computed(() => {
		return getProps(props, formPropKeys);
	});
	// 获取表单schemas
	const getSchemas = computed<Schema[]>(() => {
		const schemas = props.schemas || [];
		return normalizeScheams(schemas);
	});
	// 获取表单所有字段
	const getFields = () => {
		const { schemas } = props;
		return (schemas || []).map((schema) => schema.field);
	};
	// 表单校验
	const validate = (fields?: string[]) => {
		fields = fields || (getFields() as string[]);
		(formRef.value as any)
			?.validateField(fields)
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
		(formRef.value as any)?.resetFields();
	};
	// 清除校验
	const clearValidate = (fields?: string[]) => {
		fields = fields || (getFields() as string[]);
		(formRef.value as any)?.resetFields(fields);
	};
	return {
		registerFormRef,
		formProps,
		resetFields,
		validate,
		clearValidate,
		getSchemas,
		model,
	};
};
