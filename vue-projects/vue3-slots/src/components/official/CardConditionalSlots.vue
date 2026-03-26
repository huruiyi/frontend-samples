<template>
  <div class="card">
    <div v-if="$slots.header" class="card-header">
      <slot name="header" />
    </div>

    <div v-if="$slots.default" class="card-content">
      <slot />
    </div>

    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid var(--border-color);
  border-radius: 10px;
  overflow: hidden;
}

.card-header,
.card-footer {
  background: var(--surface-bg);
  padding: 10px 12px;
}

.card-content {
  padding: 12px;
}
</style>
