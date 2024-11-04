<template>
  <div>
    个人信息
    <p>
      <button @click="increment">Increment</button>
    </p>
    <p>
      <button @click="get">Get</button>
    </p>
    <p>
      <button @click="errorReq">Error Request</button>
    </p>
    <p>
      <button @click="errorRes">Error Response</button>
    </p>
  </div>
</template>

<script>

import requests from '../http'

export default {
  name: 'UserInfo',
  methods: {
    increment () {
      this.$store.commit('increment')
      console.log(this.$store.state.count)
    },
    get () {
      requests.get('/api/values')
        .then(function (response) {
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
    errorReq () {
      // 不存在的请求
      requests.post('/api/people')
        .then(function (response) {
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
    errorRes () {
      requests.get('/api/values/2')
        .then(function (response) {
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
  mounted () {
    this.$store.commit('increment')
    console.log(this.$store.state.count)
  }
}
</script>

<style scoped>

</style>
