<template>
  <div>
    <h3>子组件5</h3>
    <button class="s-button" @click="parentDo">调用父组件方法</button>
  </div>
</template>

<script setup>
import {inject, onMounted, ref} from "vue";

const PROVIDE_NAME = 'child5'
const injectFunc = ref();
const parentDo = () => {
  injectFunc.value()
}
onMounted(() => {
  inject(PROVIDE_NAME)

  injectFunc.value = inject(`${PROVIDE_NAME}/func`);
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