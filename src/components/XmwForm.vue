<template>
    <el-form :model="fromOpts.data" v-bind="$attrs" :rules="fromOpts.rules">
        <el-row>
            <el-col
                v-for="(item, index) in prop.fromOpts.columns"
                :key="index"
                :span="item.span"
                :offset="item.
                offset"
            >
                <!-- 自定义输入框插槽 -->
                <template v-if="item.slotName">
                    <slot :name="item.slotName"></slot>
                </template>
                <el-form-item
                    :label="item.label"
                    :prop="item.prop"
                    v-else
                    v-bind="item.formItemOpts"
                >
                    <!-- 表单动态组件 -->
                    <component
                        :is="componentsTypes[item.xType]"
                        v-bind="item"
                        v-model="fromOpts.data[item.prop]"
                    ></component>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>
<script lang="ts" setup>
import { ref, reactive, defineProps, markRaw } from 'vue'
import Input from './XmwInput.vue' // 输入框
import Autocomplete from './XmwAutocomplete.vue' // 自动补全输入框
import Select from './XmwSelect.vue' // 下拉框
import DatePicker from './XmwDatePicker.vue' // 时间选择器
import InputNumber from './XmwInputNumber.vue' // 数字输入框
import Radio from './XmwRadio.vue' // 单选框
import Checkbox from './XmwCheckbox.vue' // 多选框
import Switch from './XmwSwitch.vue' // Switch 开关
import Slider from './XmwSlider.vue' // Slider 滑块
const prop = defineProps({
    fromOpts: {
        type: Object,
        default: () => { }
    }
})
// 定义动态组件
const componentsTypes = ({
    Input, Autocomplete, Select, DatePicker, InputNumber, Radio, Checkbox, Switch, Slider
})
</script>
<style scoped></style>