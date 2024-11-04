<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name : 'App',
  methods : {
    go() {
      this.$router.push('/JumpPage')
    }
  }
}
</script>

<style>
#app {
  height: 100vh;
}
</style>
