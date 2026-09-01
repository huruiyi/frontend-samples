<template>
  <div class="home-page">
    <!-- Hero -->
    <div class="hero card">
      <div class="hero-avatar">{{ config.authorName.charAt(0) }}</div>
      <div>
        <h1 class="hero-name">{{ config.authorName }}</h1>
        <p class="hero-bio">{{ config.authorBio }}</p>
        <div class="hero-links">
          <a v-if="config.githubUrl" :href="config.githubUrl" target="_blank" class="btn btn-ghost">GitHub</a>
          <a v-if="config.email" :href="`mailto:${config.email}`" class="btn btn-ghost">邮箱</a>
        </div>
      </div>
    </div>

    <!-- Tag Filter -->
    <div class="filter-bar">
      <button
        :class="['tag-filter', { active: selectedTag === null }]"
        @click="selectedTag = null"
      >全部文章</button>
      <button
        v-for="tag in tags"
        :key="tag.id"
        :class="['tag-filter', { active: selectedTag === tag.id }]"
        :style="selectedTag === tag.id ? { background: tag.color, color: 'white', borderColor: tag.color } : {}"
        @click="selectedTag = selectedTag === tag.id ? null : tag.id"
      >{{ tag.name }}</button>
    </div>

    <!-- Article List -->
    <div class="article-list">
      <TransitionGroup name="article">
        <ArticleCard
          v-for="article in filteredArticles"
          :key="article.id"
          :article="article"
          :tags="tags"
        />
      </TransitionGroup>
      <div v-if="filteredArticles.length === 0" class="empty">
        <p>暂无文章</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBlogStore } from '@/store/blog'
import { storeToRefs } from 'pinia'
import ArticleCard from '@/components/ArticleCard.vue'

const store = useBlogStore()
const { publishedArticles, tags, siteConfig: config } = storeToRefs(store)

const selectedTag = ref<string | null>(null)

const filteredArticles = computed(() => {
  if (!selectedTag.value) return publishedArticles.value
  return publishedArticles.value.filter(a => a.tags.includes(selectedTag.value!))
})
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.hero {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
}

.hero-avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  font-size: 2rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.hero-name {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
}

.hero-bio {
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
}

.hero-links {
  display: flex;
  gap: 0.5rem;
}

.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag-filter {
  padding: 0.35em 0.9em;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-secondary);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
}

.tag-filter:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.tag-filter.active {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
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

.article-enter-active, .article-leave-active { transition: all 0.2s; }
.article-enter-from { opacity: 0; transform: translateY(10px); }
.article-leave-to { opacity: 0; }

@media (max-width: 640px) {
  .hero { flex-direction: column; text-align: center; }
  .hero-links { justify-content: center; }
}
</style>
