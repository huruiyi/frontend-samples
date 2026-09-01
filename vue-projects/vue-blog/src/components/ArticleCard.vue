<template>
  <RouterLink :to="`/article/${article.id}`" class="article-card card">
    <div class="card-body">
      <div class="card-tags">
        <span
          v-for="tagId in article.tags"
          :key="tagId"
          class="tag-badge"
          :style="{ background: getTagColor(tagId) }"
        >{{ getTagName(tagId) }}</span>
      </div>
      <h2 class="card-title">{{ article.title }}</h2>
      <p class="card-summary">{{ article.summary }}</p>
      <div class="card-meta">
        <span>{{ formatDate(article.createdAt) }}</span>
        <span>{{ article.viewCount }} 次阅读</span>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import type { Article, Tag } from '@/types'

const props = defineProps<{
  article: Article
  tags: Tag[]
}>()

function getTagName(id: string) {
  return props.tags.find(t => t.id === id)?.name ?? ''
}

function getTagColor(id: string) {
  return props.tags.find(t => t.id === id)?.color ?? '#94a3b8'
}

function formatDate(str: string) {
  const d = new Date(str)
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
}
</script>

<style scoped>
.article-card {
  display: block;
  text-decoration: none;
  color: var(--text);
  transition: all 0.2s;
}

.article-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
  border-color: var(--primary);
}

.card-body {
  padding: 1.25rem 1.5rem;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 0.6rem;
}

.card-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  line-height: 1.4;
  transition: color 0.15s;
}

.article-card:hover .card-title {
  color: var(--primary);
}

.card-summary {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 0.75rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.8rem;
  color: var(--text-muted);
}
</style>
