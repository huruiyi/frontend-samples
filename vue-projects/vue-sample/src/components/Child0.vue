<template>
  <div class="child-div">
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
