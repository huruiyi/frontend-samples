<template>
  <div>
    <div>
      <h1>子组件5</h1>
      <button @click="parentDo">调用父组件方法</button>
    </div>
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
div {
  margin: 5px 0;
  background-color: beige;
}
</style>