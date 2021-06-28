import router from '@/router'

const state = () => ({
  isSignedIn: false,
})

const mutations = {
  setSignedIn(state) {
    state.isSignedIn = true
  },
  setSignedOut(state) {
    state.isSignedIn = false
  },
}

const actions = {
  successfullySignedIn({ commit }) {
    commit('setSignedIn')
    router.push('/myprofile')
  },
  signout({ commit }) {
    commit('setSignedOut')
    router.push('/')
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
