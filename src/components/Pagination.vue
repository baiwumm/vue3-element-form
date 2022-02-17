<template>
    <el-pagination v-bind="pageConfig"></el-pagination>
</template>
<script lang="ts" setup>
import { defineProps } from "vue";
// 定义组件接收的prop属性
const prop = defineProps({
    pageConfig: {
        type: Object,
        default: () => ({})
    }
})
</script>