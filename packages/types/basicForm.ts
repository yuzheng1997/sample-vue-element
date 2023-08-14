import { basicProps } from "@sample-vue-element/components/BasicForm/props";
import { Component, ExtractPropTypes, VNode } from "vue";
import { ColSpan } from "./colSpan";
import { ElForm } from "element-plus";
import BasicForm from "@sample-vue-element/components/BasicForm/index.vue";
export type Schema = {
	tag?: string | Component;
	type?: string;
	label?: string;
	field?: string;
	prop?: string;
	defaultValue?: any;
	disabled?: FunctionAble<boolean>;
	filter?: FunctionAble<boolean>;
	rules?: FunctionAble<Array<any>>;
	colSpan?: ColSpan;
	tip?: string;
	required?: boolean;
	render?: (model: Recordable) => JSX.Element | VNode;
	[others: string]: any;
};

export type BasicFormProps = ExtractPropTypes<typeof basicProps>;
export type ElFormInstance = InstanceType<typeof ElForm>;
export type BasicFormInstance = InstanceType<typeof BasicForm>;
