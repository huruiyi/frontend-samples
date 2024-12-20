<template>
  <div>
    <h3>子组件1</h3>
    <p>我是子组件:曹丕</p>
    <p>{{ props.info }}</p>
    <p>{{ props.money }}</p>
  </div>

</template>

<script setup>
let props = defineProps(['info', 'money']); //数组|对象写法都可以

const hello = (userName) => {
  alert("你好:" + userName);
}
defineExpose({
  hello
})
</script>

<style scoped>
h3 {
  color: hsla(160, 100%, 37%, 1)
}

div {
  margin: 5px 0;
  padding: 5px;
  background-color: white;
  border: 1px solid hsla(160, 100%, 37%, 1);
  border-radius: 15px;
}
</style>