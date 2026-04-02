<template>
  <div class="demo-container">
    <a-card title="KeepAlive 组件 Demo" :bordered="false">
      <a-space direction="vertical" :size="20" style="width: 100%">
        <a-alert message="KeepAlive 用于缓存组件实例，避免重复渲染，保持组件状态" type="info" show-icon />

        <div class="demo-section">
          <h3>组件切换 - 带缓存 vs 不带缓存</h3>
          <div class="control-area">
            <a-radio-group v-model:value="currentTab" button-style="solid" size="large">
              <a-radio-button value="counter">
                <span class="radio-label">📊 计数器</span>
              </a-radio-button>
              <a-radio-button value="timer">
                <span class="radio-label">⏱️ 计时器</span>
              </a-radio-button>
              <a-radio-button value="input">
                <span class="radio-label">✏️ 输入框</span>
              </a-radio-button>
            </a-radio-group>

            <div class="switch-container">
              <span class="switch-label">缓存控制：</span>
              <a-switch
                v-model:checked="useKeepAlive"
                checked-children="启用"
                un-checked-children="禁用"
                :style="{ backgroundColor: useKeepAlive ? '#52c41a' : '#ff4d4f' }"
              />
              <a-tag :color="useKeepAlive ? 'success' : 'error'" class="status-tag">
                {{ useKeepAlive ? '✅ 缓存已启用' : '❌ 缓存已禁用' }}
              </a-tag>
            </div>
          </div>

          <div class="component-container">
            <transition name="fade" mode="out-in">
              <keep-alive v-if="useKeepAlive">
                <component :is="currentComponent" :key="currentTab" />
              </keep-alive>
              <component v-else :is="currentComponent" :key="currentTab + '-' + renderKey" />
            </transition>
          </div>
        </div>

        <a-alert
          :type="useKeepAlive ? 'success' : 'warning'"
          show-icon
          class="status-alert"
        >
          <template #message>
            <span v-if="useKeepAlive">
              <strong>缓存已启用：</strong>切换组件时会保留状态，组件不会被销毁
            </span>
            <span v-else>
              <strong>缓存已禁用：</strong>切换组件时状态会重置，组件会被销毁重建
            </span>
          </template>
        </a-alert>
      </a-space>
    </a-card>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import CounterComponent from './KeepAlive/CounterComponent.vue'
import TimerComponent from './KeepAlive/TimerComponent.vue'
import InputComponent from './KeepAlive/InputComponent.vue'

const currentTab = ref('counter')
const useKeepAlive = ref(true)
const renderKey = ref(0)

// 当禁用缓存时，每次切换组件都增加renderKey强制重新渲染
watch([currentTab, useKeepAlive], ([newTab, newUseKeepAlive], [oldTab, oldUseKeepAlive]) => {
  if (!newUseKeepAlive && newTab !== oldTab) {
    renderKey.value++
  }
})

const currentComponent = computed(() => {
  const components = {
    counter: CounterComponent,
    timer: TimerComponent,
    input: InputComponent
  }
  return components[currentTab.value]
})
</script>

<style scoped>
.demo-container {
  margin-bottom: 24px;
}

.demo-section {
  padding: 24px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%);
  border-radius: 8px;
  border: 1px solid #e0e6ed;
}

.demo-section h3 {
  margin-bottom: 20px;
  color: #1890ff;
  font-size: 18px;
  font-weight: 600;
}

.control-area {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
}

.radio-label {
  font-weight: 500;
}

.switch-container {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: white;
  border-radius: 6px;
  border: 1px solid #e0e6ed;
}

.switch-label {
  font-weight: 500;
  color: #595959;
}

.status-tag {
  margin-left: 8px;
  font-weight: 500;
}

.component-container {
  margin-top: 20px;
  padding: 32px;
  background: white;
  border-radius: 12px;
  border: 3px solid #1890ff;
  box-shadow: 0 4px 12px rgba(24, 144, 255, 0.15);
  min-height: 180px;
}

.status-alert {
  font-size: 15px;
}

.status-alert strong {
  font-weight: 600;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
