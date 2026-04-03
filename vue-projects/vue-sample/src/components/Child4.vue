<template>
  <div class="child-div">
    <h3>审批结果面板</h3>
    <p>点击按钮后，子组件会先把审批结果上报给父组件。</p>
    <button class="s-button" @click="parentChange">提交审批结论</button>
    <p>当前回填状态：</p>
    <p>是否通过：{{ message ? '已通过' : '待确认' }}</p>
    <p>审批层级：{{ age === 0 ? '未同步' : `第 ${age} 级审批` }}</p>
  </div>
</template>

<script setup>
import {ref} from "vue";
///////////////////////////////////////////////////////////////////////////////////
const message = ref(false);
const age = ref(0);

const doSth = (param) => {
  alert('子组件收到父组件下发的审批单：' + JSON.stringify(param))
}
//暴露子组件方法、属性
defineExpose({
  doSth,
  message,
  age
})
///////////////////////////////////////////////////////////////////////////////////
//以下是触发父组件的方法
const emit = defineEmits(['responseSingle', 'parentMut'])
const parentChange = () => {
  emit('responseSingle', '审批通过', '已进入复核阶段');
  emit('parentMut', {
    orderNo: 'A-1024',
    reviewer: '曹操',
    result: '通过'
  })
}
///////////////////////////////////////////////////////////////////////////////////

</script>