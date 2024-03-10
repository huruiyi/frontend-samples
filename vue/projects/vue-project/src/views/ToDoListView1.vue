<template>
  <div class="component">
    <div>
      <div class="test-section">
        <to-do-list-v1 view="todo-v1"/>
      </div>
      <div class="test-section">
        <to-do-list-v1 view="todo-v1" a="v1-a" b="v1-b"/>
      </div>
    </div>
    <div>
      <div class="test-section">
        <to-do-list-v2 view="todo-v1"/>
      </div>
      <div class="test-section">
        <to-do-list-v2 view="todo-v1" a="v2-a" b="v2-b"/>
      </div>
    </div>
  </div>
</template>

<script>
import toDoListV1 from "../components/ToDoListV1.vue";
import toDoListV2 from "../components/ToDoListV2.vue";
import '../assets/ToDoList.css'

export default {
  name: "ToDoListView1",
  components: {
    toDoListV1,
    toDoListV2
  }
}
</script>
