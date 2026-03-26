<template>
  <div class="toolbar-layout">
    <div class="toolbar-layout__left">
      <slot name="left">
        <button type="button">默认左侧按钮</button>
      </slot>
    </div>

    <div class="toolbar-layout__center">
      <slot>
        <span>默认中间内容</span>
      </slot>
    </div>

    <div class="toolbar-layout__right">
      <slot name="right">
        <button type="button">默认右侧按钮</button>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.toolbar-layout {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 12px;
  border: 1px dashed var(--border-color);
  border-radius: 10px;
  padding: 10px 12px;
}

.toolbar-layout__center {
  justify-self: center;
  font-weight: 600;
}

.toolbar-layout__right {
  justify-self: end;
}
</style>
