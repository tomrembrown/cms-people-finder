<template>
  <section class="modal-main" id="modal-description">
    <div class="email-holder">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" />
    </div>
    <div class="password-holder subsequent-row">
      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" />
    </div>
    <div class="error generalerror" v-if="isGeneralError">
      {{ generalErrorMessage }}
    </div>
  </section>
  <footer class="button">
    <button
      @click="loginLocal"
      :class="canSubmit ? '' : 'disabled'"
      :disabled="!canSubmit"
    >
      Log In
    </button>
    <button @click="close" aria-label="Close modal">Cancel</button>
  </footer>
</template>

<script>
import { LOGIN_GENERAL_ERROR_MESSAGE } from '@/validation/doValidation'
import { mapMutations, mapActions } from 'vuex'
import { login } from '@/api/api-client'

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      isGeneralError: false,
      generalErrorMessage: '',
    }
  },
  methods: {
    ...mapMutations({
      close: 'modal/closeModal',
      loadUser: 'myprofile/loadUser',
    }),
    ...mapActions({
      successfullySignedIn: 'auth/successfullySignedIn',
    }),
    clearForm() {
      this.email = ''
      this.password = ''
      this.isGeneralError = false
      this.generalErrorMessage = ''
    },
    loginLocal() {
      if (this.canSubmit) {
        login(this.email, this.password).then((user) => {
          console.log(user)
          if (user && Number.isInteger(user.id)) {
            console.log('Loading user')
            // User logged in ok
            this.loadUser(user)
            this.clearForm()
            this.successfullySignedIn()
            this.close()
          } else {
            this.isGeneralError = true
            this.generalErrorMessage = LOGIN_GENERAL_ERROR_MESSAGE
          }
        })
      }
    },
  },
  computed: {
    canSubmit() {
      return this.email.length > 0 && this.password.length > 0
    },
  },
}
</script>
