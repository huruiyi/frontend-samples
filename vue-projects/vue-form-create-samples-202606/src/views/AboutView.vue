<script setup lang="ts">
const stack = [
  { name: 'Vue', version: '3.5', desc: '渐进式前端框架，<script setup> + Composition API' },
  { name: 'Vite', version: '8', desc: '下一代构建工具，开发服务器极速冷启动' },
  { name: 'TypeScript', version: '6', desc: '类型安全的 JavaScript 超集' },
  { name: 'Vue Router', version: '5', desc: '官方路由管理器，本 Demo 多页面导航' },
  { name: 'Pinia', version: '3', desc: '官方状态管理，本 Demo 存表单规则与提交记录' },
  { name: 'Ant Design Vue', version: '4.2', desc: '企业级 UI 组件库' },
  { name: '@form-create/ant-design-vue', version: '3.3', desc: 'JSON 驱动的动态表单生成器' },
  { name: '@form-create/antd-designer', version: '3.4', desc: '可视化拖拽表单设计器' },
]
</script>

<template>
  <div class="about-view">
    <a-card title="关于本 Demo">
      <a-typography>
        <a-typography-paragraph>
          本示例基于 Vue 3 + Vite + TypeScript 脚手架，集成
          <a-typography-text code>form-create</a-typography-text>
          低代码表单方案，演示了「可视化设计 → JSON 规则 → 动态渲染 → 数据收集」的完整链路。
        </a-typography-paragraph>
        <a-typography-paragraph>
          使用 <a-typography-text code>Vue Router</a-typography-text> 组织多个页面，
          <a-typography-text code>Pinia</a-typography-text> 在页面间共享表单规则与提交记录，
          规则还会自动持久化到 localStorage。
        </a-typography-paragraph>
      </a-typography>
    </a-card>

    <a-card title="技术栈" class="stack-card">
      <a-descriptions :column="1" bordered size="small">
        <a-descriptions-item v-for="t in stack" :key="t.name" :label="t.name">
          <a-tag color="purple">v{{ t.version }}</a-tag>
          <span class="desc">{{ t.desc }}</span>
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
  </div>
</template>

<style scoped>
.about-view {
  flex: 1;
  min-height: 0;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.desc {
  margin-left: 8px;
}
</style>
