import dayjs from 'dayjs'

const state = {
  accounts: [],
  toSearch: '',
  sortBy: {},
}

const mutations = {
  SET_ACCOUNTS: (state, payload) => {
    state.accounts = payload
  },
  STORE_ACCOUNT: (state, payload) => {
    const regex = /(http(s?)):\/\/|ww(w|3)./gi
    // TODO: Make the id random
    const accountObj = {
      ...payload,
      id: state.accounts.length + 1,
      domain: payload.url.replace(regex, ''),
      created: dayjs().format('MMMM, D YYYY'),
      last_modified: dayjs().format('MMMM, D YYYY'),
      last_used: dayjs().format('MMMM, D YYYY'),
    }
    state.accounts.push(accountObj)
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
}

const actions = {
  storeAccount: ({ commit }, account) => {
    commit('STORE_ACCOUNT', account)
  },

  updateAccount: ({ commit }, account) => {
    commit('UPDATE_ACCOUNT', account)
  },

  deleteAccount({ getters, commit }, accountId) {
    commit('DELETE_ACCOUNT', getters.getAccount(accountId))
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
