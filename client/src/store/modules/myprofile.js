import { updateProfile } from '@/api/api-client'

const state = () => ({
  id: null,
  handle: null,
  tagline: null,
  description: null,
  image_filename: '',
  aboutme: '',
  location: '',
  interests: [],
  skills: [],
  projects: [],
  fieldsChanged: [],
  editMode: false,
})

const mutations = {
  loadUser(state, user) {
    state.id = Number(user.id)
    state.handle = user.handle
    state.tagline = user.tagline
    state.description = user.description
    state.image_filename = user.image_filename
    state.aboutme = user.aboutme
    state.location = user.location
    state.interests = user.interests
    state.skills = user.skills
    state.projects = user.projects
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
