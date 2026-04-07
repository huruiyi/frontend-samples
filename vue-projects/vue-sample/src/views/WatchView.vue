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

<style scoped src="../assets/views/WatchView.css"></style>
