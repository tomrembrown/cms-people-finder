<template>
  <nav>
    <ul>
      <li key="browse" class="button" v-if="isSignedIn">
        <router-link to="/myprofile">My Profile</router-link>
      </li>
      <li key="browse" class="button">
        <router-link to="/browse">Find People</router-link>
      </li>
      <li key="about" class="button">
        <router-link to="/about">About Us</router-link>
      </li>
      <li key="login" class="button" v-if="!isSignedIn">
        <button @click="showLogin">Log In</button>
      </li>
      <li key="signup" class="button" v-if="!isSignedIn">
        <button @click="showSignup">Sign Up</button>
      </li>
      <li key="signup" class="button" v-if="isSignedIn">
        <button @click="signout">Sign Out</button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Navigation',
  computed: {
    ...mapState(['isSignedIn']),
  },
  methods: {
    ...mapActions(['showLogin', 'showSignup', 'signout']),
  },
}
</script>

<style lang="scss">
nav {
  margin-right: 0.5rem;

  ul {
    display: flex;
    justify-content: flex-end;
    font-size: 0.875rem;
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: auto;

    li {
      display: inline;
    }
  }
}
</style>
