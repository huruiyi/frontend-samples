<script setup>
import '../assets/child.css'

import {provide, ref} from "vue";
import Child1 from "@/components/Child1.vue";
import Child2 from "@/components/Child2.vue";
import Child3 from "@/components/Child3.vue";
import Child4 from "@/components/Child4.vue";
import Child5 from "@/components/Child5.vue";
import Child0 from "@/components/Child0.vue";

const child0Ref = ref(null);
const child1Ref = ref(null);
const child4Ref = ref(null);
const child5Ref = ref(null);

const PROVIDE_NAME = 'child5'

provide(PROVIDE_NAME, child5Ref);
provide(`${PROVIDE_NAME}/func`, func);

const childAdd = () => {
  console.log('Current count:', child0Ref.value.count);
  child0Ref.value.childEvent();
}

const child1Do = () => {
  child1Ref.value.hello("运营同学")
}

const child4Do = () => {
  child4Ref.value.doSth({
    orderNo: 'A-1024',
    applicant: '刘备',
    amount: 20000,
    status: '待复核'
  })
  child4Ref.value.message = !child4Ref.value.message
  child4Ref.value.age = child4Ref.value.age === 1 ? 2 : 1
}

const getUserList = () => {
  alert("父组件收到刷新请求，列表已重新加载。")
}

const parentDo1 = (data) => {
  alert(`父组件收到审批结果：${JSON.stringify(data)}`)
}

const parentDo2 = (data1, data2) => {
  alert(`父组件收到审批结论：${data1} / ${data2}`)
}

function func() {
  alert("通过 provide/inject 注入的方法已经触发。")
}

const demoCards = [
  {
    title: '父组件拿到子组件句柄',
    description: '适合需要主动触发子组件行为的场景，例如重置表单、触发校验或推进步骤。'
  },
  {
    title: '子组件向上回传事件',
    description: '适合列表刷新、保存成功通知、回传筛选条件等单向通知场景。'
  },
  {
    title: '跨层级共享能力',
    description: '适合深层按钮触发上层能力，例如统一提交、打开弹窗或调用全局动作。'
  }
]

const caseCards = [
  {
    title: '父组件控制子组件',
    badge: 'ref + defineExpose',
    summary: '父组件主动调用子组件方法，让内部计数器加一。',
    action: '让计数器 +1',
    flow: '父 -> 子',
    scene: '适合步骤条、表单校验、重置内部状态。'
  },
  {
    title: '调用子组件公开方法',
    badge: 'method expose',
    summary: '父组件通过实例方法触发子组件弹出反馈。',
    action: '触发欢迎提示',
    flow: '父 -> 子',
    scene: '适合外部触发成员卡片、弹窗或局部提示。'
  },
  {
    title: '子组件请求父级刷新',
    badge: 'emit',
    summary: '子组件点击按钮后，通过事件通知父组件刷新数据。',
    flow: '子 -> 父',
    scene: '适合保存后刷新列表、关闭面板后重新拉取数据。'
  },
  {
    title: '父组件下发业务数据',
    badge: 'props',
    summary: '把页面上下文和说明信息作为 props 传递给子组件。',
    flow: '父 -> 子',
    scene: '适合详情卡片、状态展示和列表项信息透传。'
  },
  {
    title: '审批面板提交结果并回填状态',
    badge: 'emit + expose',
    summary: '子组件提交审批结论给父组件，父组件处理后再把最新审批状态同步回子组件。',
    action: '回填审批状态',
    flow: '双向协作',
    scene: '适合审批抽屉、工单处理、售后审核等需要先上报结果再回填状态的页面。'
  },
  {
    title: '深层组件调用上层方法',
    badge: 'provide / inject',
    summary: '跨层级注入方法，减少中间层层传递事件或 props。',
    flow: '跨层级',
    scene: '适合深层触发弹窗、统一提交和页面级动作。'
  }
]
</script>

