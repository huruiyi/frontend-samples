<template>
  <div class="shopping-page">
    <Card class="shopping-card">
      <div class="shopping-header">
        <h2 class="shopping-title">{{ title }}</h2>
        <div class="shopping-stats">
          <Tag color="blue">Total {{ items.length }}</Tag>
          <Tag color="green">Done {{ completedCount }}</Tag>
          <Tag color="gold">Todo {{ pendingCount }}</Tag>
        </div>
      </div>

      <add-item-component @add="addItem"></add-item-component>

      <div class="list-wrap">
        <items-component :items="items"></items-component>
      </div>

      <Divider />

      <div class="footer">
        <change-title-component v-model="title"></change-title-component>
      </div>
    </Card>
  </div>
</template>

<script>
import AddItemComponent from "../../components/shopping/AddItemComponent";
import ItemsComponent from "../../components/shopping/ItemsComponent";
import ChangeTitleComponent from "../../components/shopping/ChangeTitleComponent";

export default {
  name : "shopping",
  components : {
    AddItemComponent,
    ItemsComponent,
    ChangeTitleComponent
  },
  data() {
    return {
      items : [ { text : 'Bananas', checked : true }, { text : 'Apples', checked : false } ],
      title : 'My Shopping List'
    }
  },
  methods : {
    addItem(text) {
      this.items.push({
        text : text,
        checked : false
      })
    }
  },
  computed : {
    completedCount() {
      return this.items.filter(item => item.checked).length
    },
    pendingCount() {
      return this.items.length - this.completedCount
    }
  }
}
</script>

<style scoped>
.shopping-page {
  max-width: 760px;
  margin: 0 auto;
}

.shopping-card {
  border-radius: 12px;
}

.shopping-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
}

.shopping-title {
  margin: 0;
}

.shopping-stats {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.list-wrap {
  margin-top: 12px;
}

.footer {
  margin-top: 8px;
}

@media (max-width: 768px) {
  .shopping-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
