<template>
  <div class="front-layout">
    <header class="site-header">
      <div class="header-inner">
        <RouterLink to="/" class="site-brand">
          <span class="brand-icon">✍</span>
          <div>
            <div class="brand-title">{{ config.title }}</div>
            <div class="brand-subtitle">{{ config.subtitle }}</div>
          </div>
        </RouterLink>
        <nav class="site-nav">
          <RouterLink to="/" :class="['nav-link', { active: route.name === 'Home' }]">首页</RouterLink>
          <RouterLink to="/tags" :class="['nav-link', { active: ['Tags','TagArticles'].includes(String(route.name)) }]">标签</RouterLink>
          <RouterLink to="/about" :class="['nav-link', { active: route.name === 'About' }]">关于</RouterLink>
          <RouterLink to="/admin" class="nav-link nav-admin">管理后台</RouterLink>
        </nav>
        <button class="menu-btn" @click="menuOpen = !menuOpen">
          <span></span><span></span><span></span>
        </button>
      </div>
      <div v-if="menuOpen" class="mobile-nav">
        <RouterLink to="/" class="nav-link" @click="menuOpen=false">首页</RouterLink>
        <RouterLink to="/tags" class="nav-link" @click="menuOpen=false">标签</RouterLink>
        <RouterLink to="/about" class="nav-link" @click="menuOpen=false">关于</RouterLink>
        <RouterLink to="/admin" class="nav-link nav-admin" @click="menuOpen=false">管理后台</RouterLink>
      </div>
    </header>

    <main class="site-main">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>

    <footer class="site-footer">
      <p>© 2026 {{ config.title }} · 用 Vue3 构建</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useBlogStore } from '@/store/blog'
import { storeToRefs } from 'pinia'

const route = useRoute()
const store = useBlogStore()
const { siteConfig: config } = storeToRefs(store)
const menuOpen = ref(false)
</script>

<style scoped>
.front-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.site-header {
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 64px;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.site-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: var(--text);
  flex-shrink: 0;
}

.brand-icon {
  font-size: 1.75rem;
}

.brand-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text);
  line-height: 1.2;
}

.brand-subtitle {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.site-nav {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-left: auto;
}

.nav-link {
  padding: 0.4em 0.9em;
  border-radius: 8px;
  font-size: 0.9rem;
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.15s;
  font-weight: 500;
}

.nav-link:hover,
.nav-link.active {
  background: var(--primary-light);
  color: var(--primary);
}

.nav-admin {
  background: var(--primary);
  color: white !important;
  margin-left: 0.5rem;
}

.nav-admin:hover {
  background: var(--primary-dark) !important;
  color: white !important;
}

.menu-btn {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  margin-left: auto;
}

.menu-btn span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--text);
  border-radius: 2px;
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  padding: 0.75rem 1.5rem;
  border-top: 1px solid var(--border);
  gap: 0.25rem;
}

.site-main {
  flex: 1;
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.site-footer {
  background: var(--surface);
  border-top: 1px solid var(--border);
  text-align: center;
  padding: 1.5rem;
  color: var(--text-muted);
  font-size: 0.875rem;
}

@media (max-width: 640px) {
  .site-nav { display: none; }
  .menu-btn { display: flex; }
}
</style>
