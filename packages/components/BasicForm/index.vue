<script lang="tsx">
import { ElForm } from "element-plus/es";
import { basicProps } from "./props";
import { defineComponent, renderList } from "vue";
import { usePropHelper, getFormItemRender } from "./helper";
import BasicLayout from "../BasicLayout/index.vue";

export default defineComponent({
	name: "BasicForm",
	props: basicProps,
	setup(props, { expose }) {
		const ctx = usePropHelper(props);
		const {
			registerFormRef,
			formProps,
			resetFields,
			validate,
			clearValidate,
			getSchemas,
			model,
		} = ctx;
		expose({
			resetFields,
			validate,
			clearValidate,
		});
		return () => (
			<ElForm ref={registerFormRef} {...formProps.value} model={model.value}>
				<BasicLayout>
					{renderList(getSchemas.value, (schema) => {
						return getFormItemRender(schema, ctx)();
					})}
				</BasicLayout>
			</ElForm>
		);
	},
});
</script>
