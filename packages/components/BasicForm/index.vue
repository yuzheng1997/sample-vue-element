<script lang="tsx">
import { ElForm } from "element-plus/es";
import { basicProps } from "./props";
import { defineComponent } from "vue";
import { usePropHelper, getFormItemRender } from "./helper";
import BasicLayout from "../BasicLayout/index.vue";
import { resolveFunctionAble } from "@sample-vue-element/utils/helper";

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
		const getChildren = () => {
			const renders = getSchemas.value
				.map((schema) => {
					return getFormItemRender(schema, ctx);
				})
				.filter(Boolean);
			return [...renders.map((item) => item())];
		};
		return () => (
			<ElForm ref={registerFormRef} {...formProps.value} model={model.value}>
				<BasicLayout>{getChildren()}</BasicLayout>
			</ElForm>
		);
	},
});
</script>
