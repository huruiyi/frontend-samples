<script>
import { SearchOutlined } from "@ant-design/icons-vue";

export default {
  components : { SearchOutlined }
}
</script>

<template>
  <div>
    <a-button>
      <template #icon>
        <SearchOutlined />
      </template>
      搜索
    </a-button>
  </div>
</template>

<style scoped>

</style>
