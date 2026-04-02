<template>
  <div class="demo-container">
    <a-card title="Transition 组件 Demo" :bordered="false">
      <a-space direction="vertical" :size="20" style="width: 100%">
        <a-alert message="Transition 组件用于给元素或组件添加进入/离开过渡动画" type="info" />

        <div class="demo-section">
          <h3>基础淡入淡出</h3>
          <a-button type="primary" @click="show1 = !show1">
            {{ show1 ? '隐藏' : '显示' }}
          </a-button>
          <transition name="fade">
            <div v-if="show1" class="box">Hello Vue 3!</div>
          </transition>
        </div>

        <div class="demo-section">
          <h3>滑动动画</h3>
          <a-button type="primary" @click="show2 = !show2">
            {{ show2 ? '滑出' : '滑入' }}
          </a-button>
          <transition name="slide">
            <div v-if="show2" class="box slide-box">Slide Animation</div>
          </transition>
        </div>

        <div class="demo-section">
          <h3>缩放动画</h3>
          <a-button type="primary" @click="show3 = !show3">
            {{ show3 ? '缩小' : '放大' }}
          </a-button>
          <transition name="zoom">
            <div v-if="show3" class="box">Zoom Effect</div>
          </transition>
        </div>
      </a-space>
    </a-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const show1 = ref(true)
const show2 = ref(true)
const show3 = ref(true)
</script>

<style scoped>
.demo-container {
  margin-bottom: 24px;
}

.demo-section {
  padding: 16px;
  background: #f5f5f5;
  border-radius: 4px;
}

.demo-section h3 {
  margin-bottom: 12px;
  color: #1890ff;
}

.box {
  margin-top: 16px;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
}

/* Fade 动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide 动画 */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* Zoom 动画 */
.zoom-enter-active,
.zoom-leave-active {
  transition: all 0.5s ease;
}

.zoom-enter-from,
.zoom-leave-to {
  transform: scale(0);
  opacity: 0;
}
</style>
