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
  <div>
    {{ view }}-代办1
    <ul>
      <li v-for="item in todoList">
        <input type="checkbox" v-bind:checked="item.isCheck"/>
        {{ item.todo }}
      </li>
    </ul>
    <button @click="setAb">reactive</button>
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
