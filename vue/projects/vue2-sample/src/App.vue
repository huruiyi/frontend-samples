<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="user">User</RouterLink>
      <RouterLink to="hello">Hello</RouterLink>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
