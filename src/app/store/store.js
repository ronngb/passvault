import Vue from 'vue';
import Vuex from 'vuex';
import dayjs from 'dayjs';

// TODO: rename acct to accounts
import accounts from '../data/acct';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    accounts: [],
    addObj: {},
    refModalObj: {},
  },

  mutations: {
    GET_ACCT_DATA: (state, payload) => {
      state.accounts = payload;
    },
    STORE_ACCT: (state, payload) => {
      const regex = /(http(s?)):\/\/|ww(w|3)./gi;

      const accountObj = {
        ...payload,
        id: state.accounts.length + 1,
        domain: payload.url.replace(regex, ''),
        created: dayjs().format('MMMM, D YYYY'),
        last_modified: dayjs().format('MMMM, D YYYY'),
        last_used: dayjs().format('MMMM, D YYYY'),
      };
      state.accounts.push(accountObj);
    },
    SET_REF_MODAL: (state, payload) => {
      state.refModalObj = payload;
    },
  },
  // TODO: How to create a async in actions?
  actions: {
    getAcctData: ({ commit }) => {
      commit('GET_ACCT_DATA', accounts);
    },
    storeAccount: ({ commit }, account) => {
      commit('STORE_ACCT', account);
    },
  },

  getters: {
    accounts: (state) => state.accounts,

    accountCount: (state) => state.accounts.length,
  },
});
