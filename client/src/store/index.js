import { createStore } from 'vuex'

export default createStore({
  state: {
    modalVisible: false,
    modalComponent: null,
    modalTitle: 'title',
    isSignedIn: false,
    user_id: null,
    user_handle: null,
  },
  mutations: {
    showModal(state, payload) {
      state.modalVisible = true
      state.modalComponent = payload.componentName
      state.modalTitle = payload.componentTitle
    },
    closeModal(state) {
      state.modalVisible = false
    },
    successfullySignedIn(state) {
      state.isSignedIn = true
    },
    signout(state) {
      state.isSignedIn = false
    },
    loadUser(state, user) {
      state.user_id = Number(user.id)
      state.user_handle = user.user_handle
    },
  },
  actions: {
    showLogin({ commit }) {
      const payload = {
        componentName: 'Login',
        componentTitle: 'Log In',
      }
      commit('showModal', payload)
    },
    showSignup({ commit }) {
      const payload = {
        componentName: 'Signup',
        componentTitle: 'Sign Up',
      }
      commit('showModal', payload)
    },
  },
  modules: {},
})
