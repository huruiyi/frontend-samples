<template>
  <Button type="primary" @click.native="childMethod">点击</Button>
</template>

<script>
export default {
  name : 'child33',
  props : {
    fatherMethod : {
      type : Function,
      default : null
    }
  },
  methods : {
    childMethod() {
      if (this.fatherMethod) {
        this.fatherMethod()
      }
    }
  }
}
</script>

<style scoped>

</style>
