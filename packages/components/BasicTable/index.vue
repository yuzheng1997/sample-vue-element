<script lang="tsx">
import { defineComponent } from "vue";
import {
	useBasicTableHelper,
	useSourceData,
	tableRenderHelper,
	usePagination,
} from "./helper";
import { basicTableProps } from "./props";
import { PaginationHelper } from "@sample-vue-element/types/basicTable";

export default defineComponent({
	name: "BasicTable",
	props: basicTableProps,
	setup(props, ctx) {
		const tablePropsHelper = useBasicTableHelper(props);
		const tableSourceData = useSourceData({ ctx, tablePropsHelper, props });
		let paginationHelper: PaginationHelper | undefined = undefined;
		if (props.pagination) {
			paginationHelper = usePagination();
		}
		const { getTableRender, formTableRender, cratePagination } =
			tableRenderHelper({
				ctx,
				tablePropsHelper,
				props,
				tableSourceData,
				paginationHelper,
			});
		const { editTable } = props;
		const { headerRight, headerLeft } = ctx.slots;
		console.log(headerLeft, headerRight);
		
		return () => (
			<div>
				{(headerLeft || headerRight) && (
					<div class="tableHeader">
						{headerLeft && <div class="headerLeft">{headerLeft?.()}</div>}
						{headerRight && <div class="headerRight">{headerRight?.()}</div>}
					</div>
				)}
				{editTable ? formTableRender() : getTableRender()}
				<div class="tablePagination">{cratePagination()}</div>
			</div>
		);
	},
});
</script>
