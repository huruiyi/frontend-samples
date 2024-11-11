<template>
  <div>
    <h1>子组件6</h1>
    <div title="Title" :visible="visible" :confirm-loading="confirmLoading" @ok="handleOk">
      <p>{{ modalText }}</p>
    </div>
  </div>
</template>

<script>
import {ref, defineComponent} from "vue";

export default defineComponent({
  setup() {
    const modalText = ref('Content of the modal');
    const visible = ref(false);
    const confirmLoading = ref(false);

    const childFun = () => {
      visible.value = true;
    };

    const handleOk = () => {
      modalText.value = 'The modal will be closed after two seconds';
      confirmLoading.value = true;
      setTimeout(() => {
        visible.value = false;
        confirmLoading.value = false;
      }, 2000);
    };

    return {
      modalText,
      visible,
      confirmLoading,
      childFun,
      handleOk,
    };
  }
})
</script>