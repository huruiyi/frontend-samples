<template>
  <div class="box">
    <h1>你好， {{ you }}！</h1>
    <input type="text" v-model="you" />
  </div>
</template>

<script>
const SayHello = {
  name : 'SayHello',
  props : [ 'who' ],
  data : function () {
    return {
      you : this.who
    }
  }
};
export default SayHello;
</script>

<style scoped>
.box {
  width: 400px;
  height: 300px;
  border-radius: 14px;
  padding: 14px;
  color: black;
  background: floralwhite;
}
</style>
