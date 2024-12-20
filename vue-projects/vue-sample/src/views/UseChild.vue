<script setup>
import '../assets/child.css'

import {provide, ref} from "vue";
import Child1 from "@/components/Child1.vue";
import Child2 from "@/components/Child2.vue";
import Child3 from "@/components/Child3.vue";
import Child4 from "@/components/Child4.vue";
import Child5 from "@/components/Child5.vue";
import Child0 from "@/components/Child0.vue";

const child0Ref = ref(null);
const child1Ref = ref(null);
const child4Ref = ref(null);
const child5Ref = ref(null);

const PROVIDE_NAME = 'child5'

provide(PROVIDE_NAME, child5Ref);
provide(`${PROVIDE_NAME}/func`, func);

const childAdd = () => {
  console.log('Current count:', child0Ref.value.count);
  child0Ref.value.childEvent();
}

const child1Do = () => {
  child1Ref.value.hello("大爷")
}

const child4Do = () => {
  child4Ref.value.doSth({
    id: 1,
    age: 20,
    name: '刘备'
  })
  child4Ref.value.message = !child4Ref.value.message
  child4Ref.value.age = 30
}

const getUserList = () => {
  alert("列表刷新了！！")
}

const parentDo1 = (data) => {
  alert(JSON.stringify(data))
}

const parentDo2 = (data1, data2) => {
  alert(data1 + " " + data2)
}

function func() {
  alert("func..")
}
</script>

<template>
  <div>
    <Child0 ref="child0Ref"/>
    <button class="s-button" @click="childAdd">父组件调用child0-子组件</button>

    <Child1 ref="child1Ref" info="曹操" money="666"/>
    <button class="s-button" @click="child1Do">父组件调用child1-子组件</button>

    <Child2 @refresh="getUserList"/>

    <Child3 f-data="hello" f-message="world"/>

    <Child4 ref="child4Ref" @parent-mut="parentDo1" @response-single="parentDo2"/>
    <button class="s-button" @click="child4Do">父组件调用child4-子组件</button>

    <Child5 ref="child5Ref"/>
  </div>

</template>