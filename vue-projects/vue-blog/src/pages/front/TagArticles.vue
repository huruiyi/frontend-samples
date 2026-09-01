<template>
  <div class="tag-articles-page">
    <RouterLink to="/tags" class="back-link">← 所有标签</RouterLink>

    <div v-if="tag" class="tag-header">
      <span class="tag-badge" :style="{ background: tag.color, fontSize: '1rem', padding: '0.4em 1em' }">{{ tag.name }}</span>
      <span class="tag-count">{{ articles.length }} 篇文章</span>
    </div>

    <div class="article-list">
      <ArticleCard v-for="article in articles" :key="article.id" :article="article" :tags="allTags" />
    </div>

    <div v-if="articles.length === 0" class="empty card">
      <p>该标签下暂无文章</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useBlogStore } from '@/store/blog'
import { storeToRefs } from 'pinia'
import ArticleCard from '@/components/ArticleCard.vue'

const route = useRoute()
const store = useBlogStore()
const { tags: allTags } = storeToRefs(store)

const tag = computed(() => store.getTagById(String(route.params.id)))
const articles = computed(() => store.getArticlesByTag(String(route.params.id)))
</script>

<style scoped>
.tag-articles-page {}
.back-link {
  display: inline-flex;
  align-items: center;
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 1rem;
}
.back-link:hover { color: var(--primary); }
.tag-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.tag-count {
  color: var(--text-muted);
  font-size: 0.9rem;
}
.article-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.empty {
  text-align: center;
  padding: 3rem;
  color: var(--text-muted);
}
</style>
