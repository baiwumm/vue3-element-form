<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { jobsList, departmentList, provinces, cityGdList, cityHnList } from './data'

const state = reactive<any>({
  locale: zhCn,
  fromOpts: {
    data: {
      name: '张三',
      email: '843348394@qq.com',
      jobs: 'FrontEndEngineer',
      department: ['hr', 'manager'],
      province: '',
      city: ''
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
        type: 'Input',
        label: '姓名(输入框)',
        prop: 'name',
        clearable: true,
        span: 10,
        input
      },
      // 自动补全输入框
      {
        type: 'Autocomplete',
        label: '邮箱(自动补全)',
        prop: 'email',
        span: 10,
        offset: 2,
        'fetch-suggestions': querySearch
      },
      {
        slotName: 'baseSelect'
      },
      // 单选下拉框
      {
        type: 'Select',
        label: '岗位(单选)',
        prop: 'jobs',
        span: 10,
        options: jobsList
      },
      // 多选下拉框
      {
        type: 'Select',
        label: '部门(多选)',
        prop: 'department',
        span: 10,
        offset: 2,
        clearable: true,
        valueFiled: 'id',
        labelFiled: 'name',
        multiple: true,
        'collapse-tags': true,
        removeTag,
        options: departmentList
      },
      {
        type: 'Select',
        label: '省份(省市联动)',
        prop: 'province',
        span: 10,
        options: provinces,
        change: changeCity
      },
      {
        type: 'Select',
        label: '城市(省市联动)',
        prop: 'city',
        offset: 2,
        span: 10,
        options: []
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

// 移除多选tag触发
function removeTag(tag: string | number) {
  console.log(tag)
}

// 省市联动
function changeCity(val: string | number) {
  state.fromOpts.data.city = ''
  state.fromOpts.columns.find((el: { prop: string; }) => el.prop == 'city').options = { 'guangdong': cityGdList, 'hunan': cityHnList }[val]
}
</script>

<template>
  <el-config-provider :locale="state.locale">
    <div class="container" style="width: 800px; margin: 0 auto">
      <XmwForm :fromOpts="state.fromOpts" label-width="120px">
        <!-- 大标题 -->
        <template v-slot:baseTitle>
          <h1>基于 Element-plus 封装的表单组件</h1>
        </template>
        <!-- 基础输入框 -->
        <template v-slot:baseInput>
          <el-divider content-position="left">基础输入框</el-divider>
        </template>
        <!-- 基础下拉框 -->
        <template v-slot:baseSelect>
          <el-divider content-position="left">基础下拉框</el-divider>
        </template>
      </XmwForm>
    </div>
  </el-config-provider>
</template>
