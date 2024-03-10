<template>
  <img alt="Vue logo" src="./assets/logo.png">

  <div>
    <router-link to="/">Home</router-link>
    &nbsp;
    <router-link to="/hello">Hello</router-link>
    &nbsp;
    <router-link to="/user">User</router-link>
    &nbsp;
    <router-link to="/details">Details</router-link>
    &nbsp;
    <router-link to="/about">About</router-link>
  </div>
  <div>
    <router-view></router-view>
  </div>

<!--  <HelloWorld msg="Welcome to Your Vue.js App"/>-->

</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
