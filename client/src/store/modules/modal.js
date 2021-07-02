const state = () => ({
  visible: false,
  component: null,
  title: 'title',
})

const mutations = {
  showModal(state, payload) {
    state.visible = true
    state.component = payload.component
    state.title = payload.title
  },
  closeModal(state) {
    state.visible = false
  },
}

const actions = {
  showLogin({ commit }) {
    const payload = {
      component: 'Login',
      title: 'Log In',
    }
    commit('showModal', payload)
  },
  showSignup({ commit }) {
    const payload = {
      component: 'Signup',
      title: 'Sign Up',
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
