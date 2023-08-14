<template>
	<BasicForm ref="basicFormCtx" v-bind="$attrs" :schemas="searchSchemas">
		<template #basicFormAction>
			<div class="actionWrapper">
				<slot name="preFix"></slot>
				<el-button @click="search" v-if="showSearch" type="primary"
					>查询</el-button
				>
				<el-button @click="resetForm" v-if="showReset" type="default"
					>重置</el-button
				>
				<el-button @click="toggleCollapse" v-if="showCollapse" type="default"
					>收起/展开</el-button
				>
				<slot name="appendFix"></slot>
			</div>
		</template>
	</BasicForm>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import BasicForm from "@sample-vue-element/components/BasicForm/index.vue";
import type {
	BasicFormInstance,
	Schema,
} from "@sample-vue-element/types/basicForm";
import { cloneDeep } from "lodash-es";
export default defineComponent({
	name: "BasicSearchForm",
	props: {
		schemas: {
			type: Array as PropType<Schema[]>,
		},
		showCollapse: {
			type: Boolean as PropType<boolean>,
			default: false,
		},
		showSearch: {
			type: Boolean as PropType<boolean>,
			default: true,
		},
		showReset: {
			type: Boolean as PropType<boolean>,
			default: true,
		},
	},
	components: {
		BasicForm,
	},
	setup(props, { emit, slots }) {
		const basicFormCtx = ref<BasicFormInstance | null>(null);
		const searchSchemas = computed(() => {
			const { schemas } = props;
			if (!schemas) return [];
			const copySchemas = cloneDeep(schemas);
			copySchemas.push({
				labelWidth: 0,
				field: "basicFormAction",
			});
			return copySchemas;
		});
		const resetForm = () => {
			basicFormCtx.value?.resetFields();
		};
		const toggleCollapse = () => {
			basicFormCtx.value?.collapsed();
		};
		const search = () => {
			basicFormCtx.value?.model;
			emit("search", basicFormCtx.value?.model);
		};
		return {
			searchSchemas,
			basicFormCtx,
			resetForm,
			toggleCollapse,
			search,
		};
	},
});
</script>

<style lang="scss" scoped>
.actionWrapper {
	display: flex;
	justify-content: end;
	align-items: center;
}
</style>
