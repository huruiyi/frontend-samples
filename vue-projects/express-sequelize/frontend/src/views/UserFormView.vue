<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { createUser, fetchUserById, updateUser } from '@/api/user';

const props = defineProps({
  id: {
    type: String,
    default: ''
  }
});

const router = useRouter();

const isEdit = computed(() => Boolean(props.id));
const title = computed(() => (isEdit.value ? `编辑用户 #${props.id}` : '新建用户'));

const loading = ref(false);
const error = ref('');
const form = reactive({
  name: '',
  email: '',
  password: ''
});

onMounted(async () => {
  if (!isEdit.value) {
    return;
  }

  loading.value = true;
  error.value = '';
  try {
    const user = await fetchUserById(props.id);
    form.name = user.name;
    form.email = user.email;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});

async function handleSubmit() {
  error.value = '';
  const payload = {
    name: form.name.trim(),
    email: form.email.trim()
  };

  if (!payload.name || !payload.email) {
    error.value = '姓名和邮箱不能为空';
    return;
  }

  if (!isEdit.value) {
    if (!form.password) {
      error.value = '创建用户必须设置密码';
      return;
    }
    payload.password = form.password;
  } else if (form.password) {
    payload.password = form.password;
  }

  loading.value = true;
  try {
    if (isEdit.value) {
      await updateUser(props.id, payload);
    } else {
      await createUser(payload);
    }
    router.push('/');
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <section class="panel">
    <div class="panel-header">
      <h2>{{ title }}</h2>
      <button class="btn-secondary" @click="router.push('/')">返回列表</button>
    </div>

    <div v-if="error" class="alert alert-error">{{ error }}</div>

    <form class="form" @submit.prevent="handleSubmit">
      <label>
        <span>姓名</span>
        <input v-model="form.name" placeholder="Tom" />
      </label>
      <label>
        <span>邮箱</span>
        <input v-model="form.email" type="email" placeholder="tom@example.com" />
      </label>
      <label>
        <span>{{ isEdit ? '新密码（留空则不修改）' : '密码' }}</span>
        <input
          v-model="form.password"
          type="password"
          :placeholder="isEdit ? '可选' : 'Passw0rd'"
          autocomplete="new-password"
        />
      </label>
      <div class="actions">
        <button class="btn-primary" type="submit" :disabled="loading">
          {{ loading ? '提交中...' : isEdit ? '保存修改' : '创建用户' }}
        </button>
      </div>
    </form>
  </section>
</template>

<style scoped>
.panel {
  max-width: 480px;
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
