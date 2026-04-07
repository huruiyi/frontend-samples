<!--
这个示例会通过 GitHub 的 API 获取最新的 Vue.js 提交信息并将其展示为列表。
你可以在两个分支之间切换。
-->

<script>
const API_URL = `https://api.github.com/repos/spring-projects/spring-boot/commits?per_page=3&sha=`

export default {
  data: () => ({
    branches: ['main', '4.0.x', '3.5.x', '3.4.x', '3.3.x', '3.2.x', '3.1.x', '3.0.x', '2.7.x', '2.6.x'],
    currentBranch: 'main',
    commits: [],
    isLoading: false,
    errorMessage: ''
  }),

  created() {
    // 在初始化的时候进行获取
    this.fetchData()
  },

  watch: {
    // 当 currentBranch 改变时重新获取
    currentBranch: 'fetchData'
  },

  methods: {
    async fetchData() {
      this.isLoading = true
      this.errorMessage = ''

      try {
        const url = `${API_URL}${this.currentBranch}`
        const response = await fetch(url)

        if (!response.ok) {
          throw new Error('Fetch failed')
        }

        const data = await response.json()
        this.commits = Array.isArray(data) ? data : []
      } catch (error) {
        this.errorMessage = '提交记录暂时加载失败，请稍后重试。'
        this.commits = []
      } finally {
        this.isLoading = false
      }
    },
    truncate(v) {
      const newline = v.indexOf('\n')
      return newline > 0 ? v.slice(0, newline) : v
    },
    formatDate(v) {
      return v.replace(/T|Z/g, ' ')
    }
  }
}
</script>

<template>
  <section class="fetch-page fetch-page--alt">
    <header class="fetch-page__hero">
      <div>
        <p class="fetch-page__eyebrow">Fetch Demo V2</p>
        <h1>Options API 版本的提交浏览器</h1>
        <p>逻辑仍然是 watch 触发重新请求，但界面层统一成更适合浏览的卡片结构。</p>
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
        <input v-model="currentBranch" type="radio" name="branch-v2" :value="branch">
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

<style scoped src="../assets/views/FetchViewV2.css"></style>
