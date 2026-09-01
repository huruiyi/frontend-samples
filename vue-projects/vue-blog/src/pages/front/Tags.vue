<template>
  <div class="tags-page">
    <h1 class="page-title">标签分类</h1>
    <p class="page-desc">共 {{ tags.length }} 个标签，{{ publishedArticles.length }} 篇文章</p>

    <div class="tags-grid">
      <RouterLink
        v-for="tag in tagsWithCount"
        :key="tag.id"
        :to="`/tags/${tag.id}`"
        class="tag-item card"
      >
        <div class="tag-dot" :style="{ background: tag.color }"></div>
        <div>
          <div class="tag-name">{{ tag.name }}</div>
          <div class="tag-count">{{ tag.count }} 篇文章</div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useBlogStore } from '@/store/blog'
import { storeToRefs } from 'pinia'

const store = useBlogStore()
const { tags, publishedArticles } = storeToRefs(store)

const tagsWithCount = computed(() =>
  tags.value.map(tag => ({
    ...tag,
    count: publishedArticles.value.filter(a => a.tags.includes(tag.id)).length,
  })).sort((a,b) => b.count - a.count)
)
</script>

<style scoped>
.tags-page {}
.page-title {
  font-size: 1.75rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}
.page-desc {
  color: var(--text-muted);
  margin-bottom: 1.5rem;
}
.tags-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}
.tag-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  text-decoration: none;
  color: var(--text);
  transition: all 0.2s;
}
.tag-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}
.tag-dot {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  flex-shrink: 0;
}
.tag-name {
  font-weight: 600;
  font-size: 1rem;
}
.tag-count {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-top: 0.2rem;
}
</style>
