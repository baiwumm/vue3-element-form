<template>
    <el-input-number
        v-bind="$attrs"
        v-model="Val"
        style="width:100%"
        @blur="props.blur ? props.blur($event) : false"
        @focus="props.focus ? props.focus($event) : false"
        @change="props.change ? props.change($event) : false"
    />
</template>
<script lang="ts" setup>
import { ref, defineProps, watch, defineEmits } from 'vue'
const emit = defineEmits(["update:modelValue"])
const props = defineProps({
    modelValue: {
        type: Number,
        default: () => ''
    },
    blur: {
        type: Function,
        default: () => () => { }
    },
    focus: {
        type: Function,
        default: () => () => { }
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