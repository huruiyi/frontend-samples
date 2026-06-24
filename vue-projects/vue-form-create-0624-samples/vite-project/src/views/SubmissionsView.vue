<script setup lang="ts">
import { useFormStore } from '../stores/form'

const store = useFormStore()
</script>

<template>
  <div class="submissions-view">
    <a-card title="表单提交记录">
      <template #extra>
        <a-button danger size="small" :disabled="!store.submissionCount" @click="store.clearSubmissions">
          清空记录
        </a-button>
      </template>

      <a-empty v-if="!store.submissionCount" description="暂无提交记录" />

      <a-list v-else :data-source="store.submissions" item-layout="vertical">
        <template #renderItem="{ item, index }">
          <a-list-item>
            <a-list-item-meta :description="`提交序号 #${store.submissionCount - index}`">
              <template #title>
                <a-typography-text strong>{{ new Date(item.__at).toLocaleString() }}</a-typography-text>
              </template>
            </a-list-item-meta>
            <pre class="code">{{ JSON.stringify(item, null, 2) }}</pre>
          </a-list-item>
        </template>
      </a-list>
    </a-card>
  </div>
</template>

<style scoped>
.submissions-view {
  flex: 1;
  min-height: 0;
  overflow: auto;
}

.code {
  margin: 8px 0 0;
  font-family: var(--mono);
  font-size: 13px;
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
