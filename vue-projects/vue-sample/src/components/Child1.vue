<template>
  <div class="child-div">
    <h3>子组件1</h3>
    <p>我是子组件:曹丕</p>
    <p>{{ props.info }}</p>
    <p>{{ props.money }}</p>
  </div>

</template>

<script setup>

let props = defineProps(['info', 'money']); //数组|对象写法都可以

const hello = (userName) => {
  alert("你好:" + userName);
}
defineExpose({
  hello
})
</script>