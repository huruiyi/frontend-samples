<script setup>
import { RouterLink } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import TheWelcome from '@/components/TheWelcome.vue'

const quickCards = [
  {
    title: '表单绑定实验台',
    description: '把 input、checkbox、radio、select 等双向绑定场景放进同一页集中观察。',
    to: '/form'
  },
  {
    title: '异步请求演示',
    description: '查看分支切换、加载态和提交记录卡片，快速验证异步数据加载效果。',
    to: '/fetch-v2'
  },
  {
    title: '组件通讯场景',
    description: '查看 ref、emit、props 和 provide/inject 在真实交互提示里的表现。',
    to: '/demo1'
  }
]
</script>

<template>
  <main class="home-page">
    <section class="home-page__hero">
      <div>
        <p class="home-page__eyebrow">Demo Collection</p>
        <HelloWorld msg="把 Vue 示例做成一个像样的练习场" />
        <p class="home-page__intro">
          这个项目覆盖表单绑定、数据监听、输入防抖、组件通讯和第三方组件接入。现在每个页面都在往更接近真实业务演示的方向收口。
        </p>
      </div>

      <div class="home-page__actions">
        <RouterLink class="home-page__primary" to="/form">先看表单绑定实验台</RouterLink>
        <RouterLink class="home-page__secondary" to="/watch">再看数据监听页</RouterLink>
      </div>
    </section>

    <section class="home-page__grid">
      <article v-for="card in quickCards" :key="card.to" class="home-page__card">
        <h2>{{ card.title }}</h2>
        <p>{{ card.description }}</p>
        <RouterLink :to="card.to">进入示例</RouterLink>
      </article>
    </section>

    <section class="home-page__content">
      <div class="home-page__content-card">
        <h2>基础欢迎内容仍然保留</h2>
        <p>原始的 Vue starter 内容没有删除，而是放进更清晰的容器里，方便继续做 API 对照和学习记录。</p>
        <TheWelcome />
      </div>
    </section>
  </main>
</template>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.home-page__hero,
.home-page__card,
.home-page__content-card {
  border: 1px solid var(--color-border);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.62);
  box-shadow: 0 18px 40px rgba(84, 60, 33, 0.08);
}

.home-page__hero {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  padding: 24px;
}

.home-page__eyebrow {
  margin-bottom: 12px;
  color: var(--color-accent);
  font-family: 'Space Grotesk', 'Noto Sans SC', sans-serif;
  font-size: 0.82rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.home-page__intro {
  max-width: 54ch;
  margin-top: 14px;
  color: var(--color-text-soft);
}

.home-page__actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 220px;
}

.home-page__primary,
.home-page__secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 18px;
  border-radius: 999px;
}

.home-page__primary {
  background: linear-gradient(135deg, var(--color-accent), #ea8a4a);
  color: #fff;
  box-shadow: 0 16px 30px rgba(212, 106, 61, 0.24);
}

.home-page__secondary {
  border: 1px solid var(--color-border);
  background: rgba(255, 255, 255, 0.7);
  color: var(--color-heading);
}

.home-page__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;
}

.home-page__card {
  padding: 22px;
}

.home-page__card h2,
.home-page__content-card h2 {
  margin-bottom: 8px;
  font-size: 1.28rem;
}

.home-page__card p,
.home-page__content-card p {
  margin-bottom: 16px;
  color: var(--color-text-soft);
}

.home-page__content-card {
  padding: 24px;
}

@media (max-width: 768px) {
  .home-page__hero {
    flex-direction: column;
  }

  .home-page__actions {
    min-width: 0;
  }
}
</style>
