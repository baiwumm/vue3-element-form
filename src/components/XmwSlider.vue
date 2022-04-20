<template>
    <el-slider
        v-model="Val"
        v-bind="$attrs"
        @change="props.change ? props.change($event) : false"
        @input="props.change ? props.input($event) : false"
    />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
const emit = defineEmits(["update:modelValue"])
const props = defineProps({
    modelValue: {
        type: [Array, Number],
        default: () => ''
    },
    change: {
        type: Function,
        default: () => () => { }
    },
    input: {
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