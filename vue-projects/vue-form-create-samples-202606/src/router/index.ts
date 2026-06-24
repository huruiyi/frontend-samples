import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/designer',
  },
  {
    path: '/designer',
    name: 'designer',
    component: () => import('../views/DesignerView.vue'),
    meta: { title: '表单设计器' },
  },
  {
    path: '/preview',
    name: 'preview',
    component: () => import('../views/PreviewView.vue'),
    meta: { title: '表单预览' },
  },
  {
    path: '/submissions',
    name: 'submissions',
    component: () => import('../views/SubmissionsView.vue'),
    meta: { title: '提交记录' },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: { title: '关于' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
