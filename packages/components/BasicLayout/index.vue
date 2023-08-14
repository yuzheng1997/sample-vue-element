<script lang="tsx" name="BasicLayout">
import { defineComponent } from "vue";
import { basicProps, rowPropKeys } from "./props";
import { ElRow } from "element-plus";
import { getProps } from "@sample-vue-element/utils/propsHelper";
import { createColRender } from "./helper/colRender";
import { useResizeHelper } from "./helper/useResizeHelper";
export default defineComponent({
	props: basicProps,
	inheritAttrs: false,
	setup(props, { slots, emit }) {
		const { registerRowRef, currentDomSize } = useResizeHelper(props);
		// 获取ElRow的props
		const rowProps = getProps(props, rowPropKeys);
		return () => (
			<ElRow ref={registerRowRef} {...rowProps}>
				{{
					default: createColRender(slots, props, currentDomSize),
				}}
			</ElRow>
		);
	},
});
</script>
