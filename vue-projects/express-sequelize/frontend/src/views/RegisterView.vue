<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { register } from '@/api/auth';
import { useUserStore } from '@/stores/user';

const router = useRouter();
const userStore = useUserStore();

const loading = ref(false);
const error = ref('');
const form = reactive({
  name: '',
  email: '',
  password: ''
});

async function handleSubmit() {
  error.value = '';
  if (!form.name.trim() || !form.email.trim() || !form.password) {
    error.value = '请填写姓名、邮箱和密码';
    return;
  }

  loading.value = true;
  try {
    const data = await register({
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password
    });
    userStore.setAuth(data.token, data.user);
    router.replace('/');
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <section class="panel">
    <h2>注册</h2>
    <p class="desc">密码至少 8 位，需同时包含字母和数字</p>

    <div v-if="error" class="alert alert-error">{{ error }}</div>

    <form class="form" @submit.prevent="handleSubmit">
      <label>
        <span>姓名</span>
        <input v-model="form.name" placeholder="Tom" />
      </label>
      <label>
        <span>邮箱</span>
        <input v-model="form.email" type="email" placeholder="tom@example.com" autocomplete="username" />
      </label>
      <label>
        <span>密码</span>
        <input v-model="form.password" type="password" placeholder="Passw0rd" autocomplete="new-password" />
      </label>
      <div class="actions">
        <button class="btn-primary" type="submit" :disabled="loading">
          {{ loading ? '注册中...' : '注册并登录' }}
        </button>
        <button class="btn-secondary" type="button" @click="router.push('/login')">已有账号</button>
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
