<template>
  <div class="counter-component">
    <div class="component-header">
      <span class="icon">📊</span>
      <h4>计数器组件</h4>
    </div>
    <div class="counter-display">
      <a-button type="primary" size="large" shape="circle" @click="count--" class="counter-btn">
        <span class="btn-icon">−</span>
      </a-button>
      <div class="count-value">
        <a-statistic :value="count" :value-style="{ color: '#722ed1', fontSize: '48px', fontWeight: 'bold' }" />
      </div>
      <a-button type="primary" size="large" shape="circle" @click="count++" class="counter-btn">
        <span class="btn-icon">+</span>
      </a-button>
    </div>
    <a-alert class="hint" type="info" show-icon>
      <template #message>
        <span>切换到其他组件再回来，观察计数器值是否保留</span>
      </template>
    </a-alert>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<style scoped>
.counter-component {
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
  color: #722ed1;
  font-size: 24px;
  font-weight: 600;
}

.counter-display {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin: 32px 0;
}

.count-value {
  min-width: 120px;
}

.counter-btn {
  width: 56px;
  height: 56px;
  font-size: 24px;
  transition: all 0.3s ease;
}

.counter-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(24, 144, 255, 0.4);
}

.btn-icon {
  font-size: 28px;
  font-weight: bold;
}

.hint {
  margin-top: 24px;
  text-align: left;
}
</style>
