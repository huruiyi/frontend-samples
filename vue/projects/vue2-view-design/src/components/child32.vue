<template>
  <div>
    <Button type="primary" @click.native="childMethod">点击</Button>
  </div>
</template>

<script>
export default {
  name: 'child32',
  methods: {
    childMethod() {
      this.$emit('fatherMethodx')
    }
  }
}

</script>

<style scoped>

</style>
