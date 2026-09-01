<template>
  <div class="about-page">
    <div class="about-profile card">
      <div class="profile-avatar">{{ config.authorName.charAt(0) }}</div>
      <div class="profile-info">
        <h1 class="profile-name">{{ config.authorName }}</h1>
        <p class="profile-bio">{{ config.authorBio }}</p>
        <div class="profile-links">
          <a v-if="config.githubUrl" :href="config.githubUrl" target="_blank" class="btn btn-ghost">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
            GitHub
          </a>
          <a v-if="config.email" :href="`mailto:${config.email}`" class="btn btn-ghost">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Email
          </a>
        </div>
      </div>
    </div>

    <div class="about-content card">
      <div class="markdown-body" v-html="renderedAbout"></div>
    </div>

    <div class="about-stats">
      <div class="stat-card card">
        <div class="stat-value">{{ publishedArticles.length }}</div>
        <div class="stat-label">篇文章</div>
      </div>
      <div class="stat-card card">
        <div class="stat-value">{{ tags.length }}</div>
        <div class="stat-label">个标签</div>
      </div>
      <div class="stat-card card">
        <div class="stat-value">{{ totalViews }}</div>
        <div class="stat-label">次阅读</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { marked } from 'marked'
import { useBlogStore } from '@/store/blog'
import { storeToRefs } from 'pinia'

const store = useBlogStore()
const { siteConfig: config, tags, publishedArticles } = storeToRefs(store)

const renderedAbout = computed(() => marked(config.value.aboutContent) as string)
const totalViews = computed(() => publishedArticles.value.reduce((sum, a) => sum + a.viewCount, 0))
</script>

<style scoped>
.about-page {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  max-width: 800px;
  margin: 0 auto;
}

.about-profile {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 2rem;
}

.profile-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  font-size: 2.2rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.profile-name {
  font-size: 1.6rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.profile-bio {
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
}

.profile-links {
  display: flex;
  gap: 0.5rem;
}

.about-content {
  padding: 2rem;
}

.about-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.stat-card {
  padding: 1.5rem;
  text-align: center;
}

.stat-value {
  font-size: 2rem;
  font-weight: 800;
  color: var(--primary);
}

.stat-label {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-top: 0.25rem;
}

@media (max-width: 640px) {
  .about-profile { flex-direction: column; align-items: center; text-align: center; }
  .profile-links { justify-content: center; }
}
</style>
