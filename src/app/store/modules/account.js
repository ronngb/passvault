import dayjs from 'dayjs'
import axios from 'axios'
import AcctService from '@/app/services/AcctService'

const state = {
  accounts: [],
  account: {},
  toSearch: '',
  sortBy: {},
}

const mutations = {
  SET_ACCOUNTS: (state, accounts) => {
    let acctObj = {}

    for (const key in accounts) {
      acctObj.id = key
      for (const prop in accounts[key]) {
        acctObj[prop] = accounts[key][prop]
      }
      state.accounts.push(Object.assign({}, acctObj))
    }
  },

  SET_ACCOUNT: (state, account) => {
    state.account = account
  },

  STORE_ACCOUNT: (state, account) => {
    state.accounts.push(account)
  },

  SET_SORT_ORDER: (state, sortBy) => {
    state.sortBy = sortBy
  },

  SEARCH_ACCOUNT: (state, searchAccount) => {
    state.toSearch = searchAccount
  },

  DELETE_ACCOUNT: (state, acctObj) => {
    state.accounts.splice(state.accounts.indexOf(acctObj), 1)
  },

  UPDATE_ACCOUNT: (state, account) => {
    const data = state.accounts.find((acctObj) => acctObj.id == account.id)
    for (const key in account) {
      data[key] = account[key]
    }
  },
}

const actions = {
  fetchAccounts: ({ commit }) => {
    return AcctService.getAccounts()
      .then((res) => commit('SET_ACCOUNTS', res.data))
      .catch((err) => console.log(err))
  },

  getAccount: ({ commit, getters, dispatch }, id) => {
    const account = getters.getAccount(id)

    if (account) {
      commit('SET_ACCOUNT', account)
    } else {
      AcctService.getAccount(id)
        .then((res) => commit('SET_ACCOUNT', res.data))
        .catch((err) => console.log(err))
    }
  },
  storeAccount: ({ commit }, account) => {
    return AcctService.storeAccount(account)
      .then((res) => {
        commit('STORE_ACCOUNT', {
          ...account,
          id: res.data.name,
        })
        return res.data.name
      })
      .catch((err) => err)
  },

  updateAccount: ({ commit }, { id, username, password, dates }) => {
    let date = {
      created: dates.created,
      last_modified: new Date().toISOString(),
    }
    commit('UPDATE_ACCOUNT', { id, username, password, dates: date })

    AcctService.updateAccount(id, { username, password, dates: date })
      .then((res) => console.log(res))
      .catch((err) => console.log(err))

    return
  },

  deleteAccount({ getters, commit }, id) {
    commit('DELETE_ACCOUNT', getters.getAccount(id))

    AcctService.deleteAccount(id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  },

  getFavicon({ state, commit }, account) {
    AcctService.getFavicon(account.domain)
      .then((res) => {
        commit('UPDATE_ACCOUNT', { id: account.id, favicon: res[0].src })

        AcctService.updateAccount(account.id, { favicon: res[0].src })
          .then((res) => console.log(res))
          .catch((err) => console.log(err))
      })
      .catch((err) => err)
  },
}

const getters = {
  accountCount: (state) => state.accounts.length,

  getAccount: (state) => (id) => {
    return state.accounts.find((obj) => obj.id == id)
  },

  getActiveId: (state, getters) => (id) => {
    const currentIndex = state.accounts.indexOf(getters.getAccount(id))

    return currentIndex
      ? state.accounts[currentIndex - 1].id
      : state.accounts[currentIndex + 1].id
  },

  getAccounts: (state) => {
    return state.accounts.filter((obj) => {
      if (!state.toSearch) return true
      if (
        obj.domain.match(state.toSearch) ||
        obj.username.match(state.toSearch)
      ) {
        return true
      }
    })
  },

  sortAccount: (state, getters) => {
    return getters.searchResult.sort((objA, objB) => {
      let x = objA[state.sortBy.prop]
      let y = objB[state.sortBy.prop]

      return state.sortBy.sortOrder ? x > y : x < y
    })
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
