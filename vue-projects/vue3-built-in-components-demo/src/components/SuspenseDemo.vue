<template>
  <div class="demo-container">
    <a-card title="Suspense 组件 Demo" :bordered="false">
      <a-space direction="vertical" :size="20" style="width: 100%">
        <a-alert message="Suspense 用于协调异步依赖的加载，显示加载状态直到所有异步组件准备就绪" type="info" />

        <div class="demo-section">
          <h3>异步组件加载</h3>
          <a-button type="primary" @click="reloadComponent">重新加载</a-button>

          <div class="suspense-container">
            <suspense>
              <template #default>
                <async-component :key="componentKey" />
              </template>
              <template #fallback>
                <div class="loading">
                  <a-spin size="large" />
                  <p>正在加载异步组件...</p>
                </div>
              </template>
            </suspense>
          </div>
        </div>

        <div class="demo-section">
          <h3>多个异步组件</h3>
          <div class="suspense-container">
            <suspense>
              <template #default>
                <div class="multi-async">
                  <async-data :delay="1000" title="数据源 A" color="#1890ff" />
                  <async-data :delay="2000" title="数据源 B" color="#52c41a" />
                  <async-data :delay="1500" title="数据源 C" color="#722ed1" />
                </div>
              </template>
              <template #fallback>
                <div class="loading">
                  <a-spin size="large" />
                  <p>正在加载所有数据源...</p>
                </div>
              </template>
            </suspense>
          </div>
        </div>

        <div class="demo-section">
          <h3>嵌套 Suspense</h3>
          <div class="suspense-container">
            <suspense>
              <template #default>
                <div>
                  <async-component />
                  <suspense>
                    <template #default>
                      <async-data :delay="1000" title="嵌套数据" color="#faad14" />
                    </template>
                    <template #fallback>
                      <div class="nested-loading">
                        <a-spin />
                        <span>加载嵌套数据...</span>
                      </div>
                    </template>
                  </suspense>
                </div>
              </template>
              <template #fallback>
                <div class="loading">
                  <a-spin size="large" />
                  <p>加载外层组件...</p>
                </div>
              </template>
            </suspense>
          </div>
        </div>
      </a-space>
    </a-card>
  </div>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue'

const componentKey = ref(0)

const reloadComponent = () => {
  componentKey.value++
}

// 异步组件
const AsyncComponent = defineAsyncComponent(() =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({
        template: `
          <div class="async-component">
            <a-result
              status="success"
              title="异步组件加载成功"
              sub-title="这个组件是异步加载的"
            />
          </div>
        `
      })
    }, 2000)
  })
)

// 异步数据组件
const AsyncData = defineAsyncComponent(() =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({
        props: ['title', 'color', 'delay'],
        template: `
          <div class="async-data" :style="{ borderColor: color }">
            <a-tag :color="color">{{ title }}</a-tag>
            <p>延迟 {{ delay }}ms 后加载完成</p>
            <a-progress :percent="100" :stroke-color="color" status="success" />
          </div>
        `
      })
    }, 2000)
  })
)
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

.suspense-container {
  margin-top: 16px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  min-height: 150px;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.loading p {
  margin-top: 16px;
  color: #8c8c8c;
}

.multi-async {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.nested-loading {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px;
  color: #8c8c8c;
}

.async-component {
  text-align: center;
}

.async-data {
  flex: 1;
  min-width: 200px;
  padding: 16px;
  border: 2px solid;
  border-radius: 8px;
  background: #fafafa;
}

.async-data p {
  margin: 8px 0;
  color: #595959;
}
</style>
