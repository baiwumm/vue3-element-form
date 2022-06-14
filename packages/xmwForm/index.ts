
// 导入组件，组件必须声明 name
import XmwForm from './src/main.vue'

// 为组件添加 install 方法，用于按需引入
XmwForm.install = function (Vue: any) {
    Vue.component(XmwForm.name, XmwForm)
}

export default XmwForm
