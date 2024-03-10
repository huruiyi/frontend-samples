import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/Login'
import PreviousPage from '@/components/PreviousPage'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/main',
      name: 'MainFrame',
      component: () => import('../views/MainFrame.vue'),
      children: [
        {
          path: '/page0',
          component: () => import('../views/demo/page0.vue')
        },
        {
          path: '/page1',
          component: () => import('../views/demo/page1.vue')
        },
        {
          path: '/page2',
          component: () => import('../views/demo/page2.vue')
        },
        {
          path: '/page3',
          component: () => import('../views/demo/page3.vue')
        },
        {
          path: '/page3_1',
          component: () => import('../views/demo/page3_1.vue')
        },
        {
          path: '/page3_2',
          component: () => import('../views/demo/page3_2.vue')
        }, {
          path: '/page3_3',
          component: () => import('../views/demo/page3_3.vue')
        },
        {
          path: '/page4',
          component: () => import('../views/demo/page4.vue')
        },
        {
          path: '/shopping',
          component: () => import('../views/demo/shopping.vue')
        }
      ]
    },
    {
      path: '/JumpPage',
      name: 'JumpPage',
      component: PreviousPage
    }
  ]
})
