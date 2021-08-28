import { updateProfile } from '@/api/api-client'

const state = () => ({
  id: null,
  handle: null,
  tagline: null,
  description: null,
  image_link: '',
  fieldsChanged: [],
  editMode: false,
})

const mutations = {
  loadUser(state, user) {
    state.id = Number(user.id)
    state.handle = user.handle
    state.tagline = user.tagline
    state.description = user.description
    state.image_link = user.image_link
    state.fieldsChanged = []
  },
  setEditMode(state, newMode) {
    state.editMode = newMode
  },
  changeField(state, payload) {
    state[payload.field] = payload.value
    state.fieldsChanged.push(payload.field)
  },
  resetFieldsChanged(state) {
    state.fieldsChanged = []
  },
}

const actions = {
  updateProfileStore({ dispatch, commit, state }) {
    if (state.id !== null && state.fieldsChanged.length > 0) {
      let fieldsToChange = {}
      for (let i = 0, len = state.fieldsChanged.length; i < len; ++i) {
        fieldsToChange[state.fieldsChanged[i]] = state[state.fieldsChanged[i]]
      }

      updateProfile(state.id, fieldsToChange).then((data) => {
        if (data === 'success') {
          dispatch('modal/showSuccess', 'Successfully updated database', {
            root: true,
          })
          console.log('Successfully updated database')
          // Set fields changed back to none - since all fields were changed
          commit('resetFieldsChanged')
        } else {
          dispatch(
            'modal/showFailure',
            'Did not successfully update database',
            {
              root: true,
            }
          )
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
