const state = {
  toasts: [],
}

const mutations = {
  SET_TOAST(state, toast) {
    state.toasts.push({
      ...toast,
      id: Math.floor(Math.random() * 1000),
    })
  },
  REMOVE_TOAST(state, toast) {
    state.toasts = state.toasts.filter((toastObj) => toastObj.id !== toast.id)
  },
}
const actions = {
  addToast({ commit }, toast) {
    setTimeout(() => {
      commit('SET_TOAST', toast)
    }, 500)
  },
  removeToast({ commit }, toast) {
    commit('REMOVE_TOAST', toast)
  },
}

export default {
  state,
  mutations,
  actions,
}
