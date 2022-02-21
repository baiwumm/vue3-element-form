<template>
    <el-radio-group
        v-model="Val"
        v-bind="$attrs"
        @change="props.change ? props.change($event) : false"
    >
        <template v-if="props.type === 'button'">
            <el-radio-button
                v-for="item in options"
                :key="item[valueFiled]"
                :label="item[valueFiled]"
            >{{ item[labelFiled] }}</el-radio-button>
        </template>
        <template v-else>
            <el-radio
                v-for="item in options"
                :key="item[valueFiled]"
                :label="item[valueFiled]"
                :border="props.type === 'border'"
            >{{ item[labelFiled] }}</el-radio>
        </template>
    </el-radio-group>
</template>
<script lang="ts" setup>
import { ref, defineProps, watch, defineEmits } from 'vue'
const emit = defineEmits(["update:modelValue"])
const props = defineProps({
    modelValue: {
        type: [Number, String, Boolean],
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
    type: {
        type: String,
        default: ''
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