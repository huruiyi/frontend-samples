<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <li>
    <slot name="row" :item="item" :index="index">
      {{ index + 1 }} - {{ item.name }}
    </slot>
  </li>
</template>
