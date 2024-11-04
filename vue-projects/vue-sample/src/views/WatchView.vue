<template>
  <div>
    <p>
      <input type="text" v-model="nums">
    </p>
    <p>
      <input type="text" v-model="demo.name">
    </p>
    <p>
      <input type="text" v-model="demo.soulmate.nickName">
    </p>
  </div>
</template>

<script setup>
import {reactive, ref, watch} from "vue";

const nums = ref(9)

const demo = reactive({
  name: 'huruiyi',
  nickName: 'ruiyi',
  soulmate: {
    name: '',
    nickName: 'laoer'
  }
})

watch(nums, (newValue, oldValue) => {
  console.log('watch 已触发', newValue)
})

//听整个对象
watch(demo, (newValue, oldValue) => {
  console.log('1：watch 已触发', newValue)
})


// 监听demo对象的name属性
watch(() => demo.name, (newValue, oldValue) => {
  console.log('2：watch 已触发', newValue)
})

//只监听对象的子属性
watch(() => ({...demo}), (newValue, oldValue) => {
  console.log('3：watch 已触发', newValue)
})

//监听对象的所有属性
watch(() => demo, (newValue, oldValue) => {
  console.log('4：watch 已触发', newValue)
}, { deep: true })

//组合监听
watch([() => demo.name, nums], ([newName, newNums], [oldName, oldNums]) => {
  console.log('watch 已触发: name', newName)
  console.log('watch 已触发: nums', newNums)
})

</script>

<style scoped>

</style>
