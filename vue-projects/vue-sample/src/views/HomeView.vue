<script>
import TheWelcome from '../components/TheWelcome.vue'
import HelloWorld from "../components/HelloWorld.vue";

export default {
  components: {
    HelloWorld,
    TheWelcome
  },
  methods: {
    about() {
      this.$router.push('/about')
    }
  }
}


</script>

<template>
  <main>
    <TheWelcome/>
    <HelloWorld msg="哈哈哈"></HelloWorld>
    <a href="javascript:void(0)" @click="about">百度一下</a>

  </main>
</template>
