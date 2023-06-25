<template>
	<BasicLayout :colSpan="[12, 12, 12, 8, 8]">
		<div v-if="flag">1</div>
		<div v-show="flag" >2</div>
		<div>3</div>
		<div>4</div>
		<div>5</div>
		<div>6</div>
	</BasicLayout>
	<el-button type="primary" @click="toggleFlag">切换</el-button>
</template>

<script setup>
import BasicLayout from "@sample-vue-element/components/BasicLayout/index.vue";
import { ref } from "vue";
const flag = ref(false);
const toggleFlag = () => {
	flag.value = !flag.value;
};
</script>

<style lang="scss" scoped></style>
