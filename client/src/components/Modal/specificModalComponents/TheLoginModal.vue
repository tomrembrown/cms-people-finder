<template>
  <section class="modal__main" id="modal__main">
    <div>
      <label class="modal__field__label" for="email">Email</label>
      <input
        class="modal__field__input"
        type="email"
        id="email"
        v-model="email"
      />
    </div>
    <div class="modal__field__subsequentrow">
      <label class="modal__field__label" for="password">Password</label>
      <input
        class="modal__field__input"
        type="password"
        id="password"
        v-model="password"
      />
    </div>
    <div class="modal__error modal__error--general" v-if="isGeneralError">
      {{ generalErrorMessage }}
    </div>
  </section>
  <footer class="modal__footer">
    <button @click="loginLocal" class="button" :disabled="!canSubmit">
      Log In
    </button>
    <button @click="close" class="button" aria-label="Close modal">
      Cancel
    </button>
  </footer>
</template>

<script>
import { LOGIN_GENERAL_ERROR_MESSAGE } from '@/validation/doValidation'
import { mapMutations, mapActions } from 'vuex'
import { login } from '@/api/api-client'

export default {
  name: 'TheLoginModal',
  data() {
    return {
      email: '',
      password: '',
      isGeneralError: false,
      generalErrorMessage: '',
    }
  },
  computed: {
    canSubmit() {
      return this.email.length > 0 && this.password.length > 0
    },
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
          if (user && Number.isInteger(user.id)) {
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
}
</script>
