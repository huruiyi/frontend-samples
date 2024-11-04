import {createApp} from 'vue'
import App from './App.vue'
import {createRouter, createWebHashHistory} from 'vue-router';
import HelloWorld from "@/components/HelloWorld";
import About from "@/components/About";


const User = {
  template: '<div>User</div>',
}
const Details = {
  render() {
    return '详情页面'
  }
}
const helloWorld = {
  render() {
    return <HelloWorld msg="Welcome to Your Vue.js App"></HelloWorld>
  }
}

const routes = [
  {
    path: '/', component: helloWorld
  },
  {
    path: '/about', component: About
  },
  {
    path: '/hello', component: HelloWorld,
    props: {
      msg: "Hello"
    }
  },
  {
    path: '/user', component: User
  },
  {
    path: '/details', component: Details
  },
]

// 3. 创建路由实例并传递 `routes` 配置。
const router = createRouter({
  // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(), routes, // `routes: routes` 的缩写
})

// 4.创建一个vue应用，将App组件和定义的路由放入到vue应用，并挂载到模板页面id为app的元素上。
createApp(App).use(router).mount('#app')
