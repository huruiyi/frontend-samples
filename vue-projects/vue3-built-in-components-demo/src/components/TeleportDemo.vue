<template>
  <div class="demo-container">
    <a-card title="Teleport 组件 Demo" :bordered="false">
      <a-space direction="vertical" :size="20" style="width: 100%">
        <a-alert message="Teleport 可以将组件渲染到 DOM 中的其他位置，不受父组件样式影响" type="info" />

        <div class="demo-section">
          <h3>模态框 - Teleport 到 body</h3>
          <a-button type="primary" @click="showModal = true">
            打开模态框
          </a-button>
          <p class="hint">模态框通过 Teleport 渲染到 body，避免被父元素的 overflow 或 z-index 影响</p>
        </div>

        <div class="demo-section overflow-container">
          <h3>溢出容器中的弹出框</h3>
          <a-button type="primary" @click="showPopup = true">
            显示弹出框
          </a-button>
          <p class="hint">这个容器有 overflow: hidden，但弹出框通过 Teleport 可以正常显示</p>
        </div>

        <div class="demo-section">
          <h3>多个 Teleport 目标</h3>
          <a-space>
            <a-button @click="showNotification = true">显示通知</a-button>
            <a-button @click="showTooltip = true">显示工具提示</a-button>
          </a-space>
        </div>
      </a-space>
    </a-card>

    <!-- 模态框 - Teleport 到 body -->
    <teleport to="body">
      <div v-if="showModal" class="modal-overlay" @click="showModal = false">
        <div class="modal-content" @click.stop>
          <h2>Teleport 模态框</h2>
          <p>这个模态框被传送到了 body 元素下</p>
          <a-button type="primary" @click="showModal = false">关闭</a-button>
        </div>
      </div>
    </teleport>

    <!-- 弹出框 - Teleport 到 body -->
    <teleport to="body">
      <div v-if="showPopup" class="popup">
        <div class="popup-content">
          <h3>弹出框</h3>
          <p>即使父容器有 overflow: hidden，我也能正常显示！</p>
          <a-button size="small" @click="showPopup = false">关闭</a-button>
        </div>
      </div>
    </teleport>

    <!-- 通知 - Teleport 到自定义目标 -->
    <teleport to="body">
      <transition name="slide-down">
        <div v-if="showNotification" class="notification">
          <a-alert
            message="这是一条通知消息"
            type="success"
            show-icon
            closable
            @close="showNotification = false"
          />
        </div>
      </transition>
    </teleport>

    <!-- 工具提示 - Teleport 到 body -->
    <teleport to="body">
      <div v-if="showTooltip" class="tooltip">
        <div class="tooltip-content">
          <p>这是一个工具提示</p>
          <a-button size="small" @click="showTooltip = false">关闭</a-button>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showModal = ref(false)
const showPopup = ref(false)
const showNotification = ref(false)
const showTooltip = ref(false)
</script>

<style scoped>
.demo-container {
  margin-bottom: 24px;
}

.demo-section {
  padding: 16px;
  background: #f5f5f5;
  border-radius: 4px;
  min-height: clamp(110px, 14vh, 170px);
}

.demo-section h3 {
  margin-bottom: 12px;
  color: #1890ff;
}

.overflow-container {
  overflow: hidden;
  min-height: clamp(110px, 14vh, 170px);
  position: relative;
}

.hint {
  margin-top: 8px;
  color: #8c8c8c;
  font-size: 12px;
}

/* 模态框样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 32px;
  border-radius: 12px;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.modal-content h2 {
  margin-bottom: 16px;
  color: #1890ff;
}

/* 弹出框样式 */
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
}

.popup-content {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.popup-content h3 {
  margin-bottom: 12px;
}

/* 通知样式 */
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1002;
  min-width: 300px;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from {
  transform: translateY(-20px);
  opacity: 0;
}

.slide-down-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

/* 工具提示样式 */
.tooltip {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1003;
}

.tooltip-content {
  background: #001529;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
</style>
