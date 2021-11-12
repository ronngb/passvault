import Vue from 'vue';
import Vuex from 'vuex';

import { acctData } from '../data/acct.js';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    acctData: [],
  },
  getters: {
    getAcctData: (state) => {
      return (state.acctData = acctData);
    },
  },
});
