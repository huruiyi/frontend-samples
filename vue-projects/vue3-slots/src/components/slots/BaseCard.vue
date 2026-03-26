<template>
  <section class="base-card">
    <header class="base-card__header">
      <slot name="header">
        <strong>默认标题（未提供 header 插槽）</strong>
      </slot>
    </header>

    <div class="base-card__body">
      <slot>
        <p>默认内容（未提供默认插槽）</p>
      </slot>
    </div>

    <footer class="base-card__footer">
      <slot name="footer">
        <small>默认底部（未提供 footer 插槽）</small>
      </slot>
    </footer>
  </section>
</template>

<style scoped>
.base-card {
  border: 1px solid var(--border-color);
  border-radius: 10px;
  background: var(--card-bg);
  overflow: hidden;
}

.base-card__header,
.base-card__footer {
  background: var(--surface-bg);
  padding: 12px 16px;
}

.base-card__body {
  padding: 16px;
}
</style>
