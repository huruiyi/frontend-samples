import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import antd from 'ant-design-vue';
import FcDesigner from '@form-create/antd-designer'
import 'ant-design-vue/dist/reset.css';

import './assets/main.css'
import {
  SettingFilled,
  SmileOutlined,
  UserOutlined
} from "@ant-design/icons-vue";

const app = createApp(App)
app.use(antd);
app.use(FcDesigner);
app.use(FcDesigner.formCreate)
app.use(createPinia())
app.use(router)

// 全局注册
app.component('UserOutlined', UserOutlined);
app.component('SettingFilled', SettingFilled);
app.component('SmileOutlined', SmileOutlined);

app.mount('#app')

