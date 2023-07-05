<script lang="tsx" name="BasicLayout">
import { defineComponent } from "vue";
import { basicProps, rowPropKeys } from "./props";
import { ElRow } from "element-plus/es";
import { getProps } from "@sample-vue-element/utils/helper/propsHelper";
import { createColRender } from "./helper/colRender";
import { useResizeHelper } from "./helper/useResizeHelper";
export default defineComponent({
	props: basicProps,
	setup(props, { slots, emit }) {
		const { registerRowRef } = useResizeHelper(props);
		// 获取ElRow的props
		const rowProps = getProps(props, rowPropKeys);
		return () => (
			<ElRow ref={registerRowRef} {...rowProps}>
				{{
					default: createColRender(slots, props),
				}}
			</ElRow>
		);
	},
});
</script>
