<template></template>

<script lang="tsx">
import { defineComponent } from "vue";
import { useBasicTableHelper } from "./helper";
import { basicTableProps } from "./props";

export default defineComponent({
	name: "BasicTable",
	props: basicTableProps,
	setup(props, ctx) {
		const tablePropsHelper = useBasicTableHelper(props);
		const {} = tableRenderHelper(props, ctx);
	},
});
</script>
