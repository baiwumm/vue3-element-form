<template>
    <el-form :model="prop.formData" v-bind="$attrs" :rules="prop.formRules">
        <el-row>
            <el-col
                v-for="(item, index) in prop.formColumns"
                :key="index"
                :span="item.span"
                :offset="item.offset"
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
                        v-model="prop.formData[item.prop]"
                    ></component>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>
<script lang="ts" setup>
import { ref, reactive, defineProps } from 'vue'
import Input from './XmwInput.vue' // Input 入框
import Autocomplete from './XmwAutocomplete.vue' // Autocomplete 自动补全输入框
import Select from './XmwSelect.vue' // Select 下拉框
import SelectV2 from './XmwSelectV2.vue' // Select V2 虚拟列表选择器
import DatePicker from './XmwDatePicker.vue' // DatePicker 日期时间选择器
import TimePicker from './XmwTimePicker.vue' // TimePicker 时间选择器
import TimeSelect from './XmwTimeSelect.vue' // TimeSelect 时间选择
import InputNumber from './XmwInputNumber.vue' // InputNumber 数字输入框
import Radio from './XmwRadio.vue' // Radio 单选框
import Checkbox from './XmwCheckbox.vue' // Checkbox 多选框
import Switch from './XmwSwitch.vue' // Switch 开关
import Slider from './XmwSlider.vue' // Slider 滑块
import Rate from './XmwRate.vue' // Rate 评分
import Transfer from './XmwTransfer.vue' // Transfer 穿梭框
import Cascader from './XmwCascader.vue' // Cascader 级联框
import ColorPicker from './XmwColorPicker.vue' // ColorPicker 颜色选择器
const prop = defineProps({
    // 表单数据
    formData: {
        type: Object,
        default: () => { }
    },
    // 表单配置项
    formColumns: {
        type: Array,
        default: () => []
    },
    // 表单规则验证
    formRules: {
        type: Object,
        default: () => { }
    }
})
// 定义动态组件
const componentsTypes = ({
    Input, Autocomplete, Select, SelectV2, DatePicker, TimePicker, TimeSelect, InputNumber, Radio, Checkbox, Switch, Slider, Rate, Transfer, Cascader, ColorPicker
})
</script>
<style scoped></style>