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
  { to: '/demo1', label: '组件通讯', hint: '父子与跨层通讯' },
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

<style scoped>
.app-shell {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.app-shell__glow {
  position: fixed;
  inset: auto;
  width: 320px;
  height: 320px;
  border-radius: 999px;
  filter: blur(20px);
  opacity: 0.45;
  pointer-events: none;
  z-index: 0;
}

.app-shell__glow--left {
  top: 40px;
  left: -120px;
  background: radial-gradient(circle, rgba(255, 166, 77, 0.28), transparent 70%);
}

.app-shell__glow--right {
  right: -120px;
  bottom: 80px;
  background: radial-gradient(circle, rgba(69, 166, 150, 0.24), transparent 70%);
}

.hero-panel,
.view-shell {
  position: relative;
  z-index: 1;
}

.hero-panel {
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding: 28px;
  border: 1px solid var(--color-border);
  border-radius: 28px;
  background: var(--panel-strong);
  box-shadow: var(--shadow-soft);
  backdrop-filter: blur(14px);
}

.hero-panel__brand {
  display: flex;
  align-items: center;
  gap: 18px;
}

.hero-panel__logo {
  flex: none;
  width: 88px;
  height: 88px;
  padding: 14px;
  border-radius: 24px;
  background: var(--logo-panel-background);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9);
}

.hero-panel__eyebrow {
  margin-bottom: 8px;
  color: var(--color-accent);
  font-size: 0.78rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.hero-panel__title {
  max-width: 50ch;
  color: var(--color-heading);
  font-size: clamp(1rem, 2vw, 1.9rem);
  line-height: 1;
  font-weight: 700;
}

.hero-panel__subtitle {
  margin-top: 10px;
  max-width: 52ch;
  color: var(--color-text-soft);
  font-size: 1rem;
}

.hero-panel__theme-status {
  margin-top: 8px;
  color: var(--color-text-soft);
  font-size: 0.9rem;
}

.hero-panel__toolbar {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
}

.hero-panel__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.hero-panel__meta span {
  padding: 8px 14px;
  border-radius: 999px;
  background: var(--panel-muted);
  color: var(--color-heading);
  font-size: 0.88rem;
}

.theme-switcher {
  position: relative;
  display: inline-flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 6px;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background: var(--panel-muted);
}

.theme-switcher__button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--color-heading);
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease, opacity 0.2s ease;
}

.theme-switcher__button:hover {
  transform: translateY(-1px);
  opacity: 0.92;
}

.theme-switcher__button--active {
  background: linear-gradient(135deg, var(--color-accent), #ea8a4a);
  color: #fff;
  box-shadow: 0 10px 18px rgba(212, 106, 61, 0.2);
}

.theme-switcher__icon {
  font-size: 0.95rem;
  transition: transform 0.22s ease;
}

.theme-switcher__button--active .theme-switcher__icon {
  transform: scale(1.08);
}

.app-nav {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
}

.app-nav__link {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-height: 76px;
  padding: 14px 16px;
  border: 1px solid transparent;
  border-radius: 20px;
  color: var(--color-heading);
  background: rgba(255, 255, 255, 0.56);
  transition: transform 0.24s ease, box-shadow 0.24s ease, border-color 0.24s ease, background-color 0.24s ease;
}

.app-nav__link strong {
  font-size: 0.98rem;
  font-weight: 700;
}

.app-nav__link span {
  color: var(--color-text-soft);
  font-size: 0.82rem;
}

.app-nav__link:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 145, 77, 0.28);
  background: rgba(255, 250, 244, 0.92);
  box-shadow: 0 16px 30px rgba(76, 54, 33, 0.08);
}

.app-nav__link.router-link-exact-active {
  border-color: rgba(255, 145, 77, 0.38);
  background: linear-gradient(135deg, rgba(255, 244, 230, 0.98), rgba(232, 247, 243, 0.96));
  box-shadow: 0 18px 32px rgba(86, 64, 42, 0.12);
}

.view-shell {
  padding: 28px;
  border: 1px solid var(--color-border);
  border-radius: 28px;
  background: var(--panel-base);
  box-shadow: var(--shadow-soft);
  min-height: 420px;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.22s ease, transform 0.22s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@media (max-width: 768px) {
  .hero-panel,
  .view-shell {
    padding: 20px;
    border-radius: 24px;
  }

  .hero-panel__brand {
    align-items: flex-start;
    flex-direction: column;
  }

  .hero-panel__toolbar {
    align-items: stretch;
  }

  .hero-panel__title {
    max-width: none;
  }

  .app-nav {
    grid-template-columns: repeat(auto-fit, minmax(132px, 1fr));
  }
}
</style>
