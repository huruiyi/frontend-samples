<script setup>
import BaseCard from '../components/slots/BaseCard.vue'
import ToolbarLayout from '../components/slots/ToolbarLayout.vue'
import ScopedList from '../components/slots/ScopedList.vue'
import DynamicSlots from '../components/slots/DynamicSlots.vue'
import ConditionalShell from '../components/slots/ConditionalShell.vue'
import ForwardingList from '../components/slots/ForwardingList.vue'

const tagItems = [
  { id: 1, label: '默认插槽' },
  { id: 2, label: '具名插槽' },
  { id: 3, label: '作用域插槽' },
]

const productCards = [
  { id: 101, name: 'Vue 组件库' },
  { id: 102, name: '管理后台模板' },
  { id: 103, name: '移动端壳应用' },
]

const sections = [
  { key: 'intro', title: '介绍' },
  { key: 'usage', title: '用法' },
  { key: 'tips', title: '注意事项' },
]
</script>

<template>
  <div class="view-stack">
    <section class="demo-block">
      <h2>1) 默认插槽 + 具名插槽 + 回退内容</h2>
      <BaseCard>
        <template #header>
          <strong>自定义头部：插槽学习卡片</strong>
        </template>

        <p>这里是默认插槽内容，适合承载主体内容。</p>

        <template #footer>
          <small>自定义底部：最后更新于 2026-03-24</small>
        </template>
      </BaseCard>
    </section>

    <section class="demo-block">
      <h2>2) 具名插槽布局（左右操作区 + 中间内容）</h2>
      <ToolbarLayout>
        <template #left>
          <button type="button">返回</button>
        </template>

        页面标题

        <template #right>
          <button type="button">保存</button>
        </template>
      </ToolbarLayout>
    </section>

    <section class="demo-block">
      <h2>3) 作用域插槽（子传父）</h2>
      <ScopedList :items="tagItems">
        <template #item="{ item, index, isLast }">
          <span>
            {{ index + 1 }} / {{ item.label }}
            <em v-if="isLast">（最后一项）</em>
          </span>
        </template>
      </ScopedList>
    </section>

    <section class="demo-block">
      <h2>4) 动态插槽名（按业务 key 输出）</h2>
      <DynamicSlots :sections="sections">
        <template #section-intro="{ section }">
          <p>{{ section.title }}：动态插槽适合配置化页面。</p>
        </template>

        <template #section-usage>
          <p>用法：通过 <code>v-slot:[name]</code> 精准填充区域。</p>
        </template>
      </DynamicSlots>
    </section>

    <section class="demo-block">
      <h2>5) 条件插槽（有插槽才渲染区域）</h2>
      <ConditionalShell>
        <p>这是主体内容；下方 actions 区域只有在你提供时才会显示。</p>

        <template #actions>
          <button type="button">取消</button>
          <button type="button">确认</button>
        </template>
      </ConditionalShell>
    </section>

    <section class="demo-block">
      <h2>6) 插槽转发（中间层组件继续透传）</h2>
      <ForwardingList :rows="productCards">
        <template #row="{ item, index }">
          <strong>#{{ index + 1 }}</strong>
          <span> {{ item.name }} </span>
        </template>
      </ForwardingList>
    </section>

    <section class="demo-block">
      <h2>7) empty 插槽（空数据占位）</h2>
      <ScopedList :items="[]">
        <template #empty>
          <p class="empty-tip">当前暂无数据，点击“刷新”后重试。</p>
        </template>
      </ScopedList>
    </section>
  </div>
</template>

<style scoped>
.view-stack {
  display: grid;
  gap: 14px;
}
</style>