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

<style scoped>
.fetch-page {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.fetch-page__hero {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 24px;
  border: 1px solid var(--color-border);
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(255, 247, 236, 0.88), rgba(238, 246, 244, 0.84));
}

.fetch-page__eyebrow {
  margin-bottom: 10px;
  color: var(--color-accent);
  font-family: 'Space Grotesk', 'Noto Sans SC', sans-serif;
  font-size: 0.82rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.fetch-page__hero p {
  color: var(--color-text-soft);
}

.fetch-page__repo {
  align-self: flex-start;
  padding: 10px 14px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.76);
  color: var(--color-heading);
  font-family: 'Space Grotesk', 'Noto Sans SC', sans-serif;
}

.fetch-page__branches {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
}

.fetch-page__branch {
  position: relative;
  display: inline-flex;
}

.fetch-page__branch input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.fetch-page__branch span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 110px;
  padding: 10px 14px;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.72);
  color: var(--color-heading);
  cursor: pointer;
}

.fetch-page__branch--active span {
  border-color: rgba(15, 140, 121, 0.28);
  background: rgba(15, 140, 121, 0.12);
  color: var(--color-accent-strong);
}

.fetch-page__status {
  padding: 16px 18px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.74);
}

.fetch-page__status--error {
  color: #a1462f;
}

.fetch-page__list {
  padding: 0;
  list-style: none;
}

.fetch-page__item {
  display: grid;
  grid-template-columns: 88px 1fr;
  gap: 16px;
  padding: 18px;
  border: 1px solid var(--color-border);
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.68);
}

.fetch-page__item + .fetch-page__item {
  margin-top: 14px;
}

.fetch-page__sha {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  border-radius: 14px;
  background: rgba(212, 106, 61, 0.12);
  color: var(--color-accent);
  font-family: 'Space Grotesk', 'Noto Sans SC', sans-serif;
  font-weight: 700;
}

.fetch-page__content strong {
  display: block;
  margin-bottom: 8px;
  color: var(--color-heading);
}

.fetch-page__content p {
  color: var(--color-text-soft);
}

.fetch-page__content span {
  margin-left: 8px;
}

@media (max-width: 768px) {
  .fetch-page__hero {
    flex-direction: column;
  }

  .fetch-page__item {
    grid-template-columns: 1fr;
  }
}
</style>
