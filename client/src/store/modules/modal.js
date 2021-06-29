const state = () => ({
  visible: false,
  component: null,
  title: 'title',
})

const mutations = {
  showModal(state, payload) {
    state.visible = true
    state.component = payload.componentName
    state.title = payload.componentTitle
  },
  closeModal(state) {
    state.visible = false
  },
}

const actions = {
  showLogin({ commit }) {
    const payload = {
      componentName: 'LoginModal',
      componentTitle: 'Log In',
    }
    commit('showModal', payload)
  },
  showSignup({ commit }) {
    const payload = {
      componentName: 'SignupModal',
      componentTitle: 'Sign Up',
    }
    commit('showModal', payload)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
