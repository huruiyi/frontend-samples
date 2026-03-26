<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name : 'App'
}
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
}

#app {
  height: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg, #f3f6fb 0%, #eef2f7 100%);
  color: #1f2937;
  font-family: "Helvetica Neue", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
