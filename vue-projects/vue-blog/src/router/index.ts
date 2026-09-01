import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    // 前台路由
    {
      path: '/',
      component: () => import('@/layouts/FrontLayout.vue'),
      children: [
        { path: '', name: 'Home', component: () => import('@/pages/front/Home.vue') },
        { path: 'article/:id', name: 'ArticleDetail', component: () => import('@/pages/front/ArticleDetail.vue') },
        { path: 'tags', name: 'Tags', component: () => import('@/pages/front/Tags.vue') },
        { path: 'tags/:id', name: 'TagArticles', component: () => import('@/pages/front/TagArticles.vue') },
        { path: 'about', name: 'About', component: () => import('@/pages/front/About.vue') },
        { path: ':pathMatch(.*)*', redirect: '/' },
      ],
    },
    // 后台路由
    {
      path: '/admin',
      component: () => import('@/layouts/AdminLayout.vue'),
      children: [
        { path: '', redirect: '/admin/dashboard' },
        { path: 'dashboard', name: 'AdminDashboard', component: () => import('@/pages/admin/Dashboard.vue') },
        { path: 'articles', name: 'AdminArticles', component: () => import('@/pages/admin/Articles.vue') },
        { path: 'articles/new', name: 'AdminArticleNew', component: () => import('@/pages/admin/ArticleEdit.vue') },
        { path: 'articles/:id/edit', name: 'AdminArticleEdit', component: () => import('@/pages/admin/ArticleEdit.vue') },
        { path: 'tags', name: 'AdminTags', component: () => import('@/pages/admin/Tags.vue') },
        { path: 'settings', name: 'AdminSettings', component: () => import('@/pages/admin/Settings.vue') },
      ],
    },
  ],
})

export default router
