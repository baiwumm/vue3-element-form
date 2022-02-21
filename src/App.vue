<script setup lang="ts">
import { reactive, ref, onMounted, markRaw } from "vue";
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { jobsList, departmentList, provinces, cityGdList, cityHnList } from './data'
import { Apple, Bell } from '@element-plus/icons-vue'
const state = reactive<any>({
  locale: zhCn,
  fromOpts: {
    data: {
      name: '张三',
      email: '843348394@qq.com',
      remark: '为中华之崛起而读书',
      number: 18,
      stepNumber: 18,
      jobs: 'FrontEndEngineer',
      department: ['hr', 'manager'],
      province: 'guangdong',
      city: 'zhanjiang',
      year: '2022',
      month: '2022-01',
      date: '2022-01-01',
      dates: ['2022-01-01', '2022-01-02'],
      datetime: '2022-01-01 23:59:59',
      week: '2022-01-01',
      datetimerange: ['2022-01-01 23:59:59', '2022-02-01 17:32:27'],
      daterange: ['2022-01-01', '2022-02-01'],
      monthrange: ['2022-01', '2022-12'],
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
    },
    columns: [
      {
        slotName: 'baseTitle'
      },
      {
        slotName: 'baseInput'
      },
      // 输入框
      {
        xType: 'Input',
        label: '姓名(输入框)',
        prop: 'name',
        clearable: true,
        span: 11,
        input
      },
      // 自动补全输入框
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
      // 数字输入框
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
      {
        slotName: 'baseSelect'
      },
      // 单选下拉框
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
      {
        slotName: 'baseDatePicker'
      },
      // 时间选择器
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
      // 单选框
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
      // 多选框
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
    ],
    rules: {
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
  }
});

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
  state.fromOpts.data.city = ''
  state.fromOpts.columns.find((el: { prop: string; }) => el.prop == 'city').options = { 'guangdong': cityGdList, 'hunan': cityHnList }[val]
}

onMounted(() => {
  state.fromOpts.columns.find((el: { prop: string; }) => el.prop == 'city').options = { 'guangdong': cityGdList, 'hunan': cityHnList }[state.fromOpts.data.province]
})

</script>

<template>
  <el-config-provider :locale="state.locale">
    <div class="container" style="width: 90%; margin: 0 auto">
      <XmwForm :fromOpts="state.fromOpts" label-width="120px">
        <!-- 大标题 -->
        <template v-slot:baseTitle>
          <h1>基于 Element-plus 封装的表单组件</h1>
        </template>
        <!-- 输入框 -->
        <template v-slot:baseInput>
          <el-divider content-position="left">
            <el-tag size="large">输入框</el-tag>
          </el-divider>
        </template>
        <!-- 数字输入框 -->
        <template v-slot:baseInputNumber>
          <el-divider content-position="left">
            <el-tag size="large">数字输入框</el-tag>
          </el-divider>
        </template>
        <!-- 下拉框 -->
        <template v-slot:baseSelect>
          <el-divider content-position="left">
            <el-tag size="large">下拉框</el-tag>
          </el-divider>
        </template>
        <!-- 时间选择器 -->
        <template v-slot:baseDatePicker>
          <el-divider content-position="left">
            <el-tag size="large">时间选择器</el-tag>
          </el-divider>
        </template>
        <!-- 单选框 -->
        <template v-slot:baseRadio>
          <el-divider content-position="left">
            <el-tag size="large">单选框</el-tag>
          </el-divider>
        </template>
        <!-- 多选框 -->
        <template v-slot:baseCheckbox>
          <el-divider content-position="left">
            <el-tag size="large">多选框</el-tag>
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
      </XmwForm>
    </div>
  </el-config-provider>
</template>
