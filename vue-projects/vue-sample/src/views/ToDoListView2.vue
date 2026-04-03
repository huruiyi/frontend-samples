<script setup>
import ToDoListV1 from '../components/ToDoListV1.vue'
import ToDoListV2 from '../components/ToDoListV2.vue'
import '../assets/ToDoList.css'

const sections = [
  {
    title: '复用同一组件结构',
    description: '这里切换的是 view 标识，用来观察同一组件在不同页面上下文中的表现。',
    items: [
      { component: ToDoListV1, props: { view: 'todo-v2' }, tag: 'V1 默认' },
      { component: ToDoListV1, props: { view: 'todo-v2', a: 'v1-a', b: 'v1-b' }, tag: 'V1 自定义' }
    ]
  },
  {
    title: 'script setup 对照组',
    description: '第二组保持相同输入，只替换组件写法，便于对比模板与状态暴露方式。',
    items: [
      { component: ToDoListV2, props: { view: 'todo-v2' }, tag: 'V2 默认' },
      { component: ToDoListV2, props: { view: 'todo-v2', a: 'v2-a', b: 'v2-b' }, tag: 'V2 自定义' }
    ]
  }
]
</script>

<template>
  <section class="todo-showcase">
    <header class="todo-showcase__hero todo-showcase__hero--compact">
      <p class="todo-showcase__eyebrow">Todo Demo V2</p>
      <h1>同样的待办示例，换一个展示语境继续比较</h1>
      <p>这个页面保留原有示例意图，但把排版改成了更稳定的响应式网格，方便连续浏览多个版本。</p>
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
