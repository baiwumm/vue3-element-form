import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import XmwForm from '@/components/XmwForm.vue'

const routes:Array<RouteRecordRaw> = [
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