<script>
import { SearchOutlined } from "@ant-design/icons-vue";

export default {
  name : "MyComponentV1",
  components : {
    SearchOutlined
  }
}
</script>

<template>
  <div class="icon-card icon-card--blue">
    <div class="icon-card__row">
      <user-outlined class="icon-card__icon" />
      <strong>V1</strong>
    </div>
    <p>局部注册 SearchOutlined，全局注册 SmileOutlined。</p>
    <div class="icon-card__row icon-card__row--meta">
      <SmileOutlined />
      <span>Global icon</span>
      <SearchOutlined class="icon-card__search" />
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
  line-height: 1.5;
  border: 1px solid transparent;
  background: linear-gradient(180deg, var(--surface-card-strong), var(--surface-card-soft));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.icon-card--blue {
  border-color: rgba(88, 158, 255, 0.24);
  background:
    linear-gradient(180deg, rgba(116, 169, 255, 0.16), rgba(88, 158, 255, 0.08)),
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
  color: #7eb2ff;
}

.icon-card__row--meta {
  color: var(--color-text-soft);
  justify-content: space-between;
  margin-top: auto;
}

.icon-card__search {
  color: #1890ff;
}

:global(:root[data-theme='dark']) .icon-card {
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

:global(:root[data-theme='dark']) .icon-card__icon {
  color: #9bc2ff;
}

</style>
