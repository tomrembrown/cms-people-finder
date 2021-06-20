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
      <div class="error" v-if="isPasswordWrong">{{ passwordErrorMessage }}</div>
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
    <div class="error generalerror" v-if="isGeneralError">
      {{ generalErrorMessage }}
    </div>
    <button
      @click="signup"
      :class="canSubmit ? '' : 'disabled'"
      :disabled="!canSubmit"
    >
      Sign Up
    </button>
    <button @click="close" aria-label="Close modal">Cancel</button>
  </footer>
</template>

<script>
import { mapMutations } from 'vuex'
import doValidation from '@/validation/doValidation'
//const EMAIL_TAKEN_MESSAGE = 'Account already exists for email. Please sign in'
const INVALID_VERIFY_PASSWORD_MESSAGE = 'Passwords do not match'
//const LOGIN_GENERAL_ERROR_MESSAGE = 'Invalid User Credentials'

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
      isGeneralError: false,
      generalErrorMessage: '',
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
        !this.isVerifyPasswordWrong &&
        !this.isGeneralError
      )
    },
  },
  methods: {
    ...mapMutations({
      close: 'closeModal',
    }),
    validate(field) {
      const result = doValidation(field, this[field])
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
    signup() {
      if (this.canSubmit) {
        // Send to server
        this.close()
      }
    },
  },
}
</script>
