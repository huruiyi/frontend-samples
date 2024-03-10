<template>
    <child33 :fatherMethod="fatherMethod"></child33>
</template>

<script>
import child33 from '../../components/child33'

export default {
  name: 'page3_3',
  components: {
    child33
  },
  methods: {
    fatherMethod () {
      console.log('测试3-3')
    }
  }
}
</script>

<style scoped>

</style>
