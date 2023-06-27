import { BasicFormProps } from "@sample-vue-element/types/basicForm";
import { getProps } from "@sample-vue-element/utils/helper";
import { formPropKeys } from "../props";
import {ElForm} from "element-plus/es";
import { computed, ref } from "@vue/runtime-core";


const usePropHelper = (props: BasicFormProps) => {
	// 表单实例
	const formRef = ref<InstanceType<typeof ElForm> | null>(null);
	const registerFormRef = (el: InstanceType<typeof ElForm>) => (formRef.value = el);
	// 获取表单配置
	const formProps = computed(() => {
		return getProps(props, formPropKeys);
	});
	// 表单校验
    const validate = (fields?: string[]) => {

    }
	// 表单重置
    const resetFields = () => {
        formRef.value?.resetFields()
    }
	// 清除校验
    const clearValidate = (fields?: string[]) => {
        formRef.value?.resetFields()
    }
	return {
        registerFormRef,
		formProps,
        resetFields,
        validate,
        clearValidate
	};
};

export default usePropHelper