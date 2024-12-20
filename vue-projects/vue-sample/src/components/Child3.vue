<template>
  <div class="child-div">
    <h3>子组件3</h3>
    <p>下面是父组件传过来的数据</p>
    <p>第一个数据：{{ fData }}</p>
    <p>第二个数据：{{ fMessage }}</p>
  </div>
</template>

<script setup>

defineProps({
  fData: String,
  fMessage: String
})
</script>