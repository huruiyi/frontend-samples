<template>
    <div>我是JumpPage
        <button @click="back">点我返回</button>
    </div>
</template>

<script>
export default {
  name: 'PreviousPage',
  methods: {
    back () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>
