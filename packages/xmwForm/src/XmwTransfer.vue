<template>
    <el-transfer v-model="Val" v-bind="$attrs" @change="(a, b) => props.change ? props.change(a, b) : false"
        @left-check-change="(a, b) => props.leftCheckChange ? props.leftCheckChange(a, b) : false"
        @right-check-change="(a, b) => props.rightCheckChange ? props.rightCheckChange(a, b) : false" />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
const emit = defineEmits(["update:modelValue"])
const props = defineProps({
    modelValue: {
        type: Array,
        default: () => []
    },
    change: {
        type: Function,
        default: () => () => { }
    },
    leftCheckChange: {
        type: Function,
        default: () => () => { }
    },
    rightCheckChange: {
        type: Function,
        default: () => () => { }
    }
})

const Val = ref(props.modelValue)
//监听父组件的值
watch(() => props.modelValue, () => {
    Val.value = props.modelValue
})

// 通过emit将值传递给父组件
emit("update:modelValue", Val)
</script>