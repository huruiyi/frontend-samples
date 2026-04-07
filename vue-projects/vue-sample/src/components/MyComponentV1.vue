<script>
import { SearchOutlined } from "@ant-design/icons-vue";

export default {
  name : "MyComponentV1",
  components : {
    SearchOutlined
  }
}
</script>

<template>
  <div class="icon-card icon-card--blue">
    <div class="icon-card__row">
      <user-outlined class="icon-card__icon" />
      <strong>V1</strong>
    </div>
    <p>局部注册 SearchOutlined，全局注册 SmileOutlined。</p>
    <div class="icon-card__row icon-card__row--meta">
      <SmileOutlined />
      <span>Global icon</span>
      <SearchOutlined class="icon-card__search" />
    </div>
  </div>
</template>

<style scoped src="../assets/components/MyComponentV1.css"></style>
