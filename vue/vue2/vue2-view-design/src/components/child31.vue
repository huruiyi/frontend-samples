<template>
  <div>
    <Button type="primary" @click.native="childMethod">点击</Button>
  </div>
</template>

<script>
export default {
  name : 'child31',
  methods : {
    childMethod() {
      this.$parent.fatherMethod()
    }
  }
}
</script>

<style scoped>

</style>
