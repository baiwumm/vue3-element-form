<template>
    <el-transfer
        v-model="Val"
        v-bind="$attrs"
        @change="props.change ? props.change($event) : false"
        @left-check-change="props.leftCheckChange ? props.leftCheckChange($event) : false"
        @right-check-change="props.rightCheckChange ? props.rightCheckChange($event) : false"
    />
</template>

<script lang="ts" setup>
import { ref, defineProps, watch, defineEmits } from 'vue'
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