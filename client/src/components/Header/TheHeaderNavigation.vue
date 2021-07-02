<template>
  <nav class="site-header__navigation">
    <ul class="site-header__navigation-menu">
      <li
        class="site-header__navigation-menu-link"
        key="browse"
        v-if="isSignedIn"
      >
        <router-link class="button" to="/myprofile">My Profile</router-link>
      </li>
      <li class="site-header__navigation-menu-link" key="browse">
        <router-link class="button" to="/browse">Find People</router-link>
      </li>
      <li class="site-header__navigation-menu-link" key="about">
        <router-link class="button" to="/about">About Us</router-link>
      </li>
      <li
        class="site-header__navigation-menu-link"
        key="login"
        v-if="!isSignedIn"
      >
        <button class="button" @click="showLogin">Log In</button>
      </li>
      <li
        class="site-header__navigation-menu-link"
        key="signup"
        v-if="!isSignedIn"
      >
        <button class="button" @click="showSignup">Sign Up</button>
      </li>
      <li
        class="site-header__navigation-menu-link"
        key="signup"
        v-if="isSignedIn"
      >
        <button class="button" @click="signout">Sign Out</button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'TheHeaderNavigation',
  computed: {
    ...mapState('auth', ['isSignedIn']),
  },
  methods: {
    ...mapActions({
      showLogin: 'modal/showLogin',
      showSignup: 'modal/showSignup',
      signout: 'auth/signout',
    }),
  },
}
</script>

<style lang="scss">
.site-header__navigation {
  margin-right: 0.5rem;
}

.site-header__navigation-menu {
  display: flex;
  justify-content: flex-end;
  font-size: 0.875rem;
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: auto;
}

.site-header__navigation-menu-link {
  display: inline;
}
</style>
