<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

const state = reactive<any>({
  locale: zhCn,
  fromOpts: {
    data: {
      name: '张三'
    },
    columns: [
      {
        type: 'Input',
        label: '姓名',
        prop: 'name',
        clearable: true,
        span: 10
      }
    ],
    rules: {
      name: [
        {
          required: true,
          message: '请输入名字',
          trigger: 'blur',
        }
      ]
    }
  }
});

function change() {
  console.log(state.fromOpts.data)
}
</script>

<template>
  <el-config-provider :locale="state.locale">
    <div class="container" style="width: 800px; margin: 0 auto;padding-top:50px">
      <XmwForm :fromOpts="state.fromOpts"></XmwForm>
    </div>
  </el-config-provider>
</template>
