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
  <div>
    {{ view }}-代办2
    <ul>
      <li v-for="item in todoList">
        <input type="checkbox" v-bind:checked="item.isCheck"/>
        {{ item.todo }}
      </li>
    </ul>
    <p>
      <button @click="setAb">reactive</button>
    </p>
    <div>
      defineProps:
      <p>{{ a }},{{ b }}</p>
    </div>
    <div>
      reactive:
      <p>{{ ra }},{{ rb }}</p>
    </div>
  </div>
</template>

<style scoped>
li {
  list-style: none;
}

button {
  background: darkgreen;
  color: blanchedalmond;
}
</style>
