<template>
    <el-switch v-model="Val" v-bind="$attrs" @change="props.change ? props.change($event) : false" />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
const emit = defineEmits(["update:modelValue"])
const props = defineProps({
    modelValue: {
        type: [Boolean, String, Number],
        default: () => ''
    },
    change: {
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