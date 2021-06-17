<template>
  <section class="modal-main" id="modal-description">
    <div class="handle-holder">
      <label for="handle"
        >Handle
        <span class="modal-label-description"
          >(will be shown in search results)</span
        ></label
      >
      <input type="text" name="handle" id="handle" />
      <div class="error" v-if="isHandleWrong">{{ handleErrorMessage }}</div>
    </div>
    <div class="email-holder subsequent-row">
      <label for="email">Email</label>
      <input type="email" name="email" id="email" />
      <div class="error" v-if="isEmailWrong">{{ emailErrorMessage }}</div>
    </div>
    <div class="password-holder subsequent-row">
      <label for="password">Password</label>
      <input type="password" name="password" id="password" />
      <div class="error" v-if="isPasswordWrong">{{ passwordErrorMessage }}</div>
    </div>
    <div class="verify_password-holder subsequent-row">
      <label for="verify_password">Verify Password</label>
      <input type="password" name="verify_password" id="verify_password" />
      <div class="error" v-if="isVerifyPasswordWrong">
        {{ verifyPasswordErrorMessage }}
      </div>
    </div>
  </section>
  <footer class="button">
    <div class="error generalerror" v-if="isGeneralError">
      {{ generalErrorMessage }}
    </div>
    <button @click="signup">Sign Up</button>
    <button @click="close" aria-label="Close modal">Cancel</button>
  </footer>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Signup',
  data() {
    return {
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
  methods: {
    ...mapMutations({
      close: 'closeModal',
    }),
    signup() {
      console.log('signup')
    },
  },
}
</script>

<style lang="scss">
.subsequent-row {
  margin-top: 0.2rem;
}
</style>
