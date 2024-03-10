<template>
  <div class="component">
    <div>
      <div class="test-section">
        <to-do-list-v1 view="todo-v2"/>
      </div>
      <div class="test-section">
        <to-do-list-v1 view="todo-v2" a="v1-a" b="v1-b"/>
      </div>
    </div>
    <div>
      <div class="test-section">
        <to-do-list-v2 view="todo-v2"/>
      </div>
      <div class="test-section">
        <to-do-list-v2 view="todo-v2" a="v2-a" b="v2-b"/>
      </div>
    </div>
  </div>
</template>


<script setup>
import ToDoListV1 from "../components/ToDoListV1.vue";
import ToDoListV2 from "../components/ToDoListV2.vue";
</script>

<style scoped>
div.component div.test-section {
  display: inline-block;
  width: 200px;
  margin-top: 20px;
  margin-right: 20px;
  background-color: aliceblue
}
</style>
