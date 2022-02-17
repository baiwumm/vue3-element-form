
<template>
  <!-- 此处加上v-bind="column"，会有警告，原因暂不明 -->
  <el-table-column :label="column.label" :prop="column.label" v-bind="column">
    <template v-for="item in column.children">
      <multistage-column
        v-if="item.children && item.children.length"
        :key="item.prop"
        :column="item"
      ></multistage-column>
      <el-table-column v-else :key="item.id" v-bind="item" show-overflow-tooltip>
        <template v-if="item.slotName" v-slot="scope">
          <slot :name="item.slotName" :data="scope"></slot>
        </template>
      </el-table-column>
    </template>
  </el-table-column>
</template>
<script lang="ts">
export default defineComponent({
  name: "MultistageColumn",
});
</script>
<script lang="ts" setup>
import { defineProps, defineComponent } from "vue";
// 定义组件接收的prop属性
const prop = defineProps({
  column: {
    type: Object,
    required: true,
  },
});
</script>