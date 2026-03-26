<template>
  <child33 :fatherMethod="fatherMethod"></child33>
</template>

<script>
import child33 from '../../components/child33'

export default {
  name : 'page3_3',
  components : {
    child33
  },
  methods : {
    fatherMethod() {
      this.$Message.warning('方式三触发：父组件函数通过 props 传入')
    }
  }
}
</script>

<style scoped>

</style>
