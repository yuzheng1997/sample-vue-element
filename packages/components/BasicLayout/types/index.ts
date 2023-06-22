import type { ColProps, RowProps } from "element-plus"

export type ColSpan = inferInstance<ColProps>
export type BasicRowProps = inferInstance<RowProps>
export type BasicLayoutPorps = BasicRowProps & { colSpan?: ColSpan }