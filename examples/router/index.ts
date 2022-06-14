import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import XmwForm from '../../packages/xmwForm/src/main.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: XmwForm
    }
]
//创建
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router