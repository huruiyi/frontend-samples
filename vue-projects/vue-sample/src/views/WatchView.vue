<script setup>
import {reactive, ref, watch} from "vue";

const nums = ref(9)

const demo = reactive({
  name: 'huruiyi',
  nickName: 'ruiyi',
  soulmate: {
    name: '',
    nickName: 'laoer'
  }
})

watch(nums, (newValue, oldValue) => {
  console.log('watch 已触发', newValue)
})

//听整个对象
watch(demo, (newValue, oldValue) => {
  console.log('1：watch 已触发', newValue)
})


// 监听demo对象的name属性
watch(() => demo.name, (newValue, oldValue) => {
  console.log('2：watch 已触发', newValue)
})

//只监听对象的子属性
watch(() => ({...demo}), (newValue, oldValue) => {
  console.log('3：watch 已触发', newValue)
})

//监听对象的所有属性
watch(() => demo, (newValue, oldValue) => {
  console.log('4：watch 已触发', newValue)
}, { deep: true })

//组合监听
watch([() => demo.name, nums], ([newName, newNums], [oldName, oldNums]) => {
  console.log('watch 已触发: name', newName)
  console.log('watch 已触发: nums', newNums)
})

</script>

<template>
  <section class="watch-page">
    <header class="watch-page__hero">
      <div>
        <p class="watch-page__eyebrow">Watch Demo</p>
        <h1>把 watch 放进资料编辑场景里观察触发时机</h1>
        <p class="watch-page__intro">
          这里分别监听基础值、对象属性、嵌套字段和组合数据。你可以一边修改输入框，一边打开控制台查看不同 watch 的触发差异。
        </p>
      </div>

      <div class="watch-page__notice">
        <strong>建议操作</strong>
        <p>打开浏览器控制台，再修改下方输入内容，就能看到不同监听写法的输出日志。</p>
      </div>
    </header>

    <section class="watch-page__panel">
      <div class="watch-page__panel-head">
        <h2>监听输入区</h2>
        <span>实时修改</span>
      </div>

      <div class="watch-page__grid">
        <label class="watch-page__field">
          <span>基础数值</span>
          <small>对应对 ref 的直接监听。</small>
          <input type="text" v-model="nums">
        </label>

        <label class="watch-page__field">
          <span>主名称</span>
          <small>观察对象某个具体属性的变化。</small>
          <input type="text" v-model="demo.name">
        </label>

        <label class="watch-page__field">
          <span>嵌套昵称</span>
          <small>观察深层字段变化以及深度监听效果。</small>
          <input type="text" v-model="demo.soulmate.nickName">
        </label>
      </div>
    </section>

    <section class="watch-page__panel">
      <div class="watch-page__panel-head">
        <h2>当前数据快照</h2>
        <span>便于对照</span>
      </div>

      <div class="watch-page__snapshot">
        <div>
          <span>nums</span>
          <strong>{{ nums }}</strong>
        </div>
        <div>
          <span>demo.name</span>
          <strong>{{ demo.name }}</strong>
        </div>
        <div>
          <span>demo.soulmate.nickName</span>
          <strong>{{ demo.soulmate.nickName }}</strong>
        </div>
      </div>
    </section>
  </section>
</template>

<style scoped>
.watch-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.watch-page__hero,
.watch-page__panel {
  padding: 24px;
  border: 1px solid var(--color-border);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.66);
  box-shadow: 0 18px 40px rgba(84, 60, 33, 0.08);
}

.watch-page__hero {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  background: linear-gradient(135deg, rgba(255, 248, 237, 0.92), rgba(236, 244, 247, 0.9));
}

.watch-page__eyebrow {
  margin-bottom: 10px;
  color: var(--color-accent);
  font-family: 'Space Grotesk', 'Noto Sans SC', sans-serif;
  font-size: 0.82rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.watch-page__intro {
  max-width: 56ch;
  color: var(--color-text-soft);
}

.watch-page__notice {
  min-width: 280px;
  padding: 18px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.8);
}

.watch-page__notice strong {
  display: block;
  margin-bottom: 8px;
  color: var(--color-heading);
}

.watch-page__notice p {
  color: var(--color-text-soft);
}

.watch-page__panel-head {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}

.watch-page__panel-head span {
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(15, 140, 121, 0.12);
  color: var(--color-accent-strong);
  font-size: 0.8rem;
}

.watch-page__grid,
.watch-page__snapshot {
  display: grid;
  gap: 16px;
}

.watch-page__grid {
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.watch-page__field {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 18px;
  border-radius: 18px;
  background: rgba(247, 240, 231, 0.6);
}

.watch-page__field span {
  color: var(--color-heading);
  font-weight: 700;
}

.watch-page__field small {
  color: var(--color-text-soft);
  line-height: 1.5;
}

.watch-page__snapshot {
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
}

.watch-page__snapshot div {
  padding: 18px;
  border-radius: 18px;
  background: rgba(255, 252, 248, 0.88);
  border: 1px solid rgba(121, 92, 61, 0.12);
}

.watch-page__snapshot span {
  display: block;
  margin-bottom: 6px;
  color: var(--color-text-soft);
  font-size: 0.82rem;
}

.watch-page__snapshot strong {
  color: var(--color-heading);
}

@media (max-width: 768px) {
  .watch-page__hero {
    flex-direction: column;
  }

  .watch-page__notice {
    min-width: 0;
  }
}

</style>
