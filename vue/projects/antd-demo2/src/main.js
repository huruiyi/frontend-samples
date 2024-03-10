import Vue from "vue";
import Button from "ant-design-vue/lib/button";
import Form from "ant-design-vue/lib/form";
import Input from "ant-design-vue/lib/input";
import Radio from "ant-design-vue/lib/radio";
import "ant-design-vue/dist/antd.css";
import App from "./App";

Vue.component(Button.name, Button);
Vue.component(Form.name, Form);
Vue.component(Input.name, Input);
Vue.component(Input.name, Input);
Vue.component(Input.Group.name, Input.Group);
Vue.component(Input.Search.name, Input.Search);
Vue.component(Input.TextArea.name, Input.TextArea);
Vue.component(Radio.name, Radio);
Vue.component(Radio.Group.name, Radio.Group);
Vue.component(Radio.Button.name, Radio.Button);
Vue.component(Form.Item.name, Form.Item);

//https://github.com/vueComponent/ant-design-vue/blob/master/site/components.js
Vue.config.productionTip = false;

new Vue({
    render: h => h(App)
}).$mount("#app");
