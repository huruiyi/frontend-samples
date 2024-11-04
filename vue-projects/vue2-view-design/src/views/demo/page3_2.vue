<template>
    <div>
        <child32 @fatherMethodx="fatherMethod"></child32>
    </div>
</template>

<script>
import child32 from '../../components/child32'

export default {
  name: 'page3_2',
  components: {
    child32
  },
  methods: {
    fatherMethod () {
      console.log('测试3-2')
    }
  }
}
</script>

<style scoped>

</style>
