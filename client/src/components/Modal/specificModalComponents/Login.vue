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
import { mapMutations, mapActions } from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    ...mapMutations({
      close: 'closeModal',
    }),
    ...mapActions(['login']),
    loginLocal() {
      if (this.canSubmit) {
        this.login()
        this.close()
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
