const state = () => ({
  id: null,
  handle: null,
  tagline: null,
  description: null,
  editMode: false,
})

const mutations = {
  loadUser(state, user) {
    state.id = Number(user.id)
    state.handle = user.handle
    state.tagline = user.tagline
    state.description = user.description
  },
  setEditMode(state, newMode) {
    state.editMode = newMode
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}
