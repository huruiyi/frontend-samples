<template>
  <div>
    <ul v-if="items && items.length" class="items-list">
      <item-component v-for="(item, index) in items" :key="`${item.text}-${index}`" :item="item"></item-component>
    </ul>
    <div v-else class="empty-tip">No items yet, add one above.</div>
  </div>
</template>

<script>
import ItemComponent from './ItemComponent'

export default {
  components : {
    ItemComponent
  },
  props : [ 'items' ]
}
</script>

<style scoped>
.items-list {
  margin: 0;
  padding: 0;
}

.empty-tip {
  color: #9ca3af;
  font-size: 13px;
  padding: 10px 4px;
}
</style>
