<template>
  <div class="input-component">
    <div class="component-header">
      <span class="icon">✏️</span>
      <h4>输入框组件</h4>
    </div>
    <div class="input-area">
      <a-input
        v-model:value="text"
        placeholder="输入一些内容..."
        size="large"
        class="custom-input"
        allow-clear
      >
        <template #prefix>
          <span style="font-size: 18px">📝</span>
        </template>
      </a-input>
      <div class="char-count" v-if="text">
        <a-tag color="magenta">已输入 {{ text.length }} 个字符</a-tag>
      </div>
    </div>
    <a-alert class="hint" type="info" show-icon>
      <template #message>
        <span>切换到其他组件再回来，观察输入内容是否保留</span>
      </template>
    </a-alert>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const text = ref('')
</script>

<style scoped>
.input-component {
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
  color: #eb2f96;
  font-size: 24px;
  font-weight: 600;
}

.input-area {
  padding: 32px 0;
  max-width: 500px;
  margin: 0 auto;
}

.custom-input {
  font-size: 16px;
  border-radius: 8px;
}

.custom-input:focus {
  box-shadow: 0 0 0 3px rgba(235, 47, 150, 0.2);
}

.char-count {
  margin-top: 16px;
}

.hint {
  margin-top: 24px;
  text-align: left;
}
</style>
