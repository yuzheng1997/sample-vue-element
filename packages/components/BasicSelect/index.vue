<template>
	<div :title="label" style="display: inline-block; width: 100%">
		<el-select
			class="basicSelect"
			v-bind="{ ...$props, ...$attrs }"
			@change="change"
		>
			<el-option
				v-for="item in optionsRef"
				:key="item.value"
				:label="item.label"
				:value="item.value"
			/>
		</el-select>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, unref, inject } from "vue";
import { defaultDisabledRule, defaultFilterRule, props } from "./props";
import { pick } from "lodash-es";
import { watchThrottled } from "@vueuse/core";
import { BasicFormCtx } from "../common";

export default defineComponent({
	name: "BasicSelect",
	inheritAttrs: false,
	props,
	emits: ["change"],
	setup(props, { emit, attrs }) {
		const label = computed(() => {
			const obj = optionsRef.value.find(
				(item) => item.value === attrs.modelValue
			);
			if (obj) {
				return obj[props.labelField];
			}
			return "";
		});
		const fetchOptions = ref(null);
		const FormCtx = inject(BasicFormCtx, {});
		const formModel = (FormCtx as any).model;
		let watchFields;
		if (formModel && props.relationFields) {
			watchFields = props.relationFields.map((field) => {
				return () => formModel.value[field];
			});
		}
		// 格式化数据
		const normalizeOptions = (options) => {
			const { labelField, valueField } = unref(props);
			const filterRule = props.filterRule || defaultFilterRule;
			const disabledRule = props.disabledRule || defaultDisabledRule;
			return options.filter(filterRule).map((item) => {
				const { [valueField]: value, [labelField]: label, ...rest } = item;
				return {
					...rest,
					value,
					label,
					disabled: disabledRule(item),
				};
			});
		};

		const buildParams = () => {
			const params = {
				...props.extraParams,
			};
			if (formModel && props.relationFields) {
				Object.assign(params, pick(formModel.value, props.relationFields));
			}
			if (props.formatParams) {
				return props.formatParams(params);
			}
			return params;
		};
		const fetchSourceData = () => {
			if (props.api) {
				props.api(buildParams()).then((res) => {
					const { rows, data } = res;
					fetchOptions.value = rows || data;
				});
			}
		};
		// 获取数据
		if (!props.sourceData) {
			fetchSourceData();
		}
		// 级联监听
		if (watchFields && watchFields.length > 0) {
			watchThrottled(
				watchFields,
				() => {
					fetchSourceData();
				},
				{
					throttle: 500,
				}
			);
		}
		const optionsRef = computed(() => {
			if (!fetchOptions.value) {
				return normalizeOptions(props.sourceData || []);
			}
			return normalizeOptions(fetchOptions.value);
		});
		const change = (val) => {
			const obj = optionsRef.value.find((item) => item.value === val);
			emit("change", val, obj);
		};
		return {
			optionsRef,
			change,
			label,
		};
	},
});
</script>

<style lang="scss" scoped>
.basicSelect {
	width: 100%;
}
</style>
