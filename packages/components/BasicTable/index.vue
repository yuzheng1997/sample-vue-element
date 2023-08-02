<template></template>

<script lang="tsx">
import { defineComponent } from "vue";
import {
	useBasicTableHelper,
	useSourceData,
	tableRenderHelper,
} from "./helper";
import { basicTableProps } from "./props";

export default defineComponent({
	name: "BasicTable",
	props: basicTableProps,
	setup(props, ctx) {
		const tablePropsHelper = useBasicTableHelper(props);
		const tableSourceData = useSourceData({ ctx, tablePropsHelper, props });
		const { getTableRender, formTableRender } = tableRenderHelper({
			ctx,
			tablePropsHelper,
			props,
			tableSourceData,
		});
		const { editTable } = props;
		return () => <>{editTable ? formTableRender() : getTableRender()}</>;
	},
});
</script>
