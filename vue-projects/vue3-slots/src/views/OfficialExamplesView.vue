<script setup>
import { ref } from 'vue'
import FancyButton from '../components/official/FancyButton.vue'
import SubmitButton from '../components/official/SubmitButton.vue'
import BaseLayout from '../components/official/BaseLayout.vue'
import CardConditionalSlots from '../components/official/CardConditionalSlots.vue'
import FancyList from '../components/official/FancyList.vue'
import DynamicSlotNamesBox from '../components/official/DynamicSlotNamesBox.vue'
import MouseTracker from '../components/official/MouseTracker.vue'

const fancyItems = [
  { id: 1, body: 'Vue slot 很灵活', username: 'alice', likes: 12 },
  { id: 2, body: '作用域插槽适合列表渲染', username: 'bob', likes: 35 },
]

const dynamicSlotName = ref('header')

const toggleDynamicSlot = () => {
  dynamicSlotName.value = dynamicSlotName.value === 'header' ? 'footer' : 'header'
}
</script>

<template>
  <section class="demo-block official-block">
    <h2>官方文档实例复现（来自 cn.vuejs.org/guide/components/slots）</h2>

    <div class="official-item">
      <h3>1) FancyButton（插槽内容与出口）</h3>
      <FancyButton>
        Click me!
      </FancyButton>
    </div>

    <div class="official-item">
      <h3>2) SubmitButton（默认内容 / fallback）</h3>
      <div class="row-gap">
        <SubmitButton />
        <SubmitButton>Save</SubmitButton>
      </div>
    </div>

    <div class="official-item">
      <h3>3) BaseLayout（具名插槽）</h3>
      <BaseLayout>
        <template #header>
          <h4>Here might be a page title</h4>
        </template>

        <p>A paragraph for the main content.</p>
        <p>And another one.</p>

        <template #footer>
          <p>Here's some contact info</p>
        </template>
      </BaseLayout>
    </div>

    <div class="official-item">
      <h3>4) Card（条件插槽）</h3>
      <CardConditionalSlots>
        <template #header>条件 header</template>
        只有提供插槽时才会渲染对应包裹层。
        <template #footer>条件 footer</template>
      </CardConditionalSlots>
    </div>

    <div class="official-item">
      <h3>5) 动态插槽名（v-slot:[dynamicSlotName]）</h3>
      <button type="button" @click="toggleDynamicSlot">
        当前目标：{{ dynamicSlotName }}（点击切换）
      </button>
      <DynamicSlotNamesBox>
        <template #[dynamicSlotName]>
          这是通过 <code>#[dynamicSlotName]</code> 动态注入的内容
        </template>
      </DynamicSlotNamesBox>
    </div>

    <div class="official-item">
      <h3>6) FancyList（高级列表作用域插槽）</h3>
      <FancyList :items="fancyItems">
        <template #item="{ body, username, likes }">
          <div class="item">
            <p>{{ body }}</p>
            <p>by {{ username }} | {{ likes }} likes</p>
          </div>
        </template>
      </FancyList>
    </div>

    <div class="official-item">
      <h3>7) MouseTracker（无渲染组件）</h3>
      <MouseTracker v-slot="{ x, y }">
        <p>Mouse is at: {{ x }}, {{ y }}</p>
      </MouseTracker>
    </div>
  </section>
</template>

<style scoped>
.official-block {
  gap: 14px;
}

.official-item {
  border: 1px dashed var(--border-color);
  border-radius: 10px;
  padding: 12px;
  display: grid;
  gap: 8px;
}

.official-item h3,
.official-item h4,
.official-item p {
  margin: 0;
}

.row-gap {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
</style>