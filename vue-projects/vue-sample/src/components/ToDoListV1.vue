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

<style scoped>
.todo-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.todo-panel__header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-start;
}

.todo-panel__eyebrow {
  color: var(--color-accent);
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
  background: rgba(15, 140, 121, 0.12);
  color: var(--color-accent-strong);
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
  background: rgba(244, 236, 227, 0.68);
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
