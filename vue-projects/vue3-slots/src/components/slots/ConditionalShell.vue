<script setup>
import { computed, useSlots } from 'vue'

const slots = useSlots()
const hasActions = computed(() => Boolean(slots.actions))
</script>

<template>
  <section class="shell">
    <div class="shell__content">
      <slot />
    </div>

    <div class="shell__actions" v-if="hasActions">
      <slot name="actions" />
    </div>
  </section>
</template>

<style scoped>
.shell {
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 12px;
  display: grid;
  gap: 10px;
}

.shell__actions {
  display: flex;
  gap: 8px;
}
</style>
