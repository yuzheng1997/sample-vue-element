<script lang="tsx">
import { ElForm } from "element-plus/es";
import { basicProps } from "./props";
import { defineComponent } from "vue";
import { usePropHelper, getFormItemRender } from "./helper";
import BasicLayout from '../BasicLayout/index.vue'

export default defineComponent({
	name: "BasicForm",
	props: basicProps,
	setup(props, { expose }) {
		const {
			registerFormRef,
			formProps,
			resetFields,
			validate,
			clearValidate,
			getSchemas,
		} = usePropHelper(props);
		expose({
			resetFields,
			validate,
			clearValidate,
		});
		return <ElForm ref={registerFormRef} {...formProps.value}>
            <BasicLayout>
                {
                    getSchemas.value.map(schema => {
                        getFormItemRender(schema)()
                    })
                }
            </BasicLayout>
        </ElForm>;
	},
});
</script>
