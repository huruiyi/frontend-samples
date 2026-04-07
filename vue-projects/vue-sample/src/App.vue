<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { BgColorsOutlined, DesktopOutlined, HighlightOutlined } from '@ant-design/icons-vue'

const route = useRoute()
const THEME_STORAGE_KEY = 'vue-sample-theme'
const themeMode = ref('system')
let mediaQuery = null

const navItems = [
  { to: '/', label: '总览', hint: '示例导航首页' },
  { to: '/todo-v1', label: 'Todo V1', hint: '基础待办场景' },
  { to: '/todo-v2', label: 'Todo V2', hint: '对照版待办场景' },
  { to: '/fetch-v1', label: 'Fetch V1', hint: '组合式请求演示' },
  { to: '/fetch-v2', label: 'Fetch V2', hint: '选项式请求演示' },
  { to: '/form', label: 'Form', hint: '表单绑定实验台' },
  { to: '/watch', label: 'Watch', hint: '数据监听实验台' },
  { to: '/debounced', label: '防抖', hint: '搜索输入优化' },
  { to: '/component-communication', label: '组件通讯', hint: '父子与跨层通讯' },
  { to: '/emoji', label: 'Emoji', hint: '表情选择面板' },
  { to: '/about', label: '关于', hint: '项目说明' }
]

const themeOptions = [
  { value: 'light', label: '浅色', icon: HighlightOutlined },
  { value: 'dark', label: '深色', icon: BgColorsOutlined },
  { value: 'system', label: '跟随系统', icon: DesktopOutlined }
]

const currentHint = computed(() => {
  const currentItem = navItems.find((item) => item.to === route.path)
  return currentItem ? currentItem.hint : 'Vue 组件与交互示例集合'
})

const resolvedThemeLabel = computed(() => {
  if (themeMode.value === 'system') {
    return mediaQuery?.matches ? '系统深色' : '系统浅色'
  }

  return themeMode.value === 'dark' ? '深色主题' : '浅色主题'
})

const applyTheme = (mode) => {
  const resolvedTheme = mode === 'system'
    ? (mediaQuery?.matches ? 'dark' : 'light')
    : mode

  document.documentElement.dataset.theme = resolvedTheme
}

const handleSystemThemeChange = () => {
  if (themeMode.value === 'system') {
    applyTheme('system')
  }
}

onMounted(() => {
  mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
  if (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system') {
    themeMode.value = savedTheme
  }

  applyTheme(themeMode.value)

  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', handleSystemThemeChange)
  } else {
    mediaQuery.addListener(handleSystemThemeChange)
  }
})

onBeforeUnmount(() => {
  if (!mediaQuery) {
    return
  }

  if (mediaQuery.removeEventListener) {
    mediaQuery.removeEventListener('change', handleSystemThemeChange)
  } else {
    mediaQuery.removeListener(handleSystemThemeChange)
  }
})

watch(themeMode, (value) => {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(THEME_STORAGE_KEY, value)
  applyTheme(value)
})
</script>

<template>
  <div class="app-shell">
    <div class="app-shell__glow app-shell__glow--left"></div>
    <div class="app-shell__glow app-shell__glow--right"></div>

    <header class="hero-panel">
      <div class="hero-panel__brand">
        <img alt="Vue logo" class="hero-panel__logo" src="@/assets/logo.svg" width="88" height="88" />
        <div>
          <p class="hero-panel__eyebrow">Vue Sample Playground</p>
          <h1 class="hero-panel__title">把零散示例整理成一个更完整的演示站点</h1>
          <p class="hero-panel__subtitle">当前页面：{{ currentHint }}</p>
          <p class="hero-panel__theme-status">当前主题：{{ resolvedThemeLabel }}</p>
        </div>
      </div>

      <div class="hero-panel__toolbar">
        <div class="hero-panel__meta">
          <span>Vue 3</span>
          <span>Vite 5</span>
          <span>Ant Design Vue</span>
        </div>

        <div class="theme-switcher" aria-label="主题切换">
          <button
            v-for="option in themeOptions"
            :key="option.value"
            type="button"
            class="theme-switcher__button"
            :class="{ 'theme-switcher__button--active': themeMode === option.value }"
            @click="themeMode = option.value"
          >
            <component :is="option.icon" class="theme-switcher__icon" />
            {{ option.label }}
          </button>
        </div>
      </div>

      <nav class="app-nav" aria-label="主导航">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="app-nav__link"
        >
          <strong>{{ item.label }}</strong>
          <span>{{ item.hint }}</span>
        </RouterLink>
      </nav>
    </header>

    <RouterView v-slot="{ Component }">
      <Transition name="fade-slide" mode="out-in">
        <main :key="route.path" class="view-shell">
          <component :is="Component" />
        </main>
      </Transition>
    </RouterView>
  </div>
</template>

<style scoped src="./assets/App.css"></style>
