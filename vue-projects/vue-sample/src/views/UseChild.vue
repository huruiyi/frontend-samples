<script setup>
import Child1 from "@/components/Child1.vue";
import {ref} from "vue";
import Child2 from "@/components/Child2.vue";

const child1Ref = ref(null);

const sayHello = () => {
  child1Ref.value.hello("大爷")
}

const getUserList = () => {
  alert("列表刷新了！！")
}
</script>

<template>
  <div>
    <Child1 ref="child1Ref"/>
    <Child2 @refresh="getUserList"/>
    <button @click="sayHello">父组件</button>
  </div>

</template>

<style scoped>

</style>