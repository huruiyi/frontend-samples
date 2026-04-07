<script>
import { SearchOutlined } from "@ant-design/icons-vue";

export default {
  components : { SearchOutlined }
}
</script>

<template>
  <div class="icon-action-card">
    <div class="icon-action-card__content">
      <strong>按钮插槽同样可以使用图标组件</strong>
      <p>适合搜索、下载、刷新这类需要图标强化语义的常用操作按钮。</p>
    </div>
    <a-button class="icon-action-card__button">
      <template #icon>
        <SearchOutlined />
      </template>
      搜索
    </a-button>
  </div>
</template>

<style scoped src="../assets/components/MyComponentV3.css"></style>
