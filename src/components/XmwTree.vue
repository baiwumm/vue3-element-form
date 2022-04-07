<template>
    <el-tree
        v-bind="$attrs"
        v-model="Val"
        style="width:100%"
        @node-click="props.nodeClick ? props.nodeClick($event) : false"
        @node-contextmenu="props.nodeContextmenu ? props.nodeContextmenu($event) : false"
        @check-change="props.checkChange ? props.checkChange($event) : false"
        @check="props.check ? props.check($event) : false"
        @current-change="props.currentChange ? props.currentChange($event) : false"
        @node-expand="props.nodeExpand ? props.nodeExpand($event) : false"
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
    // 当节点被点击的时候触发
    nodeClick: {
        type: Function,
        default: function () { }
    },
    // 当某一节点被鼠标右键点击时会触发该事件
    nodeContextmenu: {
        type: Function,
        default: function () { }
    },
    // 当某一节点被鼠标右键点击时会触发该事件
    checkChange: {
        type: Function,
        default: function () { }
    },
    // 	点击节点复选框之后触发
    check: {
        type: Function,
        default: function () { }
    },
    // 	当前选中节点变化时触发的事件
    currentChange: {
        type: Function,
        default: function () { }
    },
    // 	节点被展开时触发的事件
    nodeExpand: {
        type: Function,
        default: function () { }
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