import Vue from 'vue'
import Vuex, { createLogger } from 'vuex'

const debug = process.env.NODE_ENV !== 'production'
Vue.use(Vuex)

export default new Vuex.Store({
  state : {
    count : 0
  },
  mutations : {
    increment(state) {
      state.count++
    }
  },
  actions : {},
  modules : {},
  strict : debug,
  plugin : debug ? [ createLogger() ] : []
})
