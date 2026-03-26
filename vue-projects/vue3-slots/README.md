# Vue Slot 示例（Vite + Vue 3）

这是一个专门演示 Vue `slot` 的项目，覆盖常见到进阶的插槽场景。

## 运行方式

```bash
npm install
npm run dev
```

开发环境启动后，页面包含两个 tab：

- `/custom`：非官方整理示例
- `/official`：官方文档实例复现

生产构建：

```bash
npm run build
```

## 已覆盖场景

- 默认插槽（default）
- 具名插槽（named）
- 回退内容（fallback）
- 作用域插槽（scoped slot）
- 动态插槽名（dynamic slot name）
- 条件插槽渲染（检测插槽是否存在）
- 插槽转发（中间层透传 slot）
- 空数据占位插槽（empty）

## Slot 用法速查表（最小片段）

### 1) 默认插槽

```vue
<!-- 子组件 -->
<slot>默认内容</slot>

<!-- 父组件 -->
<Child>
	<p>自定义内容</p>
</Child>
```

### 2) 具名插槽

```vue
<!-- 子组件 -->
<slot name="header" />
<slot />
<slot name="footer" />

<!-- 父组件 -->
<Child>
	<template #header>头部</template>
	主体
	<template #footer>底部</template>
</Child>
```

### 3) 作用域插槽（子传父）

```vue
<!-- 子组件 -->
<slot name="item" :item="item" :index="index" />

<!-- 父组件 -->
<Child>
	<template #item="{ item, index }">
		{{ index + 1 }} - {{ item.name }}
	</template>
</Child>
```

### 4) 动态插槽名

```vue
<!-- 子组件 -->
<slot :name="`section-${key}`" />

<!-- 父组件 -->
<Child>
	<template #section-intro>介绍内容</template>
</Child>
```

### 5) 条件渲染插槽区域

```vue
<script setup>
import { useSlots, computed } from 'vue'
const slots = useSlots()
const hasActions = computed(() => Boolean(slots.actions))
</script>

<template>
	<slot />
	<div v-if="hasActions">
		<slot name="actions" />
	</div>
</template>
```

### 6) 插槽回退内容

```vue
<slot name="footer">
	<small>默认底部</small>
</slot>
```

### 7) 插槽转发

```vue
<!-- 中间层组件 -->
<Inner>
	<template #row="slotProps">
		<slot name="row" v-bind="slotProps" />
	</template>
</Inner>
```

### 8) empty 插槽

```vue
<!-- 子组件 -->
<slot v-if="list.length" name="item" :item="list[0]" />
<slot v-else name="empty">暂无数据</slot>
```

## 示例文件对应关系

- 页面入口：`src/App.vue`
- 路由配置：`src/router/index.js`
- 非官方示例页：`src/views/NonOfficialExamplesView.vue`
- 官方示例页：`src/views/OfficialExamplesView.vue`
- 默认/具名/回退：`src/components/slots/BaseCard.vue`
- 具名布局：`src/components/slots/ToolbarLayout.vue`
- 作用域 + empty：`src/components/slots/ScopedList.vue`
- 动态插槽名：`src/components/slots/DynamicSlots.vue`
- 条件插槽：`src/components/slots/ConditionalShell.vue`
- 插槽转发：`src/components/slots/ForwardingList.vue`

## 官方文档实例复现

以下组件为 `https://cn.vuejs.org/guide/components/slots` 里的示例复现版：

- `FancyButton`：`src/components/official/FancyButton.vue`
- `SubmitButton`：`src/components/official/SubmitButton.vue`
- `BaseLayout`：`src/components/official/BaseLayout.vue`
- 条件插槽卡片：`src/components/official/CardConditionalSlots.vue`
- `FancyList`：`src/components/official/FancyList.vue`
- 动态插槽名：`src/components/official/DynamicSlotNamesBox.vue`
- 无渲染组件 `MouseTracker`：`src/components/official/MouseTracker.vue`
