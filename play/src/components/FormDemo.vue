<template>
	<BasicForm :schemas="schemas"> </BasicForm>
	<button @click="toggle">切换</button>
</template>

<script setup>
import BasicForm from "@sample-vue-element/components/BasicForm/index.vue";
import { ElInput } from "element-plus/es";
import { ref } from "vue";
const schemas = [
	{
		tag: ElInput,
		field: "a",
		label: "字段1",
	},
	{
		tag: ElInput,
		field: "b",
		defaultValue: "2",
		filter: (model) => {
			return model.a == 1;
		},
		label: "字段2",
	},
	{
		tag: ElInput,
		field: "c",
		label: "字段3",
	},
	{
		tag: ElInput,
		field: "d",
		label: "字段4",
	},
];
const show = ref(false);
const toggle = () => {
	show.value = !show.value;
};
const model = ref({});
</script>

<style lang="scss" scoped></style>
