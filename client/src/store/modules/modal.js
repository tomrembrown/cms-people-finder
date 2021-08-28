const state = () => ({
  visible: false,
  component: null,
  title: 'title',
  message: 'message',
})

const mutations = {
  showModal(state, payload) {
    console.log('In showModal, payload: ')
    console.log(payload)
    state.visible = true
    state.component = payload.component
    state.title = payload.title
    if (payload.message) state.message = payload.message
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
  showSuccess({ commit }, message) {
    const payload = {
      component: 'Status',
      title: 'Success',
      message: message,
    }
    commit('showModal', payload)
  },
  showFailure({ commit }, message) {
    const payload = {
      component: 'Status',
      title: 'Error',
      message: message,
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
