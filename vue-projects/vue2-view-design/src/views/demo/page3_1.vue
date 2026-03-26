<template>
  <div>
    <child31></child31>
  </div>
</template>

<script>
import child31 from '../../components/child31'

export default {
  name : 'page3_1',
  components : { child31 },
  methods : {
    fatherMethod() {
      this.$Message.info('方式一触发：$parent 调用父组件方法')
    }
  }
}
</script>

<style scoped>

</style>
