### 预览地址：[vue3-xmw-form](https://ele-plus-form.xmwpro.com/)

# vue3-xmw-from

基于 `Vue3` + `Element-plus` 封装的 `Form` 组件，支持所有 `Element-plus Form` 组件配置项 [文档](https://element-plus.gitee.io/zh-CN/component/form.html)

### 使用方法
* 根目录下执行 `npm i vue3-xmw-form` 命令
```POWERSHELL
npm i vue3-xmw-form
```

* 全局挂载组件
```JAVASCRIPT
import { createApp } from 'vue'
import App from './App.vue'
import Xmwform from 'vue3-xmw-form'

createApp(App).use(Xmwform).mount('#app')
```

* 在页面上使用
```HTML
<!-- template -->
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
```

### Form 属性

除此之外支持所有 `el-form` 所有 `属性`

| 参数              | 说明                                                       |  类型   | 默认值 |
| :---------        | :------------------------------------------------------   | :-----: | :----: |
| formData          | 表单数据,双向绑定(字段需与 `prop` 属性一样)                                           |  Object  |   -    |
| formColumns       | 表单配置项,详情见下方 `Column` 属性                           |  Array  |   -    |
| formRules         | 表单规则验证,校验规则请参考 [el-form](https://element-plus.gitee.io/zh-CN/component/form.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E6%A0%A1%E9%AA%8C%E8%A7%84%E5%88%99)           | Object | -  |

### Form 方法

表单组件已给 `el-form` 绑定 `ref` 并用 `defineExpose` 暴露出来，我们只需要在引入组件中绑定ref,即可调用 `el-form` 的方法
```HTML
<XmwForm :formData="formData" :formColumns="formColumns" :formRules="formRules" ref="baseForm"></XmwForm>
```
调用方式

```JAVASCRIPT
const baseForm = ref<HTMLElement | null>(null)
baseForm.value.formRef.resetFields()
```
具体写法可参考 [Demo](https://cyan-xmw.github.io/vue3-element-form/dist/)


### Column 配置 

| 参数 | 说明                         |  类型   | 默认值 |
| :--- | :--------------------------- | :-----: | :----: |
| xType       | 表单类型,详情见下方 `xType` 属性                           |  String  |   -    |
| slotName | 插槽,开启 `slot` 支持(开启这个属性,其它属性无效) | Boolean | false  |
| label | `el-form-item label` 属性 | String | -  |
| prop | `el-form-item prop` 属性 | String | -  |
| span | 栅格占据的列数 | Number | -  |
| offset | 栅格左侧的间隔格数 | Number | -  |
| formItemOpts | 支持 `el-form-item` 的所有属性 | Object | -  |
| $event | 支持 `xType` 表单类型的所有事件(事件名需与 `Element` 组件事件名一样) | Function | -  |

### xType 表单类型
| 参数 | 类型                         |  说明   |
| :--- | :--------------------------- | :-----: | 
| Input       | 输入框                 |  支持 [el-input](https://element-plus.gitee.io/zh-CN/component/input.html) 的所有属性和事件  |
| Autocomplete       | 自动补全输入框                |  支持 [el-autocomplete](https://element-plus.gitee.io/zh-CN/component/input.html#autocomplete-%E5%B1%9E%E6%80%A7) 的所有属性和事件  |
| Select       | 下拉框                |  支持 [el-select](https://element-plus.gitee.io/zh-CN/component/select.html) 的所有属性和事件  |
| SelectV2       | 虚拟列表选择器                |  支持 [el-select-v2](https://element-plus.gitee.io/zh-CN/component/select-v2.html) 的所有属性和事件  |
| DatePicker       | 日期时间选择器                |  支持 [el-date-picker](https://element-plus.gitee.io/zh-CN/component/date-picker.html) 的所有属性和事件  |
| TimePicker       | 时间选择器                |  支持 [el-time-picker](https://element-plus.gitee.io/zh-CN/component/time-picker.html) 的所有属性和事件  |
| TimeSelect       | 时间选择                |  支持 [el-time-select](https://element-plus.gitee.io/zh-CN/component/time-select.html) 的所有属性和事件  |
| InputNumber       | 数字输入框                |  支持 [el-input-number](https://element-plus.gitee.io/zh-CN/component/input-number.html) 的所有属性和事件  |
| Radio       | 单选框                |  支持 [el-radio](https://element-plus.gitee.io/zh-CN/component/radio.html) 的所有属性和事件  |
| Checkbox       | 多选框                |  支持 [el-checkbox](https://element-plus.gitee.io/zh-CN/component/checkbox.html) 的所有属性和事件  |
| Switch       | `Switch` 开关                |  支持 [el-switch](https://element-plus.gitee.io/zh-CN/component/switch.html) 的所有属性和事件  |
| Slider       | `Slider` 滑块                |  支持 [el-slider](https://element-plus.gitee.io/zh-CN/component/slider.html) 的所有属性和事件  |
| Rate       | `Rate` 评分                |  支持 [el-rate](https://element-plus.gitee.io/zh-CN/component/rate.html) 的所有属性和事件  |
| Transfer       | 穿梭框                |  支持 [el-transfer](https://element-plus.gitee.io/zh-CN/component/transfer.html) 的所有属性和事件  |
| Cascader       | 级联框                |  支持 [el-cascader](https://element-plus.gitee.io/zh-CN/component/cascader.html) 的所有属性和事件  |
| ColorPicker       | 颜色选择器                |  支持 [el-color-picker](https://element-plus.gitee.io/zh-CN/component/color-picker.html) 的所有属性和事件  |
| Tree       | 树形控件                |  支持 [el-tree](https://element-plus.gitee.io/zh-CN/component/tree.html) 的所有属性和事件  |
| TreeSelect       | 树形选择                |  支持 [el-tree-select](https://element-plus.gitee.io/zh-CN/component/tree-select.html) 的所有属性和事件  |
| TreeV2       | 虚拟化树形控件                |  支持 [el-tree-v2](https://element-plus.gitee.io/zh-CN/component/tree-v2.html) 的所有属性和事件  |                                                 | { row, column, \$index } |

### 存在的问题
 1. 还没找到办法支持所有 `xType` 的所有方法,如果需要用到组件的方法，目前只能用 `slotName` 引入 `Element` 原生组件,有想法的伙伴可以交流一下
 2. 由于获取不到 `el-tree` 的方法,`Tree` 和 `TreeV2` 组件目前还不能正确回显和数据绑定
 3. 目前已支持大部分的表单类型,还缺少一个 `LasySelect` 懒加载,带有空封装
 4. 需要的伙伴可以在此基础拓展

问题解决中。。。