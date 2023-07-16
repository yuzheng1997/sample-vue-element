<template></template>

<script lang="tsx">
import { defineComponent } from "vue";
import { useBasicTableHelper, tableRenderHelper } from "./helper";
import { basicTableProps } from "./props";

export default defineComponent({
	name: "BasicTable",
	props: basicTableProps,
	setup(props, ctx) {
		const tablePropsCtx = useBasicTableHelper(props);
		const {} = tableRenderHelper({props, ctx, tablePropsCtx});
	},
});
</script>
