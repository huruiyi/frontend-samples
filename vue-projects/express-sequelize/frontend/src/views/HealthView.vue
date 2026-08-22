<script setup>
import { onMounted, ref } from 'vue';
import { fetchHealth } from '@/api/user';

const health = ref(null);
const loading = ref(false);
const error = ref('');

async function checkHealth() {
  loading.value = true;
  error.value = '';
  try {
    health.value = await fetchHealth();
  } catch (err) {
    error.value = err.message;
    health.value = null;
  } finally {
    loading.value = false;
  }
}

onMounted(checkHealth);
</script>

<template>
  <section class="panel">
    <div class="panel-header">
      <h2>后端健康检查</h2>
      <button class="btn-secondary" :disabled="loading" @click="checkHealth">
        重新检测
      </button>
    </div>

    <div v-if="error" class="alert alert-error">{{ error }}</div>
    <p v-if="loading" class="muted">检测中...</p>
    <div v-else-if="health" class="alert alert-success">
      <div>接口：GET /api/health</div>
      <pre>{{ JSON.stringify(health, null, 2) }}</pre>
    </div>
    <p v-else class="muted">暂无检测结果</p>
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

pre {
  margin: 8px 0 0;
  font-size: 0.75rem;
  white-space: pre-wrap;
}
</style>
