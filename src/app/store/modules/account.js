import dayjs from 'dayjs'
import axios from 'axios'
import AcctService from '@/app/services/AcctService'

const state = {
  accounts: [],
  toSearch: '',
  sortBy: {},
}

const mutations = {
  SET_ACCOUNTS: (state, payload) => {
    state.accounts = payload
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

  UPDATE_FAVE: (state, favicon) => {
    console.log(favicon)
  },
}

const actions = {
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

  getFavicon({ state, commit }, accountId) {
    const account = state.accounts.find((account) => account.id == accountId)
    // TODO: refactor this FN() then commit all done component b4 proceesing with GET API
    // NOTE: find a way that re request favicon if response is error
    if (account.favicon == '') {
      AcctService.getFavicon(account.domain)
        .then((res) => {
          const data = {
            favicon: res[0].src,
          }
          AcctService.updateAccount(account.id, data)
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
        })
        .catch((err) => console.log(err))
    }
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
