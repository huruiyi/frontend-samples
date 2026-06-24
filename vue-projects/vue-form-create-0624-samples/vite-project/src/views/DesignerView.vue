<script setup lang="ts">
import { ref, shallowRef, watchEffect } from 'vue'
import { message } from 'ant-design-vue'
import FcDesigner from '@form-create/antd-designer'
import { useFormStore } from '../stores/form'

const store = useFormStore()
const designerRef = shallowRef<any>(null)
const localJson = ref(store.ruleJson)

// 设计器 ready 后同步当前规则
function onDesignerReady() {
  designerRef.value?.setRule(store.rule)
}

// store 规则变化时同步到本地 JSON 文本
watchEffect(() => {
  localJson.value = store.ruleJson
})

function applyDesign() {
  const rule = designerRef.value?.getRule?.()
  if (rule) {
    store.setRule(rule)
    message.success('已应用并保存设计规则')
  }
}

function clearDesign() {
  designerRef.value?.clearDragRule?.()
  store.clearRule()
  message.success('已清空设计器')
}

function loadFromJson() {
  try {
    store.loadFromJson(localJson.value)
    designerRef.value?.setRule(store.rule)
    message.success('已从 JSON 加载')
  } catch {
    message.error('JSON 格式错误')
  }
}
</script>

<template>
  <div class="designer-view">
    <div class="toolbar">
      <a-button type="primary" @click="applyDesign">应用并保存规则</a-button>
      <a-button @click="clearDesign">清空</a-button>
      <a-button @click="loadFromJson">从右侧 JSON 加载</a-button>
      <router-link to="/preview" custom v-slot="{ navigate }">
        <a-button type="link" @click="navigate">前往预览 →</a-button>
      </router-link>
    </div>

    <FcDesigner
      ref="designerRef"
      height="100%"
      class="designer"
      @ready="onDesignerReady"
    />

    <a-card title="规则 JSON（可编辑后加载回设计器）" class="json-card">
      <a-textarea v-model:value="localJson" :rows="10" class="code-input" />
      <div class="toolbar">
        <a-button type="primary" @click="loadFromJson">加载到设计器</a-button>
      </div>
    </a-card>
  </div>
</template>

<style scoped>
.designer-view {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: auto;
}

.toolbar {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.designer {
  flex: 1;
  min-height: 420px;
}

.json-card {
  flex-shrink: 0;
}

.code-input {
  font-family: var(--mono);
  font-size: 13px;
}
</style>
