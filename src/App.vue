<script setup lang="ts">
import { reactive, ref, onMounted, markRaw } from "vue";
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { jobsList, departmentList, provinces, cityGdList, cityHnList, areaOpts } from './data'
import { Apple, Bell } from '@element-plus/icons-vue'
// 穿梭框数据
interface Option {
  key: number
  label: string
  disabled: boolean
}

const generateData = (): Option[] => {
  const data: Option[] = []
  for (let i = 1; i <= 15; i++) {
    data.push({
      key: i,
      label: `列表 ${i}`,
      disabled: i % 4 === 0,
    })
  }
  return data
}

const transferData = ref(generateData())

// 虚拟列表模拟数据
const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
const selectV2Options = Array.from({ length: 1000 }).map((_, idx) => ({
  value: `Option ${idx + 1}`,
  label: `${initials[idx % 10]}${idx}`,
}))
// 表单数据
const formData = reactive(
  {
    name: '张三',
    email: '843348394@qq.com',
    remark: '为中华之崛起而读书',
    number: 18,
    stepNumber: 18,
    jobs: 'FrontEndEngineer',
    department: ['hr', 'manager'],
    province: 'guangdong',
    city: 'zhanjiang',
    selectV21: '',
    selectV22: '',
    year: '2022',
    month: '2022-01',
    date: '2022-01-01',
    dates: ['2022-01-01', '2022-01-02'],
    datetime: '2022-01-01 23:59:59',
    week: '2022-01-01',
    datetimerange: ['2022-01-01 23:59:59', '2022-02-01 17:32:27'],
    daterange: ['2022-01-01', '2022-02-01'],
    monthrange: ['2022-01', '2022-12'],
    timePicker1: null,
    timePicker2: [new Date(2022, 1, 1, 8, 40, 21), new Date(2022, 12, 31, 9, 40, 32)],
    timeSelect1: '',
    timeSelect2: '',
    timeSelect3: '',
    radio: 'guangdong',
    borderRadio: 'guangdong',
    buttonRadio: 'guangdong',
    checkbox: ['guangdong'],
    borderCheckbox: ['guangdong'],
    buttonCheckbox: ['guangdong'],
    switch1: true,
    switch2: true,
    switch3: true,
    slider1: 10,
    slider2: [4, 8],
    slider3: 10,
    rate1: 1.5,
    rate2: 0,
    rate3: 2.8,
    transfer: [1],
    cascader1: ['guangdong', 'zhanjiang'],
    cascader2: ['guangdong'],
    cascader3: [],
    color1: '#409EFF',
    color2: 'rgba(19, 206, 102, 0.8)',
    color3: 'rgba(255, 69, 0, 0.68)'
  })
