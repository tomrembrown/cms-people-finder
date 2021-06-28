const state = () => ({
  id: null,
  handle: null,
  tagline: null,
  description: null,
})

const mutations = {
  loadUser(state, user) {
    state.id = Number(user.id)
    state.handle = user.handle
    console.log('Handle is now ' + user.handle)
    state.tagline = user.tagline
    state.description = user.description
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}
