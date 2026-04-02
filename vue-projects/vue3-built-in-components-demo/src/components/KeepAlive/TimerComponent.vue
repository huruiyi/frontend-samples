<template>
  <div class="timer-component">
    <div class="component-header">
      <span class="icon">⏱️</span>
      <h4>计时器组件</h4>
    </div>
    <div class="timer-display">
      <a-statistic title="已运行时间" :value="seconds" suffix="秒" class="timer-statistic">
        <template #formatter>
          <span class="timer-value">{{ seconds }}</span>
        </template>
      </a-statistic>
      <div class="timer-animation">
        <div class="pulse-ring" :style="{ animationDelay: '0s' }"></div>
        <div class="pulse-ring" :style="{ animationDelay: '0.5s' }"></div>
        <div class="pulse-ring" :style="{ animationDelay: '1s' }"></div>
      </div>
    </div>
    <a-alert class="hint" type="info" show-icon>
      <template #message>
        <span>切换到其他组件再回来，观察计时器是否继续运行</span>
      </template>
    </a-alert>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const seconds = ref(0)
let timer = null

onMounted(() => {
  timer = setInterval(() => {
    seconds.value++
  }, 1000)
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<style scoped>
.timer-component {
  text-align: center;
}

.component-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 24px;
}

.icon {
  font-size: 32px;
}

.component-header h4 {
  margin: 0;
  color: #13c2c2;
  font-size: 24px;
  font-weight: 600;
}

.timer-display {
  position: relative;
  padding: 32px 0;
}

.timer-statistic {
  position: relative;
  z-index: 1;
}

.timer-value {
  font-size: 56px;
  font-weight: bold;
  color: #13c2c2;
  font-family: 'Courier New', monospace;
}

.timer-animation {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
}

.pulse-ring {
  position: absolute;
  width: 120px;
  height: 120px;
  border: 3px solid #13c2c2;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: pulse 2s ease-out infinite;
  opacity: 0;
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 0.8;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0;
  }
}

.hint {
  margin-top: 24px;
  text-align: left;
}
</style>
