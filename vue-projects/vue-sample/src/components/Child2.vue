<template>
  <div class="child-div">
    <h3>刷新触发器</h3>
    <p>点击后向父组件发送刷新请求。</p>
    <button class="s-button" @click="refreshParent">通知父组件刷新列表</button>
  </div>
</template>

<script setup>
const emit = defineEmits(["refresh"]);

const refreshParent = () => {
  emit('refresh');
}
</script>