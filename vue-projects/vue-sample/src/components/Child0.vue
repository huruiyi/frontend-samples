<template>
  <div class="child-div">
    <h3>步骤计数器</h3>
    <p>当前步骤推进次数：{{ count }}</p>
    <button class="s-button" @click="childEvent">组件内自增</button>
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
