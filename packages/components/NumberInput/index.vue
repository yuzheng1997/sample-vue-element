<template>
	<el-input v-bind="bindValue">
		<template #prefix v-if="$slots.prefix">
			<slot name="prefix"></slot>
		</template>
	</el-input>
</template>

<script setup lang="ts" name="NumberInput">
import { _isBlock } from "@sample-vue-element/utils";
import { PropType, computed, useAttrs } from "vue";
const props = defineProps({
	modelValue: {
		type: [String, Number] as PropType<string | number>,
	},
	precision: {
		type: [Number, String] as PropType<string | number>,
		default: 2,
	},
	min: {
		type: [Number, String] as PropType<string | number>,
		default: 0,
	},
	max: {
		type: [Number, String] as PropType<string | number>,
		default: 10000000000,
	},
	placeholder: {
		type: String as PropType<string>,
		default: "请输入",
	},
	clearable: {
		type: Boolean as PropType<boolean>,
		default: true,
	},
	disabled: {
		type: Boolean as PropType<boolean>,
		default: false,
	},
});
const emits = defineEmits(["update:modelValue", "input", "blur"]);
const attrs = useAttrs();

const parseMultiDot = (val: string) => {
	const index = val.indexOf(".");
	const lastIndex = val.lastIndexOf(".");
	if (index !== lastIndex) {
		return val.slice(0, lastIndex);
	}
	return val;
};

const bindValue = computed(() => {
	const { modelValue, max, min, precision } = props;
	return {
		...attrs,
		...props,
		onInput: (val: string, e: Event) => {
			val = parseMultiDot(val);
			val = (val || "").replace(/[^\d\.]/g, "");
			if (!val || val !== val) {
				emits("update:modelValue", undefined);
				emits("input", undefined);
				return;
			}
			emits("update:modelValue", val);
			emits("input", val);
		},
		onBlur: () => {
			if (_isBlock(modelValue)) {
				emits("update:modelValue", undefined);
				emits("blur", undefined);
				return;
			}
			let result: string | number = modelValue + "";
			if (!result.endsWith(".")) {
				result = parseFloat(result);
			}
			if (modelValue) {
				if (modelValue > max) {
					result = max;
				}
				if (modelValue < min) {
					result = min;
				}
				emits("update:modelValue", (+result).toFixed(+precision).toString());
				emits("blur", (+result).toFixed(+precision).toString());
			}
		},
	};
});
</script>

<style lang="scss" scoped>
.numberInput {
	width: 100%;

	:deep(.el-input__inner) {
		text-align: left !important;
	}
}
</style>
