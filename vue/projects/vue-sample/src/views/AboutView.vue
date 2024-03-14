<script setup>
import HelloWorld from "../components/HelloWorld.vue";
</script>

<template>
  <div>
    <div class="about">
      <h1>This is an about page</h1>
    </div>
    <HelloWorld msg="哈哈哈"></HelloWorld>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 10vh;
    display: flex;
    align-items: center;
  }
}
</style>
