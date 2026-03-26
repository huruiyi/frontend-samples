<template>
  <button class="fancy-btn" type="button">
    <slot />
  </button>
</template>

<style scoped>
.fancy-btn {
  border: 1px solid #7c3aed;
  background: #8b5cf6;
  color: #fff;
  padding: 8px 14px;
  border-radius: 8px;
  font-weight: 600;
}
</style>
