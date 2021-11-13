import Vue from 'vue';
import Vuex from 'vuex';

// TODO: rename acct to accounts
import accounts from '../data/acct';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    accounts: [],
  },

  mutations: {
    GET_ACCT_DATA: (state, payload) => {
      state.accounts = payload;
    },
  },

  actions: {
    getAcctData: ({ commit }) => {
      commit('GET_ACCT_DATA', accounts);
    },
  },

  getters: {
    acctItems: (state) => {
      return state.accounts;
    },
  },
});
