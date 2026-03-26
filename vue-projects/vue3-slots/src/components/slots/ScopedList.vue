<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <ul class="scoped-list" v-if="items.length">
    <li v-for="(item, index) in items" :key="item.id ?? index">
      <slot name="item" :item="item" :index="index" :isLast="index === items.length - 1">
        {{ index + 1 }}. {{ item.label ?? item }}
      </slot>
    </li>
  </ul>

  <slot v-else name="empty">
    <p class="empty">暂无数据（empty 插槽未提供）</p>
  </slot>
</template>

<style scoped>
.scoped-list {
  margin: 0;
  padding-left: 18px;
}

.empty {
  margin: 0;
  color: var(--muted-text);
}
</style>
