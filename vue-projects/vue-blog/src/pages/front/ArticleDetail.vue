<template>
  <div class="detail-page">
    <div v-if="article">
      <!-- Back -->
      <RouterLink to="/" class="back-link">← 返回列表</RouterLink>

      <!-- Article Header -->
      <div class="article-header card">
        <div class="article-tags">
          <span
            v-for="tagId in article.tags"
            :key="tagId"
            class="tag-badge"
            :style="{ background: store.getTagById(tagId)?.color ?? '#94a3b8' }"
          >{{ store.getTagById(tagId)?.name ?? '' }}</span>
        </div>
        <h1 class="article-title">{{ article.title }}</h1>
        <div class="article-meta">
          <span>发布于 {{ formatDate(article.createdAt) }}</span>
          <span v-if="article.updatedAt !== article.createdAt">更新于 {{ formatDate(article.updatedAt) }}</span>
          <span>{{ article.viewCount }} 次阅读</span>
          <span>约 {{ readingTime }} 分钟阅读</span>
        </div>
      </div>

      <!-- Article Content -->
      <div class="article-content card">
        <div class="markdown-body" v-html="renderedContent"></div>
      </div>

      <!-- TOC -->
      <div v-if="toc.length > 0" class="toc-sidebar">
        <div class="toc-card card">
          <div class="toc-title">目录</div>
          <ul class="toc-list">
            <li v-for="item in toc" :key="item.id" :style="{ paddingLeft: (item.level - 1) * 12 + 'px' }">
              <a
                :href="`#${item.id}`"
                class="toc-link"
                @click.prevent="scrollToHeading(item.id)"
              >{{ item.text }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div v-else class="not-found card">
      <p>文章不存在</p>
      <RouterLink to="/" class="btn btn-primary" style="margin-top:1rem">返回首页</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { marked, Renderer } from 'marked'
import hljs from 'highlight.js'
import { useBlogStore } from '@/store/blog'

const route = useRoute()
const store = useBlogStore()

const article = computed(() => store.getArticleById(String(route.params.id)))

interface TocItem { id: string; text: string; level: number }
const toc = ref<TocItem[]>([])

const renderedContent = computed(() => {
  if (!article.value) return ''
  const renderer = new Renderer()
  const tocItems: TocItem[] = []

  renderer.heading = function({ text, depth }) {
    const slug = text.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-').replace(/^-|-$/g,'')
    tocItems.push({ id: slug, text, level: depth })
    return `<h${depth} id="${slug}">${text}</h${depth}>`
  }

  renderer.code = function({ text, lang }) {
    const validLang = lang && hljs.getLanguage(lang) ? lang : 'plaintext'
    const highlighted = hljs.highlight(text, { language: validLang }).value
    return `<pre><code class="hljs language-${validLang}">${highlighted}</code></pre>`
  }

  const result = marked(article.value.content, { renderer }) as string
  toc.value = tocItems
  return result
})

const readingTime = computed(() => {
  if (!article.value) return 0
  const words = article.value.content.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, '').length
  return Math.max(1, Math.ceil(words / 300))
})

function formatDate(str: string) {
  const d = new Date(str)
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
}

function scrollToHeading(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const headerOffset = 80
  const top = el.getBoundingClientRect().top + window.scrollY - headerOffset
  window.scrollTo({ top, behavior: 'smooth' })
}

onMounted(() => {
  if (article.value) {
    store.incrementViewCount(article.value.id)
    document.title = `${article.value.title} - 个人博客`
  }
})
</script>

<style scoped>
.detail-page {
  max-width: 860px;
  margin: 0 auto;
  position: relative;
}

.back-link {
  display: inline-flex;
  align-items: center;
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 1rem;
  transition: color 0.15s;
}

.back-link:hover { color: var(--primary); }

.article-header {
  padding: 1.75rem 2rem;
  margin-bottom: 1rem;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 0.75rem;
}

.article-title {
  font-size: 1.875rem;
  font-weight: 800;
  line-height: 1.3;
  margin-bottom: 1rem;
}

.article-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.article-content {
  padding: 2rem;
  margin-bottom: 1rem;
}

.toc-sidebar {
  position: fixed;
  right: 2rem;
  top: 100px;
  width: 200px;
}

.toc-card {
  padding: 1rem;
  max-height: 70vh;
  overflow-y: auto;
}

.toc-title {
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  margin-bottom: 0.75rem;
}

.toc-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.toc-link {
  font-size: 0.82rem;
  color: var(--text-secondary);
  text-decoration: none;
  display: block;
  padding: 0.15em 0;
  line-height: 1.4;
  transition: color 0.15s;
}

.toc-link:hover { color: var(--primary); }

.not-found {
  text-align: center;
  padding: 3rem;
  color: var(--text-muted);
}

@media (max-width: 1200px) {
  .toc-sidebar { display: none; }
}

@media (max-width: 640px) {
  .article-header { padding: 1.25rem; }
  .article-content { padding: 1.25rem; }
  .article-title { font-size: 1.4rem; }
}
</style>
