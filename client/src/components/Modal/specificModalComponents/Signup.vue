<template>
  <section class="modal-main" id="modal-description">
    <div class="handle-holder">
      <label for="handle"
        >Handle
        <span class="modal-label-description"
          >(will be shown in search results)</span
        ></label
      >
      <input
        type="text"
        id="handle"
        v-model="handle"
        @keyup="validate('handle')"
      />
      <div class="error" v-if="isHandleWrong">{{ handleErrorMessage }}</div>
    </div>
    <div class="email-holder subsequent-row">
      <label for="email">Email</label>
      <input
        type="email"
        id="email"
        v-model="email"
        @keyup="validate('email')"
      />
      <div class="error" v-if="isEmailWrong">{{ emailErrorMessage }}</div>
    </div>
    <div class="password-holder subsequent-row">
      <label for="password">Password</label>
      <input
        type="password"
        id="password"
        v-model="password"
        @keyup="validate('password')"
      />
      <div class="error" v-if="isPasswordWrong">
        {{ passwordErrorMessage }}
      </div>
    </div>
    <div class="verify_password-holder subsequent-row">
      <label for="verify_password">Verify Password</label>
      <input
        type="password"
        id="verify_password"
        v-model="verify_password"
        @keyup="validate('verify_password')"
      />
      <div class="error" v-if="isVerifyPasswordWrong">
        {{ verifyPasswordErrorMessage }}
      </div>
    </div>
  </section>
  <footer class="button">
    <button
      @click="signupLocal"
      :class="canSubmit ? '' : 'disabled'"
      :disabled="!canSubmit"
    >
      Sign Up
    </button>
    <button @click="close" aria-label="Close modal">Cancel</button>
  </footer>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import {
  doValidation,
  INVALID_VERIFY_PASSWORD_MESSAGE,
  INVALID_EMAIL_MESSAGE,
  INVALID_PASSWORD_MESSAGE,
  INVALID_HANDLE_MESSAGE,
  EMAIL_TAKEN_MESSAGE,
  HANDLE_TAKEN_MESSAGE,
} from '@/validation/doValidation'
import { signup } from '@/api/api-client'

export default {
  name: 'Signup',
  data() {
    return {
      handle: '',
      email: '',
      password: '',
      verify_password: '',
      isHandleWrong: false,
      handleErrorMessage: '',
      isEmailWrong: false,
      emailErrorMessage: '',
      isPasswordWrong: false,
      passwordErrorMessage: '',
      isVerifyPasswordWrong: false,
      verifyPasswordErrorMessage: '',
    }
  },
  computed: {
    canSubmit() {
      return (
        this.handle.length > 0 &&
        this.email.length > 0 &&
        this.password.length > 0 &&
        this.verify_password.length > 0 &&
        !this.isHandleWrong &&
        !this.isEmailWrong &&
        !this.isPasswordWrong &&
        !this.isVerifyPasswordWrong
      )
    },
  },
  methods: {
    ...mapMutations({
      close: 'closeModal',
      loadUser: 'loadUser',
    }),
    ...mapActions({
      successfullySignedIn: 'successfullySignedIn',
    }),
    clearForm() {
      this.handle = ''
      this.email = ''
      this.password = ''
      this.verify_password = ''
      this.isHandleWrong = false
      this.handleErrorMessage = ''
      this.isEmailWrong = false
      this.emailErrorMessage = ''
      this.isPasswordWrong = false
      this.passwordErrorMessage = ''
      this.isVerifyPasswordWrong = false
      this.verifyPasswordErrorMessage = ''
    },
    async validate(field) {
      const result = await doValidation(field, this[field])
      const fieldProperCase = field.charAt(0).toUpperCase() + field.slice(1)
      if (result.validationOK) {
        // Most checks have been done - perform additional one here for comparing password and verify_password - since two fields
        if (field === 'password' || field === 'verify_password') {
          if (this.password === this.verify_password) {
            this.isVerifyPasswordWrong = false
            this.verifyPasswordErrorMessage = ''
          } else {
            this.isVerifyPasswordWrong = true
            this.verifyPasswordErrorMessage = INVALID_VERIFY_PASSWORD_MESSAGE
          }
        }
        if (field !== 'verify_password') {
          this[`is${fieldProperCase}Wrong`] = false
          this[`${field}ErrorMessage`] = ''
        }
      } else {
        this[`is${fieldProperCase}Wrong`] = true
        this[`${field}ErrorMessage`] = result.errorMessage
      }
    },
    signupLocal() {
      if (this.canSubmit) {
        signup(this.handle, this.email, this.password).then((user) => {
          if (user && user.id) {
            // User signed up ok
            this.loadUser(user)
            this.clearForm()
            this.successfullySignedIn()
            this.close()
          } else {
            // Fill in errors
            if (/invalid/.test(user)) {
              if (/invalid email/.test(user)) {
                this.isEmailWrong = true
                this.emailErrorMessage = INVALID_EMAIL_MESSAGE
              }
              if (/invalid password/.test(user)) {
                this.isPasswordWrong = true
                this.passwordErrorMessage = INVALID_PASSWORD_MESSAGE
              }
              if (/invalid user_handle/.test(user)) {
                this.isUserHandleWrong = true
                this.userHandleErrorMessage = INVALID_HANDLE_MESSAGE
              }
            }
            if (/taken/.test(user)) {
              if (/email/.test(user)) {
                this.isEmailWrong = true
                this.emailErrorMessage = EMAIL_TAKEN_MESSAGE
              }
              if (/user_handle/.test(user)) {
                this.isUserHandleWrong = true
                this.userHandleErrorMessage = HANDLE_TAKEN_MESSAGE
              }
            }
          }
        })
      }
    },
  },
}
</script>
