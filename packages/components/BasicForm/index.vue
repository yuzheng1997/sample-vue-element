<script lang="tsx">
import { ElForm } from "element-plus/es";
import { basicProps } from "./props";
import { defineComponent, renderList } from "vue";
import { usePropHelper, getFormItemRender } from "./helper";
import BasicLayout from "../BasicLayout/index.vue";

export default defineComponent({
	name: "BasicForm",
	props: basicProps,
	inheritAttrs: false,
	setup(props, { expose, attrs }) {
		const ctx = usePropHelper(props);
		const {
			registerFormRef,
			formProps,
			resetFields,
			validate,
			clearValidate,
			toggleCollapsed,
			collapsed,
			getSchemas,
			model,
		} = ctx;
		expose({
			resetFields,
			validate,
			clearValidate,
			toggleCollapsed,
		});
		return () => (
			<ElForm ref={registerFormRef} {...formProps.value} model={model.value}>
				<BasicLayout {...attrs} collapsed={collapsed.value}>
					{renderList(getSchemas.value, (schema) => {
						return getFormItemRender(schema, ctx)();
					})}
				</BasicLayout>
			</ElForm>
		);
	},
});
</script>
