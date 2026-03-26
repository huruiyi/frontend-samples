<template>
  <button type="submit" class="submit-btn">
    <slot>Submit</slot>
  </button>
</template>

<style scoped>
.submit-btn {
  border: 1px solid var(--border-color);
  background: #fff;
  border-radius: 8px;
  padding: 8px 14px;
}
</style>
