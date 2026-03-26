import { createRouter, createWebHistory } from 'vue-router'
import NonOfficialExamplesView from '../views/NonOfficialExamplesView.vue'
import OfficialExamplesView from '../views/OfficialExamplesView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/custom',
    },
    {
      path: '/custom',
      name: 'custom-examples',
      component: NonOfficialExamplesView,
    },
    {
      path: '/official',
      name: 'official-examples',
      component: OfficialExamplesView,
    },
  ],
})

export default router