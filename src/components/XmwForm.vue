<template>
    <el-form :model="fromOpts.data" v-bind="$attrs" :rules="fromOpts.rules">
        <el-row>
            <el-col
                v-for="(item, index) in prop.fromOpts.columns"
                :key="index"
                :span="item.span"
                :offset="item.offset"
            >
                <el-form-item :label="item.label" :prop="item.prop">
                    <!-- 自定义输入框插槽 -->
                    <template v-if="item.slotName">
                        <slot :name="item.slotName"></slot>
                    </template>
                    <!-- 表单动态组件 -->
                    <component
                        v-else
                        :is="componentsTypes[item.type]"
                        v-bind="item"
                        v-model="fromOpts.data[item.prop]"
                    ></component>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>
<script lang="ts" setup>
import { ref, reactive, defineProps } from 'vue'
import Input from './XmwInput.vue' // 输入框
const prop = defineProps({
    fromOpts: {
        type: Object,
        default: () => { }
    }
})
// 定义动态组件
const componentsTypes = ({
    Input
})
</script>
<style scoped></style>