<template>
	<el-pagination
		v-bind="$props"
		v-model:current-page="currentPage"
		v-model:page-size="pageSize"
		@size-change="handleSizeChange"
		@current-change="handleCurrentChange"
	></el-pagination>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { basicPaginationProps } from "./props";
export default defineComponent({
	name: "BasicPagination",
	props: basicPaginationProps,
	inheritAttrs: false,
	setup(props, { emit }) {
		const currentPage = computed({
			get() {
				return props.page;
			},
			set(val) {
				emit("update:page", val);
			},
		});
		const pageSize = computed({
			get() {
				return props.limit;
			},
			set(val) {
				emit("update:limit", val);
			},
		});
		function handleSizeChange(val: number) {
			if (currentPage.value * val > (props.total as number)) {
				currentPage.value = 1;
			}
			emit("pagination", { page: currentPage.value, limit: val });
			if (props.autoScroll) {
				scrollTo(0, 800);
			}
		}
		function handleCurrentChange(val: number) {
			emit("pagination", { page: val, limit: pageSize.value });
			if (props.autoScroll) {
				scrollTo(0, 800);
			}
		}
		return {
			handleSizeChange,
			handleCurrentChange,
			pageSize,
			currentPage,
		};
	},
});
</script>
