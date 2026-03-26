<template>
  <div class="user-info">
    <h3 class="title">个人信息</h3>
    <div class="action-grid">
      <Button class="action-btn" type="primary" @click="increment">Increment</Button>
      <Button class="action-btn" @click="get">Get</Button>
      <Button class="action-btn" type="warning" @click="errorReq">Error Request</Button>
      <Button class="action-btn" type="error" @click="errorRes">Error Response</Button>
    </div>
  </div>
</template>

<script>

import requests from '../http'

export default {
  name : 'UserInfo',
  methods : {
    increment() {
      this.$store.commit('increment')
      console.log(this.$store.state.count)
    },
    get() {
      requests.get('/api/values').then(function (response) {
        // 处理成功情况
        console.log(response)
        console.log(response.status)
        console.log(response.data)
      })
      .catch(function (error) {
        // 处理错误情况
        console.log(error)
      })
      .then(function () {
        // 总是会执行
      })
    },
    errorReq() {
      // 不存在的请求
      requests.post('/api/people').then(function (response) {
        // 处理成功情况
        console.log(response)
        console.log(response.status)
        console.log(response.data)
      })
      .catch(function (error) {
        // 处理错误情况
        console.log(error)
      })
      .then(function () {
        // 总是会执行
      })
    },
    errorRes() {
      requests.get('/api/values/2').then(function (response) {
        // 处理成功情况
        console.log(response)
        console.log(response.status)
        console.log(response.data)
      })
      .catch(function (error) {
        // 处理错误情况
        console.log(error)
      })
      .then(function () {
        // 总是会执行
      })
    }
  },
  mounted() {
    this.$store.commit('increment')
    console.log(this.$store.state.count)
  }
}
</script>

<style scoped>
.title {
  margin: 0 0 12px;
  color: #1f2937;
  font-size: 16px;
}

.action-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.action-btn {
  width: 160px;
  height: 36px;
}

</style>
