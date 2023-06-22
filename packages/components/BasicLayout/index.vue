<script lang="tsx" name="BasicLayout">
import { defineComponent } from "vue";
import { basicProps, rowPropKeys } from "./props";
import { ElRow } from "element-plus/es/components";
import { getProps } from "@sample-vue-element/utils/helper/propsHelper";
export default defineComponent({
	props: basicProps,
	setup(props, { slots }) {
		// 获取ElRow的props
		const rowProps = getProps(props, rowPropKeys);
		return <ElRow {...rowProps}>
            {{
            }}
        </ElRow>;
	},
});
</script>
