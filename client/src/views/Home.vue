<template>
  <main id="home">
    <div id="home__inner">
      <HomePageGraphic />
      <div id="home__buttons" class="button">
        <button @click="showLogin" v-if="!isSignedIn">Log In</button>
        <button @click="showSignup" v-if="!isSignedIn">Sign Up</button>
        <router-link to="/browse">Find People</router-link>
        <router-link to="/about">About Us</router-link>
        <button
          @click="signout"
          v-if="isSignedIn"
          class="home__buttons__center"
        >
          Sign Out
        </button>
      </div>
    </div>
  </main>
</template>

<script>
import HomePageGraphic from '@/components/Home/HomePageGraphic.vue'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'Home',
  components: {
    HomePageGraphic,
  },
  computed: {
    ...mapState(['isSignedIn']),
  },
  methods: {
    ...mapMutations(['signout']),
    ...mapActions(['showLogin', 'showSignup']),
  },
}
</script>

<style lang="scss">
#home {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  text-align: center;

  #home__inner {
    display: inline-block;

    #home__buttons {
      display: grid;

      grid-template-columns: repeat(2, 1fr);
      justify-content: center;
      justify-items: center;
      padding-bottom: 1em;

      .home__buttons__center {
        justify-self: center;
        grid-column: 1 / -1;
      }
    }
  }
}
</style>