<template>
  <section class="child-page">
    <header class="child-page__hero">
      <div>
        <p class="child-page__eyebrow">Component Communication</p>
        <h1>把组件通讯方式放进更贴近业务的小场景里</h1>
        <p class="child-page__intro">
          这页不再只展示 API 名称，而是对应到真实页面里常见的动作：刷新列表、触发提示、同步状态和跨层调用上层能力。
        </p>
      </div>

      <div class="child-page__tips">
        <div v-for="item in demoCards" :key="item.title">
          <strong>{{ item.title }}</strong>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </header>

    <div class="child-page__grid">
      <article class="child-page__card">
        <div class="child-page__card-head">
          <h2>{{ caseCards[0].title }}</h2>
          <span>{{ caseCards[0].badge }}</span>
        </div>
        <p class="child-page__card-note">{{ caseCards[0].summary }}</p>
        <div class="child-page__flow-row">
          <em class="child-page__flow">{{ caseCards[0].flow }}</em>
          <small>{{ caseCards[0].scene }}</small>
        </div>
        <Child0 ref="child0Ref"/>
        <button class="s-button" @click="childAdd">{{ caseCards[0].action }}</button>
      </article>

      <article class="child-page__card">
        <div class="child-page__card-head">
          <h2>{{ caseCards[1].title }}</h2>
          <span>{{ caseCards[1].badge }}</span>
        </div>
        <p class="child-page__card-note">{{ caseCards[1].summary }}</p>
        <div class="child-page__flow-row">
          <em class="child-page__flow">{{ caseCards[1].flow }}</em>
          <small>{{ caseCards[1].scene }}</small>
        </div>
        <Child1 ref="child1Ref" info="当前负责人：曹操" money="预算额度：666"/>
        <button class="s-button" @click="child1Do">{{ caseCards[1].action }}</button>
      </article>

      <article class="child-page__card">
        <div class="child-page__card-head">
          <h2>{{ caseCards[2].title }}</h2>
          <span>{{ caseCards[2].badge }}</span>
        </div>
        <p class="child-page__card-note">{{ caseCards[2].summary }}</p>
        <div class="child-page__flow-row">
          <em class="child-page__flow">{{ caseCards[2].flow }}</em>
          <small>{{ caseCards[2].scene }}</small>
        </div>
        <Child2 @refresh="getUserList"/>
      </article>

      <article class="child-page__card">
        <div class="child-page__card-head">
          <h2>{{ caseCards[3].title }}</h2>
          <span>{{ caseCards[3].badge }}</span>
        </div>
        <p class="child-page__card-note">{{ caseCards[3].summary }}</p>
        <div class="child-page__flow-row">
          <em class="child-page__flow">{{ caseCards[3].flow }}</em>
          <small>{{ caseCards[3].scene }}</small>
        </div>
        <Child3 f-data="订单编号：A-1024" f-message="状态：待审核"/>
      </article>

      <article class="child-page__card">
        <div class="child-page__card-head">
          <h2>{{ caseCards[4].title }}</h2>
          <span>{{ caseCards[4].badge }}</span>
        </div>
        <p class="child-page__card-note">{{ caseCards[4].summary }}</p>
        <div class="child-page__flow-row">
          <em class="child-page__flow">{{ caseCards[4].flow }}</em>
          <small>{{ caseCards[4].scene }}</small>
        </div>
        <Child4 ref="child4Ref" @parent-mut="parentDo1" @response-single="parentDo2"/>
        <button class="s-button" @click="child4Do">{{ caseCards[4].action }}</button>
      </article>

      <article class="child-page__card">
        <div class="child-page__card-head">
          <h2>{{ caseCards[5].title }}</h2>
          <span>{{ caseCards[5].badge }}</span>
        </div>
        <p class="child-page__card-note">{{ caseCards[5].summary }}</p>
        <div class="child-page__flow-row">
          <em class="child-page__flow">{{ caseCards[5].flow }}</em>
          <small>{{ caseCards[5].scene }}</small>
        </div>
        <Child5 ref="child5Ref"/>
      </article>
    </div>
  </section>

</template>

<style scoped>
.child-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.child-page__hero,
.child-page__card {
  padding: 24px;
  border: 1px solid var(--color-border);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.66);
  box-shadow: 0 18px 40px rgba(84, 60, 33, 0.08);
}

.child-page__hero {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  background: linear-gradient(135deg, rgba(255, 247, 236, 0.92), rgba(237, 246, 243, 0.9));
}

.child-page__eyebrow {
  margin-bottom: 10px;
  color: var(--color-accent);
  font-family: 'Space Grotesk', 'Noto Sans SC', sans-serif;
  font-size: 0.82rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.child-page__intro {
  max-width: 56ch;
  color: var(--color-text-soft);
}

.child-page__tips {
  display: grid;
  gap: 12px;
  min-width: 320px;
}

.child-page__tips div {
  padding: 14px 16px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.78);
}

.child-page__tips strong {
  display: block;
  margin-bottom: 6px;
  color: var(--color-heading);
}

.child-page__tips p {
  color: var(--color-text-soft);
}

.child-page__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.child-page__card {
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 280px;
}

.child-page__card-head {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-start;
}

.child-page__card-head span {
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(15, 140, 121, 0.12);
  color: var(--color-accent-strong);
  font-size: 0.78rem;
}

.child-page__card-note {
  min-height: 44px;
  color: var(--color-text-soft);
  line-height: 1.6;
}

.child-page__flow-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.child-page__flow {
  display: inline-flex;
  align-self: flex-start;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(212, 106, 61, 0.12);
  color: var(--color-accent);
  font-style: normal;
  font-size: 0.78rem;
  font-weight: 700;
}

.child-page__flow-row small {
  color: var(--color-text-soft);
  line-height: 1.5;
}

@media (max-width: 768px) {
  .child-page__hero {
    flex-direction: column;
  }

  .child-page__tips {
    min-width: 0;
  }

  .child-page__grid {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 769px) and (max-width: 1080px) {
  .child-page__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>