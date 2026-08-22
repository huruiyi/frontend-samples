import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/user';
import UserListView from '@/views/UserListView.vue';
import UserFormView from '@/views/UserFormView.vue';
import HealthView from '@/views/HealthView.vue';
import StoreTestView from '@/views/StoreTestView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { guest: true }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { guest: true }
    },
    {
      path: '/',
      name: 'users',
      component: UserListView,
      meta: { requiresAuth: true }
    },
    {
      path: '/users/new',
      name: 'user-create',
      component: UserFormView,
      meta: { requiresAuth: true }
    },
    {
      path: '/users/:id/edit',
      name: 'user-edit',
      component: UserFormView,
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: '/health',
      name: 'health',
      component: HealthView
    },
    {
      path: '/store-test',
      name: 'store-test',
      component: StoreTestView,
      meta: { requiresAuth: true }
    }
  ]
});

router.beforeEach((to) => {
  const userStore = useUserStore();

  if (to.meta.requiresAuth && !userStore.isLogin) {
    return {
      path: '/login',
      query: { redirect: to.fullPath }
    };
  }

  if (to.meta.guest && userStore.isLogin) {
    return { path: '/' };
  }

  return true;
});

export default router;
