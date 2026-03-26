<script setup>
import ForwardingListRow from './ForwardingListRow.vue'

defineProps({
  rows: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <ul class="forwarding-list">
    <ForwardingListRow v-for="(item, index) in rows" :key="item.id ?? index" :item="item" :index="index">
      <template #row="slotProps">
        <slot name="row" v-bind="slotProps">
          {{ slotProps.index + 1 }}. {{ slotProps.item.name }}
        </slot>
      </template>
    </ForwardingListRow>
  </ul>
</template>

<style scoped>
.forwarding-list {
  margin: 0;
  padding-left: 18px;
  display: grid;
  gap: 4px;
}
</style>
