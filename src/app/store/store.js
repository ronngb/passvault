import Vue from 'vue'
import Vuex from 'vuex'
import account from './modules/account.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    account,
  },
})
