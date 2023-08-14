import {
	getContentRender,
	getTipRender,
} from "@sample-vue-element/components/common";
import type {
	getProps,
	resolveFunctionAble,
	resolveRules,
} from "@sample-vue-element/utils";
import { ElForm, ElFormItem, ElTable, ElTableColumn } from "element-plus";
import {
	VNode,
	resolveDirective,
	withDirectives,
	ref,
	onMounted,
	onUnmounted,
} from "vue";
import { keyOfTableColumnProps } from "../props";
import { clone, throttle } from "lodash-es";
import BasicPagination from "@sample-vue-element/components/BasicPagination/index.vue";
import type {
	TableHelperArgs,
	TableSchema,
	TableSourceData,
	PaginationHelper,
	BasicTableInstance,
} from "../../../types/basicTable.";

export const tableRenderHelper = ({
	props,
	ctx,
	tablePropsHelper,
	tableSourceData,
	paginationHelper,
}: TableHelperArgs) => {
	const { editTable, showIndex, selection, autoHeight } = props;
	const { slots } = ctx;
	const {
		getSchemas,
		tableRef,
		registerFormRef,
		registerTableRef,
		tableProps,
	} = tablePropsHelper;
	// 渲染单个列
	const tableContentRender = () => {
		const nodes = getSchemas.value.map((schema) => {
			const columnProps = getProps(schema, keyOfTableColumnProps);
			return (
				<ElTableColumn {...columnProps}>
					{{
						default: getColumnContentRender(schema),
						header: getColumnHeaderRender(schema),
					}}
				</ElTableColumn>
			);
		});
		return addSelectionColumn(addIndexColumn(nodes));
	};
	// 渲染表头
	const getColumnHeaderRender = (schema: TableSchema) => {
		const { label, tip } = schema;
		return () => (
			<>
				{tip && getTipRender(tip)}
				{label}
			</>
		);
	};
	const addIndexColumn = (nodes: VNode[]) => {
		if (!showIndex) return nodes;
		const indexColumn = (
			<ElTableColumn
				type="index"
				width="55"
				align="center"
				label="序号"
			></ElTableColumn>
		);
		nodes.unshift(indexColumn);
		return nodes;
	};
	const addSelectionColumn = (nodes: VNode[]) => {
		if (!selection) return nodes;
		const selectionColumn = (
			<ElTableColumn
				type="selection"
				align="center"
				reserveSelection={true}
				width="55"
			></ElTableColumn>
		);
		nodes.unshift(selectionColumn);
		return nodes;
	};
	// 渲染列内容
	const getColumnContentRender = (schema: TableSchema) => {
		const { field, render } = schema;
		// 如果有插槽，则使用插槽
		if (schema.field && slots[schema.field]) {
			return slots[schema.field];
		}
		// 支持render函数
		if (render) {
			return (params: Recordable) => resolveFunctionAble(render, <></>, params);
		}
		if (editTable) {
			return getTableFormItemRender(schema);
		}
		return ({ row }: Recordable) => row[field as string];
	};
	const getEmptyRender = () => {
		if (slots.empty) return slots.empty;
		return () => "暂无数据";
	};
	// 编辑表格列渲染函数
	const getTableFormItemRender = (schema: TableSchema) => {
		const { tag, field } = schema;
		const resolvedRules = resolveRules(schema);
		// 没有提供组件
		if (!tag) {
			return ({ row }: Recordable) => row[field as string];
		}
		return ({ row, $index }: Recordable) => {
			// 控件render
			const contentRender = getContentRender(schema, row);
			return (
				<ElFormItem
					prop={`formData.${$index}.${field}`}
					rules={resolveFunctionAble(resolvedRules, [], row)}
				>
					{{
						default: contentRender,
					}}
				</ElFormItem>
			);
		};
	};
	// 获取表格渲染函数
	const getTableRender = () => {
		const { dataRef, onSelect, onSelectAll, onSingleSelect, loading } =
			tableSourceData as TableSourceData;
		const tablePropsComputed = clone(tableProps.value) as Recordable;
		// 表格选择
		if (selection === "multiple") {
			tablePropsComputed.onSelect = onSelect;
			tablePropsComputed.onSelectAll = onSelectAll;
		} else if (selection === "single") {
			tablePropsComputed.onSelect = onSingleSelect;
		}
		const vLoading = resolveDirective("loading");
		const directives: any = [];
		const tableContentHeight = ref<number | string>("auto");
		// 增加loading
		if (vLoading) {
			directives.push([vLoading, loading.value]);
		}
		// 自定义高度
		if (autoHeight) {
			// 获取当前dom的大小
			const throttleCb = throttle(
				(entries: ResizeObserverEntry[]) => {
					const [entry] = entries;
					const {
						contentRect: { height },
					} = entry;
					// todo 待修改，修改为可配置
					tableContentHeight.value = height - 30 - 30;
				},
				100,
				{
					leading: true,
				}
			);
			let parentNode: HTMLElement;
			const resizeObserver = new ResizeObserver(throttleCb);
			onMounted(() => {
				parentNode = (tableRef.value as BasicTableInstance).$el
					.parentNode as HTMLElement;
				while (!parentNode.className.includes("STableWrapper")) {
					parentNode = parentNode.parentNode as HTMLElement;
				}
				parentNode && resizeObserver.observe(parentNode);
			});
			onUnmounted(() => {
				resizeObserver.unobserve(parentNode);
			});
		}
		return () =>
			withDirectives(
				<ElTable
					{...tablePropsComputed}
					ref={registerTableRef}
					data={dataRef.value}
					height={tableContentHeight.value}
				>
					{{
						default: tableContentRender,
						append: slots.append,
						empty: getEmptyRender(),
					}}
				</ElTable>,
				directives as any
			);
	};
	// 编辑表格
	const formTableRender = () => {
		const { formDataRef } = tableSourceData as TableSourceData;
		const tableRender = getTableRender();
		return () => (
			<ElForm
				inlineMessage={true}
				ref={registerFormRef}
				model={formDataRef.value}
			>
				{{
					default: tableRender,
				}}
			</ElForm>
		);
	};
	const cratePagination = () => {
		const { paginationParams } = paginationHelper as PaginationHelper;
		return () => <BasicPagination {...paginationParams}></BasicPagination>;
	};
	return {
		getTableRender: getTableRender(),
		formTableRender: formTableRender(),
		cratePagination: cratePagination(),
	};
};
