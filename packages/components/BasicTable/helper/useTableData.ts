import { TableHelperArgs } from "@sample-vue-element/types/basicTable";
import { ref, watchEffect, onMounted, nextTick } from "vue";

export const useSourceData = ({
	ctx,
	props,
	tablePropsHelper,
}: TableHelperArgs) => {
	const { data, api } = props;
	const { tableRef } = tablePropsHelper;
	const { emit } = ctx;
	const loading = ref(false);
	const dataRef = ref<Recordable[]>([]);
	const selectedRows = ref<Recordable[]>([]);
	const formDataRef = ref({
		formData: dataRef.value,
	});
	const setTableData = (data: Recordable[]) => {
		dataRef.value = data;
		formDataRef.value = { formData: dataRef.value };
	};
	// 不提供api则使用data作为数据源
	if (!api) {
		watchEffect(() => {
			if (props.data) {
				setTableData(data);
			}
		});
	}

	// 获取表单的数据，供查询使用
	// const getFormCtx = inject("formCtx", () => {});
	// 移除选择项
	const remove = (item: Recordable, clear = true) => {
		const fieldKey = props.fieldKey as string;
		// 删除已选择
		const index = selectedRows.value.findIndex(
			(row) => row[fieldKey] === item[fieldKey]
		);
		if (~index) {
			selectedRows.value.splice(index, 1);
			clear && tableRef.value?.toggleRowSelection(item, false);
		}
	};
	// 用于多选
	const onSelect = (selection: Recordable[], row: Recordable) => {
		// 如果存在则是选择，不存在则是删除
		const current = selection.find((item) => item === row);
		if (!current) {
			remove(row);
			return;
		}
		selectedRows.value.push(current);
	};
	const onSelectAll = async (selection: Recordable[]) => {
		const list = getTableData();
		list.forEach((item) => remove(item, false));
		await nextTick();
		if (selection.length !== 0) {
			selectedRows.value.push(...selection);
		}
	};
	const onSingleSelect = async (selection: Recordable[], row: Recordable) => {
		tableRef.value?.clearSelection();
		selectedRows.value = [];
		if (selection.length > 0) {
			tableRef.value?.toggleRowSelection(row, true);
			selectedRows.value.push(row);
		} else {
			// selectionTableRef.value.clearSelection()
			selectedRows.value = [];
		}
	};

	const buildParams = (): Recordable => {
		return {};
	};

	const fetchData = () => {
		const summaryParams = buildParams();
		if (api) {
			loading.value = true;
			api(summaryParams)
				.then((res: Recordable) => {
					const { rows, data, total, code } = res;
					if (code == 200 || code == 0) {
						let sourceData = rows || data || [];
						// 获取数据成功后处理数据或者其他作用
						if (props.afterFetch) {
							sourceData = props.afterFetch(sourceData) || sourceData;
						}
						setTableData(sourceData);
						// 可能分页也可能不是分页

						// if (pagination && rows && !isBlock(total)) {
						// 	pageCtx.setTotal(total);
						// }
						emit("fetchSuccess", dataRef.value, total);
					}
				})
				.finally(() => {
					loading.value = false;
				});
		}
	};
	onMounted(() => {
		props.autoFetch && fetchData();
	});

	const getSelectionRows = async () => {
		await nextTick();
		return tableRef.value?.getSelectionRows();
	};
	const toggleRowSelection = async (row: any, selected: boolean) => {
		await nextTick();
		tableRef.value?.toggleRowSelection(row, selected);
	};
	const clearSelection = async () => {
		await nextTick();
		tableRef.value?.clearSelection();
	};
	const setCurrentRow = async (row: any) => {
		await nextTick();
		tableRef.value?.setCurrentRow(row);
	};
	const getTableData = () => {
		return dataRef.value;
	};

	return {
		dataRef,
		formDataRef,
		loading,
		fetchData,
		getSelectionRows,
		toggleRowSelection,
		clearSelection,
		setCurrentRow,
		getTableData,
		setTableData,
		remove,
		onSelect,
		onSelectAll,
		onSingleSelect,
	};
};
