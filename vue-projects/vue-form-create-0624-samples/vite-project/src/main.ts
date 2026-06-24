import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import formCreate from '@form-create/ant-design-vue'
import FcDesigner from '@form-create/antd-designer'
import router from './router'
import './style.css'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd)
app.use(formCreate)
app.use(FcDesigner)

app.mount('#app')
