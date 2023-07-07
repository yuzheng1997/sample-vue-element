<template>
	<BasicForm :collapsable="true" ref="basicForm" :schemas="schemas">
	</BasicForm>
	<button @click="toggle">切换</button>
</template>

<script setup lang="ts">
import BasicForm from "@sample-vue-element/components/BasicForm/index.vue";
import { ElInput } from "element-plus/es";
import { ref } from "vue";
const basicForm = ref(null);
const schemas = [
	{
		tag: ElInput,
		field: "a",
		label: "字段a",
	},
	{
		tag: ElInput,
		field: "b",
		defaultValue: "2",
		label: "字段b",
	},
	{
		tag: ElInput,
		field: "c",
		label: "字段c",
	},
	{
		tag: ElInput,
		field: "d",
		label: "字段d",
	},
	{
		tag: ElInput,
		field: "e",
		label: "字段e",
	},
	{
		tag: ElInput,
		field: "f",
		label: "字段f",
	},
	{
		tag: ElInput,
		field: "a",
		label: "字段a",
	},
	{
		tag: ElInput,
		field: "b",
		defaultValue: "2",
		label: "字段b",
	},
	{
		tag: ElInput,
		field: "c",
		label: "字段c",
	},
	{
		tag: ElInput,
		field: "d",
		label: "字段d",
	},
	{
		tag: ElInput,
		field: "e",
		label: "字段e",
	},
	{
		tag: ElInput,
		field: "f",
		label: "字段f",
	},
	{
		tag: ElInput,
		field: "a",
		label: "字段a",
	},
	{
		tag: ElInput,
		field: "b",
		defaultValue: "2",
		label: "字段b",
	},
	{
		tag: ElInput,
		field: "c",
		label: "字段c",
	},
	{
		tag: ElInput,
		field: "d",
		label: "字段d",
	},
	{
		tag: ElInput,
		field: "e",
		label: "字段e",
	},
	{
		tag: ElInput,
		field: "f",
		label: "字段f",
	},
	{
		tag: ElInput,
		field: "a",
		label: "字段a",
	},
	{
		tag: ElInput,
		field: "b",
		defaultValue: "2",
		label: "字段b",
	},
	{
		tag: ElInput,
		field: "c",
		label: "字段c",
	},
	{
		tag: ElInput,
		field: "d",
		label: "字段d",
	},
	{
		tag: ElInput,
		field: "e",
		label: "字段e",
	},
	{
		tag: ElInput,
		field: "f",
		label: "字段f",
	},
	{
		tag: ElInput,
		field: "a",
		label: "字段a",
	},
	{
		tag: ElInput,
		field: "b",
		defaultValue: "2",
		label: "字段b",
	},
	{
		tag: ElInput,
		field: "c",
		label: "字段c",
	},
	{
		tag: ElInput,
		field: "d",
		label: "字段d",
	},
	{
		tag: ElInput,
		field: "e",
		label: "字段e",
	},
	{
		tag: ElInput,
		field: "f",
		label: "字段f",
	},
	{
		tag: ElInput,
		field: "a",
		label: "字段a",
	},
	{
		tag: ElInput,
		field: "b",
		defaultValue: "2",
		label: "字段b",
	},
	{
		tag: ElInput,
		field: "c",
		label: "字段c",
	},
	{
		tag: ElInput,
		field: "d",
		label: "字段d",
	},
	{
		tag: ElInput,
		field: "e",
		label: "字段e",
	},
	{
		tag: ElInput,
		field: "f",
		label: "字段f",
	},
	{
		tag: ElInput,
		field: "a",
		label: "字段a",
	},
	{
		tag: ElInput,
		field: "b",
		defaultValue: "2",
		label: "字段b",
	},
	{
		tag: ElInput,
		field: "c",
		label: "字段c",
	},
	{
		tag: ElInput,
		field: "d",
		label: "字段d",
	},
	{
		tag: ElInput,
		field: "e",
		label: "字段e",
	},
	{
		tag: ElInput,
		field: "f",
		label: "字段f",
	},
];
const toggle = () => {
	basicForm.value && (basicForm.value as any).toggleCollapsed();
};
</script>

<style lang="scss" scoped></style>
