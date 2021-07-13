import { updateProfile } from '@/api/api-client'

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
  changeField(state, payload) {
    state[payload.field] = payload.value
  },
}

const actions = {
  updateProfileStore({ state }) {
    if (state.id !== null) {
      updateProfile(
        state.id,
        state.handle,
        state.tagline,
        state.description
      ).then((data) => {
        if (data === 'success') {
          console.log('Successfully updated database')
        } else {
          console.log('Did not successfully update database')
        }
      })
    }
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
