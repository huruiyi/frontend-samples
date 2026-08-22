<script setup>
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { login } from '@/api/auth';
import { useUserStore } from '@/stores/user';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const loading = ref(false);
const error = ref('');
const form = reactive({
  email: '',
  password: ''
});

async function handleSubmit() {
  error.value = '';
  if (!form.email.trim() || !form.password) {
    error.value = '请输入邮箱和密码';
    return;
  }

  loading.value = true;
  try {
    const data = await login({
      email: form.email.trim(),
      password: form.password
    });
    userStore.setAuth(data.token, data.user);
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/';
    router.replace(redirect || '/');
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <section class="panel">
    <h2>登录</h2>
    <p class="desc">未登录访问受保护页面会自动跳转到此处</p>

    <div v-if="error" class="alert alert-error">{{ error }}</div>

    <form class="form" @submit.prevent="handleSubmit">
      <label>
        <span>邮箱</span>
        <input v-model="form.email" type="email" placeholder="tom@example.com" autocomplete="username" />
      </label>
      <label>
        <span>密码</span>
        <input v-model="form.password" type="password" placeholder="至少 8 位，含字母和数字" autocomplete="current-password" />
      </label>
      <div class="actions">
        <button class="btn-primary" type="submit" :disabled="loading">
          {{ loading ? '登录中...' : '登录' }}
        </button>
        <button class="btn-secondary" type="button" @click="router.push('/register')">去注册</button>
      </div>
    </form>
  </section>
</template>

<style scoped>
.panel {
  max-width: 420px;
  margin: 24px auto;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px;
}

h2 {
  margin: 0 0 4px;
  font-size: 1rem;
}

.desc {
  margin: 0 0 12px;
  color: var(--text-muted);
  font-size: 0.75rem;
}

.form {
  display: grid;
  gap: 10px;
}

label span {
  display: block;
  margin-bottom: 4px;
  color: var(--text-muted);
  font-size: 0.75rem;
}
</style>
