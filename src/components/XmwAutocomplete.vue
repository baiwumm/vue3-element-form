<template>
    <el-autocomplete
        v-bind="$attrs"
        v-model="Val"
        @select="props.select ? props.select($event) : false"
        @change="props.change ? props.change($event) : false"
        style="width:100%"
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
    select: {
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