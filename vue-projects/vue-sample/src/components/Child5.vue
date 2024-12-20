<template>
  <div class="child-div">
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