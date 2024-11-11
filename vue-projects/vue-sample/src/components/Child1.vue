<template>
  <div>我是子组件1</div>
</template>

<script setup>
const hello = (userName) => {
  alert("你好:" + userName);
}
defineExpose({
  hello
})
</script>

<style scoped>
div {
  margin:5px 0 ;
  background-color: antiquewhite
}
</style>