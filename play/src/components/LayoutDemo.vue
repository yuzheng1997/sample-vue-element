<template>
	<BasicLayout :collapsed="collapsed" :colSpan="[12, 12, 12, 8, 8]">
		<div>1</div>
		<div>2</div>
		<div>3</div>
		<div>4</div>
		<div>5</div>
		<div>6</div>
		<div>7</div>
		<div>8</div>
		<div>9</div>
		<div>10</div>
	</BasicLayout>
	<el-button
		type="primary"
		@click="toggleFlag"
		>{{ collapsed ? '展开' : '收起' }}</el-button
	>
</template>

<script setup>
import BasicLayout from "@sample-vue-element/components/BasicLayout/index.vue";
import { ref } from "vue";
const collapsed = ref(false);
const toggleFlag = () => {
	collapsed.value = !collapsed.value;
};
</script>

<style lang="scss" scoped></style>
