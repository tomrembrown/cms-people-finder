import { createStore } from 'vuex'

export default createStore({
  state: {
    modalVisible: false,
    modalComponent: null,
    modalTitle: 'title',
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
