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

<style scoped src="../assets/views/DebouncedView.css"></style>
