<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import { message } from 'ant-design-vue'
import FormCreate from '@form-create/ant-design-vue'
import { useRouter } from 'vue-router'
import { useFormStore } from '../stores/form'

const store = useFormStore()
const router = useRouter()

const formData = ref<Record<string, any>>({})
const fApi = shallowRef<any>(null)

function handleSubmit() {
  fApi.value?.submit((data: Record<string, any>) => {
    store.addSubmission(data)
    message.success('提交成功，已记录到提交记录')
  })
}

function handleReset() {
  fApi.value?.resetFields()
}

function goSubmissions() {
  router.push('/submissions')
}
</script>

<template>
  <div class="preview-view">
    <a-empty v-if="!store.rule.length" description="尚未设计任何字段，请先前往设计器">
      <a-button type="primary" @click="router.push('/designer')">去设计</a-button>
    </a-empty>

    <template v-else>
      <a-card title="动态表单渲染（form-create）">
        <FormCreate
          v-model:api="fApi"
          v-model="formData"
          :rule="store.rule"
          :option="{ submitBtn: false, resetBtn: false }"
        />
        <div class="actions">
          <a-button type="primary" @click="handleSubmit">提交</a-button>
          <a-button @click="handleReset">重置</a-button>
          <a-button type="link" @click="goSubmissions">查看提交记录 ({{ store.submissionCount }})</a-button>
        </div>
      </a-card>

      <a-card title="当前表单数据" class="data-card">
        <pre class="code">{{ JSON.stringify(formData, null, 2) }}</pre>
      </a-card>
    </template>
  </div>
</template>

<style scoped>
.preview-view {
  flex: 1;
  min-height: 0;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.actions {
  margin-top: 16px;
  display: flex;
  gap: 8px;
}

.code {
  margin: 0;
  font-family: var(--mono);
  font-size: 13px;
  white-space: pre-wrap;
  word-break: break-all;
  max-height: 360px;
  overflow: auto;
}
</style>
