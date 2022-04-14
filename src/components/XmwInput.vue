<template>
    <el-input
        v-bind="$attrs"
        v-model="Val"
        style="width:100%"
        @blur="props.blur ? props.blur($event) : false"
        @focus="props.focus ? props.focus($event) : false"
        @change="props.change ? props.change($event) : false"
        @input="props.input ? props.input($event) : false"
        @clear="props.clear ? props.clear() : false"
    />
</template>
<script lang="ts" setup>
import { ref, defineProps, watch, defineEmits } from 'vue'
const emit = defineEmits(["update:modelValue"])
const props = defineProps({
    modelValue: {
        type: String,
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
    },
    input: {
        type: Function,
        default: () => () => { }
    },
    clear: {
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