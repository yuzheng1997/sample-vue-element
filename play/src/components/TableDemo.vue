<template>
<BasicTable edit-table :data="data" :schemas="schemas"></BasicTable>
</template>

<script setup lang="ts">
import BasicTable from "@sample-vue-element/components/BasicTable/index.vue";
import { ElInput } from "element-plus";
import { ref } from "vue";
const schemas = [
    {
        field: 'a',
        label: 'a',
        tag: ElInput
    },
    
    {
        field: 'b',
        label: 'b',
        tag: ElInput
    },
    
    {
        field: 'c',
        label: 'c',
        tag: ElInput
    },
    {
        field: 'd',
        label: 'd',
        tag: ElInput
    },
    {
        field: 'e',
        label: 'e',
        tag: ElInput
    },
    {
        field: 'f',
        label: 'f',
        tag: ElInput
    }
]
const data = ref([
    {
        a: '1',
        b: '1',
        c: '1',
        d: '1',
        e: '1',
        f: '1'
    },
    {
        a: '1',
        b: '1',
        c: '1',
        d: '1',
        e: '1',
        f: '1'
    }
])

</script>

<style lang="scss" scoped></style>
