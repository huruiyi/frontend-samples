<template>
  <Card v-if="!isEditMode">

    <p slot="title">
      <Icon type="ios-cube-outline" />
      集合循环和自定义组件
    </p>

    <Lists></Lists>

    <HelloWorld p-msg="haha" msg="Welcome to Your Vue.js App" />

    <say-hello :who="who"></say-hello>
    <h2>{{ page0P1 }}</h2>
  </Card>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import Lists from '@/components/Lists.vue'
import SayHello from "@/components/SayHello.vue";

export default {
  name : 'page0',
  props : {
    page0P1 : String
  },
  components : {
    Lists,
    HelloWorld,
    SayHello
  },
  data : function () {
    return {
      who : 'vue:say-hello',
      isEditMode : false
    }
  }
}
</script>

<style scoped>

</style>
