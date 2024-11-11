<template>
  <div>
    <div>
      <h1>子组件</h1>
      <p>下面是父组件传过来的数据</p>
      <p>第一个数据：{{ fData }}</p>
      <p>第二个数据：{{ fMessage }}</p>
    </div>
  </div>
</template>

<script setup>

defineProps({
  fData: String,
  fMessage: String
})
</script>

<style scoped>
div {
  margin: 5px 0;
  background-color: beige;
}
</style>