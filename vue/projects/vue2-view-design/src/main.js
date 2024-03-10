import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import VueMathPlugin from './plugins/VueMathPlugin'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'

Vue.use(ViewUI)
Vue.use(VueMathPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
