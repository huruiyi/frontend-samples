<script setup>
import HelloWorld from '@/components/HelloWorld.vue'

const highlights = [
  '统一了导航、内容容器和背景氛围',
  '保留了原有示例逻辑，避免改动学习用代码',
  '通过全局样式让表单、按钮和列表默认更清爽'
]
</script>

<template>
  <section class="about-page">
    <article class="about-page__intro">
      <p class="about-page__eyebrow">About This Project</p>
      <h1>这是一个持续累积 Vue 示例的练习仓库</h1>
      <p>
        这里的每个页面都偏向功能验证，而这次调整主要把视觉层补完整，让它从“代码片段集合”变成更适合演示和浏览的小型站点。
      </p>
    </article>

    <article class="about-page__panel">
      <HelloWorld msg="保留示例味道，但界面更整洁" />
      <ul class="about-page__list">
        <li v-for="item in highlights" :key="item">{{ item }}</li>
      </ul>
    </article>
  </section>
</template>

<style scoped>
.about-page {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 20px;
}

.about-page__intro,
.about-page__panel {
  padding: 24px;
  border: 1px solid var(--color-border);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.62);
  box-shadow: 0 18px 40px rgba(84, 60, 33, 0.08);
}

.about-page__eyebrow {
  margin-bottom: 12px;
  color: var(--color-accent);
  font-family: 'Space Grotesk', 'Noto Sans SC', sans-serif;
  font-size: 0.82rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.about-page h1 {
  margin-bottom: 14px;
  font-size: clamp(1.8rem, 4vw, 3rem);
}

.about-page p {
  color: var(--color-text-soft);
}

.about-page__list {
  margin-top: 18px;
  color: var(--color-heading);
}

@media (max-width: 768px) {
  .about-page {
    grid-template-columns: 1fr;
  }
}
</style>
