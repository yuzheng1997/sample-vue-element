import { basicProps } from "@sample-vue-element/components/BasicForm/props";
import { Component, ExtractPropTypes } from "vue";
import { ColSpan } from "./colSpan";
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
};

export type BasicFormProps = ExtractPropTypes<typeof basicProps>;
