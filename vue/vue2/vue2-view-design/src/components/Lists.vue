<template>
  <ul>
    <li v-for="item in items" :key="item.message" style="list-style: none">
      {{ item.id }} -{{ item.name }}
    </li>
    <List header="集合循环">
      <ListItem v-for="item in items" :key="item.message">
        {{ item.id }} -{{ item.name }}
      </ListItem>
    </List>
  </ul>
</template>

<script>
export default {
  name : 'Lists',
  data : function () {
    return {
      items : [
        {
          id : 1,
          name : '乔峰'
        },
        {
          id : 2,
          name : '杨过'
        },
        {
          id : 3,
          name : '小龙女'
        }
      ]
    }
  }
}

</script>

<style scoped>

</style>
