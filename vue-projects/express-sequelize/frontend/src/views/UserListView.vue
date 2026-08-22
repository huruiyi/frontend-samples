<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { deleteUser, fetchUsers } from '@/api/user';
import { useUserStore } from '@/stores/user';

const router = useRouter();
const userStore = useUserStore();

const users = ref([]);
const loading = ref(false);
const error = ref('');

async function loadUsers() {
  loading.value = true;
  error.value = '';
  try {
    users.value = await fetchUsers();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

onMounted(loadUsers);

async function handleDelete(id) {
  if (!window.confirm(`确认删除用户 #${id}？`)) {
    return;
  }
  loading.value = true;
  error.value = '';
  try {
    await deleteUser(id);
    users.value = users.value.filter((item) => item.id !== id);
    if (userStore.userId === id) {
      userStore.logout();
      router.push('/login');
    }
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

function goEdit(user) {
  router.push(`/users/${user.id}/edit`);
}
</script>

<template>
  <section class="panel">
    <div class="panel-header">
      <h2>用户列表</h2>
      <button class="btn-primary" @click="router.push('/users/new')">新建用户</button>
    </div>

    <div v-if="error" class="alert alert-error">{{ error }}</div>
    <p v-if="loading" class="muted">加载中...</p>

    <table v-else-if="users.length">
      <thead>
        <tr>
          <th>ID</th>
          <th>姓名</th>
          <th>邮箱</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <div class="actions">
              <button class="btn-secondary" @click="goEdit(user)">编辑</button>
              <button class="btn-danger" @click="handleDelete(user.id)">删除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else class="muted">暂无用户数据</p>
  </section>
</template>

<style scoped>
.panel {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 12px;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.panel-header h2 {
  margin: 0;
  font-size: 0.95rem;
}
</style>
