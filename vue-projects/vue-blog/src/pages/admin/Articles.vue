<template>
  <div class="articles-page">
    <div class="page-header">
      <div class="search-bar">
        <input v-model="search" type="text" placeholder="搜索文章..." class="search-input" />
      </div>
      <div class="header-actions">
        <select v-model="filterStatus" class="select-input">
          <option value="">全部状态</option>
          <option value="published">已发布</option>
          <option value="draft">草稿</option>
        </select>
        <RouterLink to="/admin/articles/new" class="btn btn-primary">+ 新建文章</RouterLink>
      </div>
    </div>

    <div class="card">
      <table class="data-table">
        <thead>
          <tr><th>标题</th><th>标签</th><th>状态</th><th>阅读数</th><th>创建时间</th><th>操作</th></tr>
        </thead>
        <tbody>
          <tr v-for="article in filteredArticles" :key="article.id">
            <td class="td-title">
              <RouterLink :to="`/article/${article.id}`" target="_blank">{{ article.title }}</RouterLink>
              <div class="td-summary">{{ article.summary }}</div>
            </td>
            <td>
              <div style="display:flex;flex-wrap:wrap;gap:4px;">
                <span
                  v-for="tagId in article.tags"
                  :key="tagId"
                  class="tag-badge"
                  :style="{ background: store.getTagById(tagId)?.color ?? '#94a3b8' }"
                >{{ store.getTagById(tagId)?.name ?? '' }}</span>
              </div>
            </td>
            <td>
              <span :class="['status-badge', article.published ? 'published' : 'draft']">
                {{ article.published ? '已发布' : '草稿' }}
              </span>
            </td>
            <td>{{ article.viewCount }}</td>
            <td class="td-date">{{ formatDate(article.createdAt) }}</td>
            <td>
              <div style="display:flex;gap:0.5rem;">
                <RouterLink :to="`/admin/articles/${article.id}/edit`" class="btn btn-ghost btn-sm">编辑</RouterLink>
                <button class="btn btn-danger btn-sm" @click="confirmDelete(article.id)">删除</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="filteredArticles.length === 0" class="empty">暂无文章</div>
    </div>

    <!-- Confirm Delete Dialog -->
    <div v-if="deleteId" class="modal-overlay" @click.self="deleteId=null">
      <div class="modal card">
        <h3>确认删除</h3>
        <p>此操作不可恢复，确定要删除这篇文章吗？</p>
        <div class="modal-actions">
          <button class="btn btn-ghost" @click="deleteId=null">取消</button>
          <button class="btn btn-danger" @click="doDelete">确认删除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBlogStore } from '@/store/blog'
import { storeToRefs } from 'pinia'

const store = useBlogStore()
const { articles } = storeToRefs(store)

const search = ref('')
const filterStatus = ref('')
const deleteId = ref<string | null>(null)

const filteredArticles = computed(() => {
  return articles.value
    .filter(a => {
      const matchSearch = !search.value || a.title.includes(search.value) || a.summary.includes(search.value)
      const matchStatus = !filterStatus.value ||
        (filterStatus.value === 'published' && a.published) ||
        (filterStatus.value === 'draft' && !a.published)
      return matchSearch && matchStatus
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
})

function confirmDelete(id: string) {
  deleteId.value = id
}

function doDelete() {
  if (deleteId.value) {
    store.deleteArticle(deleteId.value)
    deleteId.value = null
  }
}

function formatDate(str: string) {
  const d = new Date(str)
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
}
</script>

<style scoped>
.articles-page { display: flex; flex-direction: column; gap: 1.25rem; }

.page-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.search-bar { flex: 1; min-width: 200px; }

.search-input, .select-input {
  padding: 0.55em 0.9em;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 0.9rem;
  background: var(--surface);
  color: var(--text);
  outline: none;
  transition: border-color 0.15s;
  width: 100%;
}

.search-input:focus, .select-input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(59,130,246,0.12);
}

.select-input { width: auto; cursor: pointer; }

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.card { }
.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.data-table th {
  text-align: left;
  padding: 0.75rem 1rem;
  border-bottom: 2px solid var(--border);
  color: var(--text-muted);
  font-weight: 600;
  font-size: 0.8rem;
  background: var(--surface2);
}

.data-table td {
  padding: 0.85rem 1rem;
  border-bottom: 1px solid var(--border);
  vertical-align: middle;
}

.data-table tr:last-child td { border-bottom: none; }
.data-table tr:hover td { background: #f8fafc; }

.td-title a { font-weight: 600; color: var(--text); }
.td-title a:hover { color: var(--primary); }
.td-summary { font-size: 0.8rem; color: var(--text-muted); margin-top: 0.25rem; max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.td-date { color: var(--text-muted); white-space: nowrap; }

.status-badge { padding: 0.2em 0.6em; border-radius: 6px; font-size: 0.78rem; font-weight: 600; }
.status-badge.published { background: #dcfce7; color: #16a34a; }
.status-badge.draft { background: #fef9c3; color: #ca8a04; }

.btn-sm { padding: 0.3em 0.75em; font-size: 0.8rem; }

.empty { text-align: center; padding: 3rem; color: var(--text-muted); }

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  padding: 2rem;
  max-width: 400px;
  width: 90%;
}

.modal h3 { font-size: 1.2rem; font-weight: 700; margin-bottom: 0.75rem; }
.modal p { color: var(--text-secondary); margin-bottom: 1.5rem; }

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}
</style>
