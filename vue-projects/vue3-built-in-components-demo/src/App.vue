<template>
  <div id="app">
    <a-layout>
      <a-layout-header>
        <div class="header-content">
          <div class="header-left">
            <div class="logo-section">
              <span class="vue-logo">⚡</span>
              <h1>Vue 3 内置组件 Demo</h1>
            </div>
            <div class="tech-tags">
              <a-tag color="#42b883" class="tech-tag">
                <span class="tag-icon">💚</span> Vue 3.4
              </a-tag>
              <a-tag color="#0170FE" class="tech-tag">
                <span class="tag-icon">🎨</span> Ant Design Vue 4
              </a-tag>
            </div>
          </div>
        </div>
      </a-layout-header>

      <a-layout-content>
        <div class="content-wrapper">
          <a-tabs v-model:activeKey="activeTab" size="large" tab-position="left" class="custom-tabs">
            <a-tab-pane key="transition">
              <template #tab>
                <span class="tab-label">
                  <span class="tab-icon">🎬</span>
                  <span>Transition</span>
                </span>
              </template>
              <transition-demo />
            </a-tab-pane>

            <a-tab-pane key="transition-group">
              <template #tab>
                <span class="tab-label">
                  <span class="tab-icon">🎞️</span>
                  <span>TransitionGroup</span>
                </span>
              </template>
              <transition-group-demo />
            </a-tab-pane>

            <a-tab-pane key="keep-alive">
              <template #tab>
                <span class="tab-label">
                  <span class="tab-icon">💾</span>
                  <span>KeepAlive</span>
                </span>
              </template>
              <keep-alive-demo />
            </a-tab-pane>

            <a-tab-pane key="teleport">
              <template #tab>
                <span class="tab-label">
                  <span class="tab-icon">🚀</span>
                  <span>Teleport</span>
                </span>
              </template>
              <teleport-demo />
            </a-tab-pane>

            <a-tab-pane key="suspense">
              <template #tab>
                <span class="tab-label">
                  <span class="tab-icon">⏳</span>
                  <span>Suspense</span>
                </span>
              </template>
              <suspense-demo />
            </a-tab-pane>
          </a-tabs>
        </div>
      </a-layout-content>

      <a-layout-footer>
        <div class="footer-content">
          <p>
            <span class="footer-icon">⚡</span>
            Vue 3 内置组件演示 | Transition, TransitionGroup, KeepAlive, Teleport, Suspense
          </p>
        </div>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TransitionDemo from './components/TransitionDemo.vue'
import TransitionGroupDemo from './components/TransitionGroupDemo.vue'
import KeepAliveDemo from './components/KeepAliveDemo.vue'
import TeleportDemo from './components/TeleportDemo.vue'
import SuspenseDemo from './components/SuspenseDemo.vue'

const activeTab = ref('transition')
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
    'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
    'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%);
}

.ant-layout {
  min-height: 100vh;
}

/* 顶部标题栏样式 */
.ant-layout-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  height: 72px;
  line-height: 1;
  padding: 0 32px;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

.vue-logo {
  font-size: 36px;
  animation: rotate 3s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.header-content h1 {
  color: white;
  font-size: 28px;
  font-weight: 700;
  line-height: 1.1;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.tech-tags {
  display: flex;
  gap: 12px;
}

.tech-tag {
  display: inline-flex;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  padding: 8px 12px;
  border-radius: 6px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.tag-icon {
  margin-right: 4px;
}

/* 内容区域样式 */
.ant-layout-content {
  padding: 32px;
}

.content-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

/* 自定义Tabs样式 */
.custom-tabs .ant-tabs-nav {
  width: 220px;
}

.tab-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 500;
  padding: 4px 0;
}

.tab-icon {
  font-size: 20px;
}

.custom-tabs .ant-tabs-tab {
  padding: 12px 16px;
  margin: 4px 0;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.custom-tabs .ant-tabs-tab:hover {
  background: #f0f5ff;
}

.custom-tabs .ant-tabs-tab-active {
  background: linear-gradient(135deg, #e6f7ff 0%, #f0f5ff 100%);
  font-weight: 600;
}

.custom-tabs .ant-tabs-ink-bar {
  display: none;
}

.custom-tabs .ant-tabs-tab-btn {
  transition: all 0.3s ease;
}

.custom-tabs .ant-tabs-tab-active .tab-label {
  color: #1890ff;
}

/* 底部样式 */
.ant-layout-footer {
  background: linear-gradient(135deg, #001529 0%, #002140 100%);
  color: rgba(255, 255, 255, 0.85);
  text-align: center;
  padding: 20px 32px;
  box-shadow: 0 -4px 12px rgba(0, 21, 41, 0.3);
}

.footer-content p {
  margin: 0;
  font-size: 15px;
  font-weight: 500;
}

.footer-icon {
  margin-right: 8px;
  font-size: 18px;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .ant-layout-header {
    height: auto;
    padding: 14px 16px;
  }

  .header-content {
    align-items: flex-start;
  }

  .header-left {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-content h1 {
    font-size: 22px;
  }

  .custom-tabs .ant-tabs-nav {
    width: 100%;
  }

  .ant-layout-content {
    padding: 16px;
  }

  .content-wrapper {
    padding: 16px;
  }
}
</style>
