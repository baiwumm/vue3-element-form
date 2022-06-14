<template>
  <el-form
    ref="formRef"
    :model="props.formData"
    :rules="props.formRules"
    v-bind="$attrs"
  >
    <el-row>
      <el-col
        v-for="(column, index) in props.formColumns"
        :key="index"
        :span="column.span"
        :offset="column.offset"
      >
        <template v-if="column.slotName">
          <slot :name="column.slotName"></slot>
        </template>
        <el-form-item
          :label="column.label"
          :prop="column.prop"
          v-else
          v-bind="column.formItemOpts"
        >
          <component
            :is="componentsTypes[column.xType]"
            v-bind="column"
            v-model="props.formData[column.prop]"
          >
          </component>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script lang="ts">
export default {
  name: "vue3-xmw-form", //这个⾮常重要，就是未来你放到其他项⽬中，组件标签的名字，⽐如：<my-first-comp></my-first-comp>
};
</script>
<script lang="ts" setup>
import { ref, markRaw } from "vue";
import Input from "./XmwInput.vue"; // Input 入框
import Autocomplete from "./XmwAutocomplete.vue"; // Autocomplete 自动补全输入框
import Select from "./XmwSelect.vue"; // Select 下拉框
import SelectV2 from "./XmwSelectV2.vue"; // Select V2 虚拟列表选择器
import DatePicker from "./XmwDatePicker.vue"; // DatePicker 日期时间选择器
import TimePicker from "./XmwTimePicker.vue"; // TimePicker 时间选择器
import TimeSelect from "./XmwTimeSelect.vue"; // TimeSelect 时间选择
import InputNumber from "./XmwInputNumber.vue"; // InputNumber 数字输入框
import Radio from "./XmwRadio.vue"; // Radio 单选框
import Checkbox from "./XmwCheckbox.vue"; // Checkbox 多选框
import Switch from "./XmwSwitch.vue"; // Switch 开关
import Slider from "./XmwSlider.vue"; // Slider 滑块
import Rate from "./XmwRate.vue"; // Rate 评分
import Transfer from "./XmwTransfer.vue"; // Transfer 穿梭框
import Cascader from "./XmwCascader.vue"; // Cascader 级联框
import ColorPicker from "./XmwColorPicker.vue"; // ColorPicker 颜色选择器
import Tree from "./XmwTree.vue"; // Tree 树形控件
import TreeSelect from "./XmwTreeSelect.vue"; // TreeSelect 树形选择
import TreeV2 from "./XmwTreeV2.vue"; // Tree V2 虚拟化树形控件
import type { FormInstance } from "element-plus";
const props = defineProps({
  // 表单数据
  formData: {
    type: Object,
    default: () => {},
  },
  // 表单配置项
  formColumns: {
    type: Array as any,
    default: () => [],
  },
  // 表单规则验证
  formRules: {
    type: Object,
    default: () => {},
  },
});
// 定义动态组件
const componentsTypes = markRaw({
  Input,
  Autocomplete,
  Select,
  SelectV2,
  DatePicker,
  TimePicker,
  TimeSelect,
  InputNumber,
  Radio,
  Checkbox,
  Switch,
  Slider,
  Rate,
  Transfer,
  Cascader,
  ColorPicker,
  Tree,
  TreeSelect,
  TreeV2,
});
// 将表单绑定的ref暴露给父组件
const formRef = ref<FormInstance>();
defineExpose({ formRef });
</script>