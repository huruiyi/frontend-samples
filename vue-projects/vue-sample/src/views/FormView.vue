<template>
  <section id="formView" class="form-demo">
    <header class="form-demo__hero">
      <div>
        <p class="form-demo__eyebrow">Form Demo</p>
        <h1>把常见表单绑定场景整理成一个更易读的实验台</h1>
        <p class="form-demo__intro">
          这里覆盖 checkbox、radio、select、textarea 和修饰符的常用写法。布局上改成模块化卡片，方便逐段比对结果。
        </p>
      </div>

      <div class="form-demo__stats">
        <div>
          <span>选中项</span>
          <strong>{{ checkedList.length }}</strong>
        </div>
        <div>
          <span>文本长度</span>
          <strong>{{ text.length }}</strong>
        </div>
        <div>
          <span>多选数量</span>
          <strong>{{ mselected.length }}</strong>
        </div>
      </div>
    </header>

    <div class="form-demo__layout">
      <fieldset>
        <legend>checkbox</legend>
        <div class="form-demo__panel form-demo__panel--sky">
        <input id="chkCheckAll" type="checkbox" value="1" v-model="checkedAll" @change="checkedAllChange">
        <label for="chkCheckAll">全选:</label>&nbsp;&nbsp;

        <template v-for="item in list" :key="item.id">
          <input type="checkbox" :value="item.value" :id="item.value" v-model="checkedList" @click="listChange"/>
          <label :for="item.value">{{ item.label }}</label>&nbsp;&nbsp;
        </template>
        <br>
        <p>选择了:{{ checkedList }}</p>
      </div>

      <div class="form-demo__panel form-demo__panel--sun">
        <div>Checked names: {{ checkedNames }}</div>

        <input type="checkbox" id="jack" value="Jack" v-model="checkedNames"/>
        <label for="jack">Jack</label>

        <input type="checkbox" id="john" value="John" v-model="checkedNames"/>
        <label for="john">John</label>

        <input type="checkbox" id="mike" value="Mike" v-model="checkedNames"/>
        <label for="mike">Mike</label>
      </div>

      <div class="form-demo__panel form-demo__panel--cream">
        <input id="yesOrNo" type="checkbox" v-model="yesOrNo" true-value="yes" false-value="no"/>
        <label for="yesOrNo">YesOrNo:{{ yesOrNo }}</label>
      </div>

      <div class="form-demo__panel form-demo__panel--mint">
        <input
            id="dynamicTrueOrFalse"
            type="checkbox"
            v-model="dynamicTrueOrFalse"
            :true-value="dynamicTrueValue"
            :false-value="dynamicFalseValue"/>
        <label for="dynamicTrueOrFalse">DynamicTrueOrFalse:{{ dynamicTrueOrFalse }}</label>
      </div>

      <div class="form-demo__panel form-demo__panel--rose">
        <!-- `toggle` 只会为 true 或 false -->
        <input id="checkbox-toggle" type="checkbox" v-model="toggle"/>
        <label for="checkbox-toggle">Toggle:{{ toggle }}</label>
      </div>

      <div class="form-demo__panel form-demo__panel--violet">
        <input type="checkbox" id="checkbox" v-model="checked"/>
        <label for="checkbox">TrueOrFalse：{{ checked }}</label>
      </div>
      </fieldset>

      <fieldset>
        <legend>radio</legend>
        <div class="form-demo__panel form-demo__panel--violet">
        <input type="radio" id="one" value="One" v-model="picked"/>
        <label for="one">One</label>

        <input type="radio" id="two" value="Two" v-model="picked"/>
        <label for="two">Two</label>

        <input type="radio" id="three" value="three" v-model="picked"/>
        <label for="three">Three</label>
        <div>Picked: {{ picked }}</div>
      </div>
        <div class="form-demo__panel form-demo__panel--sun">
        <input id="radioOne" type="radio" v-model="radioNumbers" :value="radioOne"/>
        <label for="radioOne">First</label>
        <input id="radioTwo" type="radio" v-model="radioNumbers" :value="radioTwo"/>
        <label for="radioTwo">Second</label>
        <div>radioNumbers: {{ radioNumbers }}</div>
      </div>
      </fieldset>

      <fieldset>
        <legend>select</legend>
        <div class="form-demo__split">
          <div class="form-demo__panel form-demo__panel--paper">
            <div> Selected: {{ selected }}</div>
            <p>
              <select v-model="selected">
                <option disabled value="">Please select one</option>
                <option>A</option>
                <option>B</option>
                <option>C</option>
              </select>
            </p>
            <p>
              <select v-model="selected">
                <option v-for="option in options" :key="option.value" :value="option.value">
                  {{ option.text }}
                </option>
              </select>
            </p>
          </div>
          <div class="form-demo__panel form-demo__panel--paper">
            <div> SelectedModel: {{ selectedModel }}</div>
            <p>
              <select v-model="selectedModel">
                <option :value="{ id: 1,name:'大爷' }">你大爷</option>
                <option :value="{ id: 2,name:'爸爸' }">你爸爸</option>
              </select>
            </p>
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend>select multiple</legend>
        <div class="form-demo__panel form-demo__panel--paper">
          <div>Selected: {{ mselected }}</div>
          <select v-model="mselected" multiple>
            <option>A</option>
            <option>B</option>
            <option>C</option>
          </select>
        </div>
      </fieldset>

      <fieldset>
        <legend>input</legend>
        <div class="form-demo__panel form-demo__panel--paper">
          <p>
            <input type="text" :value="text" @input="event => text = event.target.value">
          </p>
          <p>
            <input type="text" v-model="text">
          </p>
          <p>文本框：{{ text }}</p>
        </div>
      </fieldset>

      <fieldset>
        <legend>textarea</legend>
        <div class="form-demo__panel form-demo__panel--paper">
          <p>Message is: {{ message }}</p>
          <input type="text" v-model="message" placeholder="edit me"/>

          <p>Multiline message is:</p>
          <p class="form-demo__multiline">{{ message }}</p>
          <textarea v-model="message" placeholder="add multiple lines"></textarea>

          <p class="error">
            <textarea class="form-demo__error-textarea">{{ message }}</textarea>
          </p>
          <p>
            <textarea v-model="message"></textarea>
          </p>
        </div>
      </fieldset>

      <fieldset>
        <legend>修饰符</legend>
        <div class="form-demo__split">
          <div class="form-demo__panel form-demo__panel--paper">
            <div>
              <input type="text" :value="text" @input="event => text = event.target.value">
            </div>
            <div>
              <input type="text" v-model="text">
            </div>
            <div>
              <p>.trim </p>
              <input type="text" v-model.trim="text"/>
            </div>
            <div>
              <p>.lazy 在 "change/blur" 事件后同步更新而不是 "input" </p>
              <input type="text" v-model.lazy="text"/>
            </div>
            <p>文本框：{{ text }}</p>
          </div>
          <div class="form-demo__panel form-demo__panel--paper">
            <p>.number </p>
            <input type="text" v-model.number="age"/>
            <p>
              <span>age：{{ age }}</span>
            </p>
          </div>
        </div>
      </fieldset>
    </div>
  </section>
