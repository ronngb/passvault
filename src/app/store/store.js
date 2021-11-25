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
    STORE_ACCT: (state, payload) => {
      state.accounts.push(payload);
    },
  },

  actions: {
    getAcctData: ({ commit }) => {
      commit('GET_ACCT_DATA', accounts);
    },
    storeAccount: ({ commit }, account) => {
      commit('STORE_ACCT', account);
    },
  },

  getters: {
    acctItems: (state) => state.accounts,
  },
});
