<script>
import { UserOutlined, SearchOutlined } from "@ant-design/icons-vue";

export default {
  name : "MyComponentV1",
  components : {
    UserOutlined,
    SearchOutlined
  }
}
</script>

<template>
  <div style="border: #1890ff 1px solid;line-height: 24px">
    <!-- 使用图标 -->
    <UserOutlined />
    V1
    <SmileOutlined />    全局引入了 SmileOutlined
    <SearchOutlined style="color: #1890ff;" />
  </div>
</template>

<style scoped>

</style>
