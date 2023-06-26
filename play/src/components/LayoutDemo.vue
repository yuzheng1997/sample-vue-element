<template>
	<BasicLayout :colSpan="[12, 12, 12, 8, 8]">
		<div v-if="flag">1</div>
		<div v-show.isVshow="flag">2</div>
		<div>3</div>
		<div>4</div>
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
const symbolF = Symbol('v-show')
</script>

<style lang="scss" scoped></style>
