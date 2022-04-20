<template>
    <el-tree-v2 v-bind="$attrs" v-model="Val" style="width:100%"
        @node-click="(a, b, c) => props.nodeClick ? props.nodeClick(a, b, c) : false"
        @node-contextmenu="(a, b, c, d) => props.nodeContextmenu ? props.nodeContextmenu(a, b, c, d) : false"
        @check-change="(a, b, c) => props.checkChange ? props.checkChange(a, b, c) : false"
        @check="(a, b) => props.check ? props.check(a, b) : false"
        @current-change="(a, b) => props.currentChange ? props.currentChange(a, b) : false"
        @node-expand="(a, b, c) => props.nodeExpand ? props.nodeExpand(a, b, c) : false"
        @node-collapse="(a, b, c) => props.nodeCollapse ? props.nodeCollapse(a, b, c) : false" />
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
const emit = defineEmits(["update:modelValue"])
const props = defineProps({
    modelValue: {
        type: Array,
        default: () => []
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
    },
    // 	节点被关闭时触发的事件
    nodeCollapse: {
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