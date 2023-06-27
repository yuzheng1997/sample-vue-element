import { Schema } from "@sample-vue-element/types/basicForm";
import { ElCol, ColProps, ElFormItem } from "element-plus/es";

// 获取formItem render
export const getFormItemRender = (schema: Schema) => {
    const { colSpan } = schema
    return () => (
        <ElCol {...colSpan as inferInstance<ColProps>}>
            <ElFormItem></ElFormItem>
        </ElCol>
    )
}