// 表单配置项
const formColumns = reactive([
  {
    slotName: 'baseTitle'
  },
  {
    slotName: 'baseInput'
  },
  // Input 输入框
  {
    xType: 'Input',
    label: '姓名(输入框)',
    prop: 'name',
    clearable: true,
    span: 11,
    input
  },
  // Autocomplete 自动补全输入框
  {
    xType: 'Autocomplete',
    label: '邮箱(自动补全)',
    prop: 'email',
    span: 11,
    offset: 2,
    'fetch-suggestions': querySearch
  },
  {
    xType: 'Input',
    label: '备注(多行文本)',
    prop: 'remark',
    clearable: true,
    type: 'textarea',
    rows: 4,
    maxlength: 200,
    'show-word-limit': true,
    span: 24
  },
  // InputNumber 数字输入框
  {
    slotName: 'baseInputNumber'
  },
  {
    xType: 'InputNumber',
    label: '基础用法',
    prop: 'number',
    span: 11,
  },
  {
    xType: 'InputNumber',
    label: '多配置用法',
    prop: 'stepNumber',
    min: 1,
    max: 99,
    'controls-position': 'right',
    step: 2,
    offset: 2,
    span: 11,
  },
  // Select 单选下拉框
  {
    slotName: 'baseSelect'
  },
  {
    xType: 'Select',
    label: '岗位(单选)',
    prop: 'jobs',
    span: 11,
    options: jobsList
  },
  // 多选下拉框
  {
    xType: 'Select',
    label: '部门(多选)',
    prop: 'department',
    span: 11,
    offset: 2,
    clearable: true,
    valueFiled: 'id',
    labelFiled: 'name',
    multiple: true,
    'collapse-tags': true,
    options: departmentList
  },
  {
    xType: 'Select',
    label: '省份(省市联动)',
    prop: 'province',
    span: 11,
    options: provinces,
    change: changeCity
  },
  {
    xType: 'Select',
    label: '城市(省市联动)',
    prop: 'city',
    offset: 2,
    span: 11,
    options: []
  },
  // Select V2 虚拟列表选择器
  {
    slotName: 'baseSelectV2'
  },
  {
    xType: 'SelectV2',
    label: '基础用法',
    prop: 'selectV21',
    span: 12,
    options: selectV2Options
  },
  {
    xType: 'SelectV2',
    label: '过滤多选',
    prop: 'selectV22',
    span: 12,
    filterable: true,
    multiple: true,
    options: selectV2Options
  },
  // DatePicker 日期时间选择器
  {
    slotName: 'baseDatePicker'
  },
  {
    xType: 'DatePicker',
    label: '年份',
    type: 'year',
    prop: 'year',
    formItemOpts: {
      labelWidth: '60px'
    },
    span: 6
  },
  {
    xType: 'DatePicker',
    label: '月份',
    type: 'month',
    prop: 'month',
    formItemOpts: {
      labelWidth: '60px'
    },
    span: 6
  },
  {
    xType: 'DatePicker',
    label: '某一天',
    type: 'date',
    prop: 'date',
    formItemOpts: {
      labelWidth: '80px'
    },
    span: 6
  },
  {
    xType: 'DatePicker',
    label: '多选天',
    type: 'dates',
    prop: 'dates',
    formItemOpts: {
      labelWidth: '80px'
    },
    span: 6
  },
  {
    xType: 'DatePicker',
    label: '日期时间',
    type: 'datetime',
    prop: 'datetime',
    formItemOpts: {
      labelWidth: '80px'
    },
    span: 6
  },
  {
    xType: 'DatePicker',
    label: '周',
    type: 'week',
    prop: 'week',
    formItemOpts: {
      labelWidth: '60px'
    },
    span: 6,
    format: 'YYYY年第w周'
  },
  {
    xType: 'DatePicker',
    label: '日期时间范围',
    type: 'datetimerange',
    prop: 'datetimerange',
    formItemOpts: {
      labelWidth: '120px'
    },
    span: 12
  },
  {
    xType: 'DatePicker',
    label: '日期范围',
    type: 'daterange',
    prop: 'daterange',
    formItemOpts: {
      labelWidth: '80px'
    },
    span: 8
  },
  {
    xType: 'DatePicker',
    label: '月份范围',
    type: 'monthrange',
    prop: 'monthrange',
    formItemOpts: {
      labelWidth: '80px'
    },
    span: 8
  },
  // TimePicker 时间选择器
  {
    slotName: 'baseTimePicker'
  },
  {
    xType: 'TimePicker',
    label: '基础用法',
    prop: 'timePicker1',
    placeholder: '请选择时间',
    span: 12
  },
  {
    xType: 'TimePicker',
    label: '时间范围',
    prop: 'timePicker2',
    'start-placeholder': '开始时间',
    'end-placeholder': '结束时间',
    'is-range': true,
    'arrow-control': true,
    span: 12
  },
  // TimeSelect 时间选择
  {
    slotName: 'baseTimeSelect'
  },
  {
    xType: 'TimeSelect',
    label: '基础用法',
    prop: 'timeSelect1',
    placeholder: '请选择时间',
    start: "08:30",
    step: "00:15",
    end: "18:30",
    span: 8
  },
  {
    xType: 'TimeSelect',
    label: '时间范围',
    prop: 'timeSelect2',
    placeholder: '开始时间',
    maxTime: formData.timeSelect3, // 不知道为啥这个没有响应式，有待研究
    start: "08:30",
    step: "00:15",
    end: "18:30",
    span: 8,
    change: (val: string) => { formData.timeSelect3 = ''; formColumns.find(el => el.prop == 'timeSelect3').minTime = val }
  },
  {
    xType: 'TimeSelect',
    prop: 'timeSelect3',
    placeholder: '结束时间',
    minTime: formData.timeSelect2, // 不知道为啥这个没有响应式，有待研究
    start: "08:30",
    step: "00:15",
    end: "18:30",
    formItemOpts: {
      labelWidth: '10px'
    },
    change: (val: string) => { formData.timeSelect2 = ''; formColumns.find(el => el.prop == 'timeSelect2').maxTime = val },
    span: 6
  },
  // Radio 单选框
  {
    slotName: 'baseRadio'
  },
  {
    xType: 'Radio',
    label: '基础用法',
    prop: 'radio',
    span: 8,
    options: provinces
  },
  {
    xType: 'Radio',
    label: '带有边框',
    prop: 'borderRadio',
    span: 8,
    type: 'border',
    options: provinces
  },
  {
    xType: 'Radio',
    label: '单选按钮',
    prop: 'buttonRadio',
    span: 8,
    type: 'button',
    options: provinces
  },
  // CheckBox 多选框
  {
    slotName: 'baseCheckbox'
  },
  {
    xType: 'Checkbox',
    label: '基础用法',
    prop: 'checkbox',
    span: 8,
    options: provinces
  },
  {
    xType: 'Checkbox',
    label: '带有边框',
    prop: 'borderCheckbox',
    type: 'border',
    span: 8,
    options: provinces
  },
  {
    xType: 'Checkbox',
    label: '单选按钮',
    prop: 'buttonCheckbox',
    type: 'button',
    span: 8,
    options: provinces
  },
  // Switch 开关
  {
    slotName: 'baseSwitch'
  },
  {
    xType: 'Switch',
    label: '基础用法',
    prop: 'switch1',
    span: 8,
    'active-color': "#13ce66",
    'inactive-color': "#ff4949"
  },
  {
    xType: 'Switch',
    label: '文本描述',
    prop: 'switch2',
    span: 8,
    'active-color': "#13ce66",
    'inactive-color': "#ff4949",
    'active-text': '开',
    'inactive-text': '关'
  },
  {
    xType: 'Switch',
    label: '自定义图标',
    prop: 'switch3',
    span: 8,
    'active-icon': markRaw(Apple),
    'inactive-icon': markRaw(Bell),
    'inline-prompt': true
  },
  // Slider 滑块
  {
    slotName: 'baseSlider'
  },
  {
    xType: 'Slider',
    label: '基础用法',
    prop: 'slider1',
    span: 8
  },
  {
    xType: 'Slider',
    label: '范围选择',
    prop: 'slider2',
    range: true,
    'show-stops': true,
    max: 10,
    span: 8
  },
  {
    xType: 'Slider',
    label: '带有输入框',
    prop: 'slider3',
    span: 8,
    'show-input': true
  },
  // Rate 评分
  {
    slotName: 'baseRate'
  },
  {
    xType: 'Rate',
    label: '基础用法',
    prop: 'rate1',
    colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
    'allow-half': true,
    span: 8
  },
  {
    xType: 'Rate',
    label: '辅助文字',
    prop: 'rate2',
    'show-text': true,
    texts: ['非常不好', '不好', '一般', '好', '非常好'],
    span: 8
  },
  {
    xType: 'Rate',
    label: '只读',
    prop: 'rate3',
    disabled: true,
    'show-score': true,
    'text-color': '#ff9900',
    'score-template': '{value} 分',
    span: 8
  },
  // Transfer 穿梭框
  {
    slotName: 'baseTransfer'
  },
  {
    xType: 'Transfer',
    label: '基础用法',
    prop: 'transfer',
    filterable: true,
    'left-default-checked': [2, 3],
    'right-default-checked': [1],
    titles: ['Source', 'Target'],
    'button-texts': ['To left', 'To right'],
    format: {
      noChecked: '${total}',
      hasChecked: '${checked}/${total}',
    },
    data: transferData,
    style: "display: flex",
    span: 24
  },
  // Cascader 级联框
  {
    slotName: 'baseCascader'
  },
  {
    xType: 'Cascader',
    label: '基础用法',
    prop: 'cascader1',
    options: areaOpts,
    props: {
      expandTrigger: 'hover',
    },
    span: 8
  },
  {
    xType: 'Cascader',
    label: '任意选项',
    prop: 'cascader2',
    options: areaOpts,
    props: {
      multiple: true,
      checkStrictly: true,
    },
    span: 8
  },
  {
    xType: 'Cascader',
    label: '动态加载',
    prop: 'cascader3',
    props: {
      lazy: true,
      lazyLoad(node, resolve) {
        let id = 0
        const { level } = node
        setTimeout(() => {
          const nodes = Array.from({ length: level + 1 }).map((item) => ({
            value: ++id,
            label: `Option - ${id}`,
            leaf: level >= 2,
          }))
          // Invoke `resolve` callback to return the child nodes data and indicate the loading is finished.
          resolve(nodes)
        }, 1000)
      },
    },
    span: 8
  },
  // ColorPicker 颜色选择器
  {
    slotName: 'baseColorPicker'
  },
  {
    xType: 'ColorPicker',
    label: '基础用法',
    prop: 'color1',
    span: 8
  },
  {
    xType: 'ColorPicker',
    label: '选择透明度',
    prop: 'color2',
    'show-alpha': true,
    span: 8
  },
  {
    xType: 'ColorPicker',
    label: '预定义颜色',
    prop: 'color3',
    'show-alpha': true,
    predefine: [
      '#ff4500',
      '#ff8c00',
      '#ffd700',
      '#90ee90',
      '#00ced1',
      '#1e90ff',
      '#c71585',
      'rgba(255, 69, 0, 0.68)',
      'rgb(255, 120, 0)',
      'hsv(51, 100, 98)',
      'hsva(120, 40, 94, 0.5)',
      'hsl(181, 100%, 37%)',
      'hsla(209, 100%, 56%, 0.73)',
      '#c7158577',
    ],
    span: 8
  },
])
// 表单验证规则
const formRules = {
  name: [
    {
      required: true,
      message: '请输入名字',
      trigger: 'blur',
    }
  ],
  email: [
    {
      type: 'email',
      message: '请输入正确的邮箱格式',
      trigger: ['blur', 'change'],
    },
  ],
  department: [
    {
      required: true,
      message: '请选择部门',
      trigger: 'change',
    }
  ],
}

