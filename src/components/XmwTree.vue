<template>
    <el-tree v-bind="$attrs" v-model="Val" style="width:100%" ref="treeRef"
        @node-click="props.nodeClick ? props.nodeClick($event) : false"
        @node-contextmenu="props.nodeContextmenu ? props.nodeContextmenu($event) : false"
        @check-change="props.checkChange ? props.checkChange($event) : false"
        @check="props.check ? props.check($event) : false"
        @current-change="props.currentChange ? props.currentChange($event) : false"
        @node-expand="props.nodeExpand ? props.nodeExpand($event) : false"
        @node-collapse="props.nodeCollapse ? props.nodeCollapse($event) : false"
        @node-drag-start="props.nodeDragStart ? props.nodeDragStart($event) : false"
        @node-drag-enter="props.nodeDragEnter ? props.nodeDragEnter($event) : false"
        @node-drag-leave="props.nodeDragLeave ? props.nodeDragLeave($event) : false"
        @node-drag-over="props.nodeDragOver ? props.nodeDragOver($event) : false"
        @node-drag-end="props.nodeDragEnd ? props.nodeDragEnd($event) : false"
        @node-drop="props.nodeDrop ? props.nodeDrop($event) : false" />
</template>
<script lang="ts" setup>
import { relative } from 'path';
import { ref, defineProps, watch, defineEmits } from 'vue'
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
    },
    // 	节点开始拖拽时触发的事件
    nodeDragStart: {
        type: Function,
        default: function () { }
    },
    // 	拖拽进入其他节点时触发的事件
    nodeDragEnter: {
        type: Function,
        default: function () { }
    },
    // 	拖拽离开某个节点时触发的事件
    nodeDragLeave: {
        type: Function,
        default: function () { }
    },
    // 	在拖拽节点时触发的事件（类似浏览器的 mouseover 事件）
    nodeDragOver: {
        type: Function,
        default: function () { }
    },
    // 	拖拽结束时（可能未成功）触发的事件
    nodeDragEnd: {
        type: Function,
        default: function () { }
    },
    // 	拖拽成功完成时触发的事件
    nodeDrop: {
        type: Function,
        default: function () { }
    }
})

const treeRef = ref<HTMLElement | null>(null)
const Val = ref(props.modelValue)
//监听父组件的值
watch(() => props.modelValue, () => {
    Val.value = props.modelValue
})

// 通过emit将值传递给父组件
emit("update:modelValue", Val)
</script>