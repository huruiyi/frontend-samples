<script setup>
import ToDoListV1 from '../components/ToDoListV1.vue'
import ToDoListV2 from '../components/ToDoListV2.vue'
import '../assets/ToDoList.css'

const sections = [
  {
    title: 'Options API 版本',
    description: '保留原有 props 与 reactive 示例，用更适合阅读的卡片容器展示。',
    items: [
      { component: ToDoListV1, props: { view: 'todo-v1' }, tag: '默认参数' },
      { component: ToDoListV1, props: { view: 'todo-v1', a: 'v1-a', b: 'v1-b' }, tag: '自定义参数' }
    ]
  },
  {
    title: 'script setup 版本',
    description: '同样的待办功能，展示组合式写法下的 props 与状态结构。',
    items: [
      { component: ToDoListV2, props: { view: 'todo-v1' }, tag: '默认参数' },
      { component: ToDoListV2, props: { view: 'todo-v1', a: 'v2-a', b: 'v2-b' }, tag: '自定义参数' }
    ]
  }
]
</script>

<template>
  <section class="todo-showcase">
    <header class="todo-showcase__hero">
      <p class="todo-showcase__eyebrow">Todo Demo V1</p>
      <h1>把相同逻辑拆成更容易横向比较的展示面板</h1>
      <p>
        这里重点看两种组件写法在 props 默认值、reactive 状态和模板结构上的差异，视觉层统一后更适合对照学习。
      </p>
    </header>

    <section v-for="section in sections" :key="section.title" class="todo-showcase__section">
      <div class="todo-showcase__section-head">
        <div>
          <h2>{{ section.title }}</h2>
          <p>{{ section.description }}</p>
        </div>
      </div>

      <div class="todo-showcase__grid">
        <article v-for="item in section.items" :key="item.tag" class="todo-showcase__card">
          <span class="todo-showcase__tag">{{ item.tag }}</span>
          <component :is="item.component" v-bind="item.props" />
        </article>
      </div>
    </section>
  </section>
</template>
