import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Article, Tag, SiteConfig } from '@/types'
import {
  getArticles, saveArticles,
  getTags, saveTags,
  getSiteConfig, saveSiteConfig,
} from './storage'

export const useBlogStore = defineStore('blog', () => {
  const articles = ref<Article[]>(getArticles())
  const tags = ref<Tag[]>(getTags())
  const siteConfig = ref<SiteConfig>(getSiteConfig())

  const publishedArticles = computed(() =>
    articles.value.filter(a => a.published).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  )

  function getArticleById(id: string) {
    return articles.value.find(a => a.id === id)
  }

  function getTagById(id: string) {
    return tags.value.find(t => t.id === id)
  }

  function getArticlesByTag(tagId: string) {
    return publishedArticles.value.filter(a => a.tags.includes(tagId))
  }

  function addArticle(article: Omit<Article, 'id' | 'createdAt' | 'updatedAt' | 'viewCount'>) {
    const now = new Date().toISOString()
    const newArticle: Article = {
      ...article,
      id: Date.now().toString(),
      createdAt: now,
      updatedAt: now,
      viewCount: 0,
    }
    articles.value.unshift(newArticle)
    saveArticles(articles.value)
    return newArticle
  }

  function updateArticle(id: string, data: Partial<Article>) {
    const idx = articles.value.findIndex(a => a.id === id)
    if (idx !== -1) {
      articles.value[idx] = { ...articles.value[idx], ...data, updatedAt: new Date().toISOString() }
      saveArticles(articles.value)
    }
  }

  function deleteArticle(id: string) {
    articles.value = articles.value.filter(a => a.id !== id)
    saveArticles(articles.value)
  }

  function incrementViewCount(id: string) {
    const article = articles.value.find(a => a.id === id)
    if (article) {
      article.viewCount++
      saveArticles(articles.value)
    }
  }

  function addTag(tag: Omit<Tag, 'id'>) {
    const newTag: Tag = { ...tag, id: Date.now().toString() }
    tags.value.push(newTag)
    saveTags(tags.value)
    return newTag
  }

  function updateTag(id: string, data: Partial<Tag>) {
    const idx = tags.value.findIndex(t => t.id === id)
    if (idx !== -1) {
      tags.value[idx] = { ...tags.value[idx], ...data }
      saveTags(tags.value)
    }
  }

  function deleteTag(id: string) {
    tags.value = tags.value.filter(t => t.id !== id)
    // Remove tag from articles
    articles.value.forEach(a => {
      a.tags = a.tags.filter(tid => tid !== id)
    })
    saveTags(tags.value)
    saveArticles(articles.value)
  }

  function updateSiteConfig(config: Partial<SiteConfig>) {
    siteConfig.value = { ...siteConfig.value, ...config }
    saveSiteConfig(siteConfig.value)
  }

  return {
    articles,
    tags,
    siteConfig,
    publishedArticles,
    getArticleById,
    getTagById,
    getArticlesByTag,
    addArticle,
    updateArticle,
    deleteArticle,
    incrementViewCount,
    addTag,
    updateTag,
    deleteTag,
    updateSiteConfig,
  }
})
