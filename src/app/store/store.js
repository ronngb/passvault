import Vue from 'vue';
import Vuex from 'vuex';
import dayjs from 'dayjs';
import accounts from '../data/acct';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    accounts: [],
    refModalObj: {},
  },

  mutations: {
    GET_ALL_ACCT: (state, payload) => {
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
    SORT_ACCT: (state, payload) => {
      state.accounts.sort((a, b) => {
        switch (payload) {
          case 'Name (A-Z)':
            return a.domain > b.domain ? 1 : -1;
          case 'Name (Z-A)':
            return a.domain < b.domain ? 1 : -1;
        }
      });
    },
  },
  // TODO: How to create a async in actions?
  actions: {
    getAllAccount: ({ commit }) => {
      commit('GET_ALL_ACCT', accounts);
    },
    storeAccount: ({ commit }, account) => {
      commit('STORE_ACCT', account);
    },
    sortAccount: ({ commit }, sorts) => {
      commit('SORT_ACCT', sorts);
    },
  },

  getters: {
    accounts: (state) => state.accounts,

    accountCount: (state) => state.accounts.length,
  },
});
