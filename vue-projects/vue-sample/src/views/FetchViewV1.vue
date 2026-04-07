<script setup>
import { ref, watchEffect } from 'vue'

const API_URL = `https://api.github.com/repos/spring-projects/spring-boot/commits?per_page=5&sha=`
const branches = ['main', '4.0.x', '3.5.x', '3.4.x', '3.3.x', '3.2.x', '3.1.x', '3.0.x', '2.7.x', '2.6.x']

const currentBranch = ref(branches[0])
const commits = ref([])
const isLoading = ref(false)
const errorMessage = ref('')

watchEffect(async (onCleanup) => {
  let cancelled = false
  onCleanup(() => {
    cancelled = true
  })

  isLoading.value = true
  errorMessage.value = ''

  try {
    const url = `${API_URL}${currentBranch.value}`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Fetch failed')
    }

    const data = await response.json()
    if (!cancelled) {
      commits.value = Array.isArray(data) ? data : []
    }
  } catch (error) {
    if (!cancelled) {
      errorMessage.value = '提交记录暂时加载失败，请稍后重试。'
      commits.value = []
    }
  } finally {
    if (!cancelled) {
      isLoading.value = false
    }
  }
})

function truncate(v) {
  const newline = v.indexOf('\n')
  return newline > 0 ? v.slice(0, newline) : v
}

function formatDate(v) {
  return v.replace(/T|Z/g, ' ')
}
</script>

<template>
  <section class="fetch-page">
    <header class="fetch-page__hero">
      <div>
        <p class="fetch-page__eyebrow">Fetch Demo V1</p>
        <h1>Latest Vue Core Commits</h1>
        <p>使用组合式写法监听分支变化，并把远程提交记录整理成更清晰的时间卡片。</p>
      </div>
      <div class="fetch-page__repo">spring-projects/spring-boot@{{ currentBranch }}</div>
    </header>

    <div class="fetch-page__branches">
      <label
        v-for="branch in branches"
        :key="branch"
        class="fetch-page__branch"
        :class="{ 'fetch-page__branch--active': currentBranch === branch }"
      >
        <input v-model="currentBranch" type="radio" name="branch-v1" :value="branch">
        <span>{{ branch }}</span>
      </label>
    </div>

    <p v-if="isLoading" class="fetch-page__status">正在加载最新提交...</p>
    <p v-else-if="errorMessage" class="fetch-page__status fetch-page__status--error">{{ errorMessage }}</p>

    <ul v-else class="fetch-page__list">
      <li v-for="{ html_url, sha, author, commit } in commits" :key="sha" class="fetch-page__item">
        <a :href="html_url" target="_blank" rel="noreferrer" class="fetch-page__sha">{{ sha.slice(0, 7) }}</a>
        <div class="fetch-page__content">
          <strong>{{ truncate(commit.message) }}</strong>
          <p>
            by
            <a :href="author.html_url" target="_blank" rel="noreferrer">{{ commit.author.name }}</a>
            <span>{{ formatDate(commit.author.date) }}</span>
          </p>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped src="../assets/views/FetchViewV1.css"></style>
