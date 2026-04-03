<template>
  <div class="child-div">
    <h3>深层操作入口</h3>
    <p>当前按钮通过 inject 调用上层注入的方法。</p>
    <button class="s-button" @click="parentDo">触发上层统一动作</button>
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