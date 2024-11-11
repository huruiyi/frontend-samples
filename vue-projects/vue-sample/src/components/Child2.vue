<template>
  <div>
    <h3>子组件2</h3>
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
h3 {
  color: hsla(160, 100%, 37%, 1)
}

div {
  margin: 5px 0;
  padding: 5px;
  background-color: antiquewhite
}
</style>