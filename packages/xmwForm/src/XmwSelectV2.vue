<template>
    <el-select-v2
        v-model="Val"
        v-bind="$attrs"
        style="width:100%"
        :options="props.options"
        :value-key="props.valueFiled"
        @change="props.change ? props.change($event) : false"
        @visible-change="props.visibleChange ? props.visibleChange($event) : false"
        @remove-tag="props.removeTag ? props.removeTag($event) : false"
        @clear="props.clear ? props.clear() : false"
        @blur="props.blur ? props.blur($event) : false"
        @focus="props.focus ? props.focus($event) : false"
    ></el-select-v2>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
const emit = defineEmits(["update:modelValue"])
const props = defineProps({
    modelValue: {
        type: [String, Number, Boolean, Object, Array],
        default: () => ''
    },
    options: {
        type: Array,
        default: () => []
    },
    valueFiled: {
        type: String,
        default: 'value'
    },
    labelFiled: {
        type: String,
        default: 'label'
    },
    change: {
        type: Function,
        default: () => () => { }
    },
    visibleChange: {
        type: Function,
        default: () => () => { }
    },
    removeTag: {
        type: Function,
        default: () => () => { }
    },
    clear: {
        type: Function,
        default: () => () => { }
    },
    blur: {
        type: Function,
        default: () => () => { }
    },
    focus: {
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