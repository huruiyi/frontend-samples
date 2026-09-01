<template>
  <div class="dashboard">
    <!-- Stats -->
    <div class="stats-grid">
      <div class="stat-card card">
        <div class="stat-icon" style="background:#eff6ff; color:#3b82f6;">
          <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        </div>
        <div>
          <div class="stat-num">{{ publishedArticles.length }}</div>
          <div class="stat-label">已发布文章</div>
        </div>
      </div>
      <div class="stat-card card">
        <div class="stat-icon" style="background:#f0fdf4; color:#22c55e;">
          <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
        </div>
        <div>
          <div class="stat-num">{{ tags.length }}</div>
          <div class="stat-label">标签总数</div>
        </div>
      </div>
      <div class="stat-card card">
        <div class="stat-icon" style="background:#fef3c7; color:#f59e0b;">
          <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        </div>
        <div>
          <div class="stat-num">{{ totalViews }}</div>
          <div class="stat-label">总阅读量</div>
        </div>
      </div>
      <div class="stat-card card">
        <div class="stat-icon" style="background:#fce7f3; color:#ec4899;">
          <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke-dasharray="2"/><polyline points="14 2 14 8 20 8"/></svg>
        </div>
        <div>
          <div class="stat-num">{{ draftArticles.length }}</div>
          <div class="stat-label">草稿箱</div>
        </div>
      </div>
    </div>

    <!-- Recent Articles -->
    <div class="section card">
      <div class="section-header">
        <h2>最近文章</h2>
        <RouterLink to="/admin/articles/new" class="btn btn-primary">+ 写文章</RouterLink>
      </div>
      <table class="data-table">
        <thead>
          <tr><th>标题</th><th>标签</th><th>状态</th><th>阅读</th><th>时间</th><th>操作</th></tr>
        </thead>
        <tbody>
          <tr v-for="article in recentArticles" :key="article.id">
            <td class="td-title">
              <RouterLink :to="`/article/${article.id}`" target="_blank">{{ article.title }}</RouterLink>
            </td>
            <td>
              <span
                v-for="tagId in article.tags.slice(0,2)"
                :key="tagId"
                class="tag-badge"
                style="margin-right:4px"
                :style="{ background: store.getTagById(tagId)?.color ?? '#94a3b8' }"
              >{{ store.getTagById(tagId)?.name ?? '' }}</span>
            </td>
            <td>
              <span :class="['status-badge', article.published ? 'published' : 'draft']">
                {{ article.published ? '已发布' : '草稿' }}
              </span>
            </td>
            <td>{{ article.viewCount }}</td>
            <td class="td-date">{{ formatDate(article.createdAt) }}</td>
            <td>
              <RouterLink :to="`/admin/articles/${article.id}/edit`" class="btn btn-ghost btn-sm">编辑</RouterLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useBlogStore } from '@/store/blog'
import { storeToRefs } from 'pinia'

const store = useBlogStore()
const { tags, publishedArticles, articles } = storeToRefs(store)

const draftArticles = computed(() => articles.value.filter(a => !a.published))
const totalViews = computed(() => articles.value.reduce((sum, a) => sum + a.viewCount, 0))
const recentArticles = computed(() =>
  [...articles.value].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 8)
)

function formatDate(str: string) {
  const d = new Date(str)
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
}
</script>

<style scoped>
.dashboard { display: flex; flex-direction: column; gap: 1.5rem; }

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-num {
  font-size: 1.75rem;
  font-weight: 800;
  line-height: 1;
}

.stat-label {
  font-size: 0.82rem;
  color: var(--text-muted);
  margin-top: 0.3rem;
}

.section { padding: 1.5rem; }

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
}

.section-header h2 {
  font-size: 1.1rem;
  font-weight: 700;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.data-table th {
  text-align: left;
  padding: 0.6rem 0.75rem;
  border-bottom: 2px solid var(--border);
  color: var(--text-muted);
  font-weight: 600;
  font-size: 0.8rem;
}

.data-table td {
  padding: 0.75rem;
  border-bottom: 1px solid var(--border);
  vertical-align: middle;
}

.data-table tr:last-child td { border-bottom: none; }
.data-table tr:hover td { background: var(--surface2); }

.td-title a {
  font-weight: 500;
  color: var(--text);
}
.td-title a:hover { color: var(--primary); }
.td-date { color: var(--text-muted); }

.status-badge {
  padding: 0.2em 0.6em;
  border-radius: 6px;
  font-size: 0.78rem;
  font-weight: 600;
}
.status-badge.published { background: #dcfce7; color: #16a34a; }
.status-badge.draft { background: #fef9c3; color: #ca8a04; }

.btn-sm { padding: 0.3em 0.75em; font-size: 0.8rem; }
</style>
