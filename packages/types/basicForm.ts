import { basicProps } from '@sample-vue-element/components/BasicForm/props'
import { Component, ExtractPropTypes } from 'vue'
import { ColSpan } from './colSpan'
export type Schema = {
    tag: string | Component,
    label?: string,
    field?: string,
    disabled?: FunctionAble<boolean>,
    filter?: FunctionAble<boolean>,
    rules?: FunctionAble<Array<any>>,
    colSpan: ColSpan,
    tip?: string
}

export type BasicFormProps = ExtractPropTypes<typeof basicProps>