<template>
	<BasicForm :schemas="schemas"> </BasicForm>
</template>

<script setup>
import BasicForm from "@sample-vue-element/components/BasicForm/index.vue";
import { ElInput } from "element-plus/es";
import { ref } from "vue";
const schemas = [
	{
		tag: ElInput,
		field: "a",
		colSpan: 8,
		label: "字段1",
	},
	{
		tag: ElInput,
		field: "b",
		colSpan: 8,
		filter: (model) => {
			return model.a !== "1";
		},
		label: "字段2",
	},
	{
		tag: ElInput,
		field: "c",
		colSpan: 8,
		label: "字段3",
	},
];
const model = ref({});
</script>

<style lang="scss" scoped></style>
