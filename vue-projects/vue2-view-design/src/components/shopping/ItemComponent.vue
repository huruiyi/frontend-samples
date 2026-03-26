<template>
  <li class="item-row" :class="{ removed: item.checked }">
    <Checkbox v-model="item.checked">
      <span class="item-text">{{ item.text }}</span>
    </Checkbox>
  </li>
</template>

<script>
export default {
  props : [ 'item' ]
}
</script>

<style scoped>
.item-row {
  list-style-type: none;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 10px 12px;
  margin-bottom: 8px;
  transition: all .2s ease;
}

.item-row:hover {
  border-color: #cbd5e1;
  background: #f8fafc;
}

.removed {
  color: #9ca3af;
}

.removed .item-text {
  text-decoration: line-through;
}
</style>