// 输入框触发事件
function input(val: string | number) {
  console.log(val)
}
// 自动补全建议列表
interface RestaurantItem {
  value: string
}
const restaurants = ref<RestaurantItem[]>([])
function querySearch(queryString: string, cb: any) {
  let emailItem = ['qq.com', '163.com']
  const results = queryString ? emailItem.map(el => { return { value: queryString.split('@')[0] + '@' + el } }) : restaurants.value
  cb(results)
}

// 省市联动
function changeCity(val: string | number) {
  formData.city = ''
  formColumns.find(el => el.prop == 'city').options = { 'guangdong': cityGdList, 'hunan': cityHnList }[val]
}

// 时间范围筛选
function changeStartTime(val: string) {
  formColumns.find(el => el.prop == 'timeSelect3').minTime = val
}

onMounted(() => {
  formColumns.find(el => el.prop == 'city').options = { 'guangdong': cityGdList, 'hunan': cityHnList }[formData.province]
})

</script>

<template>
  <el-config-provider :locale="zhCn">
    <div class="container" style="width: 90%; margin: 0 auto">
      <XmwForm
        :formData="formData"
        :formColumns="formColumns"
        :formRules="formRules"
        label-width="120px"
      >
        <!-- 大标题 -->
        <template v-slot:baseTitle>
          <h1>基于 Element-plus 封装的表单组件</h1>
        </template>
        <!-- Input 输入框 -->
        <template v-slot:baseInput>
          <el-divider content-position="left">
            <el-tag size="large">Input 输入框</el-tag>
          </el-divider>
        </template>
        <!-- InputNumber 数字输入框 -->
        <template v-slot:baseInputNumber>
          <el-divider content-position="left">
            <el-tag size="large">InputNumber 数字输入框</el-tag>
          </el-divider>
        </template>
        <!-- Select 下拉框 -->
        <template v-slot:baseSelect>
          <el-divider content-position="left">
            <el-tag size="large">Select 下拉框</el-tag>
          </el-divider>
        </template>
        <!-- Select V2 虚拟列表选择器 -->
        <template v-slot:baseSelectV2>
          <el-divider content-position="left">
            <el-tag size="large">Select V2 虚拟列表选择器</el-tag>
          </el-divider>
        </template>
        <!-- DatePicker 日期时间选择器 -->
        <template v-slot:baseDatePicker>
          <el-divider content-position="left">
            <el-tag size="large">DatePicker 日期时间选择器</el-tag>
          </el-divider>
        </template>
        <!-- TimePicker 时间选择器 -->
        <template v-slot:baseTimePicker>
          <el-divider content-position="left">
            <el-tag size="large">TimePicker 时间选择器</el-tag>
          </el-divider>
        </template>
        <!-- TimeSelect 时间选择 -->
        <template v-slot:baseTimeSelect>
          <el-divider content-position="left">
            <el-tag size="large">TimeSelect 时间选择</el-tag>
          </el-divider>
        </template>
        <!-- Radio 单选框 -->
        <template v-slot:baseRadio>
          <el-divider content-position="left">
            <el-tag size="large">Radio 单选框</el-tag>
          </el-divider>
        </template>
        <!-- CheckBox 多选框 -->
        <template v-slot:baseCheckbox>
          <el-divider content-position="left">
            <el-tag size="large">CheckBox 多选框</el-tag>
          </el-divider>
        </template>
        <!-- Switch 开关 -->
        <template v-slot:baseSwitch>
          <el-divider content-position="left">
            <el-tag size="large">Switch 开关</el-tag>
          </el-divider>
        </template>
        <!-- Slider 滑块 -->
        <template v-slot:baseSlider>
          <el-divider content-position="left">
            <el-tag size="large">Slider 滑块</el-tag>
          </el-divider>
        </template>
        <!-- Rate 评分 -->
        <template v-slot:baseRate>
          <el-divider content-position="left">
            <el-tag size="large">Rate 评分</el-tag>
          </el-divider>
        </template>
        <!-- Transfer 穿梭框 -->
        <template v-slot:baseTransfer>
          <el-divider content-position="left">
            <el-tag size="large">Transfer 穿梭框</el-tag>
          </el-divider>
        </template>
        <!-- Cascader 级联框 -->
        <template v-slot:baseCascader>
          <el-divider content-position="left">
            <el-tag size="large">Cascader 级联框</el-tag>
          </el-divider>
        </template>
        <!-- ColorPicker 颜色选择器 -->
        <template v-slot:baseColorPicker>
          <el-divider content-position="left">
            <el-tag size="large">ColorPicker 颜色选择器</el-tag>
          </el-divider>
        </template>
      </XmwForm>
    </div>
  </el-config-provider>
</template>
<style scoped>
:deep .el-transfer__buttons {
  display: flex;
  align-items: center;
}
</style>
