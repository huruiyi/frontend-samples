<script setup>
import { SearchOutlined } from "@ant-design/icons-vue";

</script>

<template>
  <div class="icon-card icon-card--green">
    <div class="icon-card__row">
      <user-outlined class="icon-card__icon" />
      <strong>V2</strong>
    </div>
    <p>script setup 中直接引入并使用图标组件。</p>
    <div class="icon-card__row icon-card__row--meta">
      <SearchOutlined class="icon-card__search" />
      <span>Composition API icon usage</span>
    </div>
  </div>
</template>

<style scoped src="../assets/components/MyComponentV2.css"></style>
