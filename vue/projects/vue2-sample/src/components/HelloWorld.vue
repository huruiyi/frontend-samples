<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{ pMsg }}</h2>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    pMsg: String
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
