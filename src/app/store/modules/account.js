import dayjs from 'dayjs'
import axios from 'axios'
import AcctService from '@/app/services/AcctService'

const state = {
  accounts: [],
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
  STORE_ACCOUNT: (state, account) => {
    state.accounts.push(account)
  },
  UPDATE_ACCOUNT: (state, { accountId, username, password }) => {
    const data = state.accounts.find((acctObj) => acctObj.id == accountId)
    data.username = username
    data.password = password
    data.last_modified = dayjs().format('MMMM, D YYYY')
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

  UPDATE_V2: (state, account) => {
    const data = state.accounts.find((acctObj) => acctObj.id == account.id)
    for (const key in account) {
      data[key] = account[key]
    }
  },
}

const actions = {
  fetchAccounts: ({ commit }) => {
    AcctService.getAccounts()
      .then((res) => commit('SET_ACCOUNTS', res.data))
      .catch((err) => console.log(err))
  },
  storeAccount: ({ commit }, account) => {
    return AcctService.storeAccount(account)
      .then((res) =>
        commit('STORE_ACCOUNT', {
          ...account,
          id: res.data.name,
        })
      )
      .catch((err) => err)
  },

  updateAccount: ({ commit }, account) => {
    commit('UPDATE_ACCOUNT', account)
  },

  deleteAccount({ getters, commit }, accountId) {
    commit('DELETE_ACCOUNT', getters.getAccount(accountId))
  },

  getFavicon({ state, commit }, account) {
    // NOTE: find a way that re request favicon if response is error
    AcctService.getFavicon(account.domain)
      .then((res) => {
        commit('UPDATE_V2', { id: account.id, favicon: res[0].src })
        // PLACE THE COMMIT HERE

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

  getActiveIndex: (state, getters) => (id) => {
    const currentIndex = state.accounts.indexOf(getters.getAccount(id))

    return currentIndex ? currentIndex - 1 : currentIndex
  },

  sortAccount: (state, getters) => {
    return getters.searchResult.sort((objA, objB) => {
      let x = objA[state.sortBy.prop]
      let y = objB[state.sortBy.prop]

      return state.sortBy.sortOrder ? x > y : x < y
    })
  },

  searchResult: (state) => {
    return state.accounts.filter((obj) => {
      if (
        obj.domain.match(state.toSearch) ||
        obj.username.match(state.toSearch)
      )
        return true
    })
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
