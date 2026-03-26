<template>
  <div class="hello">
    <h1 class="hello-title">{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name : 'HelloWorld',
  props : {
    msg : String
  }
}
</script>

<style scoped>
.hello {
  margin-top: 4px;
}

.hello-title {
  margin: 0;
  color: #111827;
  font-size: 28px;
  font-weight: 700;
  line-height: 1.2;
}
</style>
