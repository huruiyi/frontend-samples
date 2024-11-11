<template>
  <div>
    <h3>子组件5</h3>
    <button @click="parentDo">调用父组件方法</button>
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
  background-color: antiquewhite
}
</style>