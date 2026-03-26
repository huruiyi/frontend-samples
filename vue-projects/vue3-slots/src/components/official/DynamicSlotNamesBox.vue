<template>
  <div class="dyn-box">
    <div class="dyn-box__part">
      <strong>header:</strong>
      <slot name="header">(header 默认内容)</slot>
    </div>
    <div class="dyn-box__part">
      <strong>footer:</strong>
      <slot name="footer">(footer 默认内容)</slot>
    </div>
  </div>
</template>

<style scoped>
.dyn-box {
  border: 1px solid var(--border-color);
  border-radius: 10px;
  display: grid;
  gap: 8px;
  padding: 12px;
}

.dyn-box__part {
  display: flex;
  gap: 8px;
  align-items: baseline;
}
</style>
