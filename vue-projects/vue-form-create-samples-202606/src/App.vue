<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useFormStore } from './stores/form'

const route = useRoute()
const store = useFormStore()

const navItems = [
  { to: '/designer', label: '表单设计器' },
  { to: '/preview', label: '表单预览' },
  { to: '/submissions', label: '提交记录' },
  { to: '/about', label: '关于' },
]

const currentTitle = computed(() => (route.meta.title as string) || 'form-create Demo')
</script>

<template>
  <a-layout class="app-layout">
    <a-layout-header class="app-header">
      <div class="app-brand">⚡ form-create Demo</div>
      <a-menu
        mode="horizontal"
        theme="dark"
        :selected-keys="[route.path]"
        class="app-menu"
      >
        <a-menu-item v-for="item in navItems" :key="item.to">
          <router-link :to="item.to">{{ item.label }}</router-link>
        </a-menu-item>
      </a-menu>
      <div class="app-stat">
        已提交 <a-badge :count="store.submissionCount" :offset="[6, -2]" />
      </div>
    </a-layout-header>

    <a-layout-content class="app-content">
      <div class="app-breadcrumb">
        <h2>{{ currentTitle }}</h2>
      </div>
      <router-view v-slot="{ Component }" class="app-router-view">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </a-layout-content>
  </a-layout>
</template>

<style scoped>
.app-layout {
  height: 100%;
}

.app-header {
  display: flex;
  align-items: center;
  gap: 24px;
  padding-inline: 24px;
}

.app-brand {
  color: #fff;
  font-weight: 600;
  font-size: 16px;
  white-space: nowrap;
}

.app-menu {
  flex: 1;
  border-bottom: none;
  background: transparent;
}

.app-stat {
  color: rgba(255, 255, 255, 0.85);
  font-size: 14px;
  white-space: nowrap;
}

.app-content {
  flex: 1;
  min-height: 0;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
}

.app-breadcrumb h2 {
  margin: 0 0 12px;
  font-size: 20px;
}

.app-router-view {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
