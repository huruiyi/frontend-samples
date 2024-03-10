<template>
  <div>
    <ul id="example-1">
      <li v-for="item in items" :key="item.message">
        {{ item.message }}
      </li>
    </ul>

    <fieldset>
      <legend>List-ListItem</legend>
      <List>
        <ListItem v-for="item in items" :key="item.message">
          {{ item.message }}
        </ListItem>
      </List>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'page1',
  data: function () {
    return {
      items: [
        {message: '西游记'},
        {message: '水浒传'}
      ]
    }
  }
}
</script>

<style scoped>
div {
  margin: 30px;
}
</style>
