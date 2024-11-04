import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import store from './store'
import router from './router'

Vue.use(Vuex)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  router,
  components: {App},
  template: '<App/>'
})
