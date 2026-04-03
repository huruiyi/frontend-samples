<script setup>
import { SearchOutlined } from "@ant-design/icons-vue";

</script>

<template>
  <div class="icon-card icon-card--green">
    <div class="icon-card__row">
      <user-outlined class="icon-card__icon" />
      <strong>V2</strong>
    </div>
    <p>script setup 中直接引入并使用图标组件。</p>
    <div class="icon-card__row icon-card__row--meta">
      <SearchOutlined class="icon-card__search" />
      <span>Composition API icon usage</span>
    </div>
  </div>
</template>

<style scoped>
.icon-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 14px;
  width: 100%;
  padding: 18px;
  border-radius: 20px;
  border: 1px solid transparent;
  background: linear-gradient(180deg, var(--surface-card-strong), var(--surface-card-soft));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.icon-card--green {
  border-color: rgba(94, 204, 168, 0.24);
  background:
    linear-gradient(180deg, rgba(94, 204, 168, 0.16), rgba(94, 204, 168, 0.08)),
    linear-gradient(180deg, var(--surface-card-strong), var(--surface-card-soft));
}

.icon-card__row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon-card strong {
  color: var(--color-heading);
  font-size: 1.05rem;
}

.icon-card p {
  color: var(--color-text-soft);
}

.icon-card__icon {
  font-size: 16px;
  color: #77d5bd;
}

.icon-card__row--meta {
  color: var(--color-text-soft);
  margin-top: auto;
}

.icon-card__search {
  color: #1890ff;
}

:global(:root[data-theme='dark']) .icon-card {
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

:global(:root[data-theme='dark']) .icon-card__icon {
  color: #8ce2cb;
}

</style>
