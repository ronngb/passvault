import Vue from 'vue'
import Vuex from 'vuex'
import accounts from '../data/acct'
import account from './modules/account.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    account,
  },
  actions: {
    fetchData: ({ commit }) => {
      commit('SET_ACCOUNTS', accounts)
    },
  },
})
