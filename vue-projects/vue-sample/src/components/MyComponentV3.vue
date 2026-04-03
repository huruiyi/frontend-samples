<script>
import { SearchOutlined } from "@ant-design/icons-vue";

export default {
  components : { SearchOutlined }
}
</script>

<template>
  <div class="icon-action-card">
    <div class="icon-action-card__content">
      <strong>按钮插槽同样可以使用图标组件</strong>
      <p>适合搜索、下载、刷新这类需要图标强化语义的常用操作按钮。</p>
    </div>
    <a-button class="icon-action-card__button">
      <template #icon>
        <SearchOutlined />
      </template>
      搜索
    </a-button>
  </div>
</template>

<style scoped>
.icon-action-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  min-height: 100%;
  gap: 16px;
  padding: 18px;
  border-radius: 20px;
  border: 1px solid rgba(121, 92, 61, 0.12);
  background: linear-gradient(180deg, var(--surface-card-strong), var(--surface-card-soft));
}

.icon-action-card__content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.icon-action-card strong {
  color: var(--color-heading);
  font-size: 1.05rem;
}

.icon-action-card p {
  color: var(--color-text-soft);
  line-height: 1.6;
}

.icon-action-card__button {
  align-self: flex-start;
}

</style>
