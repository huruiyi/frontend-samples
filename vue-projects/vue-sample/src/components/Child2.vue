<template>
  <div>
    <div>我是子组件2</div>
    <button @click="refreshParent">子组件调取父组件</button>
  </div>
</template>

<script setup>
const emit = defineEmits(["refresh"]);

const refreshParent = () => {
  emit('refresh');
}
</script>

<style scoped>
div {
  margin: 5px 0;
  background-color: beige;
}
</style>