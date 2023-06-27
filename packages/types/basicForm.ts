import { basicProps } from '@sample-vue-element/components/BasicForm/props'
import { Component } from 'vue'
export interface Schemas {
    tag: string | Component,
    label?: string,
    field?: string,
    disabled?: FunctionAble<boolean>,
    filter?: FunctionAble<boolean>,
    rules?: FunctionAble<Array<any>>,
    tip?: string
}

export type BasicFormProps = inferInstance<typeof basicProps>