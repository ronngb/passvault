import dayjs from 'dayjs'

const state = {
  accounts: [],
  toSearch: '',
}

const mutations = {
  SET_ACCOUNTS: (state, payload) => {
    state.accounts = payload
  },
  STORE_ACCOUNT: (state, payload) => {
    const regex = /(http(s?)):\/\/|ww(w|3)./gi

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

  DELETE_ACCOUNT: (state, accountId) => {
    const data = state.accounts.find((acctObj) => acctObj.id == accountId)
    state.accounts.splice(state.accounts.indexOf(data), 1)
  },
  SEARCH_ACCOUNT: (state, payload) => {
    state.toSearch = payload
  },
}

const actions = {
  storeAccount: ({ commit }, account) => {
    commit('STORE_ACCOUNT', account)
  },

  updateAccount: ({ commit }, account) => {
    commit('UPDATE_ACCOUNT', account)
  },

  deleteAccount: ({ commit }, accountId) => {
    commit('DELETE_ACCOUNT', accountId)
  },
}

const getters = {
  accountCount: (state) => state.accounts.length,

  getAccount: (state) => (id) => {
    return state.accounts.find((obj) => obj.id == id)
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
