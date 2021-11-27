import Vue from 'vue';
import Vuex from 'vuex';
import dayjs from 'dayjs';

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
      const accountObj = {
        ...payload,
        created: dayjs().format('MMMM, D YYYY'),
        last_modified: dayjs().format('MMMM, D YYYY'),
        last_used: dayjs().format('MMMM, D YYYY'),
      };

      state.accounts.push(accountObj);
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
    // TODOL rename acctItems -> accounts
    accounts: (state) => state.accounts,

    accountCount: (state) => state.accounts.length,
  },
});
