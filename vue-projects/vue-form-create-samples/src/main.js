
import { createApp } from 'vue'
import App from './App.vue'
import antd from 'ant-design-vue';
import FcDesigner from '@form-create/antd-designer'
import 'ant-design-vue/dist/reset.css';

var app = createApp(App);
app.use(antd);
app.use(FcDesigner);
app.use(FcDesigner.formCreate)

app.mount('#app')
