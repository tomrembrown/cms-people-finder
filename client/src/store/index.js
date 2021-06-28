import { createLogger, createStore } from 'vuex'
import auth from './modules/auth'
import modal from './modules/modal'
import myprofile from './modules/myprofile'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    auth,
    modal,
    myprofile,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
})
