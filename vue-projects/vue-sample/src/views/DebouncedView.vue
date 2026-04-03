<script setup>
import { useDebouncedRef } from '@/utils/debouncedRef'
import { UserOutlined, InfoCircleOutlined } from '@ant-design/icons-vue'
import MyComponentV1 from "@/components/MyComponentV1.vue";
import MyComponentV2 from "@/components/MyComponentV2.vue";
import MyComponentV3 from "@/components/MyComponentV3.vue";

const text = useDebouncedRef('hello', 1000)
</script>

<template>
  <section class="debounce-page">
    <header class="debounce-page__hero">
      <div>
        <p class="debounce-page__eyebrow">Debounced Input</p>
        <h1>模拟搜索框在停顿 1 秒后再同步结果</h1>
        <p class="debounce-page__intro">
          这个页面把“输入即搜索”的场景拆成三个输入形态，便于对比原生控件和 Ant Design Vue 组件在防抖交互下的使用方式。
        </p>
      </div>

      <div class="debounce-page__preview">
        <span>当前检索词</span>
        <strong>{{ text }}</strong>
        <p>只有输入停止 1000ms 后，这里的结果预览才会更新，适合搜索建议或远程请求前的节流场景。</p>
      </div>
    </header>

    <section class="debounce-page__panel">
      <div class="debounce-page__panel-head">
        <h2>搜索输入演示</h2>
        <span>延迟 1000ms</span>
      </div>

      <div class="debounce-page__inputs">
        <label class="debounce-page__field">
          <span>基础关键字输入</span>
          <small>适合最简单的关键字录入。</small>
          <input v-model="text" />
        </label>

        <label class="debounce-page__field">
          <span>统一风格输入框</span>
          <small>适合接入 UI 组件库后的标准表单场景。</small>
          <a-input v-model:value="text" />
        </label>

        <label class="debounce-page__field">
          <span>搜索栏样式输入框</span>
          <small>更贴近真实搜索框，包含用户图标和辅助提示。</small>
          <a-input v-model:value="text" placeholder="Basic usage">
            <template #prefix>
              <user-outlined />
            </template>
            <template #suffix>
              <a-tooltip title="Extra information">
                <info-circle-outlined style="color: rgba(0, 0, 0, 0.45)" />
              </a-tooltip>
            </template>
          </a-input>
        </label>
      </div>
    </section>

    <section class="debounce-page__panel">
      <div class="debounce-page__panel-head">
        <h2>图标接入方式</h2>
        <span>3 种写法</span>
      </div>

      <div class="debounce-page__component-grid">
        <div class="debounce-page__component-card"><my-component-v1/></div>
        <div class="debounce-page__component-card"><my-component-v2/></div>
        <div class="debounce-page__component-card"><my-component-v3/></div>
      </div>
    </section>
  </section>
</template>

<style scoped>
.debounce-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.debounce-page__hero,
.debounce-page__panel {
  padding: 24px;
  border: 1px solid var(--color-border);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.66);
  box-shadow: 0 18px 40px rgba(84, 60, 33, 0.08);
}

.debounce-page__hero {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  background: linear-gradient(135deg, rgba(255, 248, 237, 0.92), rgba(234, 246, 241, 0.9));
}

.debounce-page__eyebrow {
  margin-bottom: 10px;
  color: var(--color-accent);
  font-family: 'Space Grotesk', 'Noto Sans SC', sans-serif;
  font-size: 0.82rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.debounce-page__intro {
  max-width: 56ch;
  color: var(--color-text-soft);
}

.debounce-page__preview {
  min-width: 250px;
  padding: 18px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.78);
}

.debounce-page__preview span {
  display: block;
  margin-bottom: 8px;
  color: var(--color-text-soft);
  font-size: 0.82rem;
}

.debounce-page__preview strong {
  display: block;
  margin-bottom: 8px;
  color: var(--color-heading);
  font-size: 1.6rem;
}

.debounce-page__preview p {
  color: var(--color-text-soft);
}

.debounce-page__panel-head {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}

.debounce-page__panel-head span {
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(15, 140, 121, 0.12);
  color: var(--color-accent-strong);
  font-size: 0.8rem;
}

.debounce-page__inputs,
.debounce-page__component-grid {
  display: grid;
  gap: 16px;
}

.debounce-page__inputs {
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.debounce-page__field {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 18px;
  border-radius: 18px;
  background: rgba(247, 240, 231, 0.6);
}

.debounce-page__field span {
  color: var(--color-heading);
  font-weight: 700;
}

.debounce-page__field small {
  color: var(--color-text-soft);
  line-height: 1.5;
}

.debounce-page__component-grid {
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.debounce-page__component-card {
  padding: 18px;
  border-radius: 18px;
  display: flex;
  min-height: 220px;
  background: rgba(255, 252, 248, 0.88);
  border: 1px solid rgba(121, 92, 61, 0.12);
}

@media (max-width: 768px) {
  .debounce-page__hero {
    flex-direction: column;
  }

  .debounce-page__preview {
    min-width: 0;
  }
}
</style>
