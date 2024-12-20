<template>
  <div>
    <h3>子组件0</h3>
    <p>Count: {{ count }}</p>
    <button class="s-button" @click="childEvent">child0 add</button>
  </div>

</template>

<script setup>
import {ref} from 'vue';

const count = ref(0);

const childEvent = () => {
  count.value++;
}

// 使用 defineExpose 来暴露 count的值 和 childEvent方法
defineExpose({
  count,
  childEvent,
});
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


.s-button {
  background-color: #1795bb;
  border-radius: 6px;
  border: none;
  color: white;
  padding: 6px 12px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 2px 1px;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
  cursor: pointer;
}

.s-button:hover {
  background-color: #fff;
  color: #1795bb;
  border: 1px solid #ccc;
}
</style>