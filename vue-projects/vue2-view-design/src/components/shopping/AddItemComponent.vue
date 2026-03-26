<template>
  <div class="add-item-row">
    <Input
      v-model="newItem"
      class="item-input"
      placeholder="Add shopping list item"
      @on-enter="addItem"
    />
    <Button type="primary" icon="ios-add" @click="addItem">Add</Button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newItem : ''
    }
  },
  methods : {
    addItem() {
      const text = this.newItem.trim()
      if (text) {
        this.$emit('add', text)
        this.newItem = ''
      }
    }
  }
}
</script>

<style scoped>
.add-item-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.item-input {
  flex: 1;
}

@media (max-width: 640px) {
  .add-item-row {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
