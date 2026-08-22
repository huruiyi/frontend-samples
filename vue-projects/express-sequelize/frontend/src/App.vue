<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';

const router = useRouter();
const userStore = useUserStore();
const { userInfo, isLogin } = storeToRefs(userStore);

function handleLogout() {
  userStore.logout();
  router.push('/login');
}
</script>

<template>
  <div class="app">
    <header class="header">
      <div class="brand">
        <h1>User CRUD 测试台</h1>
        <p>
          Vue 3 + Vite + Vue Router + Pinia
          <span v-if="userInfo"> · 已登录：{{ userInfo.name }}</span>
        </p>
      </div>
      <nav class="nav">
        <template v-if="isLogin">
          <RouterLink to="/">用户列表</RouterLink>
          <RouterLink to="/users/new">新建用户</RouterLink>
          <RouterLink to="/store-test">Store 测试</RouterLink>
          <RouterLink to="/health">健康检查</RouterLink>
          <button class="link-btn" type="button" @click="handleLogout">退出</button>
        </template>
        <template v-else>
          <RouterLink to="/login">登录</RouterLink>
          <RouterLink to="/register">注册</RouterLink>
          <RouterLink to="/health">健康检查</RouterLink>
        </template>
      </nav>
    </header>
    <main class="main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 8px 12px;
  border-bottom: 1px solid var(--border);
  background: rgba(15, 20, 25, 0.92);
  position: sticky;
  top: 0;
  z-index: 10;
}

.brand h1 {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
}

.brand p {
  margin: 2px 0 0;
  font-size: 0.72rem;
  color: var(--text-muted);
}

.nav {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.8rem;
}

.nav a {
  color: var(--text-muted);
}

.nav a.router-link-active {
  color: var(--primary);
  font-weight: 600;
}

.link-btn {
  background: transparent;
  border: none;
  color: #fca5a5;
  padding: 0;
  font-size: 0.8rem;
  font-weight: 600;
}

.main {
  padding: 12px;
}
</style>
