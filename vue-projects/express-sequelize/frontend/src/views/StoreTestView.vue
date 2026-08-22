<script setup>
import { computed, reactive, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const { userInfo, isLogin, userId, userName } = storeToRefs(userStore);

const setForm = reactive({
  id: 1,
  name: 'Tom',
  email: 'tom@example.com'
});

const patchForm = reactive({
  name: '',
  email: ''
});

const logs = ref([]);

function pushLog(action, detail) {
  logs.value.unshift({
    time: new Date().toLocaleTimeString('zh-CN', { hour12: false }),
    action,
    detail
  });
}

function handleSet() {
  const payload = {
    id: Number(setForm.id) || null,
    name: setForm.name.trim(),
    email: setForm.email.trim()
  };
  userStore.setUserInfo(payload);
  pushLog('setUserInfo', payload);
}

function handleUpdate() {
  const partial = {};
  if (patchForm.name.trim()) partial.name = patchForm.name.trim();
  if (patchForm.email.trim()) partial.email = patchForm.email.trim();
  if (!Object.keys(partial).length) {
    pushLog('updateUserInfo', '未填写任何字段，已跳过');
    return;
  }
  userStore.updateUserInfo(partial);
  pushLog('updateUserInfo', partial);
}

function handleClear() {
  userStore.clearUserInfo();
  pushLog('clearUserInfo', null);
}

function handlePreset(user) {
  userStore.setUserInfo(user);
  setForm.id = user.id;
  setForm.name = user.name;
  setForm.email = user.email;
  pushLog('setUserInfo (预设)', user);
}

const snapshot = computed(() =>
  JSON.stringify(
    {
      userInfo: userInfo.value,
      isLogin: isLogin.value,
      userId: userId.value,
      userName: userName.value
    },
    null,
    2
  )
);
</script>

<template>
  <section class="layout">
    <div class="panel">
      <h2>Pinia Store 功能测试</h2>
      <p class="desc">验证 stores/user.js：setUserInfo / updateUserInfo / clearUserInfo 与 getters</p>

      <div class="card-title">setUserInfo — 完整设置</div>
      <div class="field-row">
        <label>
          <span>ID</span>
          <input v-model="setForm.id" type="number" />
        </label>
        <label>
          <span>姓名</span>
          <input v-model="setForm.name" />
        </label>
        <label>
          <span>邮箱</span>
          <input v-model="setForm.email" />
        </label>
      </div>
      <div class="actions">
        <button class="btn-primary" @click="handleSet">setUserInfo</button>
        <button
          class="btn-secondary"
          @click="handlePreset({ id: 1001, name: 'Alice', email: 'alice@example.com' })"
        >
          预设 Alice
        </button>
        <button
          class="btn-secondary"
          @click="handlePreset({ id: 1002, name: 'Bob', email: 'bob@example.com' })"
        >
          预设 Bob
        </button>
      </div>

      <div class="card-title">updateUserInfo — 局部更新</div>
      <div class="field-row">
        <label>
          <span>姓名（可选）</span>
          <input v-model="patchForm.name" placeholder="只改姓名时填写" />
        </label>
        <label>
          <span>邮箱（可选）</span>
          <input v-model="patchForm.email" placeholder="只改邮箱时填写" />
        </label>
      </div>
      <div class="actions">
        <button class="btn-primary" @click="handleUpdate">updateUserInfo</button>
        <button class="btn-danger" @click="handleClear">clearUserInfo</button>
      </div>
    </div>

    <div class="panel">
      <h2>当前 Store 快照</h2>
      <div class="badges">
        <span class="badge" :class="isLogin ? 'on' : 'off'">
          isLogin: {{ isLogin }}
        </span>
        <span class="badge">userId: {{ userId ?? 'null' }}</span>
        <span class="badge">userName: {{ userName || '(空)' }}</span>
      </div>
      <pre>{{ snapshot }}</pre>

      <h2>操作日志</h2>
      <div v-if="!logs.length" class="muted">暂无操作，点击左侧按钮开始测试</div>
      <div v-for="(item, index) in logs" :key="index" class="log-item">
        <div class="muted">[{{ item.time }}] {{ item.action }}</div>
        <pre>{{ JSON.stringify(item.detail, null, 2) }}</pre>
      </div>
    </div>
  </section>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

@media (max-width: 900px) {
  .layout {
    grid-template-columns: 1fr;
  }
}

.panel {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 12px;
}

.panel h2 {
  margin: 0 0 6px;
  font-size: 0.95rem;
}

.desc {
  margin: 0 0 12px;
  color: var(--text-muted);
  font-size: 0.75rem;
}

.card-title {
  margin: 12px 0 8px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-muted);
}

.field-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 8px;
}

@media (max-width: 700px) {
  .field-row {
    grid-template-columns: 1fr;
  }
}

label span {
  display: block;
  margin-bottom: 3px;
  font-size: 0.72rem;
  color: var(--text-muted);
}

.badges {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 10px;
}

.badge {
  font-size: 0.72rem;
  padding: 2px 8px;
  border-radius: 999px;
  background: var(--surface-2);
  border: 1px solid var(--border);
}

.badge.on {
  color: #86efac;
  border-color: rgba(34, 197, 94, 0.35);
}

.badge.off {
  color: #fca5a5;
  border-color: rgba(239, 68, 68, 0.35);
}

pre {
  margin: 0 0 10px;
  padding: 8px;
  background: var(--surface-2);
  border-radius: 4px;
  font-size: 0.72rem;
  white-space: pre-wrap;
  word-break: break-all;
}

.log-item {
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
}

.log-item pre {
  margin: 4px 0 0;
}
</style>
