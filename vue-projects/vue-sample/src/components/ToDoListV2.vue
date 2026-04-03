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

<style scoped>
.todo-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.todo-panel--alt .todo-panel__count {
  background: rgba(212, 106, 61, 0.12);
  color: var(--color-accent);
}

.todo-panel__header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-start;
}

.todo-panel__eyebrow {
  color: var(--color-accent-strong);
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.todo-panel__header h3 {
  margin-top: 4px;
  font-size: 1.2rem;
}

.todo-panel__count {
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 700;
}

.todo-panel__list {
  padding: 0;
  list-style: none;
}

.todo-panel__item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.68);
}

.todo-panel__item + .todo-panel__item {
  margin-top: 10px;
}

.todo-panel__meta {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.todo-panel__meta div {
  padding: 12px;
  border-radius: 16px;
  background: rgba(236, 244, 241, 0.78);
}

.todo-panel__meta span {
  display: block;
  margin-bottom: 4px;
  color: var(--color-text-soft);
  font-size: 0.8rem;
}

@media (max-width: 768px) {
  .todo-panel__meta {
    grid-template-columns: 1fr;
  }
}
</style>
