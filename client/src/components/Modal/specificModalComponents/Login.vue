<template>
  <section class="modal-main" id="modal-description">
    <div class="email-holder">
      <label for="email">Email</label>
      <input type="email" name="email" id="email" />
      <div class="error" v-if="isEmailWrong">{{ emailErrorMessage }}</div>
    </div>
    <div class="password-holder">
      <label for="password">Password</label>
      <input type="password" name="password" id="password" />
      <div class="error" v-if="isPasswordWrong">{{ passwordErrorMessage }}</div>
    </div>
  </section>
  <footer class="button">
    <button @click="login">Log In</button>
    <button @click="close" aria-label="Close modal">Cancel</button>
  </footer>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      isEmailWrong: false,
      emailErrorMessage: '',
      isPasswordWrong: false,
      passwordErrorMessage: '',
    }
  },
  methods: {
    ...mapMutations({
      close: 'closeModal',
    }),
    login() {
      console.log('login')
    },
  },
}
</script>

<style lang="scss">
.email-holder,
.password-holder {
  margin-top: 1rem;
}
</style>
