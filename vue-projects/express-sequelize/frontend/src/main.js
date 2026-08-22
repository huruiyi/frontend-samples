import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { setUnauthorizedHandler } from './api/http';
import { useUserStore } from './stores/user';
import './assets/main.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

setUnauthorizedHandler(() => {
  const userStore = useUserStore(pinia);
  userStore.clearUserInfo();
  const current = router.currentRoute.value;
  if (current.path !== '/login' && current.path !== '/register') {
    router.replace({
      path: '/login',
      query: { redirect: current.fullPath }
    });
  }
});

app.mount('#app');
