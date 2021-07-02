<template>
  <section class="modal__main" id="modal__main">
    <div>
      <label class="modal__field__label" for="handle"
        >Handle
        <span class="modal__field__label__description"
          >(will be shown in search results)</span
        ></label
      >
      <input
        class="modal__field__input"
        type="text"
        id="handle"
        v-model="handle"
        @keyup="validate('handle')"
      />
      <div class="modal__error" v-if="isHandleWrong">
        {{ handleErrorMessage }}
      </div>
    </div>
    <div class="modal__field--subsequentrow">
      <label class="modal__field__label" for="email">Email</label>
      <input
        class="modal__field__input"
        type="email"
        id="email"
        v-model="email"
        @keyup="validate('email')"
      />
      <div class="modal__error" v-if="isEmailWrong">
        {{ emailErrorMessage }}
      </div>
    </div>
    <div class="modal__field--subsequentrow">
      <label class="modal__field__label" for="password">Password</label>
      <input
        class="modal__field__input"
        type="password"
        id="password"
        v-model="password"
        @keyup="validate('password')"
      />
      <div class="modal__error" v-if="isPasswordWrong">
        {{ passwordErrorMessage }}
      </div>
    </div>
    <div class="modal__field--subsequentrow">
      <label class="modal__field__label" for="verify_password"
        >Verify Password</label
      >
      <input
        class="modal__field__input"
        type="password"
        id="verify_password"
        v-model="verify_password"
        @keyup="validate('verify_password')"
      />
      <div class="modal__error" v-if="isVerifyPasswordWrong">
        {{ verifyPasswordErrorMessage }}
      </div>
    </div>
  </section>
  <footer class="modal__footer">
    <button @click="signupLocal" class="button" :disabled="!canSubmit">
      Sign Up
    </button>
    <button @click="close" class="button" aria-label="Close modal">
      Cancel
    </button>
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
  name: 'TheSignupModal',
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
      close: 'modal/closeModal',
      loadUser: 'myprofile/loadUser',
    }),
    ...mapActions({
      successfullySignedIn: 'auth/successfullySignedIn',
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
              if (/invalid handle/.test(user)) {
                this.isHandleWrong = true
                this.handleErrorMessage = INVALID_HANDLE_MESSAGE
              }
            }
            if (/taken/.test(user)) {
              if (/email/.test(user)) {
                this.isEmailWrong = true
                this.emailErrorMessage = EMAIL_TAKEN_MESSAGE
              }
              if (/handle/.test(user)) {
                this.isHandleWrong = true
                this.handleErrorMessage = HANDLE_TAKEN_MESSAGE
              }
            }
          }
        })
      }
    },
  },
}
</script>
