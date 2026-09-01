<template>
  <div class="admin-layout">
    <aside class="sidebar">
      <div class="sidebar-brand">
        <span>⚙️</span>
        <span>博客后台</span>
      </div>
      <nav class="sidebar-nav">
        <RouterLink to="/admin/dashboard" class="sidebar-link">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
          仪表盘
        </RouterLink>
        <RouterLink to="/admin/articles" class="sidebar-link">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          文章管理
        </RouterLink>
        <RouterLink to="/admin/tags" class="sidebar-link">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
          标签管理
        </RouterLink>
        <RouterLink to="/admin/settings" class="sidebar-link">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
          站点设置
        </RouterLink>
      </nav>
      <div class="sidebar-footer">
        <RouterLink to="/" class="sidebar-link" target="_blank">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          查看前台
        </RouterLink>
      </div>
    </aside>

    <div class="admin-content">
      <header class="admin-header">
        <button class="mobile-sidebar-btn" @click="sidebarOpen = !sidebarOpen">☰</button>
        <h1 class="admin-page-title">{{ pageTitle }}</h1>
      </header>
      <main class="admin-main">
        <RouterView v-slot="{ Component }">
          <Transition name="page" mode="out-in">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </main>
    </div>

    <!-- Mobile Sidebar Overlay -->
    <div v-if="sidebarOpen" class="overlay" @click="sidebarOpen=false"></div>
    <aside v-if="sidebarOpen" class="sidebar sidebar-mobile">
      <div class="sidebar-brand">
        <span>⚙️</span>
        <span>博客后台</span>
      </div>
      <nav class="sidebar-nav">
        <RouterLink to="/admin/dashboard" class="sidebar-link" @click="sidebarOpen=false">仪表盘</RouterLink>
        <RouterLink to="/admin/articles" class="sidebar-link" @click="sidebarOpen=false">文章管理</RouterLink>
        <RouterLink to="/admin/tags" class="sidebar-link" @click="sidebarOpen=false">标签管理</RouterLink>
        <RouterLink to="/admin/settings" class="sidebar-link" @click="sidebarOpen=false">站点设置</RouterLink>
      </nav>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const sidebarOpen = ref(false)

const titleMap: Record<string, string> = {
  AdminDashboard: '仪表盘',
  AdminArticles: '文章管理',
  AdminArticleNew: '新建文章',
  AdminArticleEdit: '编辑文章',
  AdminTags: '标签管理',
  AdminSettings: '站点设置',
}

const pageTitle = computed(() => titleMap[String(route.name)] ?? '后台管理')
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: #f8fafc;
}

.sidebar {
  width: 220px;
  flex-shrink: 0;
  background: #1e293b;
  color: #e2e8f0;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  overflow-y: auto;
  z-index: 200;
}

.sidebar-brand {
  padding: 1.25rem 1.25rem;
  font-weight: 700;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  border-bottom: 1px solid #334155;
}

.sidebar-nav {
  flex: 1;
  padding: 0.75rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6em 0.9em;
  border-radius: 8px;
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.15s;
}

.sidebar-link:hover {
  background: #334155;
  color: #e2e8f0;
}

.sidebar-link.router-link-active {
  background: #3b82f6;
  color: white;
}

.sidebar-footer {
  padding: 0.75rem;
  border-top: 1px solid #334155;
}

.admin-content {
  flex: 1;
  margin-left: 220px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.admin-header {
  background: white;
  border-bottom: 1px solid var(--border);
  padding: 0 1.5rem;
  height: 60px;
  display: flex;
  align-items: center;
  gap: 1rem;
  position: sticky;
  top: 0;
  z-index: 50;
}

.admin-page-title {
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--text);
}

.admin-main {
  padding: 1.5rem;
  flex: 1;
}

.mobile-sidebar-btn {
  display: none;
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: var(--text);
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 150;
}

.sidebar-mobile {
  left: 0;
  top: 0;
}

@media (max-width: 768px) {
  .admin-content { margin-left: 0; }
  .sidebar:not(.sidebar-mobile) { display: none; }
  .mobile-sidebar-btn { display: block; }
}
</style>
