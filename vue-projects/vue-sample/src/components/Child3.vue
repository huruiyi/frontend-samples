<template>
  <div class="child-div">
    <h3>业务信息面板</h3>
    <p>下面展示父组件下发给当前卡片的数据。</p>
    <p>{{ fData }}</p>
    <p>{{ fMessage }}</p>
  </div>
</template>

<script setup>

defineProps({
  fData: String,
  fMessage: String
})
</script>