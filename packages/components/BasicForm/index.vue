<script lang="tsx">
import { ElForm } from "element-plus";
import { basicProps } from "./props";
import { defineComponent, provide, renderList } from "vue";
import { usePropHelper, getFormItemRender } from "./helper";
import BasicLayout from "../BasicLayout/index.vue";
import { BasicFormCtx } from "../common";

export default defineComponent({
	name: "BasicForm",
	props: basicProps,
	inheritAttrs: false,
	setup(props, { expose, attrs, slots }) {
		const ctx = usePropHelper(props);
		const {
			registerFormRef,
			formProps,
			collapsed,
			getSchemas,
			model,
		} = ctx;
		expose({
			...ctx,
		});

		provide(BasicFormCtx, ctx);
		console.log(slots, "slots");
		return () => (
			<ElForm ref={registerFormRef} {...formProps.value} model={model.value}>
				<BasicLayout {...attrs} collapsed={collapsed.value}>
					{renderList(getSchemas.value, (schema) => {
						return getFormItemRender(schema, ctx, slots)();
					})}
				</BasicLayout>
			</ElForm>
		);
	},
});
</script>
