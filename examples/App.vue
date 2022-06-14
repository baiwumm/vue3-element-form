<script setup lang="ts">
import { reactive, ref, onMounted, markRaw } from "vue";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import {
  jobsList,
  departmentList,
  provinces,
  cityGdList,
  cityHnList,
  areaOpts,
  predefineColors,
  predefineTrees,
} from "./data";
import { Apple, Bell } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";

// 穿梭框数据
interface Option {
  key: number;
  label: string;
  disabled: boolean;
}

const generateData = (): Option[] => {
  const data: Option[] = [];
  for (let i = 1; i <= 15; i++) {
    data.push({
      key: i,
      label: `列表 ${i}`,
      disabled: i % 4 === 0,
    });
  }
  return data;
};

const transferData = ref(generateData());

// 虚拟列表模拟数据
const initials = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
const selectV2Options = Array.from({ length: 1000 }).map((_, idx) => ({
  value: `Option ${idx + 1}`,
  label: `${initials[idx % 10]}${idx}`,
}));

// 权限菜单数据
const permissionsItem = [
  {
    id: "setting",
    label: "系统设置",
    children: [
      {
        id: "menu",
        label: "菜单管理",
      },
    ],
  },
];

interface Tree {
  id: string;
  label: string;
  children?: Tree[];
}

const getKey = (prefix: string, id: number) => {
  return `${prefix}-${id}`;
};

const createData = (
  maxDeep: number,
  maxChildren: number,
  minNodesNumber: number,
  deep = 1,
  key = "node"
): Tree[] => {
  let id = 0;
  return Array.from({ length: minNodesNumber })
    .fill(deep)
    .map(() => {
      const childrenNumber =
        deep === maxDeep ? 0 : Math.round(Math.random() * maxChildren);
      const nodeKey = getKey(key, ++id);
      return {
        id: nodeKey,
        label: nodeKey,
        children: childrenNumber
          ? createData(maxDeep, maxChildren, childrenNumber, deep + 1, nodeKey)
          : undefined,
      };
    });
};

const treeV2Data = createData(4, 30, 40);
// 表单数据
const formData = reactive({
  userName: "张三",
  email: "843348394@qq.com",
  remark: "为中华之崛起而读书",
  age: 18,
  jobs: "FrontEndEngineer",
  department: ["hr", "manager"],
  province: "guangdong",
  city: "zhanjiang",
  birthday: "2022-01-01",
  birthTime: new Date(2022, 12, 31, 9, 40, 32),
  getupTime: "09:00",
  sex: "0",
  officeArea: ["guangdong", "shanghai"],
  openService: true,
  scoresRange: [20, 80],
  rate: 5,
  hometown: ["guangdong", "zhanjiang"],
  virtualList: [],
  permissionsMenu: permissionsItem,
  treeSelect: ["home", "log"],
  treeSelectV2: [],
  transfer: [1],
  loveColor: "rgba(255, 69, 0, 0.68)",
});
// 表单配置项
const formColumns = reactive([
  {
    slotName: "baseTitle",
  },
  {
    xType: "Input",
    label: "姓名",
    prop: "userName",
    clearable: true,
    span: 8,
    input,
  },
  {
    xType: "Autocomplete",
    label: "邮箱",
    prop: "email",
    span: 8,
    "fetch-suggestions": querySearch,
  },
  {
    xType: "InputNumber",
    label: "年龄",
    prop: "age",
    min: 1,
    max: 120,
    "controls-position": "right",
    step: 2,
    span: 8,
  },
  {
    xType: "Select",
    label: "岗位",
    prop: "jobs",
    span: 8,
    options: jobsList,
  },
  {
    xType: "Select",
    label: "部门",
    prop: "department",
    span: 8,
    clearable: true,
    valueFiled: "id",
    labelFiled: "name",
    multiple: true,
    "collapse-tags": true,
    options: departmentList,
  },
  {
    xType: "Select",
    label: "地区",
    prop: "province",
    span: 5,
    options: provinces,
    change: changeCity,
  },
  {
    xType: "Select",
    prop: "city",
    label: "-",
    span: 3,
    formItemOpts: {
      labelWidth: "30px",
    },
    options: [],
  },
  {
    xType: "DatePicker",
    label: "出生日期",
    type: "date",
    prop: "birthday",
    span: 8,
  },
  {
    xType: "TimePicker",
    label: "出生时间",
    prop: "birthTime",
    placeholder: "请选择时间",
    span: 8,
  },
  {
    xType: "TimeSelect",
    label: "起床时间",
    prop: "getupTime",
    placeholder: "请选择时间",
    start: "08:30",
    step: "00:15",
    end: "18:30",
    span: 8,
  },
  {
    xType: "Radio",
    label: "性别",
    prop: "sex",
    span: 8,
    options: [
      {
        value: "0",
        label: "男",
      },
      {
        value: "1",
        label: "女",
      },
    ],
  },
  {
    xType: "Checkbox",
    label: "办公地区",
    prop: "officeArea",
    span: 8,
    options: provinces,
  },
  {
    xType: "Switch",
    label: "开启服务",
    prop: "openService",
    span: 8,
    "active-color": "#13ce66",
    "inactive-color": "#ff4949",
    "active-text": "是",
    "inactive-text": "否",
    "inline-prompt": true,
  },
  {
    xType: "ColorPicker",
    label: "喜欢的颜色",
    prop: "loveColor",
    "show-alpha": true,
    predefine: predefineColors,
    span: 8,
  },
  {
    xType: "Slider",
    label: "分数范围",
    prop: "scoresRange",
    range: true,
    "show-stops": true,
    max: 100,
    step: 10,
    span: 8,
  },
  {
    xType: "Rate",
    label: "评分",
    prop: "rate",
    "show-text": true,
    texts: ["非常不好", "不好", "一般", "好", "非常好"],
    colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
    span: 8,
  },
  {
    xType: "Cascader",
    label: "家乡",
    prop: "hometown",
    options: areaOpts,
    props: {
      expandTrigger: "hover",
    },
    span: 8,
  },
  {
    xType: "SelectV2",
    label: "虚拟列表",
    prop: "virtualList",
    span: 8,
    filterable: true,
    multiple: true,
    "multiple-limit": 3,
    options: selectV2Options,
  },
  {
    xType: "TreeSelect",
    label: "树形选择",
    prop: "treeSelect",
    multiple: true,
    data: predefineTrees,
    "show-checkbox": true,
    "node-key": "id",
    span: 8,
  },
  {
    xType: "Tree",
    label: "树形控件",
    prop: "permissionsMenu",
    data: predefineTrees,
    "show-checkbox": true,
    "node-key": "id",
    check: checkRoles,
    span: 8,
  },
  {
    xType: "TreeV2",
    label: "虚拟树形控件",
    prop: "treeSelectV2",
    data: treeV2Data,
    "show-checkbox": true,
    "node-key": "id",
    span: 8,
  },
  {
    xType: "Transfer",
    label: "穿梭框",
    prop: "transfer",
    filterable: true,
    "left-default-checked": [2, 3],
    "right-default-checked": [1],
    titles: ["Source", "Target"],
    "button-texts": ["To left", "To right"],
    format: {
      noChecked: "${total}",
      hasChecked: "${checked}/${total}",
    },
    data: transferData,
    style: "display: flex",
    span: 24,
  },
  {
    xType: "Input",
    label: "备注",
    prop: "remark",
    clearable: true,
    type: "textarea",
    rows: 4,
    maxlength: 200,
    "show-word-limit": true,
    span: 24,
  },
  {
    slotName: "Actions",
  },
]);
// 表单验证规则
const formRules = reactive<FormRules>({
  userName: [
    { required: true, message: "请输入名字", trigger: "blur" },
    { min: 2, max: 5, message: "名字长度在2-5个字", trigger: "blur" },
  ],
  email: [
    {
      type: "email",
      message: "请输入正确的邮箱格式",
      trigger: ["blur", "change"],
    },
  ],
  department: [
    {
      required: true,
      message: "请选择部门",
      trigger: "change",
    },
  ],
});

