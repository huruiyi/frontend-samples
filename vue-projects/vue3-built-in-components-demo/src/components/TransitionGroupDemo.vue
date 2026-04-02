<template>
  <div class="demo-container">
    <a-card title="TransitionGroup 组件 Demo" :bordered="false">
      <a-space direction="vertical" :size="20" style="width: 100%">
        <a-alert message="TransitionGroup 用于给多个元素/组件添加过渡动画，支持列表的添加、删除和移动" type="info" />

        <div class="demo-section">
          <h3>列表动画 - 添加/删除/打乱</h3>
          <a-space>
            <a-button type="primary" @click="addItem">添加项目</a-button>
            <a-button type="default" @click="removeItem">删除项目</a-button>
            <a-button type="dashed" @click="shuffleItems">打乱顺序</a-button>
          </a-space>

          <transition-group name="list" tag="div" class="list-container">
            <div v-for="item in items" :key="item.id" class="list-item">
              <a-tag color="blue">{{ item.text }}</a-tag>
            </div>
          </transition-group>
        </div>

        <div class="demo-section">
          <h3>交错动画列表</h3>
          <a-button type="primary" @click="resetStaggerList">重置列表</a-button>
          <transition-group
            name="stagger"
            tag="div"
            class="stagger-container"
            @before-enter="beforeEnter"
            @enter="enter"
          >
            <div
              v-for="(item, index) in staggerList"
              :key="item"
              :data-index="index"
              class="stagger-item"
            >
              {{ item }}
            </div>
          </transition-group>
        </div>
      </a-space>
    </a-card>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

// 列表动画
let nextId = 1
const items = ref([
  { id: nextId++, text: '项目 1' },
  { id: nextId++, text: '项目 2' },
  { id: nextId++, text: '项目 3' }
])

const addItem = () => {
  items.value.push({ id: nextId++, text: `项目 ${nextId - 1}` })
}

const removeItem = () => {
  if (items.value.length > 0) {
    const randomIndex = Math.floor(Math.random() * items.value.length)
    items.value.splice(randomIndex, 1)
  }
}

const shuffleItems = () => {
  const array = [...items.value]
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  items.value = array
}

// 交错动画
const staggerList = ref([])

const resetStaggerList = () => {
  staggerList.value = []
  nextTick(() => {
    staggerList.value = ['A', 'B', 'C', 'D', 'E']
  })
}

const beforeEnter = (el) => {
  el.style.opacity = 0
  el.style.transform = 'translateY(20px)'
}

const enter = (el, done) => {
  const delay = el.dataset.index * 150
  setTimeout(() => {
    el.style.transition = 'all 0.5s ease'
    el.style.opacity = 1
    el.style.transform = 'translateY(0)'
    done()
  }, delay)
}

resetStaggerList()
</script>

<style scoped>
.demo-container {
  margin-bottom: 24px;
}

.demo-section {
  padding: 16px;
  background: #f5f5f5;
  border-radius: 4px;
}

.demo-section h3 {
  margin-bottom: 12px;
  color: #1890ff;
}

.list-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
  min-height: 40px;
}

.list-item {
  display: inline-block;
}

/* 列表动画 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-move {
  transition: transform 0.5s ease;
}

/* 交错动画 */
.stagger-container {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

.stagger-item {
  padding: 16px 24px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  border-radius: 8px;
  font-weight: bold;
  font-size: 18px;
}

.stagger-enter-active {
  transition: all 0.5s ease;
}

.stagger-leave-active {
  transition: all 0.3s ease;
}

.stagger-enter-from,
.stagger-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
