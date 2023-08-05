import { reactive } from "vue";

export const usePagination = () => {
	const paginationParams = reactive({
		total: 0,
		pageSize: 10,
		pageNum: 1,
	});
	const setTotal = (val: number) => {
		paginationParams.total = val;
	};
	const setPageSize = (val: number) => {
		paginationParams.pageSize = val;
	};
	const setPageNum = (val: number) => {
		paginationParams.pageNum = val;
	};
	return {
		paginationParams,
		setTotal,
		setPageSize,
		setPageNum,
	};
};
