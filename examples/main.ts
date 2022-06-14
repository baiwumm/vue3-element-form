import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import XmwForm from '../packages/index'; // 全局挂在form组件
// import XmwForm from '../dist/vue3-xmw-form.es.js'

createApp(App).use(router).use(ElementPlus).use(XmwForm).mount('#app')
