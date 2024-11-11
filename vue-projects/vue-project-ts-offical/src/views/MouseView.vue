<template>
  <div class="mouse">
    <MouseTracker v-slot="{ x, y }">
      Mouse is at: {{ x }}, {{ y }}
    </MouseTracker>
    <ul>
      <li v-for="item in items" v-bind:key="item.id" >
        <slot name="item" v-bind="item">{{ item.id }}:{{ item.name }}</slot>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import MouseTracker from '@/components/MouseTracker.vue'

const items = [
  { id: 1, name: 'U1' },
  { id: 2, name: 'U2' },
]
</script>

<style>
@media (min-width: 1024px) {
  .mouse {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
