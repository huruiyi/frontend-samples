<template>
  <div class="login-page">
    <div class="login-card">
      <h1 class="login-title">Vue2 View Design Demo</h1>
      <p class="login-desc">统一了页面层级和布局间距，点击按钮进入示例后台。</p>
      <Button class="login-btn" type="primary" long @click="handleLogin">一键登录</Button>
    </div>
  </div>
</template>

<script>
export default {
  name : 'Login',
  methods : {
    handleLogin() {
      this.$router.push('/main')
    }
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.login-card {
  width: 100%;
  max-width: 420px;
  padding: 36px 32px;
  border-radius: 14px;
  background: #ffffff;
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.1);
  text-align: center;
}

.login-title {
  margin: 0;
  font-size: 26px;
  line-height: 1.2;
  color: #111827;
}

.login-desc {
  margin: 12px 0 24px;
  font-size: 14px;
  color: #6b7280;
}

.login-btn {
  height: 40px;
  font-size: 14px;
}

</style>
