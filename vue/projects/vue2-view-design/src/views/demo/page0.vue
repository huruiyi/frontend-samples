<template>
    <Card v-if="!isEditMode">

        <p slot="title">
            <Icon type="ios-cube-outline"/>
            集合循环和自定义组件
        </p>

        <Lists></Lists>

        <HelloWorld msg="Welcome to Your Vue.js App"/>
    </Card>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import Lists from '@/components/Lists.vue'

export default {
  name: 'page0',
  components: {
    Lists,
    HelloWorld
  },
  data: function () {
    return {
      isEditMode: false
    }
  }
}
</script>

<style scoped>

</style>
