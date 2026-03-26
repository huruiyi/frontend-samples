<script setup>
import { RouterLink, RouterView } from 'vue-router'

const tabs = [
  { to: '/custom', label: '非官方实例' },
  { to: '/official', label: '官方实例' },
]
</script>

<template>
  <main class="page">
    <h1>Vue Slot 用法大全（Vite 项目）</h1>

    <nav class="tabs" aria-label="示例分类切换">
      <RouterLink
        v-for="tab in tabs"
        :key="tab.to"
        :to="tab.to"
        class="tab-link"
        active-class="tab-link--active"
      >
        {{ tab.label }}
      </RouterLink>
    </nav>

    <RouterView />
  </main>
</template>

<style scoped>
.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
}

.tab-link {
  text-decoration: none;
  color: var(--text-color);
  background: #fff;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 8px 14px;
  font-weight: 600;
}

.tab-link--active {
  color: #fff;
  background: var(--accent);
  border-color: var(--accent);
}
</style>
