import type {
	BasicFormProps,
	Schema,
} from "@sample-vue-element/types/basicForm";
import { _isBlock, getProps } from "@sample-vue-element/utils";
import { formPropKeys } from "../props";
import { computed, ref, ComponentPublicInstance, watch, provide } from "vue";
import { normalizeColSpan } from "@sample-vue-element/components/BasicLayout/helper/colRender";

const normalizeSchemas = (
	schemas: Schema[],
	{ disabled, colSpan: formColSpan }: Recordable
): Schema[] => {
	return schemas.map((schema) => {
		// 保留form整个表单禁用的能力
		const { colSpan, field, prop, disabled: itemDisabeld, ...rest } = schema;
		return {
			colSpan: normalizeColSpan(colSpan || formColSpan),
			disabled: disabled ? () => true : itemDisabeld,
			field,
			prop: prop || field,
			...rest,
		};
	});
};

const setDefaultValues = (schemas: Schema[], model: Recordable | undefined) => {
	if (!model) return;
	schemas.forEach((schema) => {
		const { defaultValue, field } = schema;
		if (!_isBlock(model[field as string])) {
			return;
		}
		model[field as string] = _isBlock(defaultValue) ? undefined : defaultValue;
	});
};
export const usePropHelper = (props: BasicFormProps) => {
	// 表单实例
	const formRef = ref<ComponentPublicInstance | Element | null>(null);
	// model
	const model = ref({});
	const collapsed = ref(true);
	const registerFormRef = (
		ref: Element | ComponentPublicInstance | null,
		refs: Record<string, any>
	) => {
		formRef.value = ref;
	};
	// 获取表单schemas
	const getSchemas = computed<Schema[]>(() => {
		const schemas = props.schemas || [];
		return normalizeSchemas(schemas, props);
	});
	// 监听schemas和model，设置默认值
	watch(
		[() => props.model, () => props.schemas],
		() => {
			if (props.model) {
				model.value = props.model;
			}
			setDefaultValues(getSchemas.value, model.value);
		},
		{
			immediate: true,
		}
	);
	// 获取表单配置
	const formProps = computed(() => {
		return getProps(props, formPropKeys);
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
	const toggleCollapsed = () => {
		collapsed.value = !collapsed.value;
	};
	return {
		registerFormRef,
		props,
		formProps,
		resetFields,
		validate,
		clearValidate,
		getSchemas,
		model,
		toggleCollapsed,
		collapsed,
	};
};
