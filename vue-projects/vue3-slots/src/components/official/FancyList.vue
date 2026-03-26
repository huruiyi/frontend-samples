<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <ul class="fancy-list">
    <li v-for="item in items" :key="item.id">
      <slot name="item" v-bind="item">
        <p>{{ item.body }}</p>
        <p>by {{ item.username }} | {{ item.likes }} likes</p>
      </slot>
    </li>
  </ul>
</template>

<style scoped>
.fancy-list {
  margin: 0;
  padding-left: 18px;
  display: grid;
  gap: 6px;
}

.fancy-list p {
  margin: 0;
}
</style>
