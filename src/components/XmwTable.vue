<template>
  <div class="common-table">
    <!--批量操作栏，勾选行时显示-->
    <el-row
      justify="space-between"
      style="align-items: center; margin: 10px 0"
      v-if="_tableConfig.showSeletion && state.selection.length"
    >
      <div class="multi-menu">
        <span style="font-size: 12px">已选中{{ state.selection.length }}项</span>
        <el-divider direction="vertical" />
        <slot name="multiSelectMenu" :selection="state.selection" />
      </div>
      <a class="close" @click="clearSelection"></a>
    </el-row>
    <!-- 数据表格 -->
    <el-table
      ref="commonTableRef"
      :data="tableData"
      v-bind="$attrs"
      :rowKey="_tableConfig.rowKey"
      @selection-change="selectionChange"
      v-loading="loading"
    >
      <!-- 是否是展开行 -->
      <el-table-column type="expand" v-if="_tableConfig.showExpand">
        <template #default="props">
          <slot name="expand" :props="props" />
        </template>
      </el-table-column>
      <!-- 多选 -->
      <el-table-column
        v-if="_tableConfig.showSeletion"
        type="selection"
        width="60"
        :reserve-selection="_tableConfig.isCheckMemory"
        align="center"
      ></el-table-column>
      <!-- 显示自定义索引 -->
      <el-table-column
        v-if="_tableConfig.showIndexColumn"
        type="index"
        :index="typeIndex"
        width="60"
      >
        <!-- 自定义序列号 -->
        <template v-slot:header>
          <span>{{ _tableConfig.indexLabel }}</span>
        </template>
      </el-table-column>
      <!-- 递归渲染多级表头 -->
      <template v-for="column: any in columns">
        <multistage-column
          v-if="column.children && column.children.length"
          :key="column.prop"
          :column="column"
        ></multistage-column>
        <el-table-column v-else :key="column.id" v-bind="column" show-overflow-tooltip>
          <template v-if="column.slotName" v-slot="scope">
            <slot :name="column.slotName" :scope="scope"></slot>
          </template>
        </el-table-column>
      </template>
      <!-- 操作栏 -->
      <el-table-column v-if="_tableConfig.showHandler" v-bind="_tableConfig.handlerConfig">
        <template v-slot="scope">
          <slot name="handler" :scope="scope"></slot>
        </template>
      </el-table-column>
      <!-- 自定义默认内容 -->
      <el-table-column
        type="append"
        v-if="_tableConfig.showAppend"
        :label="_tableConfig.appendLabel"
      >
        <template #default="props">
          <slot name="append" :props="props" />
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页配置 -->
    <div class="pagination" v-if="showPagination">
      <Pagination
        :pageConfig="_paginationConfig"
        @size-change="pageSizeChange"
        @current-change="currentPageChange"
      ></Pagination>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, computed, defineEmits, reactive, ref } from "vue";
import MultistageColumn from "./MultistageColumn.vue"; // 递归多级表头组件
import Pagination from './Pagination.vue' // 分页组件
// 定义组件接收的prop属性
const prop = defineProps({
  // 表格源数据
  tableData: {
    type: Array,
    default: () => [],
  },
  //   表格配置项
  tableConfig: {
    type: Object,
    default: () => { },
  },
  //   表格列配置
  columns: {
    type: Array,
    default: () => [],
  },
  //   加载loading
  loading: {
    type: Boolean,
    default: false,
  },
  //   是否显示分页
  showPagination: {
    type: Boolean,
    default: true,
  },
  // 分页配置
  paginationConfig: {
    type: Object,
    default: () => { },
  },
});
const emit = defineEmits([
  "pageSizeChange",
  "currentPageChange",
  "multiSelection",
]); // 声明emit

const state = reactive({
  selection: [],
});
const commonTableRef = ref<HTMLElement | null>(null); // 表格ref

