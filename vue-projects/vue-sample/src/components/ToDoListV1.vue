<script>
import {reactive, toRefs} from "vue";

export default {
  name: "ToDoListV1",
  props: {
    view: {
      type: String,
      default: ""
    },
    a: {
      type: String,
      default: "你好"
    },
    b: {
      type: String,
      default: "中国"
    },
  },
  setup(props, context) {

    const state = reactive({
      ra: "你好",
      rb: "中国",
    })

    let todoList = [
      {todo: "吃饭", isCheck: false},
      {todo: "睡觉", isCheck: true},
    ]

    let {a, b} = toRefs(props)

    console.log("************************************")
    console.log(a.value)
    console.log(b.value)
    console.log("************************************")

    const setAb = () => {
      state.ra = "Hello"
      state.rb = "World"
    }
    return {
      ...toRefs(state),
      todoList,
      setAb,
      a,
      b
    }
  }
}
</script>

<template>
  <div class="todo-panel">
    <div class="todo-panel__header">
      <div>
        <p class="todo-panel__eyebrow">{{ view }}</p>
        <h3>代办示例 1</h3>
      </div>
      <span class="todo-panel__count">{{ todoList.length }} 项</span>
    </div>

    <ul class="todo-panel__list">
      <li v-for="item in todoList" :key="item.todo" class="todo-panel__item">
        <input type="checkbox" v-bind:checked="item.isCheck"/>
        <span>{{ item.todo }}</span>
      </li>
    </ul>

    <button @click="setAb">更新 reactive</button>

    <div class="todo-panel__meta">
      <div>
        <span>defineProps</span>
        <p>{{ a }}, {{ b }}</p>
      </div>
      <div>
        <span>reactive</span>
        <p>{{ ra }}, {{ rb }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped src="../assets/components/ToDoListV1.css"></style>
