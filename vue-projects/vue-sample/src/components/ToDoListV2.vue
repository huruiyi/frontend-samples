<script setup>
import {reactive, toRefs} from "vue"

let todoList = [
  {todo: "编码", isCheck: false},
  {todo: "发布", isCheck: true},
]

const props = defineProps({
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
})

const state = reactive({
  ra: "你好",
  rb: "中国"
})

const setAb = () => {
  state.ra = "Hello"
  state.rb = "World"
}

const {a, b} = toRefs(props)
const {ra, rb} = toRefs(state)

</script>

<template>
  <div class="todo-panel todo-panel--alt">
    <div class="todo-panel__header">
      <div>
        <p class="todo-panel__eyebrow">{{ view }}</p>
        <h3>代办示例 2</h3>
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

<style scoped src="../assets/components/ToDoListV2.css"></style>