</template>

<script setup>

import {ref, watch} from "vue";

let list = [
  {
    id: 1,
    value: 'javascript',
    label: 'JavaScript'
  },
  {
    id: 2,
    value: 'html',
    label: 'HTML'
  },
  {
    id: 3,
    value: 'css',
    label: 'CSS'
  }
]
let text = ref("hello world")
let age = ref('')

let message = ref("")
let checkedList = ref([])
let checkedAll = ref([])
const checkedNames = ref([])
const picked = ref('One')
const selected = ref('')
const yesOrNo = ref('')

const selectedModel = ref([])

const checked = ref(true)
const toggle = ref(true)

const dynamicTrueOrFalse = ref('')
const dynamicTrueValue = ref('Y')
const dynamicFalseValue = ref('N')

const radioNumbers = ref('')
const radioOne = ref('1')
const radioTwo = ref('2')


const mselected = ref(['A', 'B'])

const options = ref([
  {text: 'One', value: 'A'},
  {text: 'Two', value: 'B'},
  {text: 'Three', value: 'C'}
])

const checkedAllChange = (e) => {
  if (e.target.checked) {
    list.forEach((item) => {
      checkedList.value.push(item.value);
    })
  } else {
    checkedList.value = []
  }
}

const listChange = (e) => {
}

watch(checkedList, (nVal, oVal) => {
  if (nVal.length > 0) {
    checkedAll.value = [1]
  } else if (nVal.length == 0) {
    checkedAll.value = []
  }
})
watch(checkedAll, (nVal, oVal) => {
  console.log("---------------------------------")
  console.log(nVal)
  console.log(oVal)
  console.log("---------------------------------")
})

</script>

<style scoped src="../assets/views/FormView.css"></style>
