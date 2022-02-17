import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import XmwForm from "./components/XmwForm.vue"; // 全局挂在table组件

createApp(App).use(router).use(ElementPlus).component('XmwForm', XmwForm).mount('#app')
