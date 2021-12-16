import Vue from 'vue';
import Vuex from 'vuex';
import accounts from '../data/acct';
import account from './modules/account.js';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    account,
  },
  state: {
    // ModalDialog.vue
    refModalObj: {},
    sorts: [
      { sort: 'Name A-Z', sortOrder: true, prop: 'domain' },
      { sort: 'Name Z-A', sortOrder: false, prop: 'domain' },
    ],
  },

  mutations: {
    SET_REF_MODAL: (state, payload) => {
      state.refModalObj = payload;
    },
  },
  // TODO: How to create a async in actions?
  actions: {
    // App.vue TODO: set this to axios
    loadData: ({ commit }) => {
      commit('SET_ACCOUNTS', accounts);
    },
  },

  getters: {},
});
