import { PropType } from "vue";

export const props = {
	name: String as PropType<string>,
	id: String as PropType<string>,
	autocomplete: String as PropType<string>,
	automaticDropdown: {
		type: Boolean as PropType<boolean>,
		default: false,
	},
	size: String as PropType<string>,
	effect: String as PropType<string>,
	disabled: {
		type: Boolean as PropType<boolean>,
		default: false,
	},
	clearable: {
		type: Boolean as PropType<boolean>,
		default: false,
	},
	filterable: {
		type: Boolean as PropType<boolean>,
		default: false,
	},
	allowCreate: {
		type: Boolean as PropType<boolean>,
		default: false,
	},
	loading: {
		type: Boolean as PropType<boolean>,
		default: false,
	},
	popperClass: String as PropType<string>,
	clearIcon: String as PropType<string>,
	teleported: {
		type: Boolean as PropType<boolean>,
		default: true,
	},
	remote: {
		type: Boolean as PropType<boolean>,
		default: false,
	},
	loadingText: String as PropType<string>,
	noMatchText: String as PropType<string>,
	noDataText: String as PropType<string>,
	remoteMethod: Function as PropType<(args?: any[]) => any>,
	filterMethod: Function as PropType<(args?: any[]) => any>,
	multiple: {
		type: Boolean as PropType<boolean>,
		default: false,
	},
	multipleLimit: Number as PropType<number>,
	placeholder: String as PropType<string>,
	defaultFirstOption: {
		type: Boolean as PropType<boolean>,
		default: false,
	},
	reserveKeyword: {
		type: Boolean as PropType<boolean>,
		default: true,
	},
	collapseTags: {
		type: Boolean as PropType<boolean>,
		default: false,
	},
	collapseTagsTooltip: {
		type: Boolean as PropType<boolean>,
		default: false,
	},
	persistent: {
		type: Boolean as PropType<boolean>,
		default: true,
	},
	fitInputWidth: {
		type: Boolean as PropType<boolean>,
		default: false,
	},
	validateEvent: {
		type: Boolean as PropType<boolean>,
		default: true,
	},
	remoteShowSuffix: {
		type: Boolean as PropType<boolean>,
		default: false,
	},
	suffixTransition: {
		type: Boolean as PropType<boolean>,
		default: true,
	},
	placement: String as PropType<string>,
	sourceData: {
		type: Array as PropType<Recordable[]>,
	},
	// 筛选规则
	filterRule: {
		type: Function as PropType<(args?: any[]) => boolean>,
	},
	// 禁用规则
	disabledRule: {
		type: Function as PropType<(args?: any[]) => boolean>,
	},
	// label 字段名
	labelField: {
		type: String as PropType<string>,
		default: "label",
	},
	// value 字段名
	valueField: {
		type: String as PropType<string>,
		default: "value",
	},
	api: {
		type: Function as PropType<(args?: any[]) => any>,
	},
	// 额外参数
	extraParams: {
		type: Object as Recordable,
		default: () => ({}),
	},
	// 级联字段，支持在basicForm中使用
	relationFields: {
		type: Array as PropType<string[]>,
	},
	formatParams: {
		type: Function,
		default: (val?: any) => val,
	},
};

export const defaultFilterRule = () => true;
export const defaultDisabledRule = () => false;
