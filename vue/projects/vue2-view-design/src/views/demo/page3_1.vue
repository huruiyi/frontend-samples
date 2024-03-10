<template>
    <div>
        <child31></child31>
    </div>
</template>

<script>
import child31 from '../../components/child31'

export default {
  name: 'page3_1',
  components: { child31 },
  methods: {
    fatherMethod () {
      alert("page3_1.fatherMethod()")
    }
  }
}
</script>

<style scoped>

</style>
