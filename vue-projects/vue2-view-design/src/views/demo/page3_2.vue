<template>
  <div>
    <child32 @fatherMethodx="fatherMethod"></child32>
  </div>
</template>

<script>
import child32 from '../../components/child32'

export default {
  name : 'page3_2',
  components : {
    child32
  },
  methods : {
    fatherMethod() {
      this.$Message.success('方式二触发：子组件 emit 通知父组件')
    }
  }
}
</script>

<style scoped>

</style>
