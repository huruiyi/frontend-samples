<template>
  <div class="child-div">
    <h3>子组件2</h3>
    <button class="s-button" @click="refreshParent">子组件调取父组件</button>
  </div>
</template>

<script setup>
const emit = defineEmits(["refresh"]);

const refreshParent = () => {
  emit('refresh');
}
</script>