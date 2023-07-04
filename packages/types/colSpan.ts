import { basicProps } from "@sample-vue-element/components/BasicLayout/props";
import type { ColProps, RowProps } from "element-plus";
import { ExtractPropTypes } from "vue";

export type ColSpan = number | number[] | inferInstance<ColProps>;
export type BasicRowProps = inferInstance<RowProps>;
export type BasicLayoutPorps = ExtractPropTypes<typeof basicProps>;
