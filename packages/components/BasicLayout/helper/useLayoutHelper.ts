import { BasicLayoutPorps } from "@sample-vue-element/types";
import { SetupContext } from "vue";

export const useLayoutHelper = (props: BasicLayoutPorps, ctx: SetupContext) => {
	const { emit } = ctx;
	// 切换伸缩状态
	const toggleCollapseStatus = () => {
		emit("update:modelValue", !props.modelValue);
	};

	return {
		toggleCollapseStatus,
	};
};