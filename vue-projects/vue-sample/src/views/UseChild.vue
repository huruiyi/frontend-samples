<script setup>
import Child1 from "@/components/Child1.vue";
import {ref} from "vue";
import Child2 from "@/components/Child2.vue";
import Child3 from "@/components/Child3.vue";
import Child4 from "@/components/Child4.vue";

const child1Ref = ref(null);
const child4Ref = ref(null);



const child1Do = () => {
  child1Ref.value.hello("大爷")
}
const child4Do = () => {
  child4Ref.value.doSth({
    id: 1,
    age: 20,
    name: '刘备'
  })
  child4Ref.value.message =false
  child4Ref.value.age = 30
}

const getUserList = () => {
  alert("列表刷新了！！")
}

const parentDo1 = (data) => {
  alert(JSON.stringify(data))
}

const parentDo2 = (data) => {
  alert(data)
}
</script>

<template>
  <div>
    <Child1 ref="child1Ref"/>
    <button @click="child1Do">父组件调用child1-子组件</button>

    <Child2 @refresh="getUserList"/>

    <Child3 f-data="hello" f-message="world"/>

    <Child4 ref="child4Ref" @parent-mut="parentDo1" @response-single="parentDo2"/>
    <button @click="child4Do">父组件调用child4-子组件</button>
  </div>

</template>

<style scoped>

</style>