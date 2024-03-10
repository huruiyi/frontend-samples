<template>
  <div>
    <Input style="width: 200px" v-model="item"/>
    <div class="item">
      <strong>Square:</strong>
      <span v-square="item"></span>
    </div>
    <div class="item">
      <strong>Root:</strong>
      <span v-sqrt="item"></span>
    </div>
    <div class="item">
      <strong>Sine:</strong>
      <span v-sin="item"></span>
    </div>
    <div class="item">
      <strong>Cosine:</strong>
      <span v-cos="item"></span>
    </div>
    <div class="item">
      <strong>Tangent:</strong>
      <span v-tan="item"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page4',
  data: function () {
    return {
      item: '9'
    }
  }
}
</script>

<style scoped>
div.item {
  margin: 5px;
  line-height: 40px;
  height: 40px;
  background-color:#d7dde4;
}
</style>