// 输入框触发事件
function input(val: string | number) {
  console.log(val);
}
// 自动补全建议列表
interface RestaurantItem {
  value: string;
}
const restaurants = ref<RestaurantItem[]>([]);
function querySearch(queryString: string, cb: any) {
  let emailItem = ["qq.com", "163.com"];
  const results = queryString
    ? emailItem.map((el) => {
        return { value: queryString.split("@")[0] + "@" + el };
      })
    : restaurants.value;
  cb(results);
}

// 省市联动
function changeCity(val: string | number) {
  formData.city = "";
  formColumns.find((el) => el.prop == "city").options = {
    guangdong: cityGdList,
    hunan: cityHnList,
  }[val];
}

// 勾选权限菜单
function checkRoles(node, data) {
  console.log(node, data);
  // formData.permissionsMenu = [...permissionsItem, ...[node]]
}

// 递归过滤有子节点的父节点id
let childKeys: string[] = [];
const loop = function (tree: any) {
  tree.map((node) => {
    if (node.children) {
      loop(node.children);
    } else {
      childKeys.push(node.id);
    }
  });
};
loop(formData.permissionsMenu);

const baseForm = ref<HTMLElement | null>(null);

// 提交操作
async function onSubmit(formEl: FormInstance | undefined) {
  if (!formEl) return;
  await formEl.formRef.validate((valid, fields) => {
    if (!valid) return;
    console.log(formData);
    ElMessage({
      message: "请到控制台查看数据",
      type: "success",
    });
  });
}

// 重置操作
function handlerReset() {
  baseForm.value.formRef.resetFields();
  formData.permissionsMenu = permissionsItem;
  formColumns.find((el) => el.prop == "permissionsMenu").defaultCheckedKeys =
    childKeys;
}

onMounted(() => {
  formColumns.find((el) => el.prop == "city").options = {
    guangdong: cityGdList,
    hunan: cityHnList,
  }[formData.province];
  // 权限菜单回显
  formColumns.find((el) => el.prop == "permissionsMenu").defaultCheckedKeys =
    childKeys;
});
</script>

<template>
  <el-config-provider :locale="zhCn">
    <div
      class="container"
      style="width: 90%; margin: 0 auto; padding-bottom: 30px"
    >
      <vue3-xmw-form
        :formData="formData"
        :formColumns="formColumns"
        :formRules="formRules"
        label-width="120px"
        ref="baseForm"
      >
        <!-- 大标题 -->
        <template v-slot:baseTitle>
          <h1>基于 Element-plus 封装的表单组件</h1>
        </template>
        <!-- 操作按钮 -->
        <template v-slot:Actions>
          <div style="text-align: center">
            <el-button type="primary" @click="onSubmit(baseForm)"
              >提交</el-button
            >
            <el-button @click="handlerReset">重置</el-button>
          </div>
        </template>
      </vue3-xmw-form>
    </div>
  </el-config-provider>
</template>
<style scoped>
:deep .el-transfer__buttons {
  display: flex;
  align-items: center;
}

:deep .el-rate__item {
  display: flex;
}
</style>
