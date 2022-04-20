<template>
    <el-tree-select v-bind="$attrs" v-model="Val" style="width:100%"
        @change="props.change ? props.change($event) : false"
        @visible-change="props.visibleChange ? props.visibleChange($event) : false"
        @remove-tag="props.removeTag ? props.removeTag($event) : false" @clear="props.clear ? props.clear() : false"
        @blur="props.blur ? props.blur($event) : false" @focus="props.focus ? props.focus($event) : false"
        @node-click="(a, b, c) => props.nodeClick ? props.nodeClick(a, b, c) : false"
        @node-contextmenu="(a, b, c, d) => props.nodeContextmenu ? props.nodeContextmenu(a, b, c, d) : false"
        @check-change="(a, b, c) => props.checkChange ? props.checkChange(a, b, c) : false"
        @check="(a, b) => props.check ? props.check(a, b) : false"
        @current-change="(a, b) => props.currentChange ? props.currentChange(a, b) : false"
        @node-expand="(a, b, c) => props.nodeExpand ? props.nodeExpand(a, b, c) : false"
        @node-collapse="(a, b, c) => props.nodeCollapse ? props.nodeCollapse(a, b, c) : false"
        @node-drag-start="(a, b) => props.nodeDragStart ? props.nodeDragStart(a, b) : false"
        @node-drag-enter="(a, b, c) => props.nodeDragEnter ? props.nodeDragEnter(a, b, c) : false"
        @node-drag-leave="(a, b, c) => props.nodeDragLeave ? props.nodeDragLeave(a, b, c) : false"
        @node-drag-over="(a, b, c) => props.nodeDragOver ? props.nodeDragOver(a, b, c) : false"
        @node-drag-end="(a, b, c, d) => props.nodeDragEnd ? props.nodeDragEnd(a, b, c, d) : false"
        @node-drop="(a, b, c, d) => props.nodeDrop ? props.nodeDrop(a, b, c, d) : false" />
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