// 合并表格配置项
const _tableConfig = computed(() => {
  let result: any = {};
  const _tableConfig = { label: "操作", minWidth: 80, fixed: "right" };
  prop.tableConfig.handlerConfig &&
    Object.assign(_tableConfig, prop.tableConfig.handlerConfig);
  const config = {
    rowKey: "id", //   行数据的 Key，用来优化 Table 的渲染
    showSeletion: false, // 是否多选
    showIndexColumn: false, // 是否显示自定义索引
    indexLabel: '序号', // 自定义索引名
    isCheckMemory: false, // 是否需要跨页勾选
    showHandler: false, // 是否需要显示操作栏
    showExpand: false, // 是否是展开行
    showAppend: false, // 插入至表格最后一行之后的内容， 如果需要对表格的内容进行无限滚动操作，可能需要用到这个 slot。 若表格有合计行，该 slot 会位于合计行之上
    appendLabel: '自定义', // 自定义默认内容
  };
  result = Object.assign(config, prop.tableConfig);
  result.handlerConfig = _tableConfig;
  return result;
});

// 合并分页配置
const _paginationConfig = computed(() => {
  const config = {
    total: 0,
    current: 1,
    pageSize: 10,
    pageSizes: [10, 20, 30, 50],
    layout: "total, sizes, prev, pager, next, jumper",
  };
  return Object.assign(config, prop.paginationConfig);
});

// 切换分页
function pageSizeChange(pageSize: number) {
  emit("pageSizeChange", pageSize);
}
function currentPageChange(pageIndex: number) {
  emit("currentPageChange", pageIndex);
}

// 清空多选项
function clearSelection() {
  state.selection = [];
  // @ts-ignore
  commonTableRef.value.clearSelection();
}

// 多选赋值
function selectionChange(selection: any) {
  state.selection = selection;
  // 暴露选中事件
  emit("multiSelection", selection);
}

// 自定义排序
function typeIndex(index: number) {
  const tabIndex =
    index +
    (_paginationConfig.value.current - 1) * _paginationConfig.value.pageSize +
    1;
  return tabIndex;
}

// 用于多选表格，切换某一行的选中状态， 如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）
function toggleRowSelection(row: any, selected: boolean) {
  // @ts-ignore
  commonTableRef.value.toggleRowSelection(row, selected);
}

// 用于多选表格，切换全选和全不选
function toggleAllSelection() {
  // @ts-ignore
  commonTableRef.value.toggleAllSelection();
}

// 用于可扩展的表格或树表格，如果某行被扩展，则切换。 使用第二个参数，您可以直接设置该行应该被扩展或折叠。
function toggleRowExpansion(row: any, expanded: boolean) {
  // @ts-ignore
  commonTableRef.value.toggleRowExpansion(row, expanded);
}

// 用于单选表格，设定某一行为选中行， 如果调用时不加参数，则会取消目前高亮行的选中状态。
function setCurrentRow(row: any) {
  // @ts-ignore
  commonTableRef.value.setCurrentRow(row);
}

// 用于清空排序条件，数据会恢复成未排序的状态
function clearSort() {
  // @ts-ignore
  commonTableRef.value.clearSort();
}

// 用于清空排序条件，数据会恢复成未排序的状态
function clearFilter(columnKeys: Array<any>) {
  // @ts-ignore
  commonTableRef.value.clearFilter(columnKeys);
}

// 对 Table 进行重新布局。 当 Table 或其祖先元素由隐藏切换为显示时，可能需要调用此方法
function doLayout() {
  // @ts-ignore
  commonTableRef.value.doLayout();
}

// 手动对 Table 进行排序。 参数 prop 属性指定排序列，order 指定排序顺序
function sort(prop: string, order: string) {
  // @ts-ignore
  commonTableRef.value.sort(prop, order);
}

// 将table组件的全部方法暴露出去
defineExpose({
  clearSelection,
  toggleRowSelection,
  toggleAllSelection,
  toggleRowExpansion,
  setCurrentRow,
  clearSort,
  clearFilter,
  doLayout,
  sort
})
</script>
<style scoped>
.pagination {
  text-align: right;
  margin: 10px 0;
}
.close {
  position: relative;
  width: 16px;
  height: 16px;
}
.close:before,
.close:after {
  position: absolute;
  left: 8px;
  content: " ";
  height: 16px;
  width: 2px;
  background-color: #333;
  cursor: pointer;
}
.close:before {
  transform: rotate(45deg);
}
.close:after {
  transform: rotate(-45deg);
}
</style>