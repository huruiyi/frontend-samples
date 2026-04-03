<template>
  <div class="child-div">
    <h3>成员信息卡片</h3>
    <p>我是子组件：成员资料区</p>
    <p>{{ props.info }}</p>
    <p>{{ props.money }}</p>
  </div>

</template>

<script setup>

let props = defineProps(['info', 'money']); //数组|对象写法都可以

const hello = (userName) => {
  alert("已向 " + userName + " 发送一条站内提醒。");
}
defineExpose({
  hello
})
</script>